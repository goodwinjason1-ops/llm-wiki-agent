---
title: Where Does Index Collapse Actually Start
type: question
tier: episodic
status: active
confidence: 0.3
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
sources:
  - https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2
tags: [knowledge/architecture, scaling/limits, open-question]
aliases: [Index collapse threshold]
---

# Where Does Index Collapse Actually Start

> [[LLM Wiki v2 Gist]] puts the breakdown of flat indexes at ~200 documents. On what
> basis?

## The question

The ~200 figure is doing real architectural work in this vault — it is part of why
MOCs, typed traversal and the galaxy view exist at all. But the source states it
without methodology, sample, or definition of "breakdown". It reads as one
practitioner's rule of thumb.

Three things are unresolved:

1. **What is being measured?** Time to find a known note? Rate of failing to find one
   that exists? Rate of creating a duplicate because you did not find the original?
2. **Does it depend on note count or on topical spread?** 200 notes across three
   domains is plausibly fine; 200 across thirty is plausibly not. If so the threshold
   is not a count at all.
3. **Does the structure actually help, or just move the cost?** A MOC layer adds
   maintenance. That is only a win if flat-index cost grows faster than MOC cost.

## What would resolve it

- A measurement on this vault: log retrieval failures and duplicate creations against
  note count over time. Cheap, and it is the only data that would be about *this*
  corpus rather than someone else's.
- Any published work on personal-knowledge-base navigation thresholds. Not yet searched.

## Current stance

Treat ~200 as an order-of-magnitude prompt to add structure, not a threshold to
design against. The MOC-at-7-notes rule in `SCHEMA.md` §8 was chosen independently
and does not depend on this number being right.

## Links
- part-of:: [[Index Collapse]]
- contradicts:: [[Index Collapse]] — this note disputes the confidence of that page's central figure
- mentioned-in:: [[LLM Wiki v2 Gist]]
