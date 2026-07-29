---
title: QTF-Candidate Chronos Polymarket Directional Edge
created: 2026-07-09
type: strategy-candidate
status: research-only
source: [[Claude Chronos Polymarket Scalping Bot - Capture 2026-07-09]]
tags: [quant, polymarket, chronos, prediction-markets, paper-only]
---

# QTF-Candidate Chronos Polymarket Directional Edge

## Hypothesis

A time-series forecasting model such as Chronos may provide a small directional edge on BTC/ETH 5-minute and 15-minute candle direction, which may translate into positive expected value on Polymarket up/down markets only when odds, spread, liquidity, fees, and resolution mechanics are favorable.

## Initial implementation mode

Research-only / paper-only. No wallet, auth, broker, exchange, or live orders.

## Required baselines before Chronos

- Random/no-edge baseline.
- Last-candle/momentum baseline.
- Mean-reversion baseline.
- Market-implied odds baseline.
- Bybit candle-only forecast baseline.

## Candidate filters

- ATR volatility floor.
- ADX sideways-market rejection.
- Minimum positive expected value after fees/spread/slippage.
- Minimum liquidity/depth.
- Time-to-expiry and resolution risk checks.
- Fractional Kelly cap only; no Martingale promotion.

## First evidence task

Build a read-only recorder that aligns:

```text
Polymarket BTC/ETH 5m/15m market snapshots
+ Bybit BTCUSDT/ETHUSDT 1m/5m candles
+ market expiry/resolution outcomes
```

Save outputs to Quant Floor ledgers before any strategy testing.

## Reject conditions

- Edge disappears after spread/slippage/fees.
- Low trade count or unstable across BTC vs ETH.
- Performance depends on lookahead, stale quotes, or ambiguous resolution timing.
- Martingale needed to produce attractive headline PnL.
