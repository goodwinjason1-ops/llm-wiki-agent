---
title: Galaxy View
created: 2026-07-29
updated: 2026-07-29
type: workflow
tags: [second-brain, galaxy, visualisation, graph]
confidence: high
---

# Galaxy View

Two galaxies, and they are different things. Both are now live.

## 1. The Obsidian graph — inside the app, always current

Open the graph view (the icon in the left ribbon, or `Ctrl+G`). It is already
coloured by folder: dashboards, workflows, sources, wiki concepts and projects
each have their own hue, set in `.obsidian/graph.json`.

The deep-space theme comes from the `galaxy` CSS snippet. If the app still looks
pale: **Settings → Appearance → CSS snippets → reload**, and check `galaxy` is
toggled on.

This one is live. It updates as you write.

## 2. The 3D galaxy — a flythrough snapshot

```powershell
cd "C:\Users\Kidsg\Documents\AI Second Brain"
python 00_System\Scripts\build_galaxy.py --open
```

Writes `00_System/Galaxy/galaxy.html` — one self-contained file, no server, no
internet. Drag to orbit, scroll to zoom, click a star to read its summary and
jump to its neighbours.

It is a **snapshot**, not a live view. Rebuild it after a synthesis session to
see what moved. That is the point: the shape of the vault a month apart is the
clearest picture of whether synthesis is actually happening.

## 3. The 3D galaxy *inside* Obsidian

The 3D view can live in an Obsidian pane rather than a browser tab. Obsidian's
Web viewer speaks `http`, not `file://`, so the galaxy has to be served — one
command does both:

```powershell
cd "C:\Users\Kidsg\Documents\AI Second Brain"
python 00_System\Scripts\build_galaxy.py --serve
```

Leave that window open. Then in Obsidian:

1. **Settings → Core plugins → Web viewer** — turn it on. It ships with Obsidian;
   it is simply off in this vault.
2. `Ctrl+P` → **Web viewer: Open** → paste `http://127.0.0.1:8765/galaxy.html`
3. Drag the tab where you want it and **pin** it, so it survives layout changes.

`Ctrl+C` in the terminal stops the server. The server binds to `127.0.0.1` only —
this serves your note titles and summaries, and none of it should be reachable
from the network. Use `--serve 8766` if something already holds the default port.

**Trade-off worth knowing:** this pane is the real galaxy — typed edges, tier
colouring, note summaries on click — but it is still a snapshot, and it needs the
terminal window open. The built-in graph is live and needs nothing. Most weeks
the built-in graph is the right tool; the galaxy is for the weekly review, when
you want to see what the whole vault is doing.

There is also a community plugin called **3D Graph** that renders Obsidian's own
graph in three dimensions natively. It is smoother to launch, but it only knows
about links — it has none of the schema's edge types, tiers, staleness or
confidence, which is most of what makes the shape readable here. Worth having as
well as, not instead of.

## What the shape tells you

- **Tight bright clusters** — a topic you have genuinely worked through.
- **A dense rim of unconnected dots** — capture outrunning synthesis. These are
  your orphans; see [[synthesis-debt]].
- **Long thin bridges** — the valuable ones. A single link holding two domains
  together usually marks a real insight, and usually deserves a concept page.
- **A star with many links but no concept page** — a hub you have circled for
  months without writing down what you learned.

Read it that way and the picture becomes a to-do list rather than decoration.

## Links

- [[Second Brain Self-Improvement Loop]] — rebuild the galaxy at the weekly step
- [[connection-illumination]]
- [[synthesis-debt]]
