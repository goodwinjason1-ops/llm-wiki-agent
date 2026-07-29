---
title: LLM Wiki v2 Gist
type: source
tier: episodic
status: active
confidence: 0.75
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
sources:
  - https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2
tags: [knowledge/architecture, ai/memory, ai/retrieval, source/gist]
aliases: [llm-wiki-v2, The LLM Wiki v2]
---

# LLM Wiki v2 Gist

> The original pattern plus the operational layers it needs to survive scale:
> lifecycle, typed graph, hybrid retrieval, consolidation, automation.

## What it says

Keeps the foundation — raw sources → wiki pages → schema — and adds five layers
drawn from production experience.

**Memory lifecycle.** Confidence scoring, explicit supersession of outdated claims,
and retention curves based on access patterns. Stated purpose: prevent wikis becoming
"junk drawers" of equally-weighted information.

**Knowledge graph layer.** Typed entities and relationships replace flat pages;
connections carry meaning (`uses`, `depends on`, `contradicts`, `caused`, `fixed`,
`supersedes`). Enables traversal-based discovery that keyword search misses.

**Hybrid search.** BM25, vector similarity and graph traversal, fused by reciprocal
rank fusion. Motivated by simple index files breaking down past ~200 documents.

**Consolidation tiers.** working → episodic → semantic → procedural, each more
compressed and confident than the last, with promotion as evidence accumulates.

**Automation.** Event hooks — on new source, on session start, on session end, on
query, on memory write, on schedule — to remove the manual bookkeeping that causes
most wikis to rot.

**The stated punchline:** "the schema document is the most important file." Encoding
domain rules, quality standards and handling procedures is what converts generic LLM
behaviour into disciplined knowledge work.

## Its weaknesses

- It is an architectural pattern document, not a specification. It names the tiers,
  the edge types and the hook points, but supplies no directory layout, no frontmatter
  schema, no scripts and no command syntax. Everything concrete in this repo is our
  implementation of its ideas, not a transcription of them.
- The ~200-document threshold is offered without methodology.
- Access-pattern-driven retention is proposed without addressing the obvious risk that
  it entrenches whatever you already look at.

## Key claims

- Builds on the original by adding production-grade agent memory mechanics ^conf:0.9 — source: `llm-wiki-v2`
- Defines four consolidation tiers: working, episodic, semantic, procedural ^conf:0.9 — source: `llm-wiki-v2`
- Names typed edges including uses, depends on, contradicts, caused, fixed, supersedes ^conf:0.85 — source: `llm-wiki-v2`
- Simple index files break down beyond roughly 200 documents ^conf:0.6 — source: `llm-wiki-v2`; no methodology given
- Hybrid retrieval fuses BM25, vector similarity and graph traversal via reciprocal rank fusion ^conf:0.8 — source: `llm-wiki-v2`
- Automation hook points are: on new source, session start, session end, query, memory write, and schedule ^conf:0.8 — source: `llm-wiki-v2`
- The schema document is the single most important file in the system ^conf:0.85 — source: `llm-wiki-v2`
- The pattern is modular — start with sources, pages and schema, then layer on lifecycle, structure, automation and scaling ^conf:0.8 — source: `llm-wiki-v2`

## Links
- supports:: [[LLM Wiki]]
- supports:: [[Memory Consolidation]]
- supports:: [[Typed Knowledge Graph]]
- supports:: [[Index Collapse]]
- depends-on:: [[Karpathy LLM Wiki Gist]] — extends it rather than replacing it; both remain current

## Open questions
- [[Where Does Index Collapse Actually Start]]
- Which of the six hook points actually earn their complexity in a single-user vault?

## Provenance
- Read 2026-07-29 as a rendered summary rather than the full raw text; page confidence
  is capped at 0.75 accordingly. Two attempts to fetch the raw gist returned HTTP 403.
