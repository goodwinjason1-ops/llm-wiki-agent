---
title: StrategyFactory Public Names - Clean-Room Strategy Specs
created: 2026-07-03
updated: 2026-07-03
type: strategy-spec-pack
tags: [strategyfactory, quant, crypto, strategy-specs, clean-room]
sources: [https://strategyfactory.ai/#strategies]
confidence: medium
---

# StrategyFactory Public Names - Clean-Room Strategy Specs

StrategyFactory publicly exposes names, markets, timeframes, and headline stats, but not the locked rules. These specs are **clean-room approximations** intended for testing, not copies of proprietary systems.

## SF-001 Momentum Alpha — BTC/USDT 4H

Public card: BTC/USDT, 4H, +127.4%, DD -8.3%, 156 trades.

### Hypothesis

BTC 4H momentum persists when higher-timeframe trend, medium-term EMA alignment, RSI strength, and MACD expansion agree.

### v0 rules tested

- Long only.
- Enter when:
  - close > EMA 200,
  - EMA 50 > EMA 200,
  - RSI 14 > 55,
  - MACD histogram > 0.
- Exit when conditions no longer hold.

### v0 result

$5k → $6,223, +24.45%, max DD -27.01%, Sharpe 0.20, 160 trades.

### Required v1 improvement

Add volatility stop and trend-regime filter; target drawdown under 20% before paper monitoring.

## SF-002 Mean Reversion — ETH/USDT 1H

Public card: ETH/USDT, 1H, +94.2%, DD -12.1%, 243 trades.

### Hypothesis

ETH 1H overextensions revert when price falls below a Bollinger-style lower band and RSI is oversold.

### v0 rules tested

- Long only.
- Enter when:
  - close < SMA 20 - 2 stdev,
  - RSI 14 < 35.
- Hold until:
  - close > SMA 20, or
  - RSI > 55.

### v0 result

$5k → $1,819, -63.63%, max DD -68.20%, Sharpe -0.23, 217 trades.

### Required v1 improvement

Reject current formulation. If revisiting, add higher-timeframe trend filter and stop-loss; otherwise archive.

## SF-003 Trend Rider — SOL/USDT 4H

Public card: SOL/USDT, 4H, +156.8%, DD -15.6%, 89 trades.

### Hypothesis

SOL trends strongly when EMA 21 > EMA 55 and pullbacks hold near EMA 21 without trend breakdown.

### v0 rules tested

- Long only.
- Enter/hold when:
  - close > EMA 21 > EMA 55,
  - close is not more than 2 ATR above EMA 21.
- Exit when close < EMA 55.

### v0 result

$5k → $16,115, +222.31%, max DD -50.42%, Sharpe 0.40, 125 trades.

### Required v1 improvement

Strongest candidate, but not live-ready. Add ATR trailing stop, drawdown stop, or Markov regime gating one variable at a time.

## SF-004 Breakout Hunter — BTC/USDT 1D

Public card: BTC/USDT, 1D, +203.4%, DD -18.2%, 67 trades.

### Hypothesis

BTC daily breakouts above multi-month highs can capture large trend expansions.

### v0 rules tested

- Long only.
- Enter when close breaks above prior 55-day high.
- Exit when close breaks below prior 20-day low.

### v0 result

$5k → $6,724, +34.48%, max DD -38.00%, Sharpe 0.35, 15 trades.

### Required v1 improvement

Too few trades in current lookback. Test longer history, smaller Donchian windows, and volatility-adjusted exits.

## SF-005 Scalp Master — ETH/USDT 15M

Public card: ETH/USDT, 15M, +67.3%, DD -6.8%, 412 trades.

### Hypothesis

ETH intraday scalps work when price holds above rolling VWAP and RSI is constructive but not overbought.

### v0 rules tested

- Long only.
- Enter when:
  - close > rolling VWAP,
  - RSI 7 between 45 and 70.
- Exit when:
  - close < VWAP, or
  - RSI > 78.

### v0 result

$5k → $2,124, -57.52%, max DD -60.82%, Sharpe -0.77, 380 trades.

### Required v1 improvement

Reject current formulation. Scalping likely needs spread/orderbook/session filters; do not live test from candle-only v0.

## SF-006 Swing Catcher — BNB/USDT 4H

Public card: BNB/USDT, 4H, +89.7%, DD -11.2%, 78 trades.

### Hypothesis

BNB 4H swing pullbacks inside an uptrend can be bought when RSI cools but price remains above long trend support.

### v0 rules tested

- Long only.
- Enter when:
  - EMA 20 > EMA 100,
  - RSI 14 < 45,
  - close > EMA 100.
- Exit when:
  - RSI > 62, or
  - close < EMA 100.

### v0 result

$5k → $3,016, -39.69%, max DD -42.59%, Sharpe -0.35, 72 trades.

### Required v1 improvement

Reject current formulation unless combined with stronger regime filter and stops.

## Current priority order

1. SF-003 Trend Rider — improve drawdown first.
2. SF-001 Momentum Alpha — improve Sharpe/drawdown.
3. PL-009 MACD approximation — watchlist candidate from playlist.
4. SF-004 Breakout Hunter — needs longer data / more trades.
5. Archive or heavily redesign SF-002, SF-005, SF-006 v0 variants.
