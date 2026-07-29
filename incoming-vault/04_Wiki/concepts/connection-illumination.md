---
title: Connection Illumination
created: 2026-07-29
updated: 2026-07-29
type: concept
tags: [second-brain, llm-wiki, obsidian, connections, tooling]
sources: [03_Sources/articles/karpathy-ai-second-brain-connection-layer.md, 00_System/Scripts/connection_illuminator.py]
confidence: high
---

# Connection Illumination

A repeatable scan for relationships the vault implies but has not recorded: pages that are semantically related but unlinked, pages with no inbound links, and clusters that deserve a concept page.

## Summary

The Karpathy pattern's three operations — ingest, query, lint — keep a wiki *correct*. None of them make it *connected*. Connection illumination is the fourth operation: it looks for structure that should exist and doesn't.

It is also the operation most easily broken, because its output is advisory. An ingest that fails is visible; a connection pass that emits noise just gets ignored, and nothing signals the failure. That is precisely what happened here — see [[synthesis-debt]].

## What makes the scan useful rather than noisy

Learned from the failure of the first implementation:

1. **Rarity weighting.** Shared vocabulary must be weighted by how rare it is. Without this, every pair of notes "shares" the words *access, across, actions, against*, and the output is alphabetical stopwords.
2. **Memory.** Every suggestion must be recorded so it is never proposed twice. Without this the same three candidates recur daily until they are wallpaper.
3. **Duplicates named as duplicates.** The original once asked whether `AI Backtesting…VDpTU5kdj8A` should be "connected to" `ai-backtesting-…-VDpTU5kdj8A`. Those are one source under two naming conventions. That is a merge, not a link.
4. **Series suppression.** `Morning Brief - 2026-07-21` and `Morning Brief - Latest` are trivially similar. Linking them is noise.
5. **Cross-folder ranked first.** Two notes in the same folder being similar is unremarkable. Two notes in different folders sharing rare vocabulary is the connection you were unlikely to make yourself, because you search within a topic.
6. **A cap.** An unbounded list is a list nobody reads.

## Key claims

- The missing layer in this vault was a connection illumination pass, not more capture — source: `03_Sources/articles/karpathy-ai-second-brain-connection-layer.md`
- The stated purpose is finding missed connections and surfacing forgotten insights, not search — source: `03_Sources/articles/karpathy-ai-second-brain-connection-layer.md`
- Suggested links are hypotheses; both pages must be read before editing — source: `SCHEMA.md`
- Measured action rate on the original implementation was 2 of 32 distinct suggestions over 22 days — source: `04_Wiki/queries/` review history

## Current implementation

`00_System/Scripts/connection_illuminator.py`, rewritten 2026-07-29. Reports four categories: merge candidates, stalled generators, cross-folder connections, same-folder connections. Dry-run by default; `--write` files the review and records the suggestions so they are not repeated.

On first run against the repaired vault it found 57 merge candidates and 2 stalled generator series (`inbox processor report` and `vault loop report`, each 21 notes with 100% identical consecutive content).

## Links

- Diagnoses: [[synthesis-debt]]
- Part of: [[self-improvement-loop]], [[ai-second-brain]]
- Pattern source: [[karpathy-llm-wiki]]

## Open questions

- Should acting on a suggestion be detected automatically (the link now exists) rather than assumed once proposed?
- The scan is lexical. Would embeddings surface genuinely different connections, or just the same ones with more compute?
