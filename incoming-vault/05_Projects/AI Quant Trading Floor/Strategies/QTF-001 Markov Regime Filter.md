---
title: QTF-001 Markov Regime Filter
created: 2026-07-03
updated: 2026-07-03
type: quant-strategy
tags: [quant, trading, strategy, paper-trading]
sources: [https://youtu.be/Z-hU97WO30I, https://youtu.be/MbfuJZZ01IU]
confidence: medium
---

# QTF-001 Markov Regime Filter

## Purpose

Use market regime classification as a **gate** over another strategy. The filter does not invent entries; it decides when an existing long/short strategy is allowed to act.

## Hypothesis

Strategies perform better when trades align with the current market regime and avoid sideways/chop conditions.

## Market/timeframe

- Start with: SPY daily, BTC daily, XAUUSD 4H/daily, major FX pairs daily.
- Later test: 1H and 4H crypto/forex if enough data exists.

## State definition v0

Calculate rolling 20-bar return:

```text
r20 = close / close[20] - 1
```

Initial labels:

```text
Bull:     r20 > +5%
Bear:     r20 < -5%
Sideways: otherwise
```

These thresholds are only a baseline; replace with [[QTF-003 Hidden Markov Regime Strategy]] or quantile thresholds after validation.

## Signal rules

- If state = Bull: allow long entries from the base strategy; block shorts unless base strategy is explicitly mean-reversion.
- If state = Bear: allow short entries; block longs unless base strategy is defensive/mean-reversion.
- If state = Sideways: block trend entries or reduce position size heavily.

## Risk rules

- Filter mode should not increase position size by itself.
- If the base strategy is already in a trade and state flips to Sideways, either exit or tighten stop based on backtest evidence.
- If state flips against the trade, exit or reduce exposure.

## Backtest requirements

Compare base strategy vs filtered strategy:

- CAGR / total return
- Max drawdown
- Sharpe/Sortino
- Profit factor
- Win rate
- Trade count
- Time in market
- Returns by regime

## Bias controls

- State at bar `t` must only use data up to bar `t`.
- If transition matrix is used, estimate it only on prior training window.
- No repainting indicators.

## Promotion criteria

Promote only if filter improves drawdown-adjusted return or materially reduces drawdown without destroying expectancy.

## Self-improvement requirements

This strategy must be handled through [[Self-Improvement Protocol|AI Quant Trading Floor Self-Improvement Protocol]]. Every iteration must record:

- what was tested,
- what evidence was produced,
- what failed or improved,
- what reusable lesson was learned,
- what artifact should be updated,
- whether the strategy should be rejected, revised, forward-tested, or escalated for human review.

Do not promote this strategy without reproducible backtest evidence, walk-forward/out-of-sample validation, and paper-trading review where appropriate.

