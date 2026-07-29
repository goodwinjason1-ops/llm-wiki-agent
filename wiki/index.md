---
title: index
type: map
tier: semantic
status: active
confidence: 0.9
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
tags: [meta/vault]
aliases: [Home, Vault Home]
---

# Vault Index

> The root of the wiki. Everything reachable, in the order that makes it make sense.

This vault is an **LLM Wiki v2** knowledge base: raw material in `sources/`,
synthesised knowledge here in `wiki/`, and the rules that govern both in
[`SCHEMA.md`](../SCHEMA.md).

## Start here

- [[Second Brain Operations]] — the map of how this vault is run

## The idea

- [[LLM Wiki]] — the pattern this vault implements
- [[Compounding Knowledge]] — why a persistent artifact beats repeated retrieval
- [[Index Collapse]] — the failure mode that forces structure

## The mechanics

- [[Memory Consolidation]] — how knowledge is promoted through tiers
- [[Typed Knowledge Graph]] — why links carry meaning
- [[Provenance Chain]] — why every claim keeps its origin
- [[Cross-Domain Analogy]] — the connection worth building all this for

## Doing the work

- [[Ingest A Source]]
- [[Weekly Consolidation]]

## Open questions

- [[Where Does Index Collapse Actually Start]]

## Folders

| Folder | What lives there |
|---|---|
| `inbox/` | unprocessed capture — should be empty after each consolidation |
| `journal/` | dated working notes |
| `literature/` | one page per source document |
| `concepts/` | ideas and models |
| `entities/` | people, orgs, tools, projects |
| `procedures/` | tested methods |
| `questions/` | open questions |
| `maps/` | Maps of Content |

## Seeing the whole thing

```bash
python3 tools/build_graph.py --open    # 3D galaxy view
python3 tools/lint_vault.py            # health check
python3 tools/suggest_links.py         # connections you have not made yet
```
