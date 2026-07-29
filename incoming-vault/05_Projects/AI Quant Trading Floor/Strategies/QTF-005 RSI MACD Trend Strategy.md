---
title: QTF-005 RSI MACD Trend Strategy
created: 2026-07-03
updated: 2026-07-03
type: quant-strategy
tags: [quant, trading, strategy, paper-trading]
sources: [https://youtu.be/Z-hU97WO30I, https://youtu.be/MbfuJZZ01IU]
confidence: medium
---

# QTF-005 RSI MACD Trend Strategy

## Purpose

Create a simple baseline strategy from the second video's closing “RSI and MACD” motif and use it as a test candidate for the trading floor.

## Hypothesis

MACD trend confirmation plus RSI pullback/strength filtering can capture medium-term momentum while avoiding some overextended entries.

## Indicators

- MACD fast/slow/signal: default 12/26/9.
- RSI length: default 14.
- Optional regime filter: [[QTF-001 Markov Regime Filter]].
- Optional volume confirmation where available.

## Long entry v0

Enter long when:

1. Regime filter is Bull or disabled.
2. MACD line crosses above signal line, or MACD histogram turns positive.
3. RSI is between 45 and 70.
4. Price is above a trend MA, e.g. EMA 200, for higher-timeframe confirmation.

## Short entry v0

Enter short when:

1. Regime filter is Bear or disabled.
2. MACD line crosses below signal line, or MACD histogram turns negative.
3. RSI is between 30 and 55.
4. Price is below EMA 200.

## Exit rules

- Exit long when MACD flips bearish, RSI exceeds overbought and rolls over, or regime changes to Bear/Sideways.
- Exit short when MACD flips bullish, RSI becomes oversold and recovers, or regime changes to Bull/Sideways.
- Always test ATR stop and time stop variants.

## Optimization ranges

- MACD fast: 8–16
- MACD slow: 20–34
- MACD signal: 5–12
- RSI length: 7–21
- RSI long band: 40–75
- RSI short band: 25–60

## Validation

Use this as a baseline, not a finished edge. Compare with and without Markov regime filter.

## Self-improvement requirements

This strategy must be handled through [[Self-Improvement Protocol|AI Quant Trading Floor Self-Improvement Protocol]]. Every iteration must record:

- what was tested,
- what evidence was produced,
- what failed or improved,
- what reusable lesson was learned,
- what artifact should be updated,
- whether the strategy should be rejected, revised, forward-tested, or escalated for human review.

Do not promote this strategy without reproducible backtest evidence, walk-forward/out-of-sample validation, and paper-trading review where appropriate.

