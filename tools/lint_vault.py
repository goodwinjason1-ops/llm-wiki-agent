#!/usr/bin/env python3
"""Health check for the wiki against SCHEMA.md.

    python3 tools/lint_vault.py            # human-readable report
    python3 tools/lint_vault.py --json     # machine-readable, for agents
    python3 tools/lint_vault.py --strict   # exit 1 if any error is found

Checks the mechanical faults only. Merging near-duplicates, splitting overgrown
pages and resolving contradictions need judgment — those are the agent's job
(AGENTS.md §3), and this tool surfaces the candidates rather than acting on them.
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import Counter, defaultdict
from difflib import SequenceMatcher
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from vault import (  # noqa: E402
    EDGE_TYPES, FOLDER_TYPES, SYMMETRIC_EDGES, TIER_HALFLIFE,
    VALID_STATUS, VALID_TIERS, VALID_TYPES, Vault, find_root,
)

GENERIC_TAGS = {"notes", "note", "misc", "stuff", "todo", "general", "other", "temp", "inbox"}


class Report:
    def __init__(self) -> None:
        self.items: list[dict] = []

    def add(self, level: str, code: str, where: str, msg: str, fix: str = "") -> None:
        self.items.append({"level": level, "code": code, "where": where, "message": msg, "fix": fix})

    error = lambda self, *a, **k: self.add("error", *a, **k)      # noqa: E731
    warn = lambda self, *a, **k: self.add("warn", *a, **k)        # noqa: E731
    info = lambda self, *a, **k: self.add("info", *a, **k)        # noqa: E731

    def count(self, level: str) -> int:
        return sum(1 for i in self.items if i["level"] == level)


def lint(v: Vault) -> Report:
    r = Report()

    # -- frontmatter -------------------------------------------------------
    for n in v.notes:
        if n.folder == "_root":
            continue
        if not n.has_frontmatter:
            r.error("no-frontmatter", n.rel, "No YAML frontmatter",
                    "Add the block from SCHEMA.md §3")
            continue

        expected = FOLDER_TYPES.get(n.folder)
        raw_type = n.meta.get("type")
        if raw_type is None:
            r.error("missing-type", n.rel, "Frontmatter has no `type`")
        elif raw_type not in VALID_TYPES:
            r.error("bad-type", n.rel, f"`type: {raw_type}` is not a valid type",
                    f"one of {sorted(VALID_TYPES)}")
        elif expected and raw_type != expected:
            r.error("type-folder-mismatch", n.rel,
                    f"`type: {raw_type}` but lives in wiki/{n.folder}/ (expects `{expected}`)",
                    f"move the file, or set type: {expected}")

        if n.meta.get("tier") not in VALID_TIERS:
            r.warn("bad-tier", n.rel, f"`tier: {n.meta.get('tier')}` is not valid",
                   f"one of {sorted(VALID_TIERS)}")
        if n.meta.get("status") not in VALID_STATUS:
            r.warn("bad-status", n.rel, f"`status: {n.meta.get('status')}` is not valid",
                   f"one of {sorted(VALID_STATUS)}")

        c = n.meta.get("confidence")
        if c is None:
            r.warn("no-confidence", n.rel, "No `confidence` — defaults to 0.5")
        elif not isinstance(c, (int, float)) or not 0 <= c <= 1:
            r.error("bad-confidence", n.rel, f"`confidence: {c}` must be a number 0.0–1.0")

        title = n.meta.get("title")
        if isinstance(title, str) and title.strip() and title.strip() != n.stem:
            r.warn("title-filename-mismatch", n.rel,
                   f"title {title!r} != filename {n.stem!r}",
                   "the filename is the wikilink target; keep them equal or add an alias")

        if not n.date("created"):
            r.warn("no-created", n.rel, "No parseable `created` date (YYYY-MM-DD)")
        if not (n.date("reviewed") or n.date("updated")):
            r.warn("no-reviewed", n.rel, "No `reviewed`/`updated` date — staleness can't be tracked")

        if not n.aliases and n.type in ("concept", "entity"):
            r.info("no-aliases", n.rel, "No aliases — the note may be hard to find later",
                   "add every name you might search for")

        for t in n.tags:
            if t.lower() in GENERIC_TAGS:
                r.warn("generic-tag", n.rel, f"tag `{t}` carries no information",
                       "use a hierarchical tag like `domain/subtopic`")
            elif t != t.lower():
                r.info("tag-case", n.rel, f"tag `{t}` is not lowercase")

    # -- links -------------------------------------------------------------
    for n, target in v.broken:
        r.error("broken-link", n.rel, f"[[{target}]] resolves to nothing",
                "create the note, fix the spelling, or add an alias to the intended target")

    for n in v.notes:
        for edge, target, _ in n.typed:
            if edge not in EDGE_TYPES:
                r.error("bad-edge-type", n.rel, f"`{edge}::` is not in the SCHEMA.md §6 vocabulary")

    # one-way typed edges (SCHEMA.md: "a one-way edge is half an edge")
    typed_pairs: dict[tuple[str, str], set[str]] = defaultdict(set)
    for n in v.notes:
        for edge, raw, _ in n.typed:
            hit = v.resolve(raw)
            if hit and hit is not n:
                typed_pairs[(n.node_id, hit.node_id)].add(edge)

    INVERSE = {
        "supports": "supports", "depends-on": "uses", "uses": "depends-on",
        "instance-of": "part-of", "part-of": "instance-of",
        "supersedes": "supersedes", "caused": "caused", "authored-by": "authored-by",
        "mentioned-in": "mentioned-in",
    }
    for (a, b), edges in typed_pairs.items():
        back = typed_pairs.get((b, a), set())
        for e in edges:
            if e in SYMMETRIC_EDGES and e not in back:
                r.warn("one-way-symmetric", v.by_id[a].rel,
                       f"`{e}:: [[{v.by_id[b].title}]]` is not mirrored back",
                       f"add `{e}:: [[{v.by_id[a].title}]]` to {v.by_id[b].rel}")
            elif e in ("part-of", "instance-of", "depends-on") and not back:
                # Only structural edges genuinely want an inverse. Flagging every
                # `supports`/`uses` would bury the real findings in advice.
                if v.by_id[a].node_id not in v.by_id[b].out_ids:
                    r.info("no-backlink", v.by_id[a].rel,
                           f"`{e}:: [[{v.by_id[b].title}]]` — the target links back in no way at all",
                           f"consider `{INVERSE.get(e, 'related')}::` on {v.by_id[b].rel}")

    # -- graph structure ---------------------------------------------------
    for n in v.orphans():
        if n.type == "map":
            continue  # MOCs are entry points; nothing links to them by design
        r.warn("orphan", n.rel, "Nothing links here — invisible to graph traversal",
               "link it from a MOC or a related concept")
    for n in v.sinks():
        r.warn("sink", n.rel, "No outbound links — a dead end in the graph",
               "add typed links per SCHEMA.md §6")

    comps = v.clusters()
    if len(comps) > 1:
        for c in comps[1:]:
            if len(c) >= 2:
                r.info("island", c[0].rel,
                       f"Disconnected cluster of {len(c)} notes: "
                       + ", ".join(x.title for x in c[:5]) + ("…" if len(c) > 5 else ""),
                       "find a bridge note linking it to the main body")

    # -- lifecycle ---------------------------------------------------------
    for n in v.notes:
        if n.folder == "_root":
            continue
        if n.status == "superseded" and not n.meta.get("superseded_by"):
            r.error("superseded-no-target", n.rel,
                    "`status: superseded` but no `superseded_by`",
                    "point at the replacement — SCHEMA.md §9")
        if n.is_stale:
            r.warn("stale", n.rel,
                   f"Last reviewed {n.days_since_review}d ago; {n.tier} half-life is "
                   f"{TIER_HALFLIFE[n.tier]}d",
                   "re-verify and bump `reviewed`, or lower `confidence`")
        if n.folder == "inbox":
            r.warn("inbox-resident", n.rel, "Still in the inbox — working memory should be emptied",
                   "file it into literature/concepts/entities, or discard it")

    # -- claims ------------------------------------------------------------
    for n in v.notes:
        # Procedures state steps, maps state navigation, questions state uncertainty —
        # none of them are making sourced factual claims.
        if n.type in ("map", "journal", "capture", "question", "procedure"):
            continue
        # An explicit inference marker is valid provenance (SCHEMA.md §7); a bare
        # unmarked claim is not.
        unsourced = [c for c in n.claims if not c["source"] and not c.get("inferred")]
        if n.claims and len(unsourced) == len(n.claims) and not n.sources:
            r.warn("unsourced-page", n.rel,
                   f"{len(unsourced)} claims, none with a source or inference marker",
                   "add `— source: `sources/file.md``, or mark it as your own inference")
        elif len(unsourced) > 3:
            r.info("unsourced-claims", n.rel,
                   f"{len(unsourced)} of {len(n.claims)} claims lack a source or inference marker")

    # -- duplicates --------------------------------------------------------
    seen = [n for n in v.notes if n.folder not in ("_root", "journal")]
    for i, a in enumerate(seen):
        for b in seen[i + 1:]:
            if a.folder != b.folder and a.type != b.type:
                continue
            ratio = SequenceMatcher(None, a.title.lower(), b.title.lower()).ratio()
            if ratio > 0.86:
                r.warn("near-duplicate", a.rel,
                       f"Title is {ratio:.0%} similar to {b.rel} ({b.title!r})",
                       "merge them and leave a redirect, or differentiate the titles")

    # -- coverage ----------------------------------------------------------
    for p in v.unreferenced_sources():
        r.warn("uningested-source", p.relative_to(v.root).as_posix(),
               "Source file is not referenced by any wiki page",
               "run an ingest, or record why it was skipped")

    # -- size --------------------------------------------------------------
    for n in v.notes:
        lines = n.body.count("\n") + 1
        if lines > 400:
            r.warn("oversized", n.rel, f"{lines} lines — past the ~400 ceiling",
                   "split it and leave a MOC behind")

    # -- MOC coverage ------------------------------------------------------
    tag_counts = Counter()
    for n in v.notes:
        for t in n.tags:
            tag_counts[t.split("/")[0]] += 1
    # A cluster is covered if a MOC carries that tag root, or names it.
    maps = {n.title.lower() for n in v.notes if n.type == "map"}
    map_roots = {t.split("/")[0].lower() for n in v.notes if n.type == "map" for t in n.tags}
    for tag, c in tag_counts.items():
        if c >= 7 and tag.lower() not in map_roots and not any(tag.lower() in m for m in maps):
            r.info("missing-moc", f"tag:{tag}",
                   f"{c} notes tagged `{tag}/…` with no Map of Content",
                   f"create wiki/maps/{tag.title()}.md — SCHEMA.md §8")

    return r


# ---------------------------------------------------------------------------

LEVEL_STYLE = {"error": ("✗", "\033[31m"), "warn": ("!", "\033[33m"), "info": ("·", "\033[36m")}
RESET = "\033[0m"


def render(r: Report, v: Vault, color: bool) -> str:
    def paint(s: str, c: str) -> str:
        return f"{c}{s}{RESET}" if color else s

    out = ["", f"  Vault lint — {len(v.notes)} notes, {len(v.edges())} links, "
               f"{len(v.clusters())} cluster(s)", ""]

    by_level = defaultdict(list)
    for i in r.items:
        by_level[i["level"]].append(i)

    for level in ("error", "warn", "info"):
        items = by_level[level]
        if not items:
            continue
        mark, col = LEVEL_STYLE[level]
        out.append(paint(f"  {level.upper()}  ({len(items)})", col))
        by_code = defaultdict(list)
        for i in items:
            by_code[i["code"]].append(i)
        for code in sorted(by_code):
            group = by_code[code]
            out.append(f"    {paint(mark, col)} {code}  ({len(group)})")
            for i in group[:8]:
                out.append(f"        {i['where']}")
                out.append(f"          {i['message']}")
                if i["fix"]:
                    out.append(f"          → {i['fix']}")
            if len(group) > 8:
                out.append(f"        … and {len(group) - 8} more")
        out.append("")

    e, w = r.count("error"), r.count("warn")
    if not r.items:
        out.append(paint("  Clean. Nothing mechanical to fix.", "\033[32m"))
    else:
        out.append(f"  {e} error(s), {w} warning(s), {r.count('info')} note(s)")
        out.append("")
        out.append("  Mechanical checks only. Still needs your judgment (AGENTS.md §3):")
        out.append("    merging near-duplicates · splitting overgrown pages ·")
        out.append("    resolving contradictions · promoting tiers")
    out.append("")
    return "\n".join(out)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", type=Path, default=None)
    ap.add_argument("--json", action="store_true", help="machine-readable output")
    ap.add_argument("--strict", action="store_true", help="exit 1 if any error is found")
    ap.add_argument("--no-color", action="store_true")
    args = ap.parse_args()

    v = Vault(args.root or find_root()).load()
    r = lint(v)

    if args.json:
        print(json.dumps({
            "summary": {
                "notes": len(v.notes), "edges": len(v.edges()), "clusters": len(v.clusters()),
                "errors": r.count("error"), "warnings": r.count("warn"), "info": r.count("info"),
            },
            "findings": r.items,
        }, indent=2))
    else:
        print(render(r, v, color=not args.no_color and sys.stdout.isatty()))

    return 1 if (args.strict and r.count("error")) else 0


if __name__ == "__main__":
    raise SystemExit(main())
