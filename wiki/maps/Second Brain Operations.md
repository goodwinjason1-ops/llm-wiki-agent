---
title: Second Brain Operations
type: map
tier: semantic
status: active
confidence: 0.85
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
tags: [meta/vault, knowledge/operations]
aliases: [Vault Operations, How This Vault Works]
---

# Second Brain Operations

> How this vault is run, in the order the operations actually happen.

## The loop

1. **Capture** — raw material lands in `sources/`. Nothing is synthesised yet.
2. **[[Ingest A Source]]** — each source becomes one `literature/` page plus edits
   to 10–15 existing pages. This is where the compounding happens.
3. **[[Weekly Consolidation]]** — the inbox empties, episodic claims that recur get
   promoted to semantic concepts, stale notes get re-verified or flagged.
4. **Lint** — `python3 tools/lint_vault.py` catches the mechanical rot.
5. **Connect** — `python3 tools/suggest_links.py` proposes what has not been linked.

## Why each layer exists

| Layer | Fixes | Note |
|---|---|---|
| Persistent markdown | re-deriving the same synthesis every session | [[Compounding Knowledge]] |
| Folder taxonomy by epistemic kind | agents guessing where a fact belongs | [[LLM Wiki]] |
| Tiers + confidence | everything being trusted equally forever | [[Memory Consolidation]] |
| Typed edges | "related" being too vague to reason over | [[Typed Knowledge Graph]] |
| Source references on every claim | synthesis becoming indistinguishable from invention | [[Provenance Chain]] |
| MOCs | flat indexes failing past a few hundred notes | [[Index Collapse]] |

## Where it pays off

Everything above is bookkeeping in service of one payoff: [[Cross-Domain Analogy]].
The structure exists so that two clusters which grew independently can be noticed to
have the same shape.

## Links
- part-of:: [[LLM Wiki]]
- uses:: [[Memory Consolidation]]
- uses:: [[Typed Knowledge Graph]]
- uses:: [[Provenance Chain]]
- depends-on:: [[Compounding Knowledge]]

## Open questions
- [[Where Does Index Collapse Actually Start]]
