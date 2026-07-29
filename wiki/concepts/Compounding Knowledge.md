---
title: Compounding Knowledge
type: concept
tier: semantic
status: active
confidence: 0.8
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
sources:
  - https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
tags: [knowledge/architecture, economics/leverage]
aliases: [Compounding, Persistent artifact, Knowledge compounding]
---

# Compounding Knowledge

> Work that raises the floor for all future work, rather than being consumed by the
> task that produced it.

## Summary

A chat answer is consumed on delivery. A wiki page is a deposit: the next question
starts from it rather than from the raw sources. The distinction is not about
storage — it is about whether the *synthesis* survives, because synthesis is the
expensive part.

This is the load-bearing assumption under [[LLM Wiki]]. If synthesis is cheap and
disposable, the pattern is over-engineering. If synthesis is the expensive step, then
throwing it away after every question is the single largest waste in a research
workflow.

## Key claims

- The wiki is described as a persistent, compounding artifact rather than ephemeral chat output ^conf:0.9 — source: `karpathy-llm-wiki`
- Knowledge compiles once and then stays current, rather than being re-derived per query ^conf:0.8 — source: `karpathy-llm-wiki`
- The compounding only holds if maintenance actually happens; an unmaintained wiki decays into a junk drawer and the deposits stop earning ^conf:0.7 — own inference from the v2 rationale for lifecycle management

## The condition

Compounding is conditional, not automatic. It requires that new material be
*integrated* rather than appended — a source that produces one isolated page has
deposited nothing, because nothing else in the vault got better. This is why
[[Ingest A Source]] targets 10–15 touched pages rather than one.

## Links
- supports:: [[LLM Wiki]]
- depends-on:: [[Memory Consolidation]] — without promotion and decay, accumulation is mistaken for compounding
- contradicts:: [[Index Collapse]] — accumulation without structure eventually destroys the returns

## Open questions
- At what corpus size does integration cost per source start exceeding the value it adds?
