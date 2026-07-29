#!/usr/bin/env python3
"""Connection illuminator — replacement for the original.

    python3 00_System/Scripts/connection_illuminator.py            # report only
    python3 00_System/Scripts/connection_illuminator.py --write    # also file the review
    python3 00_System/Scripts/connection_illuminator.py --reset    # forget suggestion history

WHY THIS WAS REWRITTEN
----------------------
The previous version matched notes on raw shared vocabulary with no stopword
filter and no rarity weighting, so its "shared terms" were words like
`access, across, actions, against, agent` — common English, listed
alphabetically. It also had no memory, so it re-proposed the same handful of
links every single day.

Measured over its 23 filed reviews: 89 suggestions, 32 distinct, 2 acted on.
A tool with a 6% action rate is not a tool, it is a daily interruption. The
fixes here are aimed squarely at that:

1. **Stopwords + TF-IDF.** Terms are weighted by rarity across the corpus.
   A word appearing in half the vault carries no signal and is dropped.
2. **Memory.** Every suggestion is recorded in `.connection_state.json`. A pair
   is never proposed twice. Acting on it, or dismissing it, both retire it.
3. **Duplicate detection as its own category.** The old version once asked
   whether `AI Backtesting...VDpTU5kdj8A` should be "connected to"
   `ai-backtesting-...-VDpTU5kdj8A`. Those are the same source under two naming
   conventions. That is a merge, not a link, and it now says so.
4. **Series suppression.** `Morning Brief - 2026-07-21` and
   `Morning Brief - 2026-07-22` are trivially similar and linking them is
   noise. Notes in the same dated series are excluded from each other.
5. **Cross-domain analogies ranked first.** Two notes in the same folder being
   similar is unremarkable. Two notes in *different* folders sharing rare
   vocabulary is the connection worth a human's attention.
6. **A cap.** At most `--top` suggestions per run. An unbounded list is a list
   nobody reads.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import math
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

STOP = set("""
a an the and or but if then else when while of in on at to from by for with without
about into over under again further once here there all any both each few more most
other some such no nor not only own same so than too very can will just is are was
were be been being have has had do does did doing this that these those it its as
i you he she they we them his her their our your my me us who whom which what where
how why because although however therefore thus also may might must should would could
via per vs etc within across between during before after above below up down out off
through use used using make makes made get gets got new now one two three first second
like well back even still way take see look come think know time year day today
note notes page pages file files vault source sources link links added update updated
created review reviews summary content section based following include includes
""".split())

TOKEN = re.compile(r"[a-z][a-z0-9'-]{2,}")
FM = re.compile(r"\A---\r?\n(.*?)\r?\n---", re.DOTALL)
WIKILINK = re.compile(r"!?\[\[([^\]\[|#^]+)")
DATE_IN_NAME = re.compile(r"\d{4}[-_]\d{2}[-_]\d{2}|\d{8}T\d{6}Z")

SKIP_DIRS = {".git", ".obsidian", ".claude", ".stfolder", ".venv", "node_modules",
             "__pycache__", ".pytest_cache", "Implementation"}
STATE_FILE = ".connection_state.json"


# ---------------------------------------------------------------------------

def load_notes(root: Path) -> dict[str, dict]:
    notes = {}
    for p in sorted(root.rglob("*.md")):
        rel = p.relative_to(root)
        if any(part in SKIP_DIRS or part.startswith(".") for part in rel.parts):
            continue
        if "Missed Connections Review" in p.name:
            continue          # never mine our own output
        try:
            text = p.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        body = FM.sub("", text)
        notes[rel.as_posix()] = {
            "path": rel.as_posix(),
            "stem": p.stem,
            "folder": rel.parts[0] if len(rel.parts) > 1 else "(root)",
            "text": body,
            "links": {m.group(1).strip().rsplit("/", 1)[-1].removesuffix(".md").lower()
                      for m in WIKILINK.finditer(text)},
        }
    return notes


def tokenize(text: str, stem: str) -> Counter:
    text = re.sub(r"```.*?```", " ", text, flags=re.DOTALL)
    text = re.sub(r"`[^`\n]*`", " ", text)
    text = re.sub(r"https?://\S+", " ", text)
    text = re.sub(r"\b[0-9a-f]{16,}\b", " ", text)     # hashes carry no meaning
    toks = [t for t in TOKEN.findall(text.lower()) if t not in STOP]
    toks += [t for t in TOKEN.findall(stem.lower().replace("-", " ")) if t not in STOP] * 3
    return Counter(toks)


def build_vectors(notes: dict) -> dict[str, dict[str, float]]:
    tfs, df = {}, Counter()
    for k, n in notes.items():
        tf = tokenize(n["text"], n["stem"])
        tfs[k] = tf
        df.update(tf.keys())
    total = max(1, len(tfs))
    vecs = {}
    for k, tf in tfs.items():
        if not tf:
            vecs[k] = {}
            continue
        peak = max(tf.values())
        v = {}
        for term, c in tf.items():
            # Too rare to generalise, or too common to discriminate.
            if df[term] < 2 or df[term] > total * 0.4:
                continue
            v[term] = (0.5 + 0.5 * c / peak) * math.log(total / df[term])
        norm = math.sqrt(sum(x * x for x in v.values())) or 1.0
        vecs[k] = {t: x / norm for t, x in v.items()}
    return vecs


def cosine(a: dict, b: dict) -> float:
    if len(a) > len(b):
        a, b = b, a
    return sum(w * b.get(t, 0.0) for t, w in a.items())


SERIES_MARKER = re.compile(
    r"\d{4}[-_]\d{2}[-_]\d{2}|\d{8}T\d{6}Z|\blatest\b|\bcurrent\b|\btoday\b", re.IGNORECASE)


def series_key(stem: str) -> str | None:
    """Members of one dated series share a key.

    `Morning Brief - 2026-07-21` and `Morning Brief - Latest` both reduce to
    `morning brief`, so they stop being proposed as connections to each other.
    """
    s = SERIES_MARKER.sub(" ", stem)
    s = re.sub(r"[-_\s]+", " ", s).strip(" -_").lower()
    return s if s and s != stem.strip().lower() else None


def title_key(stem: str) -> str:
    """Identity of a note ignoring naming *convention* but NOT its date.

    `AI Backtesting ... - YouTube VDpTU5kdj8A` and
    `ai-backtesting-...-VDpTU5kdj8A` collapse together — same source, two
    conventions. But `Report - 2026-07-11` and `Report - 2026-07-13` must not:
    they are a series, and merging them would destroy the record.
    """
    s = re.sub(r"[-_]", " ", stem).lower()
    for w in ("youtube", "source review", "source summary", "capture", "review", "source"):
        s = s.replace(w, " ")
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    # Keep short numeric tokens: "09" vs "10" is what distinguishes two days of
    # the same report, and dropping them merges a whole series into one note.
    return " ".join(sorted(set(w for w in s.split() if len(w) > 2 or w.isdigit())))


# ---------------------------------------------------------------------------

def analyse(notes: dict, seen: set, top: int, min_sim: float) -> dict:
    vecs = build_vectors(notes)
    keys = list(notes)
    linked = set()
    for k, n in notes.items():
        for other in keys:
            if notes[other]["stem"].lower() in n["links"]:
                linked.add(frozenset((k, other)))

    dupes, analogies, similar, stalled = [], [], [], []

    # -- duplicates: same source filed twice under different naming ---------
    by_title = defaultdict(list)
    for k in keys:
        by_title[title_key(notes[k]["stem"])].append(k)
    for tk, group in by_title.items():
        if len(group) < 2 or not tk:
            continue
        for i, a in enumerate(group):
            for b in group[i + 1:]:
                dupes.append({"a": a, "b": b, "sim": cosine(vecs[a], vecs[b])})

    dupe_pairs = {frozenset((d["a"], d["b"])) for d in dupes}

    # -- stalled generators: a dated series whose content never changes ------
    by_series = defaultdict(list)
    for k in keys:
        sk = series_key(notes[k]["stem"])
        if sk:
            by_series[sk].append(k)
    for sk, group in by_series.items():
        if len(group) < 3:
            continue
        group = sorted(group)
        sims = [cosine(vecs[group[i]], vecs[group[i + 1]]) for i in range(len(group) - 1)]
        if sims and sum(sims) / len(sims) > 0.97:
            stalled.append({"series": sk, "count": len(group),
                            "sim": sum(sims) / len(sims), "example": group[0]})
    stalled.sort(key=lambda r: -r["count"])

    # -- similarity --------------------------------------------------------
    for i, a in enumerate(keys):
        na = notes[a]
        sa = series_key(na["stem"])
        for b in keys[i + 1:]:
            pair = frozenset((a, b))
            if pair in linked or pair in seen or pair in dupe_pairs:
                continue
            nb = notes[b]
            sb = series_key(nb["stem"])
            if sa and sb and sa == sb:
                continue                       # same dated series — trivial
            s = cosine(vecs[a], vecs[b])
            if s < min_sim:
                continue
            shared = sorted(set(vecs[a]) & set(vecs[b]),
                            key=lambda t: -(vecs[a][t] + vecs[b][t]))[:6]
            rec = {"a": a, "b": b, "sim": s, "terms": shared}
            (analogies if na["folder"] != nb["folder"] else similar).append(rec)

    analogies.sort(key=lambda r: -r["sim"])
    similar.sort(key=lambda r: -r["sim"])
    dupes.sort(key=lambda r: -r["sim"])
    return {"duplicates": dupes, "stalled": stalled,
            "analogies": analogies[:top], "similar": similar[:top]}


def render(res: dict, notes: dict, today: str) -> str:
    L = [
        "---",
        f"title: Missed Connections Review - {today}",
        f"created: {today}",
        f"updated: {today}",
        "type: query",
        "tags: [second-brain, llm-wiki, connections, review]",
        "sources: [00_System/Scripts/connection_illuminator.py]",
        "confidence: medium",
        "---",
        "",
        f"# Missed Connections Review - {today}",
        "",
        "Only **new** candidates appear here. Anything proposed in a previous review, or",
        "already linked, is suppressed — so an empty section means nothing new was found,",
        "not that the scan failed.",
        "",
    ]

    if res["duplicates"]:
        L += ["## Merge candidates — same source filed twice", "",
              "These are not links to add. They are one note wearing two filenames.", ""]
        for d in res["duplicates"]:
            L.append(f"- [[{notes[d['a']]['stem']}]] and [[{notes[d['b']]['stem']}]] "
                     f"— {d['sim']:.0%} content overlap. Keep one, redirect the other.")
            L.append(f"    - `{d['a']}`")
            L.append(f"    - `{d['b']}`")
        L.append("")

    if res["stalled"]:
        L += ["## Stalled generators", "",
              "These dated series produce near-identical output every run. Whatever writes",
              "them is reporting nothing new — fix the generator, or stop running it.", ""]
        for r in res["stalled"]:
            L.append(f"- `{r['series']}` — {r['count']} notes, {r['sim']:.0%} identical "
                     f"between consecutive entries (e.g. `{r['example']}`)")
        L.append("")

    if res["analogies"]:
        L += ["## Cross-folder connections", "",
              "Different parts of the vault sharing rare vocabulary. Highest-value section:",
              "these are links you were unlikely to make yourself, because you search",
              "within a topic rather than across topics.", ""]
        for r in res["analogies"]:
            L.append(f"- [[{notes[r['a']]['stem']}]] ↔ [[{notes[r['b']]['stem']}]] "
                     f"— {r['sim']:.0%}, `{notes[r['a']]['folder']}` ↔ `{notes[r['b']]['folder']}`")
            L.append(f"    - distinctive shared terms: {', '.join(r['terms'])}")
        L.append("")

    if res["similar"]:
        L += ["## Same-folder connections", "",
              "Related notes in the same area that were never linked.", ""]
        for r in res["similar"]:
            L.append(f"- [[{notes[r['a']]['stem']}]] ↔ [[{notes[r['b']]['stem']}]] "
                     f"— {r['sim']:.0%} · {', '.join(r['terms'][:4])}")
        L.append("")

    if not any(res.values()):
        L += ["## Nothing new", "",
              "No unproposed candidates above threshold. Either the vault is well-connected",
              "or the last review's suggestions still need acting on.", ""]

    L += ["## How to act on this", "",
          "1. Read both notes before linking. A term overlap is a hypothesis.",
          "2. Add the wikilink to **both** notes — a one-way link is invisible from the other side.",
          "3. If the relationship needs explaining, write a concept page in `04_Wiki/concepts/`",
          "   rather than just linking.",
          "4. Append durable changes to `log.md`.", ""]
    return "\n".join(L)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", type=Path, default=Path.cwd())
    ap.add_argument("--write", action="store_true", help="file the review into 04_Wiki/queries/")
    ap.add_argument("--reset", action="store_true", help="forget suggestion history")
    ap.add_argument("--top", type=int, default=12, help="max suggestions per section")
    ap.add_argument("--min-sim", type=float, default=0.15)
    args = ap.parse_args()

    root = args.root.resolve()
    state_path = root / "00_System" / STATE_FILE
    state = {"suggested": []}
    if state_path.is_file() and not args.reset:
        try:
            state = json.loads(state_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            pass
    seen = {frozenset(p) for p in state.get("suggested", []) if len(p) == 2}

    notes = load_notes(root)
    if len(notes) < 5:
        print(f"Only {len(notes)} notes found under {root} — is --root correct?")
        return 1

    res = analyse(notes, seen, args.top, args.min_sim)
    today = dt.date.today().isoformat()

    nd, na, ns, nst = (len(res["duplicates"]), len(res["analogies"]),
                       len(res["similar"]), len(res["stalled"]))
    print(f"\n  Scanned {len(notes)} notes.")
    print(f"  {nd} merge candidate(s) · {nst} stalled series · {na} cross-folder · {ns} same-folder")
    print(f"  ({len(seen)} pair(s) suppressed as already proposed or already linked)\n")

    for d in res["duplicates"][:5]:
        print(f"  MERGE  {notes[d['a']]['stem']}")
        print(f"      +  {notes[d['b']]['stem']}   ({d['sim']:.0%} overlap)")
    for r in res["stalled"][:5]:
        print(f"  STALL  {r['series']} — {r['count']} notes, {r['sim']:.0%} identical")
    for r in res["analogies"][:5]:
        print(f"  LINK   {notes[r['a']]['stem']}")
        print(f"      ↔  {notes[r['b']]['stem']}   ({r['sim']:.0%}: {', '.join(r['terms'][:4])})")

    if args.write:
        out = root / "04_Wiki" / "queries" / f"Missed Connections Review - {today}.md"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(render(res, notes, today), encoding="utf-8")
        print(f"\n  Filed: {out.relative_to(root)}")

        for grp in (res["duplicates"], res["analogies"], res["similar"]):
            for r in grp:
                state.setdefault("suggested", []).append(sorted([r["a"], r["b"]]))
        state["last_run"] = today
        state_path.parent.mkdir(parents=True, exist_ok=True)
        state_path.write_text(json.dumps(state, indent=1), encoding="utf-8")
        print(f"  Remembered {len(state['suggested'])} pair(s) — they will not be proposed again.")
    else:
        print("\n  Dry run. Use --write to file the review and record these suggestions.")
    print()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
