---
title: Obsidian Graph Visual Language
created: 2026-07-08
updated: 2026-07-13
type: workflow
tags: [second-brain, obsidian, graph, visual-system, karpathy]
sources: [02_Raw/youtube/transcripts/_O7eUJxmzvE.md, 03_Sources/articles/karpathy-ai-second-brain-connection-layer.md, 00_System/Dashboards/Connection Illumination Dashboard.md]
confidence: medium
---

# Obsidian Graph Visual Language

## Why this exists

The Karpathy-style demonstration makes the second brain feel like a live map: each dot is a file, larger dots are more connected/hub-like, and colored clusters make it easier to see which parts of the system are business, quant, workflows, dashboards, raw sources, or synthesis.

This vault now uses that same idea deliberately instead of leaving the graph as a plain grey cloud.

## Applied Obsidian graph settings

Configured file:

```text
.obsidian/graph.json
```

Key visual choices:

- color groups are expanded by default;
- tags are visible;
- unresolved links remain visible so broken/planned links can be seen;
- orphans remain visible so disconnected assets are obvious;
- node size is increased slightly so hub pages stand out;
- line size is increased slightly so relationships are easier to see;
- graph starts open instead of collapsed.

## Color legend

| Color    | Query                                                 | Meaning                                             |
| -------- | ----------------------------------------------------- | --------------------------------------------------- |
| Gold     | `path:"00_System/Dashboards"`                         | Operating dashboards / command surfaces             |
| Cyan     | `path:"00_System/Workflows"`                          | Repeatable procedures and workflows                 |
| Coral    | `path:"00_System/Handoffs"`                           | Current session continuity / resume points          |
| Green    | `path:"05_Projects/AI Quant Trading Floor"`           | Quant research, backtests, ledgers, strategy notes  |
| Teal     | `path:"05_Projects/AOD Student Placement"`           | AOD / mental-health placement search and applications |
| Pink     | `path:"05_Projects/AI Business Launch Backlog"`       | BuyerProof / Business Context Brain / launch assets |
| Blue     | `path:"03_Sources"`                                   | Processed source notes and summaries                |
| Purple   | `path:"04_Wiki"`                                      | Durable wiki / synthesis / query layer              |
| Orange   | `path:"01_Inbox"`                                     | Unprocessed capture / inbox material                |
| Grey     | `path:"02_Raw"`                                       | Immutable raw sources                               |
| Emerald  | `tag:#quant OR tag:#trading OR tag:#paper-trading`    | Cross-folder quant/trading material                 |
| Hot pink | `tag:#business OR tag:#buyerproof OR tag:#launch`     | Cross-folder launch/business material               |
| Violet   | `tag:#second-brain OR tag:#llm-wiki OR tag:#obsidian` | Second-brain architecture material                  |

## How to read the graph

### Dot size

Obsidian scales dots by connection weight. In practice:

- larger dots are hub notes, dashboards, or frequently linked sources;
- small isolated dots are likely raw notes, drafts, or under-linked assets;
- a small but important project note may need intentional links added.

### Lines

Lines are wikilinks. Dense line clusters mean a working sub-system is forming. Thin or missing lines between obvious related clusters are candidates for [[Connection Illumination Dashboard]] review.

### Colors

Colors show the role of a file, not its quality. The best second-brain shape should usually show:

```text
Raw/source material → source summaries → wiki synthesis → workflows/dashboards → active project notes
```

## Review routine

When opening the graph:

1. Look for large dashboard/workflow hubs. These should be connected to active projects.
2. Look for isolated pink business assets. These are likely launch assets that need funnel/navigation links.
3. Look for isolated green quant evidence notes. These should link to strategy specs and dashboards.
4. Look for blue processed sources with no purple synthesis page. These may need durable extraction.
5. Use [[Connection Illumination Dashboard]] to confirm missed links before editing.

## Maintenance rule

When a new major project area appears, add either:

- a folder-based color group, if it is a durable operating area; or
- a tag-based color group, if it cuts across folders.

Do not over-color every tiny theme. The graph should remain readable at a glance.

## Related

- [[Connection Illumination Dashboard]]
- [[Karpathy Connection Illumination Workflow]]
- [[karpathy-ai-second-brain-connection-layer]]
- [[Claude and Ari Second Brain Evolution Loop]]
