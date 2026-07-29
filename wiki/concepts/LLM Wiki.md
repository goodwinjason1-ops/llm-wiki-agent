---
title: LLM Wiki
type: concept
tier: semantic
status: active
confidence: 0.85
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
sources:
  - https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
  - https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2
tags: [knowledge/architecture, ai/agents]
aliases: [LLM Wiki pattern, Karpathy Wiki, Agent-maintained wiki]
---

# LLM Wiki

> A knowledge base an LLM builds and maintains as a persistent artifact, sitting
> between you and your raw sources.

## Summary

Instead of retrieving raw chunks from a corpus on every question, an agent
incrementally compiles the corpus into a structured, interlinked set of markdown
files. Questions are answered against that synthesised layer, not against the raw
material. The wiki is the product; chat output is a byproduct.

The pattern has three layers and three operations, and its central claim is that the
reason humans abandon wikis — maintenance is tedious — is precisely the constraint an
agent does not have.

## Key claims

- The pattern has three layers: immutable raw sources, an LLM-owned wiki, and a schema document governing how the wiki is structured ^conf:0.9 — source: `karpathy-llm-wiki`
- The three core operations are ingest, query, and lint ^conf:0.9 — source: `karpathy-llm-wiki`
- Humans abandon wikis because maintenance is boring; agents do not get bored, which is what makes the pattern newly viable ^conf:0.8 — source: `karpathy-llm-wiki`
- The division of labour is that the human curates sources and asks good questions while the agent does the bookkeeping ^conf:0.85 — source: `karpathy-llm-wiki`
- The pattern is a descendant of Vannevar Bush's 1945 Memex — personal curated knowledge with associative trails — differing in that it solves the maintenance problem rather than only describing the goal ^conf:0.7 — source: `karpathy-llm-wiki`
- The v2 extension adds memory lifecycle management, a typed knowledge graph layer, hybrid retrieval, and consolidation tiers on top of the original ^conf:0.85 — source: `llm-wiki-v2`
- v2 states that the schema document is the single most important file, because it is what converts generic LLM behaviour into disciplined knowledge work ^conf:0.85 — source: `llm-wiki-v2`
- v2's stated implementation path is modular: begin with sources, pages and a schema, then add lifecycle, structure, automation and scaling as the corpus grows ^conf:0.8 — source: `llm-wiki-v2`

## Contrast with chunk-based RAG

Ordinary retrieval does synthesis at **query time**, repeatedly, and throws the
result away. An LLM Wiki does synthesis at **ingest time**, once, and keeps it. The
cost moves from per-question to per-source, and the artifact improves monotonically
rather than resetting — see [[Compounding Knowledge]].

## Links
- depends-on:: [[Compounding Knowledge]] — without persistence there is no pattern, only caching
- uses:: [[Memory Consolidation]] — the v2 layer that keeps quality from flattening
- uses:: [[Typed Knowledge Graph]] — the v2 layer that makes traversal meaningful
- uses:: [[Provenance Chain]]
- authored-by:: [[Andrej Karpathy]]
- supports:: [[Index Collapse]] — the pattern's structure is a response to this failure

## Open questions
- [[Where Does Index Collapse Actually Start]]

## Provenance
- Karpathy's original gist and the v2 extension, both read 2026-07-29. Confidence is
  capped at 0.85 because these were read as rendered summaries rather than as the
  full raw text.
