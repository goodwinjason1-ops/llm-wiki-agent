---
title: Relative Value Pairs
created: 2026-07-29
updated: 2026-07-29
type: concept
tags: [quant, robot-james, pairs-trading, relative-value, crypto]
sources: [03_Sources/Robot James Method Library - Caps 1 to 9.md, 03_Sources/robot-james/raw-extracts/05-pairs-trading-for-dickheads.md, 03_Sources/robot-james/raw-extracts/06-a-complete-temu-pairs-trading-strategy.md]
confidence: medium
---

# Relative Value Pairs

Compare genuinely similar assets and normalise the differences you can predict. What is left over is the part worth trading.

## Summary

Pairs trading works when two assets share most of their risk drivers, because the shared drivers cancel and the residual is smaller, more mean-reverting and less exposed to market direction. It fails when the assets are only superficially similar, because then the "spread" is just an unhedged directional bet wearing a disguise.

The discipline is therefore in the normalisation, not the signal:

1. **Establish genuine similarity** — shared sector, shared collateral, shared demand driver. Correlation alone is not similarity; it is a symptom that may not persist.
2. **Normalise predictable differences** — beta, funding, borrow, carry, volatility scaling. Anything you can forecast should be removed rather than traded.
3. **Trade the residual** — and only if it has a reason to revert, ideally a [[forced-flows]] one.

## Key claims

- Compare genuinely similar assets and normalise predictable differences — source: `03_Sources/Robot James Method Library - Caps 1 to 9.md`
- Distinguish temporary technical dislocations from informed repricing — source: `03_Sources/Robot James Method Library - Caps 1 to 9.md`
- The highest-priority implementation candidate is a public-data crypto pairs research sleeve enhanced with forced-flow classification, funding and borrow costs, two-leg execution costs and hard risk gates — source: `03_Sources/Robot James Method Library - Caps 1 to 9.md`
- Two-leg execution cost is a first-order term, not a rounding adjustment: every pairs trade pays the spread twice — source: `03_Sources/robot-james/raw-extracts/06-a-complete-temu-pairs-trading-strategy.md`

## Status in the Quant Floor

QTF-V05 implemented a costed function-based pairs backtest with rolling beta and residual construction on Bybit data, using next-bar fills, two-leg costs, observed funding and a chronological holdout. Both pairs returned `do_not_promote` and the test is recorded as partial.

That is the correct shape of test — it normalises beta and charges both legs. The open question is whether the pair selection established *genuine* similarity or only historical correlation.

## Links

- Depends on: [[forced-flows]] — a residual needs a reason to revert
- Constrained by: [[survival-sizing]], [[gentle-rebalancing]]
- Evaluated by: [[edge-class-evaluation]]
- Verified by: [[independent-reproduction]]
- Source library: [[Robot James Method Library - Caps 1 to 9]]
- Raw extracts: [[05-pairs-trading-for-dickheads]], [[06-a-complete-temu-pairs-trading-strategy]]

## Open questions

- Was QTF-V05's pair selection driven by economic similarity or by measured correlation? If correlation, the negative result may be about pair selection rather than about pairs trading.
- Which crypto pairs share genuine collateral or demand drivers, as opposed to just co-moving with BTC?
