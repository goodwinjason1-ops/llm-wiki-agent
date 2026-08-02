#!/usr/bin/env python3
"""Vault health scoreboard.

    python3 00_System/Scripts/vault_health.py            # print the scorecard
    python3 00_System/Scripts/vault_health.py --record   # also append to the trend file
    python3 00_System/Scripts/vault_health.py --json

WHY THIS EXISTS
---------------
Synthesis stalled in this vault for three weeks and nothing signalled it, because
the only numbers anyone could see were folder counts — and folder counts rise
whether or not the vault is getting smarter. Capture produces immediate visible
feedback; synthesis produces none until you need an answer and find you only have
sources.

This is the missing instrument. It measures whether captured material is turning
into understanding, and it fails loudly when it isn't.

The headline metric is the **synthesis ratio**: concept pages per source summary.
- Below 0.10 — capture is outrunning synthesis. This vault sat at 0.06.
- 0.10–0.40 — healthy. Several sources converge into each concept.
- Above 0.60 — probably filing, not synthesising: roughly one concept per source
  means you are renaming summaries rather than abstracting across them.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

SKIP_DIRS = {".git", ".obsidian", ".claude", ".stfolder", ".venv", "node_modules",
             "__pycache__", ".pytest_cache", "Implementation"}
FM = re.compile(r"\A---\r?\n(.*?)\r?\n---", re.DOTALL)
WIKILINK = re.compile(r"!?\[\[([^\]\[|#^]+)")
DATE_MARK = re.compile(r"\d{4}[-_]\d{2}[-_]\d{2}|\blatest\b", re.IGNORECASE)

RAW, SRC, WIKI, INBOX = "02_Raw", "03_Sources", "04_Wiki", "01_Inbox"


def load(root: Path):
    notes = {}
    for p in sorted(root.rglob("*.md")):
        rel = p.relative_to(root)
        if any(part in SKIP_DIRS or part.startswith(".") for part in rel.parts):
            continue
        try:
            text = p.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        notes[rel.as_posix()] = {
            "stem": p.stem, "text": text, "fm": bool(FM.match(text)),
            "top": rel.parts[0] if len(rel.parts) > 1 else "(root)",
            "links": [m.group(1).strip().rsplit("/", 1)[-1].removesuffix(".md").lower()
                      for m in WIKILINK.finditer(text)],
        }
    return notes


# Generated inventories list every note they are reporting on. Counting their
# links as inbound edges means the act of *reporting* an orphan un-orphans it —
# the Unlinked Notes Review alone moved the orphan rate from 16% to 10% without
# a single real connection being made. Their links still count as outbound for
# the report itself; they just cannot rescue their subjects.
INVENTORY_MARKERS = ("Unlinked Notes Review", "Missed Connections Review",
                     "Inbox Processor Report", "Vault Loop Report")


def is_inventory(key: str) -> bool:
    return any(m in key for m in INVENTORY_MARKERS)


def build_graph(notes):
    by_stem = defaultdict(list)
    for k, n in notes.items():
        by_stem[n["stem"].lower()].append(k)
    out = {k: set() for k in notes}
    inn = {k: set() for k in notes}
    broken = 0
    for k, n in notes.items():
        inventory = is_inventory(k)
        for t in n["links"]:
            hits = by_stem.get(t)
            if not hits:
                broken += 1
                continue
            for h in hits:
                if h != k:
                    out[k].add(h)
                    if not inventory:
                        inn[h].add(k)
    return out, inn, broken


def components(notes, out, inn):
    seen, comps = set(), 0
    for k in notes:
        if k in seen:
            continue
        comps += 1
        stack = [k]
        seen.add(k)
        while stack:
            cur = stack.pop()
            for nb in out[cur] | inn[cur]:
                if nb not in seen:
                    seen.add(nb)
                    stack.append(nb)
    return comps


def measure(root: Path) -> dict:
    notes = load(root)
    out, inn, broken = build_graph(notes)
    total = max(1, len(notes))

    def under(prefix):
        return [k for k in notes if k.startswith(prefix)]

    src = under(SRC)
    concepts = [k for k in notes if k.startswith(f"{WIKI}/concepts")]
    raw = under(RAW)
    inbox = under(INBOX)

    # A dead end is a note that links nowhere. Two populations are dead ends by
    # design rather than by neglect, and counting them made the gate unachievable:
    #
    #   02_Raw    is immutable by vault rule. Asking a raw capture to link out is
    #             asking for an edit the rules forbid. All 190 counted as failures.
    #   09_Archive is closed. Archived notes are history; nothing should be added.
    #
    # The gate now measures the *linkable* vault. The raw figure is still printed,
    # because hiding it would be the difference between fixing a measurement and
    # flattering one.
    linkable = [k for k in notes if not k.startswith((RAW, "09_Archive"))]
    linkable_dead = [k for k in linkable if not out[k]]

    src_to_wiki = sum(1 for k in src if any(t.startswith(WIKI) for t in out[k]))
    wiki_cited = sum(1 for k in concepts
                     if any(t.startswith((SRC, RAW)) for t in out[k])
                     or re.search(r"source:\s*`", notes[k]["text"]))

    # dated series whose consecutive members are near-identical in length
    series = defaultdict(list)
    for k, n in notes.items():
        if DATE_MARK.search(n["stem"]):
            series[DATE_MARK.sub("", n["stem"]).strip(" -_").lower()].append(k)
    stalled = 0
    for grp in series.values():
        if len(grp) < 3:
            continue
        lens = sorted(len(notes[k]["text"]) for k in grp)
        if lens[0] and (lens[-1] - lens[0]) / lens[-1] < 0.02:
            stalled += 1

    ratio = len(concepts) / max(1, len(src))
    return {
        "date": dt.date.today().isoformat(),
        "notes": len(notes),
        "links": sum(len(v) for v in out.values()),
        "raw": len(raw), "sources": len(src), "concepts": len(concepts),
        "synthesis_ratio": round(ratio, 3),
        "sources_linked_to_wiki": src_to_wiki,
        "sources_linked_pct": round(100 * src_to_wiki / max(1, len(src))),
        "concepts_citing_a_source": wiki_cited,
        "orphans": sum(1 for k in notes if not inn[k]),
        "orphans_pct": round(100 * sum(1 for k in notes if not inn[k]) / total),
        "dead_ends": sum(1 for k in notes if not out[k]),
        "dead_ends_pct": round(100 * sum(1 for k in notes if not out[k]) / total),
        "dead_ends_linkable": len(linkable_dead),
        "dead_ends_linkable_pct": round(100 * len(linkable_dead) / max(1, len(linkable))),
        "dead_ends_raw": sum(1 for k in raw if not out[k]),
        "components": components(notes, out, inn),
        "broken_links": broken,
        "no_frontmatter": sum(1 for n in notes.values() if not n["fm"]),
        "inbox_depth": len(inbox),
        "stalled_series": stalled,
    }


GATES = [
    ("synthesis_ratio",     lambda m: m["synthesis_ratio"] >= 0.10,
     lambda m: f"{m['synthesis_ratio']:.2f} concepts per source (want >= 0.10)"),
    ("sources reach wiki",  lambda m: m["sources_linked_pct"] >= 60,
     lambda m: f"{m['sources_linked_pct']}% of source summaries link into 04_Wiki (want >= 60%)"),
    ("concepts are sourced", lambda m: m["concepts"] == 0 or
                                       m["concepts_citing_a_source"] / m["concepts"] >= 0.9,
     lambda m: f"{m['concepts_citing_a_source']}/{m['concepts']} concepts cite a source (want >= 90%)"),
    ("orphans",             lambda m: m["orphans_pct"] <= 15,
     lambda m: f"{m['orphans_pct']}% of notes have no inbound link (want <= 15%)"),
    ("dead ends",           lambda m: m["dead_ends_linkable_pct"] <= 40,
     lambda m: f"{m['dead_ends_linkable_pct']}% of linkable notes have no outbound link "
               f"(want <= 40%) — {m['dead_ends_raw']} immutable 02_Raw captures excluded, "
               f"{m['dead_ends_pct']}% vault-wide"),
    ("inbox drained",       lambda m: m["inbox_depth"] <= 5,
     lambda m: f"{m['inbox_depth']} notes in 01_Inbox (want <= 5)"),
    ("no stalled generators", lambda m: m["stalled_series"] == 0,
     lambda m: f"{m['stalled_series']} dated series producing identical output (want 0)"),
    ("broken links",        lambda m: m["broken_links"] <= 10,
     lambda m: f"{m['broken_links']} unresolved wikilinks (want <= 10)"),
]


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", type=Path, default=Path.cwd())
    ap.add_argument("--record", action="store_true", help="append to 00_System/Reports/vault-health.md")
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    root = args.root.resolve()
    m = measure(root)
    if args.json:
        print(json.dumps(m, indent=2))
        return 0

    print(f"\n  Vault health — {m['date']}")
    print(f"  {m['notes']} notes · {m['links']} links · {m['components']} disconnected component(s)\n")
    print(f"  {'02_Raw':<22}{m['raw']:>6}")
    print(f"  {'03_Sources':<22}{m['sources']:>6}")
    print(f"  {'04_Wiki/concepts':<22}{m['concepts']:>6}   <- the synthesis layer\n")

    failed = 0
    for name, ok, msg in GATES:
        passed = ok(m)
        failed += not passed
        print(f"  [{'PASS' if passed else 'FAIL'}] {name:<24} {msg(m)}")

    print()
    if failed == 0:
        print("  All gates pass. Capture and synthesis are keeping pace.\n")
    else:
        print(f"  {failed} gate(s) failing.\n")
        if m["synthesis_ratio"] < 0.10:
            print("  The synthesis gate is the one that matters. Capture is outrunning")
            print("  understanding. Repayment is not more capture — take one cluster of")
            print("  source summaries, write the concept page they are all circling, cite")
            print("  each summary from it, and link back from each summary to it.\n")

    if m["no_frontmatter"]:
        print(f"  ({m['no_frontmatter']} note(s) have no frontmatter — not a gate, but they are "
              f"invisible to Dataview.)\n")

    if args.record:
        rep = root / "00_System" / "Reports" / "vault-health.md"
        rep.parent.mkdir(parents=True, exist_ok=True)
        if not rep.is_file():
            rep.write_text(
                "---\ntitle: Vault Health Trend\ntype: report\ntags: [second-brain, vault-health]\n"
                "confidence: high\n---\n\n# Vault Health Trend\n\n"
                "Appended by `00_System/Scripts/vault_health.py --record`.\n"
                "The synthesis ratio is the number to watch.\n\n"
                "| date | notes | sources | concepts | ratio | orphans% | dead ends% | components | inbox |\n"
                "|---|---|---|---|---|---|---|---|---|\n", encoding="utf-8")
        with rep.open("a", encoding="utf-8") as f:
            f.write(f"| {m['date']} | {m['notes']} | {m['sources']} | {m['concepts']} | "
                    f"{m['synthesis_ratio']:.3f} | {m['orphans_pct']} | {m['dead_ends_pct']} | "
                    f"{m['components']} | {m['inbox_depth']} |\n")
        print(f"  Recorded to {rep.relative_to(root)}\n")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
