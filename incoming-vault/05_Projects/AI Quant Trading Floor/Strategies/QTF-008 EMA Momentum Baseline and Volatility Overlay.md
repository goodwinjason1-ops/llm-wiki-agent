---
title: QTF-008 EMA Momentum Baseline and Volatility Overlay
created: 2026-07-08
updated: 2026-07-08
type: strategy
status: research-hypothesis
tags: [quant, trading, momentum, ema, trend-following, paper-trading]
sources: [03_Sources/youtube/ai-backtesting-tradingview-ema-strategy-VDpTU5kdj8A.md]
confidence: medium
---

# QTF-008 EMA Momentum Baseline and Volatility Overlay

## Hypothesis

A simple long/flat EMA momentum baseline can avoid major downtrends while staying exposed to sustained uptrends. The key source lesson is that simple baselines must be preserved and every improvement must be tested against them.

## Clean-room rule set

1. Compute fast EMA and slow EMA on close.
2. Long only when fast EMA is above slow EMA and price is above slow EMA.
3. Flat when fast EMA falls below slow EMA or price loses the slow EMA.
4. Execute on the next bar; document open/close fill assumption.
5. Include fees, slippage, benchmark comparison, and no-lookahead signal shifting.

## Research overlay candidates

- Volatility-scaled position sizing without touching the signal.
- Optional trailing exit as a single-variable test.
- Regime filter only if it improves out-of-sample risk-adjusted metrics.

## Promotion gate

Reproducible local report, stable first/second half performance, costs included, and paper-monitor phase before any execution discussion.

## Related

- [[AI Backtesting TradingView EMA Strategy - YouTube VDpTU5kdj8A]]
- [[Trend Following Desk Prompt]]
- [[Self-Improvement Protocol|AI Quant Trading Floor Self-Improvement Protocol]]
