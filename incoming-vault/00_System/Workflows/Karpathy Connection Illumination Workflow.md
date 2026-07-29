---
title: Karpathy Connection Illumination Workflow
created: 2026-07-08
updated: 2026-07-08
type: workflow
tags: [second-brain, llm-wiki, obsidian, workflow, automation]
sources: [03_Sources/articles/karpathy-ai-second-brain-connection-layer.md]
confidence: medium
---

# Karpathy Connection Illumination Workflow

Purpose: operationalize the Karpathy LLM Wiki idea inside Jayse's vault by repeatedly finding **missed connections** between notes, projects, sources, and workflows.

## Core principle

The vault should not be a passive pile of markdown. It should become an intelligence layer where Claude Code and Ari/Hermes continuously maintain useful associative trails:

```text
raw source → source summary → concept/project/workflow pages → query answers → new links and next actions
```

## What gets illuminated

1. **Potential missing links** — pages with similar concepts/tags but no wikilink between them.
2. **Orphans** — durable pages with no inbound links from other pages.
3. **Hub pages** — notes that many other pages already point to.
4. **Bridge candidates** — notes that connect two domains, such as AI Second Brain ↔ Business Context Brain ↔ BuyerProof AU.
5. **Query prompts** — specific questions worth asking because multiple notes now overlap.

## Scripted pass

Run from the vault root:

```bash
python3 00_System/Scripts/connection_illuminator.py
```

Outputs:

- `00_System/Dashboards/Connection Illumination Dashboard.md`
- `04_Wiki/queries/Missed Connections Review - YYYY-MM-DD.md`

## Claude Code usage

Inside Claude Code, use:

```text
/second-brain-loop focus on connection illumination and missed cross-links
```

Then ask Claude to review the dashboard and implement the highest-value links or synthesis pages.

## Ari / Hermes usage

Ari/Hermes should run or read the connection dashboard before weekly Second Brain reviews. The review should surface the top 5 likely missing links, important orphan notes, synthesis notes worth creating, and project-to-project links that imply a practical next action.

## Safety and quality rules

- Do not auto-add links blindly. Treat the script output as suggestions.
- Prefer human-readable linking: create or update synthesis pages when a relationship needs explanation.
- Keep `02_Raw/` immutable.
- Do not expose secrets.
- For trading, crypto, mental-health/AOD, and financial material, frame links as research/education unless separately approved.

## Related

- [[karpathy-llm-wiki]]
- [[ai-second-brain]]
- [[Claude and Ari Second Brain Evolution Loop]]
- [[Weekly Lint Workflow]]
- [[AI Second Brain Dashboard]]
