#!/usr/bin/env python3
"""Bring an existing Obsidian vault into this structure.

Dry-run by default. Nothing is written unless you pass --apply, and --apply refuses
to run on a directory that is not a clean git working tree unless you also pass
--force.

    # 1. See what it would do
    python3 tools/migrate_vault.py --from ~/MyVault

    # 2. Look at the plan, adjust the type guesses if needed
    python3 tools/migrate_vault.py --from ~/MyVault --plan plan.json

    # 3. Copy into wiki/ with frontmatter filled in
    python3 tools/migrate_vault.py --from ~/MyVault --apply

The classifier is a heuristic. It reads folder names, frontmatter, tags and content
shape, and it will be wrong sometimes — which is why step 2 exists. Everything it is
unsure about lands in `wiki/inbox/` for a human or an agent to file, rather than being
guessed into a wrong folder where it will be forgotten.

Existing frontmatter is preserved. Missing SCHEMA.md fields are added; nothing that
was already there is overwritten.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import shutil
import subprocess
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from vault import FOLDER_TYPES, parse_frontmatter  # noqa: E402

TYPE_FOLDER = {v: k for k, v in FOLDER_TYPES.items()}

# Folder-name hints. Deliberately does NOT include generic words like "note" or
# "notes" — those appear in half of all vault folder names and mean nothing.
FOLDER_HINTS = {
    "journal": ["journal", "daily", "diary", "dailies", "weekly", "meeting", "standup", "log"],
    "source":  ["literature", "source", "reference", "reading", "book", "paper", "article",
                "clipping", "highlight", "podcast", "video", "bookmark"],
    "procedure": ["procedure", "howto", "how-to", "sop", "recipe", "workflow", "runbook",
                  "checklist", "playbook"],
    "question": ["question", "unresolved", "unknown", "open-question"],
    "map":     ["moc", "map-of-content", "maps", "hub", "toc", "dashboard"],
    "entity":  ["entity", "people", "person", "org", "company", "companies", "tool", "tools",
                "project", "projects", "place", "contact"],
    "concept": ["concept", "idea", "permanent", "zettel", "evergreen", "topic", "theory", "slipbox"],
    # Weakest signal: these folders mean "not filed yet", which any other
    # signal should be allowed to beat.
    "capture": ["inbox", "unsorted", "untitled", "scratch", "fleeting", "capture", "clipbox", "misc"],
}

# Filename markers beat folder placement — a file called "Deploy Runbook" is a
# procedure regardless of which folder someone dropped it in.
NAME_HINTS = {
    "procedure": ["runbook", "sop", "playbook", "checklist", "how-to", "howto", "recipe", "setup guide"],
    "map":       ["moc", "map of content", "index", "dashboard", " hub"],
}

DATE_NAME_RE = re.compile(r"^\d{4}[-_/]?\d{2}[-_/]?\d{2}")
TODAY = dt.date.today().isoformat()

DEFAULT_TIER = {
    "capture": "working", "journal": "working", "source": "episodic",
    "question": "episodic", "concept": "semantic", "entity": "semantic",
    "map": "semantic", "procedure": "procedural",
}
DEFAULT_CONF = {
    "capture": 0.3, "journal": 0.4, "question": 0.3, "source": 0.7,
    "concept": 0.5, "entity": 0.5, "map": 0.6, "procedure": 0.6,
}


def classify(path: Path, root: Path, meta: dict, body: str) -> tuple[str, str, float]:
    """Return (type, reason, confidence-in-the-guess).

    Scored rather than first-match: a folder called "Unsorted" must not outrank a
    filename that plainly says what the note is.
    """
    # Explicit frontmatter always wins outright.
    t = meta.get("type")
    if isinstance(t, str) and t.lower() in TYPE_FOLDER:
        return t.lower(), "declared in frontmatter", 1.0

    parts = [p.lower() for p in path.relative_to(root).parts[:-1]]
    name = path.stem.lower()
    tags = meta.get("tags") or []
    if isinstance(tags, str):
        tags = [tags]
    tagblob = " ".join(str(x).lower() for x in tags)

    signals: list[tuple[float, str, str]] = []   # (weight, kind, reason)

    # -- filename shape (strongest: the author named the thing) --------------
    if DATE_NAME_RE.match(name):
        signals.append((0.88, "journal", "date-shaped filename"))
    for kind, words in NAME_HINTS.items():
        hit = next((w for w in words if w in name), None)
        if hit:
            signals.append((0.85, kind, f"filename contains {hit.strip()!r}"))
    if name.endswith("?") or re.match(r"^(q[\s\-–—]|how (do|does|can)|why |what |when |should |is it)", name):
        signals.append((0.8, "question", "question-shaped title"))

    # -- folder names --------------------------------------------------------
    for kind, words in FOLDER_HINTS.items():
        for part in parts:
            if any(w in part for w in words):
                # "unsorted" means "not filed", which is weaker than any real signal
                weight = 0.35 if kind == "capture" else 0.7
                signals.append((weight, kind, f"folder name {part!r}"))
                break

    # -- tags ----------------------------------------------------------------
    for kind, words in FOLDER_HINTS.items():
        hit = next((w for w in words if w in tagblob), None)
        if hit:
            signals.append((0.6 if kind != "capture" else 0.3, kind, f"tag hint {hit!r}"))

    # -- content shape -------------------------------------------------------
    if meta.get("author") or meta.get("url") or meta.get("source") or re.search(
            r"^\s*(source|url|author|link):", body, re.MULTILINE | re.IGNORECASE):
        signals.append((0.72, "source", "has source/url/author metadata"))
    if re.search(r"^\s*\d+\.\s+\S", body, re.MULTILINE) and re.search(
            r"\b(step|steps|first|then|finally|prerequisite|install|run|deploy|verify)\b",
            body, re.IGNORECASE):
        signals.append((0.6, "procedure", "numbered steps with procedural vocabulary"))

    links = len(re.findall(r"\[\[", body))
    words = len(body.split())
    if links >= 8 and words < links * 28:
        signals.append((0.62, "map", f"{links} links, little prose — reads as an index"))
    if re.search(r"\b(is a|refers to|means that|defined as|the idea that)\b", body[:600], re.IGNORECASE):
        signals.append((0.5, "concept", "definitional phrasing"))
    if words < 45:
        signals.append((0.45, "capture", f"only {words} words — too thin to classify"))

    if not signals:
        return "capture", "no signal — needs a human to file it", 0.25

    # Sum evidence per kind so agreeing weak signals can beat one strong outlier,
    # but rank primarily on the single best signal.
    totals: dict[str, float] = {}
    for w, kind, _ in signals:
        totals[kind] = totals.get(kind, 0.0) + w
    best_w, best_kind, best_reason = max(
        signals, key=lambda s: (s[0] + 0.12 * (totals[s[1]] - s[0]), s[0]))

    # Only name rivals that were actually close — otherwise every row reads
    # "(over capture)" and the annotation stops carrying information.
    rivals = sorted({k for w, k, _ in signals if k != best_kind and w >= best_w - 0.2})
    reason = best_reason + (f" (over {', '.join(rivals)})" if rivals else "")
    return best_kind, reason, round(best_w, 2)


def build_frontmatter(meta: dict, kind: str, title: str) -> str:
    """Merge SCHEMA.md defaults under whatever is already there."""
    out = dict(meta)
    out.setdefault("title", title)
    out["type"] = kind
    out.setdefault("tier", DEFAULT_TIER[kind])
    out.setdefault("status", "active" if kind != "capture" else "draft")
    out.setdefault("confidence", DEFAULT_CONF[kind])
    for f in ("created", "updated", "reviewed"):
        out.setdefault(f, TODAY)
    out.setdefault("sources", [])
    out.setdefault("tags", [])
    out.setdefault("aliases", [])

    order = ["title", "type", "tier", "status", "confidence", "created", "updated",
             "reviewed", "sources", "tags", "aliases"]
    keys = order + [k for k in out if k not in order]

    lines = ["---"]
    for k in keys:
        if k not in out:
            continue
        v = out[k]
        if isinstance(v, list):
            if not v:
                lines.append(f"{k}: []")
            elif k in ("tags", "aliases"):
                lines.append(f"{k}: [{', '.join(str(x) for x in v)}]")
            else:
                lines.append(f"{k}:")
                lines.extend(f"  - {x}" for x in v)
        elif v is None:
            lines.append(f"{k}: null")
        elif isinstance(v, bool):
            lines.append(f"{k}: {'true' if v else 'false'}")
        else:
            s = str(v)
            lines.append(f"{k}: {s}" if not s.startswith(("[", "{", "#", "*", "&")) else f'{k}: "{s}"')
    lines.append("---")
    return "\n".join(lines) + "\n\n"


def git_is_clean(path: Path) -> bool | None:
    try:
        r = subprocess.run(["git", "-C", str(path), "status", "--porcelain"],
                           capture_output=True, text=True, timeout=15)
    except (OSError, subprocess.SubprocessError):
        return None
    if r.returncode != 0:
        return None
    return not r.stdout.strip()


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--from", dest="src", type=Path, required=True, help="existing vault directory")
    ap.add_argument("--root", type=Path, default=None, help="this repo (default: auto-detect)")
    ap.add_argument("--apply", action="store_true", help="actually copy the files in")
    ap.add_argument("--force", action="store_true", help="allow --apply on a dirty git tree")
    ap.add_argument("--plan", type=Path, help="write the classification plan as JSON")
    ap.add_argument("--limit", type=int, default=30, help="rows to show per type in the report")
    args = ap.parse_args()

    src = args.src.expanduser().resolve()
    if not src.is_dir():
        print(f"error: {src} is not a directory", file=sys.stderr)
        return 1

    root = (args.root or Path(__file__).resolve().parent.parent).resolve()
    wiki = root / "wiki"
    if src == root or root in src.parents:
        print("error: --from must be outside this repo", file=sys.stderr)
        return 1

    files = [p for p in sorted(src.rglob("*.md"))
             if not any(part.startswith((".", "_")) for part in p.relative_to(src).parts)]
    if not files:
        print(f"No markdown files found under {src}")
        return 0

    plan = []
    for p in files:
        try:
            text = p.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            continue
        meta, body, had = parse_frontmatter(text)
        kind, reason, conf = classify(p, src, meta, body)
        dest = wiki / TYPE_FOLDER[kind] / f"{p.stem}.md"
        plan.append({
            "from": str(p), "to": str(dest.relative_to(root)), "type": kind,
            "reason": reason, "guess_confidence": conf, "had_frontmatter": had,
            "title": (meta.get("title") if isinstance(meta.get("title"), str) else None) or p.stem,
        })

    # collisions
    seen = Counter(i["to"] for i in plan)
    collisions = [t for t, c in seen.items() if c > 1]

    counts = Counter(i["type"] for i in plan)
    unsure = [i for i in plan if i["guess_confidence"] < 0.5]

    print(f"\n  Migration plan — {len(plan)} notes from {src}\n")
    for kind in ["concept", "entity", "source", "procedure", "question", "map", "journal", "capture"]:
        items = [i for i in plan if i["type"] == kind]
        if not items:
            continue
        print(f"  wiki/{TYPE_FOLDER[kind]}/  ({len(items)})")
        for i in items[: args.limit]:
            flag = " ?" if i["guess_confidence"] < 0.5 else "  "
            print(f"   {flag} {i['title'][:52]:<52}  {i['reason']}")
        if len(items) > args.limit:
            print(f"      … and {len(items) - args.limit} more")
        print()

    print(f"  Totals: " + " · ".join(f"{k} {v}" for k, v in counts.most_common()))
    if unsure:
        print(f"  {len(unsure)} note(s) marked `?` — low-confidence guesses, most land in inbox/")
    if collisions:
        print(f"\n  {len(collisions)} filename collision(s) — these would overwrite each other:")
        for c in collisions[:10]:
            print(f"    {c}")
        print("  Rename the sources before applying.")

    if args.plan:
        args.plan.write_text(json.dumps(plan, indent=2), encoding="utf-8")
        print(f"\n  Plan written to {args.plan}")

    if not args.apply:
        print("\n  Dry run. Nothing was written. Re-run with --apply to copy the files in.")
        print("  Originals are never modified or deleted — this copies.\n")
        return 0

    if collisions and not args.force:
        print("\n  Refusing to apply with filename collisions. Rename, or pass --force.\n")
        return 1

    clean = git_is_clean(root)
    if clean is False and not args.force:
        print("\n  Refusing to apply: this repo has uncommitted changes, so a bad")
        print("  migration would be hard to undo. Commit or stash first, or pass --force.\n")
        return 1

    written = 0
    for i in plan:
        dest = root / i["to"]
        dest.parent.mkdir(parents=True, exist_ok=True)
        text = Path(i["from"]).read_text(encoding="utf-8")
        meta, body, _ = parse_frontmatter(text)
        dest.write_text(build_frontmatter(meta, i["type"], i["title"]) + body.lstrip("\n"),
                        encoding="utf-8")
        written += 1

    # bring attachments along so image embeds keep resolving
    att = wiki / "_attachments"
    copied = 0
    for p in src.rglob("*"):
        if p.is_file() and p.suffix.lower() in {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".pdf"}:
            if any(part.startswith(".") for part in p.relative_to(src).parts):
                continue
            att.mkdir(parents=True, exist_ok=True)
            target = att / p.name
            if not target.exists():
                shutil.copy2(p, target)
                copied += 1

    print(f"\n  Wrote {written} note(s) into wiki/" + (f", copied {copied} attachment(s)" if copied else ""))
    print("\n  Next:")
    print("    python3 tools/lint_vault.py       # see what needs fixing")
    print("    python3 tools/build_graph.py      # look at the graph")
    print("\n  Then tell your agent:")
    print("    Read SCHEMA.md and AGENTS.md. Lint the wiki, then consolidate:")
    print("    file everything in wiki/inbox/, add typed links, and report what")
    print("    connections you found that I had not made.\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
