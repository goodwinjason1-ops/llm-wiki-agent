---
source_url: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
ingested: 2026-07-08
sha256: f5f7461fe7416e3ebf79220fde5274e82758ebc6852fb453b704ba66e423af6b
type: raw-source
author: Andrej Karpathy
---

# Karpathy Gist: LLM Wiki

Source URL: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
Raw URL: https://gist.githubusercontent.com/karpathy/442a6bf555914893e9891c11519de94f/raw
Fetched: 2026-07-08

## Core extracted text

Karpathy describes a pattern for building personal knowledge bases using LLMs.

The core idea is that most LLM/document workflows look like RAG: the model retrieves relevant chunks at query time and generates an answer. That works, but the model is rediscovering knowledge from scratch on every question. There is no accumulation.

The proposed alternative is for the LLM to incrementally build and maintain a persistent wiki: a structured, interlinked collection of markdown files between the user and the raw sources. When a new source arrives, the LLM reads it, extracts key information, and integrates it into the existing wiki by updating entity pages, revising topic summaries, noting contradictions, and strengthening or challenging the evolving synthesis.

The wiki is a persistent, compounding artifact. Cross-references are already there. Contradictions have already been flagged. The synthesis already reflects what has been read. The wiki gets richer with every source and every question.

Architecture:
1. Raw sources — curated source documents, immutable, source of truth.
2. The wiki — LLM-generated markdown files: summaries, entity pages, concept pages, comparisons, overviews, syntheses. The LLM owns this layer.
3. The schema — instructions such as CLAUDE.md or AGENTS.md that tell the LLM how the wiki is structured and how to ingest/query/lint.

Operations:
- Ingest: process a new source, write a summary, update index, update relevant entity/concept pages, append to log. One source may touch 10-15 wiki pages.
- Query: search relevant pages, synthesize an answer with citations, and file valuable answers back into the wiki as new pages.
- Lint: health-check the wiki for contradictions, stale claims, orphan pages, missing cross-references, and data gaps.

Indexing and logging:
- index.md is a content-oriented catalog of pages with links and summaries.
- log.md is a chronological append-only record of ingests, queries, and lint passes.

Optional tools:
- local markdown search such as qmd or simpler scripts when the wiki grows beyond what index.md can handle.
- Obsidian graph view to see hubs and orphans.
- Dataview and YAML frontmatter for dynamic tables.

Why it works:
Humans abandon wikis because maintaining cross-references, summaries, contradictions, and consistency is tedious. LLMs can do the bookkeeping cheaply. The human curates sources, directs analysis, asks good questions, and thinks about meaning. The LLM handles maintenance.

The idea is related to Vannevar Bush's Memex: a personal curated knowledge store with associative trails between documents. The missing piece was who maintains the trails; the LLM can.
