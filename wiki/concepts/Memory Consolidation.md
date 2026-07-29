---
title: Memory Consolidation
type: concept
tier: semantic
status: active
confidence: 0.8
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
sources:
  - https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2
tags: [knowledge/lifecycle, ai/memory, cognition/memory]
aliases: [Consolidation, Memory tiers, Knowledge promotion]
---

# Memory Consolidation

> Knowledge is promoted through tiers as evidence accumulates, getting more
> compressed and more trusted at each step.

## Summary

The v2 extension's answer to the observation that most wikis weight everything
equally: a claim written once from one blog post sits beside a conclusion verified
across a dozen sources, and nothing in the file distinguishes them. Consolidation
introduces a progression — working → episodic → semantic → procedural — where
promotion requires evidence and costs detail.

The borrowing from human memory research is deliberate and explicit in the naming,
though it is an organising metaphor rather than a claim about mechanism.

## Key claims

- v2 defines four consolidation tiers: working, episodic, semantic and procedural ^conf:0.9 — source: `llm-wiki-v2`
- Each tier is more compressed and more confident than the one below it ^conf:0.85 — source: `llm-wiki-v2`
- Information is promoted as evidence accumulates rather than on a fixed schedule ^conf:0.8 — source: `llm-wiki-v2`
- The mechanism exists to stop wikis becoming "junk drawers" of equally-weighted information ^conf:0.85 — source: `llm-wiki-v2`
- v2 pairs tiers with confidence scoring, explicit supersession, and retention curves driven by access patterns ^conf:0.8 — source: `llm-wiki-v2`
- Promotion must not delete the lower tier, or the citation chain that justifies the promoted claim is destroyed ^conf:0.75 — own inference; see [[Provenance Chain]]

## The tiers as implemented here

| Tier | Holds | Half-life |
|---|---|---|
| working | unprocessed capture | 7d |
| episodic | one specific source or event | 90d |
| semantic | a general truth abstracted from episodes | 365d |
| procedural | a tested, repeatable method | 365d |

Half-life is not expiry — it is the point at which a note stops being trusted
silently and gets flagged for re-verification.

## Links
- part-of:: [[LLM Wiki]]
- depends-on:: [[Provenance Chain]] — promotion is only auditable if the lower tier survives
- supports:: [[Compounding Knowledge]] — this is what makes accumulation into compounding
- analogous-to:: [[Index Collapse]] — both are consequences of treating a growing corpus as flat
- supports:: [[Provenance Chain]] — tiers are only auditable because the chain survives promotion

## Open questions
- Should retention decay be driven by access frequency, as v2 suggests, or purely by age? Access-driven decay risks entrenching whatever you already look at.
