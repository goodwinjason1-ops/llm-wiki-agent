---
title: Survival Sizing
created: 2026-07-29
updated: 2026-07-29
type: concept
tags: [quant, robot-james, risk, position-sizing, leverage]
sources: [03_Sources/Robot James Method Library - Caps 1 to 9.md, 03_Sources/robot-james/raw-extracts/03-trading-to-stay-alive.md]
confidence: medium
---

# Survival Sizing

Size leveraged and short positions to survive adverse movement **and** volatility expansion — not to maximise expected return. The doctrine that applies across every strategy regardless of edge class.

## Summary

Risk is slippery because a position changes size as price moves against you, and the volatility of that position can expand at the same time. Both effects compound in the same direction, which is why leveraged and short positions fail faster than their backtested drawdowns suggest.

A short is the cleanest illustration: as price rises, notional exposure grows, so the position becomes larger exactly when it is losing. The same mechanic that makes shorts a source of [[forced-flows]] for others makes them a survival problem for you.

## Key claims

- Risk is slippery: a position changes size as price moves, and its volatility can also change — source: `03_Sources/robot-james/raw-extracts/03-trading-to-stay-alive.md`
- Size leveraged and short positions to survive adverse movement and volatility expansion — source: `03_Sources/Robot James Method Library - Caps 1 to 9.md`
- The risk doctrine should apply across every Quant Floor strategy, not per-sleeve — source: `03_Sources/Robot James Method Library - Caps 1 to 9.md`
- Survival is a precondition for every other principle: an edge you cannot hold through drawdown is not an edge you have ^conf:medium — our reading

## Relationship to the promotion gates

The Quant Floor's existing gates — jitter robustness ≥ 60% survival, cost sensitivity, chronological holdout — are survival tests in a different vocabulary. They ask whether the strategy survives parameter perturbation and realistic costs. Survival sizing asks whether *the position* survives the path.

These are complementary and both are needed. QTF-V01 TTM-01 illustrates the gap: on the holdout it returned −0.21% against BTC −44.7%, which is capital preservation rather than edge. It survived. It did not earn.

## Links

- Constrains: [[risk-premia-before-prediction]], [[relative-value-pairs]], [[forced-flows]]
- Complements: [[edge-class-evaluation]]
- Execution counterpart: [[gentle-rebalancing]]
- Source library: [[Robot James Method Library - Caps 1 to 9]]
- Raw extract: [[03-trading-to-stay-alive]]

## Open questions

- What is the explicit maximum adverse excursion the Quant Floor sizes to survive? This is not currently written down anywhere in the vault — it is implied by `hold_zero_allocation` but never stated as a number.
- Do the paper sleeves model volatility expansion, or only price movement?
