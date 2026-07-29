#!/usr/bin/env python3
"""Propose connections the vault is missing.

    python3 tools/suggest_links.py                 # ranked report
    python3 tools/suggest_links.py --json          # for an agent to act on
    python3 tools/suggest_links.py --top 40
    python3 tools/suggest_links.py --only analogy  # cross-domain candidates only

These are *candidates*, not conclusions. The tool finds statistical shape; an agent
or a human decides whether a real relationship is there and which edge type it is.
Write accepted edges at confidence 0.4 until confirmed (SCHEMA.md §5).

Six detectors, in rough order of how surprising their output tends to be:

  analogy    high text similarity, DISJOINT tag domains — the cross-domain link a
             human almost never finds, because humans search within a domain
  bridge     a note that would join two disconnected clusters
  triadic    many shared neighbours but no direct edge (Adamic-Adar closure)
  similar    high text similarity within a domain, currently unlinked
  co-source  same source cited, never linked to each other
  cluster    orphans that resemble each other — a concept page waiting to be written
"""

from __future__ import annotations

import argparse
import json
import math
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from vault import Vault, find_root  # noqa: E402

STOP = set("""
a an the and or but if then else when while of in on at to from by for with without
about into over under again further once here there all any both each few more most
other some such no nor not only own same so than too very can will just is are was
were be been being have has had do does did doing this that these those it its as
i you he she they we them his her their our your my me us who whom which what where
how why because although however therefore thus also may might must should would could
via per vs etc e.g i.e within across between during before after above below up down
out off through
""".split())

TOKEN_RE = re.compile(r"[a-z][a-z0-9'-]{2,}")


def tokenize(text: str) -> list[str]:
    text = re.sub(r"```.*?```", " ", text, flags=re.DOTALL)
    text = re.sub(r"`[^`\n]*`", " ", text)
    text = re.sub(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]", r"\1 ", text)
    text = re.sub(r"https?://\S+", " ", text)
    return [t for t in TOKEN_RE.findall(text.lower()) if t not in STOP]


def tfidf(notes) -> dict[str, dict[str, float]]:
    docs = {}
    df = Counter()
    for n in notes:
        # the title carries more signal per word than the body, so weight it
        toks = tokenize(n.body) + tokenize(n.title) * 3 + [t.replace("/", " ") for t in n.tags] * 2
        tf = Counter(toks)
        docs[n.node_id] = tf
        df.update(tf.keys())

    total = max(1, len(docs))
    out = {}
    for nid, tf in docs.items():
        if not tf:
            out[nid] = {}
            continue
        peak = max(tf.values())
        vec = {}
        for term, c in tf.items():
            if df[term] < 2 or df[term] > total * 0.55:
                continue                      # too rare to mean anything, or too common
            vec[term] = (0.5 + 0.5 * c / peak) * math.log(total / df[term])
        norm = math.sqrt(sum(v * v for v in vec.values())) or 1.0
        out[nid] = {t: v / norm for t, v in vec.items()}
    return out


def cosine(a: dict, b: dict) -> float:
    if len(a) > len(b):
        a, b = b, a
    return sum(v * b.get(t, 0.0) for t, v in a.items())


def domains(note) -> set[str]:
    """Top-level tag roots — the note's subject areas."""
    return {t.split("/")[0].lower() for t in note.tags}


def analyse(v: Vault, min_sim: float) -> list[dict]:
    notes = [n for n in v.notes if n.folder not in ("_root",) and n.status != "archived"]
    vecs = tfidf(notes)
    by_id = {n.node_id: n for n in notes}
    linked = {(a, b) for a in by_id for b in by_id[a].out_ids | by_id[a].in_ids}

    def unlinked(a, b) -> bool:
        return (a, b) not in linked and (b, a) not in linked

    sug: list[dict] = []

    def add(kind, a, b, score, why, edge):
        sug.append({
            "kind": kind, "score": round(score, 3), "edge": edge, "why": why,
            "a": {"id": a.node_id, "title": a.title, "type": a.type},
            "b": {"id": b.node_id, "title": b.title, "type": b.type} if b else None,
        })

    # -- text similarity: analogy vs similar --------------------------------
    ids = [n.node_id for n in notes]
    for i, ai in enumerate(ids):
        a = by_id[ai]
        for bi in ids[i + 1:]:
            if not unlinked(ai, bi):
                continue
            s = cosine(vecs[ai], vecs[bi])
            if s < min_sim:
                continue
            b = by_id[bi]
            da, db = domains(a), domains(b)
            shared = sorted(set(vecs[ai]) & set(vecs[bi]),
                            key=lambda t: -(vecs[ai][t] + vecs[bi][t]))[:6]
            terms = ", ".join(shared)
            if da and db and not (da & db):
                add("analogy", a, b, s + 0.25,
                    f"{s:.0%} term overlap across unrelated domains "
                    f"({'/'.join(sorted(da))} vs {'/'.join(sorted(db))}) — shared: {terms}",
                    "analogous-to")
            else:
                add("similar", a, b, s,
                    f"{s:.0%} term overlap, never linked — shared: {terms}",
                    "supports")

    # -- triadic closure ----------------------------------------------------
    nbrs = {n.node_id: (n.out_ids | n.in_ids) for n in notes}
    deg = {k: max(1, len(vv)) for k, vv in nbrs.items()}
    for i, ai in enumerate(ids):
        for bi in ids[i + 1:]:
            if not unlinked(ai, bi):
                continue
            common = nbrs[ai] & nbrs[bi]
            if len(common) < 2:
                continue
            aa = sum(1 / math.log(1 + deg[c]) for c in common if c in deg)
            if aa < 0.9:
                continue
            names = ", ".join(v.by_id[c].title for c in list(common)[:4] if c in v.by_id)
            add("triadic", by_id[ai], by_id[bi], min(1.0, aa / 3),
                f"{len(common)} shared neighbours ({names}) but no direct link", "supports")

    # -- co-source ----------------------------------------------------------
    src_map = defaultdict(list)
    for n in notes:
        for s in n.sources:
            src_map[Path(s).name.lower()].append(n)
    for src, group in src_map.items():
        if not 2 <= len(group) <= 12:
            continue
        for i, a in enumerate(group):
            for b in group[i + 1:]:
                if unlinked(a.node_id, b.node_id):
                    add("co-source", a, b, 0.4,
                        f"both derived from `{src}` but never linked to each other", "supports")

    # -- bridges ------------------------------------------------------------
    comps = v.clusters()
    if len(comps) > 1:
        main = {n.node_id for n in comps[0]}
        for comp in comps[1:]:
            if len(comp) < 1:
                continue
            best = None
            for n in comp:
                if n.node_id not in vecs:
                    continue
                for m in comps[0]:
                    if m.node_id not in vecs:
                        continue
                    s = cosine(vecs[n.node_id], vecs[m.node_id])
                    if best is None or s > best[2]:
                        best = (n, m, s)
            if best and best[2] > 0.04:
                n, m, s = best
                add("bridge", n, m, 0.55 + s,
                    f"island of {len(comp)} note(s) — closest note in the main body is "
                    f"[[{m.title}]] ({s:.0%} overlap). Linking here joins the clusters.",
                    "depends-on")
            _ = main

    # -- convergent orphans -------------------------------------------------
    orph = [n for n in v.orphans() if n.type != "map" and n.node_id in vecs]
    seen: set[str] = set()
    for i, a in enumerate(orph):
        if a.node_id in seen:
            continue
        group = [a]
        for b in orph[i + 1:]:
            if b.node_id in seen:
                continue
            if cosine(vecs[a.node_id], vecs[b.node_id]) > min_sim * 0.75:
                group.append(b)
                seen.add(b.node_id)
        if len(group) >= 3:
            seen.add(a.node_id)
            terms = Counter()
            for g in group:
                terms.update(dict(sorted(vecs[g.node_id].items(), key=lambda kv: -kv[1])[:5]))
            topic = ", ".join(t for t, _ in terms.most_common(4))
            add("cluster", a, None, 0.6,
                f"{len(group)} unlinked notes converge on the same topic ({topic}): "
                + ", ".join(g.title for g in group[:6])
                + ". Write the concept page they are all circling.",
                "instance-of")

    sug.sort(key=lambda s: -s["score"])
    return sug


HEAD = {
    "analogy":   ("CROSS-DOMAIN ANALOGY", "the highest-value edge — different fields, same structure"),
    "bridge":    ("BRIDGE", "would connect an isolated island to the main body"),
    "triadic":   ("TRIADIC CLOSURE", "shared neighbours, no direct link"),
    "similar":   ("SIMILAR, UNLINKED", "same subject area, never connected"),
    "co-source": ("SHARED SOURCE", "same origin, never cross-referenced"),
    "cluster":   ("CONVERGENT ORPHANS", "a missing concept page"),
}
ORDER = ["analogy", "bridge", "cluster", "triadic", "similar", "co-source"]


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", type=Path, default=None)
    ap.add_argument("--top", type=int, default=25, help="max suggestions per category")
    ap.add_argument("--min-sim", type=float, default=0.12, help="cosine similarity floor")
    ap.add_argument("--only", choices=ORDER, help="restrict to one detector")
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    v = Vault(args.root or find_root()).load()
    if len(v.notes) < 3:
        print("\n  Not enough notes to find connections yet — add sources and ingest first.\n")
        return 0

    sug = analyse(v, args.min_sim)
    if args.only:
        sug = [s for s in sug if s["kind"] == args.only]

    if args.json:
        print(json.dumps(sug[: args.top * len(ORDER)], indent=2))
        return 0

    grouped = defaultdict(list)
    for s in sug:
        grouped[s["kind"]].append(s)

    print(f"\n  Connection candidates — {len(v.notes)} notes, {len(sug)} proposals\n")
    if not sug:
        print("  Nothing surfaced. Either the vault is well-connected, or it is too "
              "small\n  to have hidden structure yet.\n")
        return 0

    for kind in ORDER:
        items = grouped.get(kind)
        if not items:
            continue
        title, blurb = HEAD[kind]
        print(f"  {title}  ({len(items)})")
        print(f"  {blurb}\n")
        for s in items[: args.top]:
            if s["b"]:
                print(f"    [[{s['a']['title']}]]  --{s['edge']}->  [[{s['b']['title']}]]")
            else:
                print(f"    around [[{s['a']['title']}]]")
            print(f"      {s['why']}")
            print()
        if len(items) > args.top:
            print(f"    … {len(items) - args.top} more (--top {len(items)})\n")

    print("  These are candidates. Verify before writing them in, and set")
    print("  confidence: 0.4 on anything you have not confirmed (SCHEMA.md §5).\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
