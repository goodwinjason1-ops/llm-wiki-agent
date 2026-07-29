---
title: Weekly Consolidation
type: procedure
tier: procedural
status: active
confidence: 0.7
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
tags: [knowledge/operations, knowledge/lifecycle, meta/vault]
aliases: [Consolidation pass, Weekly review]
---

# Weekly Consolidation

> The pass that promotes knowledge up the tiers and stops the vault flattening into
> a junk drawer.

## Preconditions

- Recent ingests are complete.
- You are willing to lower confidence on things, not only raise it.

## Steps

1. **Empty the inbox.** Every note in `wiki/inbox/` gets filed into
   literature/concepts/entities, or explicitly discarded. The inbox ends at zero.
   Always. An inbox with permanent residents is a second, worse vault.
2. **Promote episodic → semantic.** Find claims that now appear in two or more
   *independent* sources. Abstract each into a `concepts/` page at `tier: semantic`
   with raised confidence. Keep the literature pages and cite them — that citation is
   the [[Provenance Chain]].
3. **Promote semantic → procedural.** Where a cluster of concepts has become
   something you would actually *do*, write a `procedures/` page: preconditions,
   steps, failure modes.
4. **Decay.** Run the linter and work the `stale` list. For each note past its tier
   half-life: re-verify and bump `reviewed`, or lower `confidence` to match how much
   you actually still trust it.
5. **Resolve or escalate contradictions.** Each `contradicts::` pair either gets new
   evidence, or gets a `questions/` note naming what evidence would settle it.
6. **Look for what is missing.** `python3 tools/suggest_links.py` — work the
   `analogy`, `bridge` and `cluster` sections first; those carry the most information.
7. **Rebuild the galaxy** and look at it. Scattered dust means orphans. One dense
   blob means insufficient differentiation.

## Never

Delete the lower tier when promoting. Compression without provenance is forgetting
with extra steps.

## Failure modes

| Symptom | What went wrong |
|---|---|
| Inbox has notes older than a week | Step 1 is being skipped |
| Confidence only ever rises | Step 4 is being skipped |
| No contradictions on record | They are being silently averaged away |
| Semantic pages with no literature citations | Step 2 deleted the tier below |

## Links
- part-of:: [[Second Brain Operations]]
- uses:: [[Memory Consolidation]]
- depends-on:: [[Ingest A Source]]
- uses:: [[Cross-Domain Analogy]]
