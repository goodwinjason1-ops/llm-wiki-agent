#!/usr/bin/env python3
"""Repair mechanical damage in the vault.

    python3 00_System/Scripts/vault_repair.py             # dry run — shows the diff
    python3 00_System/Scripts/vault_repair.py --apply

Three repairs, all mechanical and reversible via git:

1. **index.md line joins.** Something appending to `index.md` writes `||` where a
   newline belongs, producing lines up to 3,825 characters that Obsidian renders
   as one unreadable run. Splits them back into list items.

2. **`type:` vocabulary.** `SCHEMA.md` declares 8 types; the vault contains 157
   distinct values, including six pairs that differ only by underscore vs hyphen
   (`source_summary` 32 notes, `source-summary` 13 notes). Any Dataview query
   filtering on type silently misses half its data. Normalises every value to
   lowercase-hyphenated form and folds known synonyms together.

3. **Frontmatter gaps.** Reports notes with no frontmatter at all. Does not
   invent values — a fabricated `created` date is worse than a missing one.
"""

from __future__ import annotations

import argparse
import re
import sys
from collections import Counter
from difflib import get_close_matches
from pathlib import Path

SKIP_DIRS = {".git", ".obsidian", ".claude", ".stfolder", ".venv", "node_modules",
             "__pycache__", ".pytest_cache"}

FM = re.compile(r"\A(---\r?\n)(.*?)(\r?\n---\s*?\r?\n)", re.DOTALL)
TYPE_LINE = re.compile(r"^(type:\s*)(.+?)\s*$", re.MULTILINE)
WIKILINK = re.compile(r"(!?)\[\[([^\]\[|#^]+)((?:[#|][^\]\[]*)?)\]\]")

# `[[price,qty]]` and `[[morning_quant_brief.py]]` are code and filenames that
# happen to use bracket syntax. Counting them as broken links buries the real ones.
def is_codeish(target: str) -> bool:
    t = target.strip()
    return ("," in t or "=" in t or t.endswith((".py", ".json", ".js", ".sh", ".csv"))
            or (" " not in t and "_" in t and "-" not in t))

# Values that mean the same thing. Left side is already lowercase-hyphenated.
SYNONYMS = {
    "source-summary": "source-summary",
    "sourcesummary": "source-summary",
    "source-review": "source-summary",
    "raw-transcript": "raw-transcript",
    "transcript": "raw-transcript",
    "raw-source": "raw-source",
    "raw-web-extract": "raw-source",
    "raw-extract": "raw-source",
    "backtest-evidence": "backtest-evidence",
    "quant-backtest": "backtest-evidence",
    "research-note": "research-note",
    "source-inventory": "source-inventory",
    "daily-brief": "daily-brief",
    "dashboard": "dashboard",
    "workflow": "workflow",
    "skill": "skill",
    "template": "template",
    "project": "project",
    "project-context": "project-context",
    "concept": "concept",
    "entity": "entity",
    "comparison": "comparison",
    "query": "query",
    "report": "report",
    "inbox": "inbox",
    "system": "system",
}


def iter_notes(root: Path):
    for p in sorted(root.rglob("*.md")):
        rel = p.relative_to(root)
        if any(part in SKIP_DIRS or part.startswith(".") for part in rel.parts):
            continue
        yield p, rel


def canon(value: str) -> str:
    v = value.strip().strip("\"'").lower().replace("_", "-")
    v = re.sub(r"\s+", "-", v)
    return SYNONYMS.get(v, v)


def fix_index(text: str) -> tuple[str, int]:
    """Split `||`-joined entries back onto their own lines."""
    n = text.count("||")
    if not n:
        return text, 0
    out = text.replace("||- ", "\n- ").replace("||-", "\n-").replace("||", "\n")
    out = re.sub(r"\n{3,}", "\n\n", out)
    return out, n


def fix_links(root: Path, apply: bool) -> None:
    """Repair wikilinks that miss an existing note by a hair.

    `[[… - Source Reviews - 2026-07-14]]` where the file is `Source Review`, or
    `- 2026-07-13` where it is `- 2026-07-14`. Only rewrites when exactly one
    candidate clears a high similarity bar, because a confident wrong rewrite
    silently points a note at the wrong neighbour.
    """
    stems = {}
    for p, rel in iter_notes(root):
        stems.setdefault(p.stem.lower(), p.stem)

    fixed = unfixable = skipped = 0
    needs_review: list[tuple[str, str, str]] = []
    for p, rel in iter_notes(root):
        try:
            text = original = p.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            continue

        def repl(m):
            nonlocal fixed, unfixable, skipped
            target = m.group(2).strip()
            key = target.rsplit("/", 1)[-1].removesuffix(".md").lower()
            if key in stems:
                return m.group(0)
            if is_codeish(target):
                skipped += 1
                return m.group(0)
            cand = get_close_matches(key, list(stems), n=2, cutoff=0.92)
            if len(cand) == 1:
                # Never auto-fix across a digit change. `QTF-V07 …` and `QTF-V05 …`
                # are 96% similar and are different strategies; rewriting one to the
                # other silently corrupts provenance. Dates carry the same risk.
                # Punctuation and word-form typos are safe; version and date drift
                # is a human's call.
                if re.findall(r"\d+", key) != re.findall(r"\d+", cand[0]):
                    needs_review.append((rel.as_posix(), target, stems[cand[0]]))
                    return m.group(0)
                fixed += 1
                print(f"    {rel}")
                print(f"      [[{target}]] -> [[{stems[cand[0]]}]]")
                return f"{m.group(1)}[[{stems[cand[0]]}]]" if not m.group(3) \
                    else f"{m.group(1)}[[{stems[cand[0]]}{m.group(3)}]]"
            unfixable += 1
            return m.group(0)

        text = WIKILINK.sub(repl, text)
        if apply and text != original:
            p.write_text(text, encoding="utf-8")

    if needs_review:
        print(f"\n  NEEDS A HUMAN — close match, but the version or date differs, so an\n"
              f"  automatic rewrite could point the note at the wrong neighbour:")
        for rel, target, cand in needs_review:
            print(f"    {rel}")
            print(f"      [[{target}]]  ~  [[{cand}]]  ?")

    print(f"\n  links: {fixed} repaired, {len(needs_review)} need a human, "
          f"{unfixable} point at notes that do not exist, {skipped} ignored as code")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", type=Path, default=Path.cwd())
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--fix-links", action="store_true",
                    help="also repair near-miss wikilinks")
    args = ap.parse_args()
    root = args.root.resolve()

    # -- 1. index.md ------------------------------------------------------
    idx = root / "index.md"
    joins = 0
    if idx.is_file():
        text = idx.read_text(encoding="utf-8")
        fixed, joins = fix_index(text)
        before_max = max((len(l) for l in text.splitlines()), default=0)
        after_max = max((len(l) for l in fixed.splitlines()), default=0)
        if joins:
            print(f"  index.md — {joins} '||' join(s); longest line "
                  f"{before_max} -> {after_max} chars")
            if args.apply:
                idx.write_text(fixed, encoding="utf-8")
        else:
            print("  index.md — clean")

    # -- 2. type vocabulary ------------------------------------------------
    before, after, changed, nofm = Counter(), Counter(), [], []
    for p, rel in iter_notes(root):
        try:
            text = p.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            continue
        m = FM.match(text)
        if not m:
            nofm.append(rel.as_posix())
            continue
        head = m.group(2)
        tm = TYPE_LINE.search(head)
        if not tm:
            continue
        old = tm.group(2).strip()
        new = canon(old)
        before[old] += 1
        after[new] += 1
        if new != old:
            changed.append((rel.as_posix(), old, new))
            if args.apply:
                nh = head[:tm.start(2)] + new + head[tm.end(2):]
                p.write_text(m.group(1) + nh + m.group(3) + text[m.end():], encoding="utf-8")

    print(f"\n  type: values  {len(before)} distinct -> {len(after)} distinct "
          f"({len(changed)} note(s) rewritten)")

    collisions = Counter()
    for v in before:
        collisions[canon(v)] += 1
    merged = {k: c for k, c in collisions.items() if c > 1}
    if merged:
        print("\n  merged variants:")
        for k, c in sorted(merged.items(), key=lambda kv: -kv[1])[:12]:
            variants = sorted(v for v in before if canon(v) == k)
            print(f"    {k:<22} <- {', '.join(variants)}  ({sum(before[v] for v in variants)} notes)")

    if nofm:
        print(f"\n  {len(nofm)} note(s) with no frontmatter (not auto-filled — "
              f"a fabricated date is worse than a missing one):")
        for f in nofm[:8]:
            print(f"    {f}")
        if len(nofm) > 8:
            print(f"    … and {len(nofm) - 8} more")

    if args.fix_links:
        print("\n  Near-miss wikilinks:")
        fix_links(root, args.apply)

    if not args.apply:
        print("\n  Dry run. Nothing written. Re-run with --apply.\n")
    else:
        print("\n  Applied.\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
