#!/usr/bin/env python3
"""Scan wiki/ and render the galaxy view.

    python3 tools/build_graph.py              # -> tools/galaxy/galaxy.html
    python3 tools/build_graph.py --json       # also write tools/galaxy/graph.json
    python3 tools/build_graph.py --open       # build, then open in a browser

The output HTML is fully self-contained: no server, no CDN, no network. Open the
file directly. That matters because a visualisation you need a build step to look
at is a visualisation you stop looking at.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
import webbrowser
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from vault import Vault, find_root  # noqa: E402

INJECT_RE = re.compile(r"^const GRAPH = .*//\{\{GRAPH_DATA\}\}\s*$", re.MULTILINE)


def summarise(note, limit: int = 260) -> str:
    """First real prose paragraph — the callout line if there is one, else the summary."""
    body = note.body

    m = re.search(r"^>\s*(.+?)(?:\n\s*\n|\n(?!>))", body, re.MULTILINE | re.DOTALL)
    if m:
        text = re.sub(r"^>\s*", "", m.group(1), flags=re.MULTILINE)
    else:
        m = re.search(r"^##\s*Summary\s*\n+(.+?)(?=\n#|\Z)", body, re.MULTILINE | re.DOTALL)
        if m:
            text = m.group(1)
        else:
            stripped = re.sub(r"^#.*$", "", body, flags=re.MULTILINE)
            stripped = re.sub(r"```.*?```", "", stripped, flags=re.DOTALL)
            paras = [p.strip() for p in stripped.split("\n\n") if p.strip()]
            text = paras[0] if paras else ""

    text = re.sub(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]", lambda m: m.group(2) or m.group(1), text)
    text = re.sub(r"[*_`]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text[: limit - 1] + "…" if len(text) > limit else text


def build(root: Path) -> dict:
    v = Vault(root).load()

    nodes = [
        {
            "id": n.node_id,
            "title": n.title,
            "type": n.type,
            "tier": n.tier,
            "status": n.status,
            "confidence": round(n.confidence, 3),
            "tags": n.tags[:12],
            "sources": n.sources[:8],
            "summary": summarise(n),
            "stale": n.is_stale,
        }
        for n in v.notes
    ]

    return {
        "nodes": nodes,
        "edges": v.edges(),
        "meta": {
            "generated": dt.date.today().isoformat(),
            "root": root.name,
            "clusters": len(v.clusters()),
            "orphans": len(v.orphans()),
            "broken_links": len(v.broken),
        },
    }


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", type=Path, default=None, help="vault root (default: auto-detect)")
    ap.add_argument("--out", type=Path, default=None, help="output HTML path")
    ap.add_argument("--json", action="store_true", help="also write graph.json")
    ap.add_argument("--open", action="store_true", help="open the result in a browser")
    args = ap.parse_args()

    root = (args.root or find_root()).resolve()
    tpl = root / "tools" / "galaxy" / "template.html"
    if not tpl.is_file():
        print(f"error: template missing at {tpl}", file=sys.stderr)
        return 1

    graph = build(root)
    out = (args.out or root / "tools" / "galaxy" / "galaxy.html").resolve()
    out.parent.mkdir(parents=True, exist_ok=True)

    payload = json.dumps(graph, ensure_ascii=False, separators=(",", ":"))
    # Guard against a note body ending a <script> block early.
    payload = payload.replace("</", "<\\/")

    html = tpl.read_text(encoding="utf-8")
    html, count = INJECT_RE.subn(lambda _: f"const GRAPH = {payload};", html, count=1)
    if count != 1:
        print("error: could not find the GRAPH injection line in the template", file=sys.stderr)
        return 1
    out.write_text(html, encoding="utf-8")

    if args.json:
        jp = out.with_suffix(".json")
        jp.write_text(json.dumps(graph, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"  graph.json  {jp.relative_to(root)}")

    m = graph["meta"]
    print(f"  galaxy      {out.relative_to(root)}")
    print(f"  {len(graph['nodes'])} notes · {len(graph['edges'])} links · "
          f"{m['clusters']} cluster(s) · {m['orphans']} orphan(s) · {m['broken_links']} broken link(s)")

    if not graph["nodes"]:
        print("\n  The vault is empty. Add material to sources/ and run an ingest first.")
    if args.open:
        webbrowser.open(out.as_uri())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
