---
title: Gentle Rebalancing
created: 2026-07-29
updated: 2026-07-29
type: concept
tags: [quant, robot-james, execution, rebalancing, costs]
sources: [03_Sources/Robot James Method Library - Caps 1 to 9.md, 03_Sources/robot-james/raw-extracts/04-crypto-violence-and-the-gentle-rebalancing.md]
confidence: medium
---

# Gentle Rebalancing

Trade gently. Forecasts usually evolve continuously, so exposures should evolve continuously too — rather than flipping between full-on and flat on a threshold crossing.

## Summary

A binary rule ("if signal > X, go long; else flat") converts a smooth underlying forecast into a step function. That introduces two costs that have nothing to do with whether the forecast is any good:

1. **Turnover cost** — every threshold crossing is a round trip, and crossings cluster exactly when the signal is noisiest.
2. **Threshold sensitivity** — the strategy's results become a function of where the line was drawn, which is a parameter you fitted.

Continuous position sizing proportional to forecast strength avoids both. The forecast can be equally good and the strategy performs better, purely from execution shape.

## Key claims

- Forecasts usually evolve continuously, so exposures should too — source: `03_Sources/Robot James Method Library - Caps 1 to 9.md`
- Trading gently is presented as a general execution principle, not a per-strategy optimisation — source: `03_Sources/robot-james/raw-extracts/04-crypto-violence-and-the-gentle-rebalancing.md`
- Rebalancing is itself a [[forced-flows]] generator when done by large price-insensitive holders — the same mechanic you exploit in others, you should avoid exhibiting yourself — source: `03_Sources/robot-james/raw-extracts/01-three-dead-simple-edges-in-macro.md`

## Direct relevance to a recorded Quant Floor failure

QTF-V04 tested regime-gated mean reversion and produced **zero holdout trades** — the regime gate was too tight. QTF-V04B relaxed it in four graduated steps and holdout trades appeared, confirming the gate rather than the signal was the binding constraint.

That is a binary-threshold failure. A continuously-sized version of the same forecast would not have produced zero trades, because there is no gate to be on the wrong side of. The `do_not_promote` decision may have been correct on the merits, but the zero-trade result was an artefact of execution shape, not evidence about the edge.

## Links

- Avoids exhibiting: [[forced-flows]]
- Constrained by: [[survival-sizing]]
- Evaluation: [[edge-class-evaluation]]
- Source library: [[Robot James Method Library - Caps 1 to 9]]
- Raw extract: [[04-crypto-violence-and-the-gentle-rebalancing]]

## Open questions

- Should the QTF-V04 regime mean-reversion test be re-run with continuous sizing before the `do_not_promote` decision is treated as settled?
- How much of the observed jitter fragility across sleeves (38.5%, 38.0%, 15.4% survival) is threshold sensitivity rather than genuine signal weakness?
