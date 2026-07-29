---
title: Karpathy LLM Wiki Gist
type: source
tier: episodic
status: active
confidence: 0.8
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
sources:
  - https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
tags: [knowledge/architecture, ai/agents, source/gist]
aliases: [karpathy-llm-wiki, The LLM Wiki]
---

# Karpathy LLM Wiki Gist

> The original statement of the LLM Wiki pattern: three layers, three operations,
> and one argument about why agents can maintain what humans abandon.

## What it says

The proposal is to stop treating retrieval as a per-query operation. Instead an LLM
"incrementally builds and maintains a persistent wiki — a structured, interlinked
collection of markdown files that sits between you and the raw sources."

**Three layers.** Raw sources (immutable, read-only). The wiki (LLM-generated
markdown: summaries, entity pages, concept pages, cross-references — owned entirely
by the LLM). The schema (a configuration document, likened to a `CLAUDE.md`, that
governs how the LLM behaves as maintainer).

**Three operations.** *Ingest* — process new sources, updating 10–15 relevant pages
and maintaining cross-references. *Query* — search the already-synthesised wiki, and
file valuable insights back as new pages. *Lint* — health-check for contradictions,
orphan pages, stale claims and missing cross-references.

**The argument.** Humans abandon wikis because of maintenance burden; LLMs don't get
bored. The human curates sources and asks good questions; the LLM handles the
bookkeeping.

## Its weaknesses

- No quantitative claims and no evaluation. It is a design proposal, not a result.
- Silent on what happens as the corpus grows — the gap [[LLM Wiki v2 Gist]] fills.
- The "LLMs don't get bored" argument establishes that maintenance is *possible*, not
  that it will be *good*. Quality control is left unspecified.

## Key claims

- The wiki sits between the reader and the raw sources as a synthesised intermediate layer ^conf:0.9 — source: `karpathy-llm-wiki`
- Ingest should touch 10–15 relevant pages per source, not one ^conf:0.85 — source: `karpathy-llm-wiki`
- Query should file valuable insights back into the wiki rather than only answering ^conf:0.85 — source: `karpathy-llm-wiki`
- The schema document is compared to a CLAUDE.md — a configuration file governing agent behaviour ^conf:0.8 — source: `karpathy-llm-wiki`
- The pattern is related to Vannevar Bush's 1945 Memex concept ^conf:0.75 — source: `karpathy-llm-wiki`

## Links
- supports:: [[LLM Wiki]]
- authored-by:: [[Andrej Karpathy]]
- part-of:: [[LLM Wiki]]

## Open questions
- What does the original propose for quality control, beyond lint? Possibly nothing.

## Provenance
- Read 2026-07-29 as a rendered summary of the gist rather than the full raw text,
  which is why page confidence is capped at 0.8. Re-read the raw gist before
  promoting any claim here above that.
