#!/usr/bin/env python3
"""Render the vault as a 3D galaxy you can fly through.

    python 00_System\\Scripts\\build_galaxy.py           # -> 00_System/Galaxy/galaxy.html
    python 00_System\\Scripts\\build_galaxy.py --open    # build, then open it

Run it from the vault root. The output is a single self-contained HTML file —
no server, no CDN, no network. Double-click it. That matters because a
visualisation you need a build step to look at is a visualisation you stop
looking at.

This is the vault-local wrapper around the same engine used in the repo. It
differs in one way that matters: the repo version expects a `wiki/` directory,
whereas this vault keeps notes across `02_Raw`, `03_Sources`, `04_Wiki`,
`05_Projects` and the rest — so the whole vault root is treated as the note
directory, and scaffolding folders are excluded by name.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
import webbrowser
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from vault import Vault  # noqa: E402

INJECT_RE = re.compile(r"^const GRAPH = .*//\{\{GRAPH_DATA\}\}\s*$", re.MULTILINE)

# Vault root is two levels up: 00_System/Scripts/ -> 00_System/ -> vault root.
DEFAULT_ROOT = HERE.parent.parent


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
    v = Vault(root, root).load()

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
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--root", type=Path, default=None, help="vault root (default: auto)")
    ap.add_argument("--out", type=Path, default=None, help="output HTML path")
    ap.add_argument("--json", action="store_true", help="also write galaxy.json")
    ap.add_argument("--open", action="store_true", help="open the result in a browser")
    ap.add_argument("--serve", nargs="?", type=int, const=8765, default=None,
                    metavar="PORT",
                    help="build, then serve on http://127.0.0.1:PORT (default 8765) "
                         "so Obsidian's Web viewer can show it in a pane")
    args = ap.parse_args()

    root = (args.root or DEFAULT_ROOT).resolve()
    tpl = HERE / "galaxy" / "template.html"
    if not tpl.is_file():
        print(f"error: template missing at {tpl}", file=sys.stderr)
        print("       copy 00_System/Scripts/galaxy/template.html across too.", file=sys.stderr)
        return 1

    graph = build(root)
    out = (args.out or root / "00_System" / "Galaxy" / "galaxy.html").resolve()
    out.parent.mkdir(parents=True, exist_ok=True)

    payload = json.dumps(graph, ensure_ascii=False, separators=(",", ":"))
    # Guard against a note body ending the <script> block early.
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
        print(f"  galaxy.json  {jp}")

    m = graph["meta"]
    print(f"  galaxy       {out}")
    print(f"  {len(graph['nodes'])} notes · {len(graph['edges'])} links · "
          f"{m['clusters']} cluster(s) · {m['orphans']} orphan(s) · "
          f"{m['broken_links']} broken link(s)")
    print("\n  Double-click that file to fly through the vault. Rebuild any time —"
          "\n  it is a snapshot, not a live view.")

    if args.open:
        webbrowser.open(out.as_uri())
    if args.serve is not None:
        serve(out, args.serve)
    return 0


def serve(out: Path, port: int) -> None:
    """Serve the built galaxy on loopback so Obsidian's Web viewer can embed it.

    Obsidian's Web viewer pane speaks http, not file://, so a local file cannot
    be opened in a tab directly. A one-line static server closes that gap and
    turns the galaxy into a pinned pane beside your notes.

    Bound to 127.0.0.1 deliberately — this serves your vault's structure and
    note summaries, and nothing here should be reachable from the network.
    """
    import http.server
    import socketserver

    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *a, **kw):
            super().__init__(*a, directory=str(out.parent), **kw)

        def log_message(self, *a):  # a request line per reload is noise
            pass

    handler = Handler

    try:
        with socketserver.TCPServer(("127.0.0.1", port), handler) as httpd:
            url = f"http://127.0.0.1:{port}/{out.name}"
            print(f"\n  serving     {url}")
            print("  In Obsidian: enable the Web viewer core plugin, open that URL"
                  "\n  in a pane, and pin the tab. Ctrl+C here when you are done.")
            httpd.serve_forever()
    except OSError as e:
        print(f"\n  error: could not bind port {port} — {e}", file=sys.stderr)
        print(f"  Something else is using it. Try --serve {port + 1}.", file=sys.stderr)
    except KeyboardInterrupt:
        print("\n  stopped.")


if __name__ == "__main__":
    raise SystemExit(main())
