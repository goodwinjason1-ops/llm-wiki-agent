#!/usr/bin/env python3
"""Work through the unlinked notes one at a time and file the links you accept.

    python 00_System\\Scripts\\apply_links.py --folder 05_Projects
    python 00_System\\Scripts\\apply_links.py --match "Source-to-System"
    python 00_System\\Scripts\\apply_links.py --undo 00_System/Reports/link-undo-<stamp>.json

For each unlinked note it shows the proposed targets and the vocabulary behind
them, and waits. You press a number to accept, `s` to skip, `q` to stop. Accepted
links are appended under a `## Related` heading in the note itself.

Design notes, because they are the difference between this being useful and being
another thing that writes noise into your vault:

- **Nothing is written until you say so.** There is no batch mode and no
  auto-accept flag. A link is a claim that two notes are about each other, and
  that judgement is the whole value of the exercise — automating it would
  reproduce the failure that put the vault here in the first place.
- **Every run writes an undo manifest.** `--undo` reverses a session exactly.
- **You can stop at any point.** Progress is saved as you go, and the next run
  picks up where you left off. Working 20 notes over a fortnight is a normal way
  to use this; sitting down to do 273 in one evening is not.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from connection_illuminator import build_vectors, load_notes  # noqa: E402
from link_suggester import (  # noqa: E402
    classify, inbound_map, resolved_out, suggest,
)

DEFAULT_ROOT = HERE.parent.parent
RELATED = re.compile(r"^##\s+Related\s*$", re.MULTILINE)


def append_link(path: Path, target: str) -> bool:
    """Add `- [[target]]` under a `## Related` heading, creating it if needed."""
    text = path.read_text(encoding="utf-8")
    if f"[[{target}]]" in text:
        return False
    m = RELATED.search(text)
    if m:
        end = text.find("\n##", m.end())
        end = len(text) if end == -1 else end
        block = text[m.end():end].rstrip()
        text = text[:m.end()] + block + f"\n- [[{target}]]\n" + text[end:]
    else:
        text = text.rstrip() + f"\n\n## Related\n\n- [[{target}]]\n"
    path.write_text(text, encoding="utf-8")
    return True


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", type=Path, default=None)
    ap.add_argument("--folder", help="only notes under this top-level folder")
    ap.add_argument("--match", help="only notes whose path contains this text")
    ap.add_argument("--min-sim", type=float, default=0.16)
    ap.add_argument("--top", type=int, default=3)
    ap.add_argument("--limit", type=int, default=0, help="stop after N notes")
    ap.add_argument("--undo", type=Path, help="reverse a previous session")
    args = ap.parse_args()

    root = (args.root or DEFAULT_ROOT).resolve()
    if args.undo:
        return undo(root, args.undo)

    notes = load_notes(root)
    vecs = build_vectors(notes)
    inn, out = inbound_map(notes), resolved_out(notes)

    queue = []
    for k in sorted(notes):
        folder = classify(k, notes[k]["stem"])
        if folder is None:
            continue
        if args.folder and folder != args.folder:
            continue
        if args.match and args.match.lower() not in k.lower():
            continue
        if inn.get(k) and out[k]:
            continue
        sug = suggest(k, notes, vecs, inn, out, args.top, args.min_sim)
        if sug:
            queue.append((k, sug))
    if args.limit:
        queue = queue[: args.limit]

    if not queue:
        print("\n  Nothing to review with those filters. Try a wider --folder or "
              "a lower --min-sim.\n")
        return 0

    print(f"\n  {len(queue)} note(s) to review."
          "\n  [1-9] accept that link · [a] accept all shown · [s] skip · [q] save and quit\n")

    applied: list[dict] = []
    for i, (k, sug) in enumerate(queue, 1):
        print("=" * 74)
        print(f"  ({i}/{len(queue)})  {notes[k]['stem']}")
        print(f"  {k}")
        preview = " ".join(notes[k]["text"].split())[:220]
        print(f"\n  {preview}…\n")
        for n, (other, s, shared) in enumerate(sug, 1):
            print(f"    [{n}] {notes[other]['stem']}")
            print(f"        {s:.0%} — {', '.join(shared)}")
        try:
            choice = input("\n  > ").strip().lower()
        except (EOFError, KeyboardInterrupt):
            print("\n  stopped.")
            break

        if choice == "q":
            break
        if choice in ("", "s"):
            continue
        picks = list(range(len(sug))) if choice == "a" else [
            int(c) - 1 for c in choice if c.isdigit() and 0 < int(c) <= len(sug)]
        for p in picks:
            target = notes[sug[p][0]]["stem"]
            if append_link(root / k, target):
                applied.append({"note": k, "target": target})
                print(f"      linked -> {target}")

    if not applied:
        print("\n  No links written.\n")
        return 0

    stamp = dt.datetime.now().strftime("%Y%m%dT%H%M%S")
    manifest = root / "00_System" / "Reports" / f"link-undo-{stamp}.json"
    manifest.parent.mkdir(parents=True, exist_ok=True)
    manifest.write_text(json.dumps(applied, indent=2), encoding="utf-8")
    print(f"\n  {len(applied)} link(s) written across "
          f"{len({a['note'] for a in applied})} note(s).")
    print(f"  undo: python 00_System/Scripts/apply_links.py --undo "
          f"{manifest.relative_to(root).as_posix()}\n")
    return 0


def undo(root: Path, manifest: Path) -> int:
    path = manifest if manifest.is_absolute() else root / manifest
    entries = json.loads(path.read_text(encoding="utf-8"))
    removed = 0
    for e in entries:
        f = root / e["note"]
        if not f.is_file():
            continue
        text = f.read_text(encoding="utf-8")
        line = f"- [[{e['target']}]]\n"
        if line in text:
            f.write_text(text.replace(line, "", 1), encoding="utf-8")
            removed += 1
    # Tidy any Related heading we emptied on the way out.
    for e in {x["note"] for x in entries}:
        f = root / e
        if f.is_file():
            t = f.read_text(encoding="utf-8")
            t2 = re.sub(r"\n\n## Related\n\n(?=\n*\Z)", "\n", t)
            if t2 != t:
                f.write_text(t2, encoding="utf-8")
    print(f"\n  removed {removed} link(s).\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
