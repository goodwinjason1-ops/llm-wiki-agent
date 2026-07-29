---
title: Price Reversal Mechanism — Edge Investigation - 2026-07-18
created: 2026-07-18
updated: 2026-07-18
type: edge-investigation
status: active-research
edge_family: mean-reversion-and-reversal
managed_as: paper-only
confidence: low
tags: [quant, reversal, mean-reversion, paper-only, edge-investigation]
---

# Price Reversal Mechanism — Edge Investigation

## Purpose

Investigate whether observable price reversals after extreme moves constitute a repeatable, testable edge under the Quant Floor framework. This is NOT a claim that reversals exist — it is a research question to be tested against the edge-first mandate.

## Context

Jayse noted that coins can drop 7-8% in a day (as reported on CoinDesk) and that this appears to be trend continuation from prior days, not necessarily a reversal. The key insight: **we need to distinguish reversal from continuation**. A coin down 8% could be:
1. A reversal signal (oversold bounce coming)
2. Trend continuation (more downside ahead)
3. Noise (no predictive signal)

The current morning brief tracks both leaders and laggards bidirectionally, but the reversal edge itself needs a formal edge card.

## Research Question

> After a significant price move (up or down) over a defined lookback window, does the asset exhibit mean-reverting behaviour (reversal) or trend continuation over a defined forward horizon, after costs and realistic execution assumptions?

## Hypothesis Families

### H1: Oversold bounce (reversal)
After a coin drops >X% in Y days (e.g., 7d > -7%), the next Z days show positive average returns vs the control universe, after costs.

### H2: Overbought fade (reversal)
After a coin rises >X% in Y days (e.g., 7d > +7%), the next Z days show negative average returns vs the control universe, after costs.

### H3: Continuation (momentum)
After a coin drops >X% in Y days, the next Z days show continued negative returns (trend continuation, NOT reversal).

### H4: Funding-rate extreme reversal
After funding rates hit extreme levels (positive or negative), price reverses direction within a defined window.

## Required Data

- Bybit public spot daily klines for top 50 coins by volume (canonical universe)
- Hyperliquid perpetual funding rates for the same universe
- Forward returns: next 1d, 3d, 7d, 14d, 30d after signal formation
- Costs: 20 bps per position change (spot), funding payments (perps)
- Benchmarks: cash, equal-weight universe, BTC buy-and-hold

## Test Design

1. **Signal formation:** At daily close t, compute 7d and 30d returns for all N assets in the canonical universe.
2. **Threshold:** Define "extreme" as top/bottom decile or fixed % threshold (e.g., >±7% in 7d).
3. **Forward returns:** Measure next 1d, 3d, 7d, 14d, 30d returns for signal assets vs non-signal assets.
4. **Controls:** Compare against equal-weight universe, BTC control, and cash.
5. **Costs:** Apply 20 bps per trade for spot; include funding for perps.
6. **Validation:** Walk-forward with 4+ chronological folds, holdout set, parameter jitter on thresholds.

## Gates

- **Data:** >= 1,095 daily observations per asset, SHA-256 recorded.
- **Bias:** Signal at t uses only data through t; forward returns computed after signal.
- **Robustness:** Results must hold across multiple lookback windows (7d, 14d, 30d) and thresholds (decile-based, fixed %).
- **Economics:** Net return must exceed cash and equal-weight benchmark after costs.
- **Risk:** Max drawdown must be manageable; no single fold with >-15% return.

## Next Steps

1. Freeze canonical universe OHLCV data for top 50 Bybit spot coins.
2. Implement signal formation for top/bottom decile and fixed threshold approaches.
3. Compute forward returns at 1d/3d/7d/14d/30d horizons.
4. Run walk-forward validation.
5. Compare reversal vs continuation hypothesis — the edge may be that extreme moves CONTINUE, not reverse.

## Relation to Other Edges

- This is a **regime-gated mean reversion** edge (per the Edge-First Production Mandate).
- It must be tested alongside the bidirectional momentum edge (TTM-01) — if momentum continues after extreme moves, that strengthens the trend sleeve.
- Funding-rate extremes (carry sleeve) may interact: high funding + price drop = potential squeeze reversal.
- This edge is equally applicable to upside extremes (overbought fade) and downside extremes (oversold bounce).

## Source Links

- [[QTF Edge-First Production Mandate]]
- [[2026-07-14 Tactical Momentum Trend Production Edge Card]]
- [[QTF Edge Measurement Toolkit - 2026-07-14]]
- CoinDesk reporting on 7-8% daily drops (secondary, not evidence)
