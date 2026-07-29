---
title: Provenance Chain
type: concept
tier: semantic
status: active
confidence: 0.8
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
tags: [knowledge/lifecycle, epistemics/evidence]
aliases: [Provenance, Citation chain, Audit trail]
---

# Provenance Chain

> The unbroken path from a compressed claim back to the raw material that justifies it.

## Summary

Six months after writing, a synthesised claim and a hallucinated one look identical
on the page. The only thing that distinguishes them is whether the claim carries its
origin. This is why every claim in this vault gets a source reference or an explicit
"own inference" marker, and why promotion between tiers never deletes the tier below.

The practical test: you should be able to ask *why do I believe this?* of any note
and get a real answer instead of a vibe.

## Key claims

- An unsourced claim in a vault is indistinguishable from a hallucination once the authoring context is forgotten ^conf:0.85 — own inference; the core argument for SCHEMA.md §10
- A fabricated source reference is strictly worse than no reference, because it launders a guess into a fact that every future read inherits ^conf:0.8 — own inference
- Superseded notes must be retained rather than deleted, because the record of what you used to think is what makes a change of mind auditable ^conf:0.75 — own inference from SCHEMA.md §9

## Consequences elsewhere

- **Supersession, not deletion.** Old notes keep their file and inbound links, and
  gain a forwarding address.
- **Contradictions are kept, not averaged.** Averaging two conflicting sources
  destroys the evidence that they conflicted at all.
- **Consolidation cites downward.** A semantic concept page names the episodic
  literature pages it was abstracted from.

## Links
- depends-on:: [[Memory Consolidation]] — promotion is the operation that would otherwise break the chain
- supports:: [[LLM Wiki]]
- supports:: [[Compounding Knowledge]] — deposits only count if they can be audited

## Open questions
- How should provenance be recorded for a claim synthesised across five sources, none of which states it alone?
