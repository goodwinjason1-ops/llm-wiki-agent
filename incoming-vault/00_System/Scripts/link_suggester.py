#!/usr/bin/env python3
"""Find every unlinked note and propose where it belongs — by reading it.

    python 00_System\\Scripts\\link_suggester.py            # print the review
    python 00_System\\Scripts\\link_suggester.py --write     # also file it as a dashboard
    python 00_System\\Scripts\\link_suggester.py --min-sim 0.20

An unlinked note is one with no inbound links (nothing points at it), no outbound
links (it points nowhere), or neither. The graph knows they are unlinked. It does
not know *where they belong* — that needs the contents.

For each one this reads the body, builds a TF-IDF vector, and proposes the notes
it is actually about, with the shared vocabulary that justified each proposal. It
never writes a link. Every suggestion is a claim to be checked, and the shared
terms are printed precisely so a wrong one is obvious at a glance.

Two things it deliberately does not do:

- **Suggest a link back to the source of the suggestion.** A note is not related
  to itself, and near-duplicates are a merge decision, not a link decision — that
  is `connection_illuminator.py`'s job.
- **Rank by similarity alone.** A cross-folder match is worth more than another
  link inside a cluster that is already dense, so those are surfaced first.
"""

from __future__ import annotations

import argparse
import datetime as dt
import sys
from collections import Counter, defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from connection_illuminator import (  # noqa: E402
    build_vectors, cosine, load_notes, DATE_IN_NAME, series_key,
)

DEFAULT_ROOT = HERE.parent.parent

# Markup and tracking debris that survives a web capture. It is shared by any two
# scraped pages regardless of subject, so it produces confident-looking matches
# between notes that have nothing to do with each other — a daily update and a
# project context "matching" on favicon, apple-touch-icon and utm.
BOILERPLATE = {
    "favicon", "apple-touch-icon", "touch-icon", "svg", "png", "jpg", "jpeg",
    "webp", "gif", "css", "href", "viewport", "utm", "utm-tracked", "utm-source",
    "utm-medium", "utm-campaign", "stylesheet", "noscript", "iframe", "nav",
    "footer", "header", "sidebar", "breadcrumb", "cookie", "cookies", "gtag",
    "analytics", "pixel", "og-image", "twitter-card", "canonical", "rel",
    "alt", "src", "width", "height", "px", "rgba", "html", "xml", "json-ld",
}

# Immutable or closed by vault rule — an unlinked note here is not a defect.
EXEMPT = ("02_Raw/", "09_Archive/", "00_System/Templates/")

# Structural files that are unlinked by nature rather than by neglect.
STRUCTURAL = {"readme", "claude", "agents", "hermes", "index", "log", "schema",
              "license", "contributing"}


def inbound_map(notes: dict) -> dict[str, set[str]]:
    by_stem = defaultdict(set)
    for k, n in notes.items():
        by_stem[n["stem"].lower()].add(k)
    inn = defaultdict(set)
    for k, n in notes.items():
        for target in n["links"]:
            for hit in by_stem.get(target, ()):
                if hit != k:
                    inn[hit].add(k)
    return inn


def resolved_out(notes: dict) -> dict[str, set[str]]:
    """Outbound links that actually land on a note. A link to a page that was
    never written is a promise, not a connection, so it does not count here."""
    stems = {n["stem"].lower() for n in notes.values()}
    return {k: {t for t in n["links"] if t in stems and t != n["stem"].lower()}
            for k, n in notes.items()}


def classify(path: str, stem: str) -> str | None:
    if path.startswith(EXEMPT):
        return None
    if stem.lower() in STRUCTURAL:
        return None
    return path.split("/")[0] if "/" in path else "(root)"


def suggest(key: str, notes: dict, vecs: dict, inn: dict, out: dict,
            top: int, min_sim: float) -> list[tuple[str, float, list[str]]]:
    me = {t: w for t, w in (vecs.get(key) or {}).items() if t not in BOILERPLATE}
    if not me:
        return []
    mine = notes[key]
    already = out[key] | {notes[o]["stem"].lower() for o in inn.get(key, ())}
    my_series = series_key(mine["stem"])
    scored = []
    for other, v in vecs.items():
        if other == key or not v:
            continue
        o = notes[other]
        if o["stem"].lower() in already:
            continue
        # A dated note pointing at yesterday's copy of itself is not a connection
        # you were missing. The whole series moves together or not at all.
        if my_series and series_key(o["stem"]) == my_series:
            continue
        v = {t: w for t, w in v.items() if t not in BOILERPLATE}
        if not v:
            continue
        s = cosine(me, v)
        if s < min_sim:
            continue
        # Near-identical is a merge question, not a link question.
        if s > 0.85:
            continue
        # A link that leaves its own folder is worth more than one that stays.
        weight = s * (1.25 if o["folder"] != mine["folder"] else 1.0)
        # Prefer a note that is already well connected: linking into a hub puts
        # this note on the map, linking to another orphan just pairs two ghosts.
        if inn.get(other):
            weight *= 1.15
        shared = sorted((set(me) & set(v)),
                        key=lambda t: -(me[t] * v[t]))[:5]
        scored.append((other, s, weight, shared))
    scored.sort(key=lambda r: -r[2])
    return [(o, s, sh) for o, s, _, sh in scored[:top]]


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", type=Path, default=None)
    ap.add_argument("--min-sim", type=float, default=0.16)
    ap.add_argument("--top", type=int, default=3, help="suggestions per note")
    ap.add_argument("--folder", help="only notes under this top-level folder")
    ap.add_argument("--write", action="store_true",
                    help="file the review as a dashboard note")
    args = ap.parse_args()

    root = (args.root or DEFAULT_ROOT).resolve()
    notes = load_notes(root)
    vecs = build_vectors(notes)
    inn = inbound_map(notes)
    out = resolved_out(notes)

    rows = []
    for k in sorted(notes):
        folder = classify(k, notes[k]["stem"])
        if folder is None:
            continue
        if args.folder and folder != args.folder:
            continue
        has_in, has_out = bool(inn.get(k)), bool(out[k])
        if has_in and has_out:
            continue
        kind = ("isolated" if not has_in and not has_out
                else "no inbound" if not has_in else "no outbound")
        rows.append((k, folder, kind, suggest(k, notes, vecs, inn, out,
                                              args.top, args.min_sim)))

    with_ideas = [r for r in rows if r[3]]
    without = [r for r in rows if not r[3]]

    by_folder = Counter(r[1] for r in rows)
    print(f"\n  {len(notes)} notes scanned · {len(rows)} unlinked "
          f"({len(with_ideas)} with a suggestion, {len(without)} without)")
    print("  02_Raw, 09_Archive and Templates excluded — unlinked there is by design.\n")
    for f, c in by_folder.most_common():
        print(f"    {f:<26}{c}")

    print("\n" + "=" * 74)
    print("  UNLINKED, WITH A PROPOSED HOME")
    print("=" * 74)
    cur = None
    for k, folder, kind, sug in with_ideas:
        if folder != cur:
            cur = folder
            print(f"\n  --- {folder} " + "-" * (64 - len(folder)))
        print(f"\n  {notes[k]['stem']}   [{kind}]")
        print(f"    {k}")
        for other, s, shared in sug:
            print(f"      -> [[{notes[other]['stem']}]]  ({s:.0%}: {', '.join(shared)})")

    print("\n" + "=" * 74)
    print("  UNLINKED, NOTHING PROPOSED — these are the cull candidates")
    print("=" * 74)
    cur = None
    for k, folder, kind, _ in without:
        if folder != cur:
            cur = folder
            print(f"\n  --- {folder} " + "-" * (64 - len(folder)))
        dated = " (dated)" if DATE_IN_NAME.search(notes[k]["stem"]) else ""
        size = len(notes[k]["text"].split())
        print(f"    {k}   [{kind}, {size} words]{dated}")

    if args.write:
        path = write_dashboard(root, notes, with_ideas, without)
        print(f"\n  filed: {path.relative_to(root).as_posix()}")
    else:
        print("\n  Nothing written. Re-run with --write to file this as a dashboard.\n")
    return 0


def write_dashboard(root: Path, notes: dict, with_ideas: list, without: list) -> Path:
    today = dt.date.today().isoformat()
    out = root / "00_System" / "Dashboards" / f"Unlinked Notes Review - {today}.md"
    out.parent.mkdir(parents=True, exist_ok=True)

    L = [
        "---", f"title: Unlinked Notes Review - {today}", f"created: {today}",
        f"updated: {today}", "type: dashboard",
        "tags: [second-brain, vault-health, connections]", "confidence: medium",
        "---", "",
        f"# Unlinked Notes Review — {today}", "",
        f"{len(with_ideas) + len(without)} notes have no inbound links, no outbound",
        "links, or neither. `02_Raw`, `09_Archive` and `00_System/Templates` are",
        "excluded — unlinked there is by design, not neglect.", "",
        "Every suggestion below comes from the note's **contents**, not its title.",
        "The shared terms are printed so a wrong suggestion is obvious. Nothing here",
        "has been applied; adding a link is a judgement, and a wrong link is worse",
        "than a missing one.", "",
        "## Has a proposed home", "",
    ]
    cur = None
    for k, folder, kind, sug in with_ideas:
        if folder != cur:
            cur, _ = folder, L.append(f"### {folder}\n")
        L.append(f"**{notes[k]['stem']}** — *{kind}*  ")
        L.append(f"`{k}`  ")
        for other, s, shared in sug:
            L.append(f"- → [[{notes[other]['stem']}]] — {s:.0%}: {', '.join(shared)}")
        L.append("")

    L += ["## Nothing proposed — cull candidates", "",
          "No note in the vault shares enough vocabulary with these to justify a",
          "link. That usually means one of three things: the note is a stub, it is",
          "genuinely off-topic for this vault, or it is the first of a subject you",
          "have not written about yet. The third is worth keeping.", ""]
    cur = None
    for k, folder, kind, _ in without:
        if folder != cur:
            cur, _ = folder, L.append(f"### {folder}\n")
        size = len(notes[k]["text"].split())
        L.append(f"- `{k}` — *{kind}*, {size} words")
    L += ["", "## Links", "", "- [[connection-illumination]]",
          "- [[Second Brain Self-Improvement Loop]]", "- [[synthesis-debt]]", ""]
    out.write_text("\n".join(L), encoding="utf-8")
    return out


if __name__ == "__main__":
    raise SystemExit(main())
