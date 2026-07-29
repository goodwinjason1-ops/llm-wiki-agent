---
title: StrategyFactory and Playlist Batch 01 Backtest Ranking
created: 2026-07-03
updated: 2026-07-03
type: backtest-evidence
tags: [quant, backtest, strategyfactory, playlist, ranking, forecast]
sources: [https://strategyfactory.ai/#strategies, https://youtube.com/playlist?list=PLP0fA_eUy-QEQ_llkazeVl9zuXBK-sjiI]
confidence: high
---

# StrategyFactory and Playlist Batch 01 Backtest Ranking

## Scope

Starting capital: **$5,000**.

Costs assumed: **6 bps fee + 4 bps slippage** per unit turnover.

This is a clean-room implementation of public strategy names/themes. StrategyFactory does not expose locked rules publicly, so these are **testable approximations**, not copies of proprietary bots.

## Reports

- Backtest JSON: `Implementation/reports/multi_strategy_backtest_20260702T161706+0000.json`
- Backtest CSV: `Implementation/reports/multi_strategy_backtest_20260702T161706+0000.csv`
- Forecast JSON: `Implementation/reports/monte_carlo_forecast_20260702T161858+0000.json`
- Forecast CSV: `Implementation/reports/monte_carlo_forecast_20260702T161858+0000.csv`

## Ranking by tested score

| Rank | ID | Strategy | Market | TF | Final equity | Return | CAGR | Max DD | Sharpe | Trades | Decision |
|---:|---|---|---|---|---:|---:|---:|---:|---:|---:|---|
| 1 | SF-003 | Trend Rider clean-room | SOLUSDT | 4H | $16,115 | +222.31% | 47.72% | -50.42% | 0.40 | 125 | revise/high drawdown |
| 2 | PL-012 | Moving Average crossover | SPY | 1D | $12,565 | +151.29% | 9.66% | -22.07% | 0.97 | 12 | reject/too few trades |
| 3 | PL-009 | Boring MACD approximation | BTCUSDT | 4H | $6,809 | +36.19% | 10.85% | -29.47% | 0.25 | 125 | weak/watchlist |
| 4 | SF-001 | Momentum Alpha clean-room | BTCUSDT | 4H | $6,223 | +24.45% | 7.57% | -27.01% | 0.20 | 160 | weak/watchlist |
| 5 | SF-004 | Breakout Hunter clean-room | BTCUSDT | 1D | $6,724 | +34.48% | 6.11% | -38.00% | 0.35 | 15 | reject/too few trades |
| 6 | PL-017 | VWAP mean reversion | BTCUSDT | 1H | $3,302 | -33.96% | -18.74% | -43.68% | -0.12 | 198 | reject/revise |
| 7 | QTF-002 | Markov regime standalone | BTCUSDT | 1D | $3,088 | -38.23% | -9.19% | -66.35% | -0.01 | 157 | reject/revise |
| 8 | SF-006 | Swing Catcher clean-room | BNBUSDT | 4H | $3,016 | -39.69% | -15.51% | -42.59% | -0.35 | 72 | reject/revise |
| 9 | SF-002 | Mean Reversion clean-room | ETHUSDT | 1H | $1,819 | -63.63% | -39.69% | -68.20% | -0.23 | 217 | reject/revise |
| 10 | SF-005 | Scalp Master clean-room | ETHUSDT | 15M | $2,124 | -57.52% | -92.60% | -60.82% | -0.77 | 380 | reject/revise |

## 90-day bootstrap forecast from realized strategy returns

Monte Carlo method: bootstrap realized per-bar strategy returns, 1,000 simulations, 90 calendar-day horizon.

| Rank | ID | Strategy | Median return | 5th pct | 95th pct | Prob. profit | Stability note |
|---:|---|---|---:|---:|---:|---:|---|
| 1 | SF-003 | Trend Rider | +10.72% | -29.61% | +76.15% | 65.3% | Strong total return, but first half +291%, second half -17.8%; unstable |
| 2 | PL-012 | MA crossover | +3.85% | -8.75% | +16.95% | 69.5% | Stable but too few trades |
| 3 | PL-009 | MACD | +2.87% | -11.57% | +20.83% | 60.9% | Watchlist only |
| 4 | SF-001 | Momentum Alpha | +1.89% | -12.60% | +16.59% | 58.0% | Watchlist only |
| 5 | SF-004 | Breakout Hunter | +1.24% | -20.13% | +30.22% | 52.3% | Too few trades |

## Interpretation

No strategy is live-ready yet.

Best candidate to improve first: **SF-003 Trend Rider on SOLUSDT 4H**, because it produced the strongest raw result and enough trades, but its drawdown is too high and recent-half performance weakened. It needs risk controls before paper automation.

Best lower-volatility research candidate: **PL-009 MACD on BTCUSDT 4H** or **SF-001 Momentum Alpha on BTCUSDT 4H**. Both are weak but have adequate trade counts and lower drawdown than SF-003.

## Recommended lookback windows

| Strategy type | Timeframe | Minimum useful lookback | Preferred lookback | Reason |
|---|---|---:|---:|---|
| Crypto swing/trend | 1D | 3 years | 5+ years | Needs multiple bull/bear cycles |
| Crypto trend/momentum | 4H | 18 months | 2–3 years | Enough trades without ancient microstructure dominating |
| Crypto intraday | 1H | 12 months | 18–24 months | Good balance of sample size and regime relevance |
| Crypto scalping | 15M | 3 months | 6–12 months | Older microstructure less reliable; high data volume |
| ETF/stocks daily | 1D | 5 years | 10 years | Lower trade frequency; needs macro regimes |
| Event-driven PEAD | 1D | 5 years | 10+ years | Needs many earnings events |

For the current $5k account assumption, avoid live deployment until a strategy survives:

1. walk-forward/out-of-sample test,
2. fees/slippage stress test,
3. max drawdown cap,
4. paper trading for at least 30–60 days,
5. explicit human approval.

## Self-improvement log

- Candidate tested/reviewed: StrategyFactory public names + playlist approximations batch 01.
- Scorecard used: $5k capital, fees/slippage included, return, CAGR, max DD, Sharpe, trade count, profit factor, forecast distribution.
- Evidence produced: batch backtest CSV/JSON + Monte Carlo forecast CSV/JSON.
- Result vs goal: no live-ready strategy; SF-003 strongest but too risky.
- What improved: moved from generic scanner to named strategy candidates.
- What failed or remains weak: locked StrategyFactory rules are unknown; clean-room approximations need refinement.
- Diagnosis: raw trend systems can make money in strong SOL/BTC windows but suffer high drawdown and instability.
- Next hypothesis: add volatility stops, regime gating, and position sizing to SF-003, testing one variable at a time.
- One variable to change next: add ATR-based trailing stop to SF-003.
- Reusable lesson: rank by risk-adjusted robustness, not return alone.
- Artifact to update: strategy specs and multi-strategy backtester.
- Baseline decision: keep SF-003/SF-001/PL-009 as research baselines; reject current SF-002/SF-005/QTF-002 variants.
- Next action: build v2 variants and paper-monitor top candidates only.
- Promotion status: revise / forward-test not approved yet.
