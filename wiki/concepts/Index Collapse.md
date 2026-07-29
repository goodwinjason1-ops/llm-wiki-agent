---
title: Index Collapse
type: concept
tier: semantic
status: active
confidence: 0.65
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
sources:
  - https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2
tags: [knowledge/architecture, scaling/limits]
aliases: [Index rot, Flat index failure, Wiki scaling limit]
---

# Index Collapse

> The point where a flat list of everything stops helping you find anything.

## Summary

A single index page works beautifully at 20 notes and is useless at 2,000 — not
because it is wrong, but because a list whose length is the size of the corpus
carries no information about the corpus. The reader is back to scanning.

v2 identifies this as the concrete breakdown that forces the structural additions:
once simple index files stop working, you need retrieval that ranks (hybrid search)
and navigation that curates (Maps of Content), because enumeration no longer
discriminates.

## Key claims

- v2 states that simple index files break down beyond roughly 200 documents ^conf:0.7 — source: `llm-wiki-v2`
- The stated remedy is hybrid search fusing BM25, vector similarity and graph traversal ^conf:0.8 — source: `llm-wiki-v2`
- A Map of Content differs from an index in that it imposes an argument — an order and a grouping — rather than enumerating ^conf:0.7 — own inference
- The ~200 figure is a rule of thumb from one practitioner's experience, not a measured threshold ^conf:0.4 — inferred from the source's framing; no methodology given

## The response in this vault

- MOCs are created once a cluster passes ~7 notes, and are required to impose an
  order rather than list files.
- The galaxy view exists partly as a diagnostic: dust means orphans, one dense blob
  means insufficient differentiation.

## Links
- contradicts:: [[Compounding Knowledge]] — unstructured accumulation eventually reverses the returns
- supports:: [[Typed Knowledge Graph]] — typed traversal is one escape from flat enumeration
- analogous-to:: [[Memory Consolidation]] — both treat "everything weighted equally" as the root failure
- contradicts:: [[Where Does Index Collapse Actually Start]] — that note disputes the ~200 figure this page rests on

## Open questions
- [[Where Does Index Collapse Actually Start]]
