---
title: Independent Reproduction
created: 2026-07-29
updated: 2026-07-29
type: concept
tags: [quant, robot-james, methodology, evidence, provenance]
sources: [03_Sources/Robot James Method Library - Caps 1 to 9.md, 03_Sources/robot-james/raw-extracts/09-the-best-places-to-get-trading-ideas.md]
confidence: medium-high
---

# Independent Reproduction

A borrowed idea is a hypothesis until you have rebuilt it from independent data with realistic costs and next-bar execution. Someone else's reported backtest is evidence about their process, not about the market.

## Summary

This is the principle that separates a research library from a collection of claims. It has a strong form and a weak form, and the vault should be explicit about which applies to any given sleeve:

- **Weak** — you have the rules and reproduced the result. The idea is testable.
- **Strong** — you reproduced it on data the original author did not use, and it survived. The idea is portable.

Most captured material cannot even reach the weak form, because the rules are incomplete.

## Key claims

- Independently reproduce borrowed ideas and continually mine live and paper results for anomalies — source: `03_Sources/Robot James Method Library - Caps 1 to 9.md`
- Claimed backtests are author-reported unless reproduced with independent data, realistic costs and next-bar execution — source: `03_Sources/Robot James Method Library - Caps 1 to 9.md`
- Where a public extract stops, missing rules are marked unknown or paywalled rather than reconstructed — source: `03_Sources/Robot James Method Library - Caps 1 to 9.md`
- Chart images are not sufficient evidence to infer a rule — source: `03_Sources/robot-james/raw-extracts/01-three-dead-simple-edges-in-macro.md`

## The discipline worth copying

The Robot James library does something the rest of this vault mostly does not: it **separates source statements from our interpretation**, and marks paywalled gaps explicitly rather than filling them in. Cap 2 (the long-vol VIX trade) is the clearest case — the source supplies an economic hypothesis, and the comparator, thresholds, sizing, exits and roll treatment are all absent. The library records this as "valuable hypothesis; blocked by missing rules and specialist data" instead of inventing a strategy.

That habit — marking the boundary of what the source actually established — should be the template for every source summary in `03_Sources/`, most of which currently assert without distinguishing what is known from what is inferred.

## Links

- Verifies: [[forced-flows]], [[relative-value-pairs]], [[risk-premia-before-prediction]]
- Method for: [[edge-class-evaluation]]
- Source library: [[Robot James Method Library - Caps 1 to 9]]
- Raw extract: [[09-the-best-places-to-get-trading-ideas]]

## Open questions

- Which existing Quant Floor sleeves reached the strong form, and which only the weak? This is not recorded per-sleeve and should be.
- Should `03_Sources` summaries carry a required "unknown / not stated in source" section, as the Robot James library does?
