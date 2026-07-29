---
title: Typed Knowledge Graph
type: concept
tier: semantic
status: active
confidence: 0.8
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
sources:
  - https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2
tags: [knowledge/graph, ai/retrieval]
aliases: [Typed links, Semantic edges, Knowledge graph layer]
---

# Typed Knowledge Graph

> Links that say *how* two notes relate, not merely that they do.

## Summary

A plain wikilink is an untyped edge: it asserts relevance and nothing else. Once a
vault has a few hundred notes, "relevant" stops discriminating — everything is
adjacent to everything. Typing the edge (`depends-on`, `contradicts`,
`analogous-to`) restores the discrimination and makes traversal answerable:
"what would break if this were false?" becomes a graph query rather than a re-read.

The vocabulary must be **closed**. An open vocabulary degrades into synonyms within
weeks — `uses`, `utilises`, `relies-on` and `built-with` all appear, and the graph
stops meaning anything.

## Key claims

- v2 replaces flat pages with typed entities and relationships ^conf:0.85 — source: `llm-wiki-v2`
- Connections carry semantic meaning such as "uses", "depends on" and "contradicts" ^conf:0.9 — source: `llm-wiki-v2`
- v2's cited edge vocabulary also includes "caused", "fixed" and "supersedes" ^conf:0.8 — source: `llm-wiki-v2`
- Typing enables traversal-based discovery that keyword search misses ^conf:0.85 — source: `llm-wiki-v2`
- v2 fuses three retrieval streams — BM25, vector similarity and graph traversal — via reciprocal rank fusion ^conf:0.8 — source: `llm-wiki-v2`
- A one-way typed edge is functionally half an edge, because traversal from the other side cannot see it ^conf:0.7 — own inference

## Implementation choice here

Edges are written in Dataview inline-field syntax (`depends-on:: [[Target]]`), which
is simultaneously readable prose, queryable inside [[Obsidian]], and parseable by
`tools/build_graph.py` without a separate metadata store. One representation, three
consumers — the alternative was a sidecar file that would drift.

## Links
- part-of:: [[LLM Wiki]]
- supports:: [[Cross-Domain Analogy]] — analogy needs a named edge type to be findable at all
- uses:: [[Obsidian]]
- depends-on:: [[Index Collapse]] — typing is one of the responses to it

## Open questions
- Does the closed eleven-edge vocabulary hold up across domains, or does each domain need its own extension?
