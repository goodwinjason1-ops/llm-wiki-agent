---
title: Synthesis Debt
created: 2026-07-29
updated: 2026-07-29
type: concept
tags: [second-brain, llm-wiki, obsidian, vault-health, meta]
sources: [04_Wiki/queries/Missed Connections Review - 2026-07-29.md, 03_Sources/articles/karpathy-ai-second-brain-connection-layer.md]
confidence: high
---

# Synthesis Debt

The gap between what a vault has captured and what it has actually understood. Capture is fast and feels productive; synthesis is slow and feels optional. The debt is the difference, and it compounds silently.

## Summary

A second brain has two pipelines. The **capture pipeline** takes material in and files it. The **synthesis pipeline** turns filed material into claims you can reason with. Only the second produces the thing the vault exists for.

Capture gives immediate feedback — the file appears, the count goes up. Synthesis gives none until the moment you need an answer and find you only have sources. So capture runs and synthesis stalls, and because the folder counts keep rising, nothing signals a problem.

## The measurement

Measured on this vault, 2026-07-29:

```
02_Raw            190 notes     ← capture: working
03_Sources         80 notes     ← summarisation: working
04_Wiki/concepts    5 notes     ← synthesis: stalled
```

Two supporting figures confirm it is the pipeline and not just a backlog:

- **6 of 80** source summaries link into `04_Wiki` at all — 31 of 35 YouTube summaries have no Links section whatsoever
- **0 of 28** wiki notes link back to `02_Raw` — the provenance chain the Karpathy pattern depends on does not exist

Vault-wide: 26% of notes have no inbound links, 67% have no outbound links, and the graph is in 199 disconnected components.

## Why it stalled here specifically

Not laziness — a broken feedback instrument. The connection illuminator was supposed to drive synthesis by surfacing what to link. It matched on unfiltered shared vocabulary, so its output was stopwords (`access, across, actions, against`) and its top suggestion was linking a "Latest" note to seven dated copies of itself. Across 23 daily reviews it produced 89 suggestions, 32 distinct, of which **2** were ever acted on.

A tool with a 6% action rate teaches you to ignore it. Once ignored, the only mechanism driving synthesis was gone, and capture continued unchecked.

The `Next synthesis candidates` block was byte-identical in 22 of 23 reviews — the same three suggestions from 8 July to 29 July, because the script had no memory of what it had already proposed.

## How to tell if it is accumulating

- Ratio of `04_Wiki` concepts to `03_Sources` summaries is falling
- Source summaries with no outbound links to the wiki
- Wiki pages that cite no raw source
- A connection tool whose suggestions repeat
- Dated report series with identical content run after run — see the `stalled generators` section of the connection review

## Repayment

Debt is repaid by synthesis, not by more capture. Concretely: take one cluster of source summaries, write the concept page they are all circling, cite each summary from it, and link back from each summary to it. One cluster at a time. The [[Robot James Method Library - Caps 1 to 9]] cluster was repaid first because it was the most coherent — see [[forced-flows]], [[risk-premia-before-prediction]], [[survival-sizing]], [[gentle-rebalancing]], [[edge-class-evaluation]], [[relative-value-pairs]], [[independent-reproduction]].

## Links

- Diagnosed by: [[connection-illumination]]
- Pattern being implemented: [[karpathy-llm-wiki]], [[ai-second-brain]]
- Loop that should prevent it: [[self-improvement-loop]]

## Open questions

- What is a healthy concepts-to-sources ratio? 5:80 is clearly broken; 80:80 would be a different failure (one concept per source is filing, not synthesis).
- Should the weekly loop refuse to report "clean" while the ratio is below a threshold?
