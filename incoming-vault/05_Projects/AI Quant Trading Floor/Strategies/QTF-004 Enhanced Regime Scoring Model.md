---
title: QTF-004 Enhanced Regime Scoring Model
created: 2026-07-03
updated: 2026-07-03
type: quant-strategy
tags: [quant, trading, strategy, paper-trading]
sources: [https://youtu.be/Z-hU97WO30I, https://youtu.be/MbfuJZZ01IU]
confidence: medium
---

# QTF-004 Enhanced Regime Scoring Model

## Purpose

Create a numeric regime score rather than a single brittle state label.

## Hypothesis

Combining trend, volatility, momentum, and transition stickiness produces a more useful signal than price-only state classification.

## Components

| Component | Meaning | Example |
|---|---|---|
| Trend score | Direction and slope | MA slope, 20-bar return |
| Momentum score | Strength of move | RSI, MACD histogram, ROC |
| Volatility score | Risk/chop | ATR%, rolling stdev |
| Stickiness score | Regime persistence | P(current -> same state) |
| Transition score | Next-state probability | Transition matrix |

## Output

```text
regime_score ∈ [-100, +100]
```

Interpretation:

- `+50 to +100`: strong bullish trend regime
- `+15 to +50`: mild bullish regime
- `-15 to +15`: sideways/chop
- `-50 to -15`: mild bearish regime
- `-100 to -50`: strong bearish regime

## Trading use

- As a filter: allow long trend strategies above +15; allow short trend strategies below -15; avoid trend trades in chop.
- As sizing: scale exposure by absolute score, capped by risk policy.
- As optimizer feature: rank which indicator families work best in which regime.

## Backtest controls

All component normalizations must be fit on past data only, not the full dataset.

## Self-improvement requirements

This strategy must be handled through [[Self-Improvement Protocol|AI Quant Trading Floor Self-Improvement Protocol]]. Every iteration must record:

- what was tested,
- what evidence was produced,
- what failed or improved,
- what reusable lesson was learned,
- what artifact should be updated,
- whether the strategy should be rejected, revised, forward-tested, or escalated for human review.

Do not promote this strategy without reproducible backtest evidence, walk-forward/out-of-sample validation, and paper-trading review where appropriate.

