---
title: Cross-Domain Analogy
type: concept
tier: semantic
status: active
confidence: 0.6
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
tags: [knowledge/graph, cognition/insight]
aliases: [Analogy, Structural analogy, Cross-domain link]
---

# Cross-Domain Analogy

> Two clusters from unrelated fields that turn out to have the same structure.

## Summary

Most links in a vault encode what you already knew when you wrote the note —
`depends-on` and `part-of` record structure you had in mind at authoring time. They
make retrieval faster; they do not make you smarter.

`analogous-to` is different. It joins two clusters that grew independently, usually
months apart, because they share a *shape*: the same failure mode, the same
trade-off, the same topology. This is the one edge type whose payoff is genuinely
new information rather than faster access to old information.

## Why humans miss these

People search within a domain. Retrieval is cued by vocabulary, and two fields
describing the same structure will almost never use the same words. An agent scanning
the whole vault at once has no such locality bias — which is the specific advantage
worth building the rest of this machinery for.

## Key claims

- Structural analogies are rarely found unaided because human retrieval is cued by domain vocabulary rather than by structure ^conf:0.6 — own inference, unverified against the memory-research literature
- A proposed analogy should be recorded at low confidence until confirmed, because a confidently-stated wrong analogy is worse than no analogy — it will be trusted ^conf:0.8 — own inference from SCHEMA.md §5

## How they are surfaced here

`tools/suggest_links.py` flags note pairs with high term overlap but **disjoint tag
domains**. High similarity within a domain is unremarkable; high similarity *across*
domains is the signal. The tool proposes; a human or agent confirms.

## Links
- instance-of:: [[Typed Knowledge Graph]]
- supports:: [[Compounding Knowledge]] — the return that justifies the bookkeeping
- depends-on:: [[Typed Knowledge Graph]] — needs a named edge type to exist as a first-class thing

## Open questions
- What false-positive rate does term-overlap-across-domains actually produce? Untested on a real vault.
