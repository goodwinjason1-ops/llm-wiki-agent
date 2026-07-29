---
title: QTF-002 Standalone Markov Directional Strategy
created: 2026-07-03
updated: 2026-07-03
type: quant-strategy
tags: [quant, trading, strategy, paper-trading]
sources: [https://youtu.be/Z-hU97WO30I, https://youtu.be/MbfuJZZ01IU]
confidence: medium
---

# QTF-002 Standalone Markov Directional Strategy

## Purpose

Trade the regime signal directly instead of using it only as a filter.

## Hypothesis

Bull and bear states are sticky enough that entering in the direction of the current regime can produce positive expectancy.

## Entry rules

1. Compute current regime using [[QTF-001 Markov Regime Filter]] or [[QTF-004 Enhanced Regime Scoring Model]].
2. Estimate transition probabilities from historical training data:
   - P(next = Bull | current = Bull)
   - P(next = Bear | current = Bear)
   - P(next = Sideways | current = Sideways)
3. Calculate directional confidence:

```text
bull_score = P(Bull -> Bull) - P(Bull -> Bear)
bear_score = P(Bear -> Bear) - P(Bear -> Bull)
```

4. Go long when current state is Bull and `bull_score` exceeds threshold.
5. Go short when current state is Bear and `bear_score` exceeds threshold.
6. Stay flat in Sideways unless a separate mean-reversion model exists.

## Position sizing

Scale position by signal confidence but cap risk:

```text
position_size = min(max_size, base_size * normalized_confidence)
```

Start conservative:

- Max risk per trade: 0.25% to 1% in simulation.
- Max gross exposure: 1x until proven.

## Exit rules

- Exit long if regime changes to Bear or Sideways.
- Exit short if regime changes to Bull or Sideways.
- Optional: trailing volatility stop using ATR.

## Validation

Must be walk-forward tested. Standalone mode is more fragile than filter mode.

## Failure modes

- Late regime flips after trend already exhausted.
- Whipsaw in sideways markets.
- Overfit transition thresholds.
- Large losses during violent regime changes.

## Self-improvement requirements

This strategy must be handled through [[Self-Improvement Protocol|AI Quant Trading Floor Self-Improvement Protocol]]. Every iteration must record:

- what was tested,
- what evidence was produced,
- what failed or improved,
- what reusable lesson was learned,
- what artifact should be updated,
- whether the strategy should be rejected, revised, forward-tested, or escalated for human review.

Do not promote this strategy without reproducible backtest evidence, walk-forward/out-of-sample validation, and paper-trading review where appropriate.

