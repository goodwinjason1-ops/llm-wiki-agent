---
title: Karpathy AI Second Brain Connection Layer
type: source_summary
created: 2026-07-08
updated: 2026-07-08
tags: [second-brain, llm-wiki, obsidian, claude, hermes, workflow]
sources: [02_Raw/articles/x-cyrilxbt-karpathy-ai-second-brain-2026-07-07.md, 02_Raw/articles/karpathy-llm-wiki-gist-2026-07-08.md]
confidence: medium
---

# Karpathy AI Second Brain Connection Layer

Source post: [[x-cyrilxbt-karpathy-ai-second-brain-2026-07-07]]  
Implementation source: [[karpathy-llm-wiki-gist-2026-07-08]]

## What the post says

CyrilXBT frames the Karpathy LLM Wiki setup as a fast way to turn Claude + Obsidian into an intelligence layer over everything the user has written, captured, or saved. The key claim is not just search: Claude should find missed connections and surface forgotten insights.

## What Karpathy's gist adds

Karpathy's version is more precise than a generic Obsidian setup:

1. Keep raw sources immutable.
2. Maintain a separate LLM-owned wiki/synthesis layer.
3. Use schema files like `CLAUDE.md`, `HERMES.md`, and `SCHEMA.md` to discipline future agents.
4. Treat ingest, query, and lint as recurring operations.
5. File valuable query answers back into the wiki so explorations compound.
6. Use index/log files and graph-style cross-references to keep the system navigable.

## Jayse implementation

This vault already has the first layer of the system. The missing extra layer is a **connection illumination pass**: a repeatable scan that looks for pages that appear semantically related but are not linked, pages with no inbound links, tags that imply project relationships, and query-worthy clusters.

Implemented artifacts:

- [[Karpathy Connection Illumination Workflow]]
- [[Connection Illumination Dashboard]]
- `00_System/Scripts/connection_illuminator.py`

## Related

- [[karpathy-llm-wiki]]
- [[ai-second-brain]]
- [[Claude and Ari Second Brain Evolution Loop]]
- [[AI Second Brain Project Registry]]
- [[Business Context Brain - Product Concept]]
