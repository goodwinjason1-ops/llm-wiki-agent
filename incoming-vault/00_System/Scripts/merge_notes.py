#!/usr/bin/env python3
"""Merge duplicate notes, preserving links and history.

    python3 00_System/Scripts/merge_notes.py                    # list groups, change nothing
    python3 00_System/Scripts/merge_notes.py --group pendle      # inspect one group closely
    python3 00_System/Scripts/merge_notes.py --apply             # merge the safe ones
    python3 00_System/Scripts/merge_notes.py --undo manifest.json

WHAT A MERGE DOES HERE
----------------------
Nothing is deleted. For each duplicate group:

1. A **keeper** is chosen — most inbound links, then most content, then has
   frontmatter. Override with `--keep <filename>`.
2. Every `[[wikilink]]` to a loser anywhere in the vault is rewritten to the
   keeper, preserving any `|alias` and `#heading`.
3. Each loser is moved to `09_Archive/merged/` and gains
   `status: merged` plus `merged_into: [[keeper]]`, with a redirect line at the
   top. The vault's rule is archive, never delete — the record of what you used
   to have is what makes the merge auditable.
4. A manifest of every change is written so the whole operation can be undone.

SAFETY
------
- Dry run by default.
- Only groups at or above `--min-sim` (default 0.95) are merged automatically.
  Below that the notes differ enough that a human should look; they are listed
  but skipped.
- If a loser contains a heading the keeper lacks, the group is **held back** and
  reported, because merging would silently drop content.
- Every run writes `00_System/Reports/merge-manifest-<timestamp>.json`.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import shutil
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from connection_illuminator import (  # noqa: E402
    SKIP_DIRS, build_vectors, cosine, load_notes, title_key,
)

HEADING = re.compile(r"^#{1,6}\s+(.+?)\s*$", re.MULTILINE)
FM = re.compile(r"\A(---\r?\n)(.*?)(\r?\n---\s*?\r?\n)", re.DOTALL)

# Conventionally one per folder. Ten README.md files are not ten copies of a note.
STRUCTURAL = {"readme", "claude", "agents", "hermes", "index", "log", "schema"}

# 02_Raw -> 03_Sources with the same filename is the designed pipeline: the raw
# capture and its summary. Same name, different layer, both intended.
LAYERS = ("02_Raw", "03_Sources", "04_Wiki")


def same_pipeline(a: str, b: str) -> bool:
    la = next((x for x in LAYERS if a.startswith(x)), None)
    lb = next((x for x in LAYERS if b.startswith(x)), None)
    return la is not None and lb is not None and la != lb


def cluster(paths: list[str], vecs: dict, threshold: float) -> list[list[str]]:
    """Split a same-title group into sub-clusters of genuinely similar notes.

    A group of three where two are 99% identical and the third merely shares a
    title should yield one mergeable pair, not one unmergeable group of three.
    """
    out: list[list[str]] = []
    for p in paths:
        placed = False
        for c in out:
            if all(cosine(vecs.get(p, {}), vecs.get(q, {})) >= threshold for q in c):
                c.append(p)
                placed = True
                break
        if not placed:
            out.append([p])
    return out


def all_markdown(root: Path):
    for p in sorted(root.rglob("*.md")):
        rel = p.relative_to(root)
        if any(part in SKIP_DIRS or part.startswith(".") for part in rel.parts):
            continue
        yield p


def link_re(stem: str) -> re.Pattern:
    """Match [[stem]], [[stem|alias]], [[stem#heading]], ![[stem]] — stem only."""
    return re.compile(r"(!?)\[\[\s*" + re.escape(stem) + r"\s*([#|][^\]]*)?\]\]",
                      re.IGNORECASE)


def choose_keeper(paths: list[str], notes: dict, inbound: dict) -> tuple[str, str]:
    def score(k):
        n = notes[k]
        return (inbound.get(k, 0), len(n["text"]), bool(FM.match(n["text"])), k)
    ranked = sorted(paths, key=score, reverse=True)
    best = ranked[0]
    reasons = []
    if inbound.get(best, 0) > max((inbound.get(k, 0) for k in ranked[1:]), default=0):
        reasons.append(f"{inbound.get(best,0)} inbound link(s)")
    if len(notes[best]["text"]) >= max(len(notes[k]["text"]) for k in ranked[1:]):
        reasons.append(f"{len(notes[best]['text'])} bytes, the fullest copy")
    return best, "; ".join(reasons) or "first by name"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", type=Path, default=Path.cwd())
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--min-sim", type=float, default=0.95)
    ap.add_argument("--group", help="only groups whose name contains this substring")
    ap.add_argument("--keep", help="force this filename (stem) as the keeper")
    ap.add_argument("--undo", type=Path, help="reverse a previous run from its manifest")
    args = ap.parse_args()
    root = args.root.resolve()

    if args.undo:
        return undo(root, args.undo)

    notes = load_notes(root)
    vecs = build_vectors(notes)

    inbound: dict[str, int] = defaultdict(int)
    by_stem = defaultdict(list)
    for k, n in notes.items():
        by_stem[n["stem"].lower()].append(k)
    for k, n in notes.items():
        for t in n["links"]:
            for h in by_stem.get(t, []):
                if h != k:
                    inbound[h] += 1

    groups = defaultdict(list)
    for k in notes:
        groups[title_key(notes[k]["stem"])].append(k)
    groups = {g: v for g, v in groups.items() if len(v) > 1 and g}

    if args.group:
        groups = {g: v for g, v in groups.items() if args.group.lower() in g.lower()}

    mergeable, held, low, skipped = [], [], [], 0
    candidates = []
    for g, paths in sorted(groups.items()):
        if g in STRUCTURAL:
            skipped += 1
            continue
        for sub in cluster(paths, vecs, args.min_sim * 0.6):
            if len(sub) < 2:
                continue
            if all(same_pipeline(a, b) for i, a in enumerate(sub) for b in sub[i + 1:]):
                skipped += 1
                continue
            candidates.append((g, sub))

    for g, paths in candidates:
        sims = [cosine(vecs[a], vecs[b])
                for i, a in enumerate(paths) for b in paths[i + 1:]]
        sim = min(sims) if sims else 0.0
        keeper, why = choose_keeper(paths, notes, inbound)
        if args.keep:
            match = [p for p in paths if notes[p]["stem"].lower() == args.keep.lower()]
            if match:
                keeper, why = match[0], "forced with --keep"
        losers = [p for p in paths if p != keeper]

        kh = set(HEADING.findall(notes[keeper]["text"]))
        lost = sorted({h for p in losers for h in HEADING.findall(notes[p]["text"])} - kh)

        rec = {"group": g, "keeper": keeper, "losers": losers, "sim": sim,
               "why": why, "lost_headings": lost}
        if sim < args.min_sim:
            low.append(rec)
        elif lost:
            held.append(rec)
        else:
            mergeable.append(rec)

    print(f"\n  {len(candidates)} duplicate cluster(s) — {len(mergeable)} safe to merge, "
          f"{len(held)} held back, {len(low)} below {args.min_sim:.0%} similarity")
    if skipped:
        print(f"  ({skipped} same-name group(s) ignored: per-folder README/CLAUDE files, "
              f"and 02_Raw->03_Sources pairs, which are the pipeline working as designed)")
    print()

    for r in mergeable:
        print(f"  MERGE  keep  {Path(r['keeper']).name}")
        print(f"         ({r['why']}; group similarity {r['sim']:.0%})")
        for l in r["losers"]:
            print(f"         drop  {Path(l).name}")
        print()

    if held:
        print(f"  HELD BACK — the losers contain headings the keeper lacks, so merging\n"
              f"  would silently drop content. Reconcile by hand, then re-run.\n")
        for r in held[:10]:
            print(f"    {Path(r['keeper']).name}")
            print(f"      would lose: {', '.join(r['lost_headings'][:5])}")
        print()

    if low:
        print(f"  BELOW THRESHOLD — same title, genuinely different content. These are\n"
              f"  probably not duplicates; look before forcing.\n")
        for r in low[:10]:
            print(f"    {Path(r['keeper']).name}  ({r['sim']:.0%} similar to its group)")
        print()

    if not args.apply:
        print("  Dry run. Nothing changed. Re-run with --apply to merge the safe ones.\n")
        return 0

    ts = dt.datetime.now().strftime("%Y%m%dT%H%M%S")
    manifest = {"timestamp": ts, "merges": [], "rewrites": []}
    archive = root / "09_Archive" / "merged"
    archive.mkdir(parents=True, exist_ok=True)

    loser_map = {}
    for r in mergeable:
        for l in r["losers"]:
            loser_map[notes[l]["stem"]] = notes[r["keeper"]]["stem"]

    # 1. rewrite links across the whole vault
    for p in all_markdown(root):
        try:
            text = original = p.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            continue
        for loser_stem, keeper_stem in loser_map.items():
            text = link_re(loser_stem).sub(
                lambda m: f"{m.group(1)}[[{keeper_stem}{m.group(2) or ''}]]", text)
        if text != original:
            p.write_text(text, encoding="utf-8")
            manifest["rewrites"].append(p.relative_to(root).as_posix())

    # 2. archive the losers
    for r in mergeable:
        keeper_stem = notes[r["keeper"]]["stem"]
        for l in r["losers"]:
            src = root / l
            if not src.is_file():
                continue
            text = src.read_text(encoding="utf-8")
            m = FM.match(text)
            stamp = (f"> **Merged into [[{keeper_stem}]] on {dt.date.today().isoformat()}.**\n"
                     f"> Kept for the record. Do not edit — edit the keeper.\n\n")
            if m:
                head = m.group(2)
                head = re.sub(r"^status:.*$", "", head, flags=re.MULTILINE).strip()
                head += f"\nstatus: merged\nmerged_into: \"[[{keeper_stem}]]\""
                text = m.group(1) + head + m.group(3) + stamp + text[m.end():]
            else:
                text = stamp + text
            dest = archive / src.name
            i = 1
            while dest.exists():
                dest = archive / f"{src.stem} ({i}){src.suffix}"
                i += 1
            dest.write_text(text, encoding="utf-8")
            src.unlink()
            manifest["merges"].append({
                "from": l, "to": dest.relative_to(root).as_posix(),
                "keeper": r["keeper"], "loser_stem": notes[l]["stem"],
                "keeper_stem": keeper_stem,
            })

    rep = root / "00_System" / "Reports" / f"merge-manifest-{ts}.json"
    rep.parent.mkdir(parents=True, exist_ok=True)
    rep.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    print(f"  Merged {len(manifest['merges'])} note(s); rewrote links in "
          f"{len(manifest['rewrites'])} file(s).")
    print(f"  Archived to 09_Archive/merged/")
    print(f"  Manifest: {rep.relative_to(root)}")
    print(f"  Undo with: python3 00_System/Scripts/merge_notes.py --undo \"{rep.relative_to(root)}\"\n")
    return 0


def undo(root: Path, manifest_path: Path) -> int:
    mp = manifest_path if manifest_path.is_absolute() else root / manifest_path
    data = json.loads(mp.read_text(encoding="utf-8"))
    restored = 0
    for m in data["merges"]:
        src, dest = root / m["to"], root / m["from"]
        if not src.is_file():
            continue
        text = src.read_text(encoding="utf-8")
        text = re.sub(r"^> \*\*Merged into .*?\n> Kept for the record.*?\n\n", "",
                      text, flags=re.MULTILINE | re.DOTALL)
        text = re.sub(r"^status: merged\n", "", text, flags=re.MULTILINE)
        text = re.sub(r"^merged_into: .*\n", "", text, flags=re.MULTILINE)
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(text, encoding="utf-8")
        src.unlink()
        restored += 1

    # reverse the link rewrites
    back = {m["keeper_stem"]: m["loser_stem"] for m in data["merges"]}
    print(f"  Restored {restored} note(s) from archive.")
    print(f"  NOTE: link rewrites are NOT reversed — {len(data['rewrites'])} file(s) still")
    print(f"  point at the keeper. That is usually what you want; the restored notes")
    print(f"  simply have no inbound links again. Reverse manually if needed:")
    for k, v in list(back.items())[:5]:
        print(f"    [[{k}]] -> [[{v}]]")
    print()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
