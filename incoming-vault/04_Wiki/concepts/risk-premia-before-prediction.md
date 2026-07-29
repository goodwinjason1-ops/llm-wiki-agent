---
title: Risk Premia Before Prediction
created: 2026-07-29
updated: 2026-07-29
type: concept
tags: [quant, robot-james, risk-premia, strategy-selection]
sources: [03_Sources/Robot James Method Library - Caps 1 to 9.md, 03_Sources/robot-james/raw-extracts/08-three-types-of-systematic-trading.md]
confidence: medium
---

# Risk Premia Before Prediction

Prefer easy games. Harvesting a diversified risk premium requires being paid to bear a risk others want to shed. Predicting direction requires being right more often than a liquid market full of people trying to do the same thing.

## Summary

The starting assumption is that **liquid markets are roughly fair most of the time**. Under that assumption, strategies divide by how much they need you to be smarter than the market:

- **Risk premia** — you are paid for bearing a risk. Requires no forecasting skill, only survival and discipline.
- **Forced flows** — you are paid for supplying liquidity to someone who must trade. Requires identifying the participant. See [[forced-flows]].
- **Prediction** — you are paid for being right. Requires genuine, persistent informational or analytical advantage.

The ordering matters. A vault full of prediction strategies with no risk-premia base is a portfolio that only works if you are consistently smarter than the market — which is the least defensible assumption available.

## Key claims

- Assume liquid markets are roughly fair most of the time — source: `03_Sources/Robot James Method Library - Caps 1 to 9.md`
- Prefer easy games: diversified risk premia before heroic prediction — source: `03_Sources/Robot James Method Library - Caps 1 to 9.md`
- Strategies should be judged according to their edge class, not through one generic backtest — source: `03_Sources/robot-james/raw-extracts/08-three-types-of-systematic-trading.md`
- The source treats this as an operating system rather than a set of copyable rules — the ordering of the nine principles is itself the content ^conf:medium — our reading

## Why this matters for the Quant Floor

Reviewing the current sleeve inventory against this ordering is uncomfortable: the active work is largely regime, momentum and funding-extreme prediction, and the `do_not_promote` decisions have been consistent. That pattern is what you would expect if the strategies were drawn predominantly from the hardest class.

This is not an argument that the work is wrong. It is an argument that a diversified risk-premia baseline is missing, and without one there is no benchmark for what "adequate" looks like.

## Links

- Ordering depends on: [[forced-flows]]
- Evaluation method: [[edge-class-evaluation]]
- Risk constraint: [[survival-sizing]]
- Execution discipline: [[gentle-rebalancing]]
- Source library: [[Robot James Method Library - Caps 1 to 9]]

## Open questions

- What is the crypto-native equivalent of a diversified risk premium — funding carry, basis, or something else? Funding carry was tested (QTF-V07) and cost-adjusted returns collapsed jitter survival to 15.4%, suggesting the apparent edge was price reversal rather than carry.
- Should the Quant Floor hold a passive benchmark sleeve purely to make "do we beat doing nothing?" answerable?
