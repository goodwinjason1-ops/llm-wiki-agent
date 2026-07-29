---
title: 2026-07-14 Tactical Momentum Trend Production Edge Card
created: 2026-07-14
updated: 2026-07-14
type: strategy-claim-card
status: deterministic-backtest-complete-do-not-promote
edge_family: tactical-trend-and-momentum
tags: [quant, crypto, momentum, trend, paper-only, production-path]
sources:
  - ../Backtests/2026-07-13-QTF-MORNING-01 Tactical Crypto Regime Backtest.md
  - ../Implementation/morning_first_tests.py
  - ../Research/QTF Edge Measurement Toolkit - 2026-07-14.md
  - ../Research/QTF Edge-First Production Mandate.md
confidence: medium
---

# Tactical momentum/trend production edge card

## Scope and safety

Paper-only research. ETH is a benchmark/control, not a standalone production thesis. No credentials, wallet access, order placement, or live execution is permitted.

## What is already real

- A runnable public-data script exists: `Implementation/morning_first_tests.py`.
- It fetches Bybit spot daily closes for BTCUSDT, ETHUSDT and SOLUSDT, aligns common timestamps, uses a prior-close signal and next-bar close-to-close returns, models 20 bps per position change, and writes JSON plus a Markdown backtest.
- A second reusable backtester exists at `Implementation/multi_strategy_backtester.py`; it contains EMA/MACD/momentum, trend-rider, breakout and Markov-regime approximations with fee and slippage parameters.
- The 2026-07-13 frozen result is reproducible as a recorded result, but not as a locally replayable data snapshot: the OHLCV rows were not saved.

## What is missing before paper production

1. Frozen, hashable OHLCV input for BTC, ETH and SOL; current code refetches mutable API history.
2. A true walk-forward/held-out report. Existing result is one 679-day aggregate window.
3. Cross-sectional momentum and volatility targeting; the tested rule is BTC-only long/cash.
4. Funding, spread, slippage sensitivity, turnover and capacity analysis for a perp implementation. The current baseline is spot and uses one fixed 20 bps position-change cost.
5. Trade-level ledger, drawdown duration/recovery, regime-conditioned expectancy, Monte Carlo/RST/DSR and parameter-jitter outputs.
6. Paper signal runner and forward-paper evidence. No promotion to execution is implied by this card.

## Existing baseline result (frozen record)

Rule: long BTC when `close > SMA20 > SMA50` and 7-day momentum is positive; otherwise cash. Signal is formed at close `t`, return is earned from close `t` to close `t+1`.

| Series | Total return | CAGR | Sharpe | Max drawdown |
|---|---:|---:|---:|---:|
| Momentum/chop filter | -2.772% | -1.500% | 0.030 | -27.710% |
| BTC buy-and-hold | 11.403% | 5.976% | 0.353 | -52.968% |
| BTC/ETH/SOL equal-weight | -15.475% | -8.641% | 0.150 | -64.312% |

Observed exposure: 27.246%; position changes: 62; cost: 20 bps per position change. Decision: `do_not_promote`.

Interpretation: the formulation reduced drawdown versus BTC buy-and-hold, but failed the return/risk promotion test and is not evidence of a production edge.

## Next exact candidate: TTM-01 (daily cross-sectional momentum with volatility targeting)

Universe: BTCUSDT, ETHUSDT, SOLUSDT spot closes, with ETH retained as benchmark/control. No asset is selected using future data.

At each daily close `t`:

1. Compute 20-day and 60-day total returns for each asset.
2. Compute 20-day realised volatility from close-to-close returns.
3. Exclude an asset if either return is missing, volatility is zero/missing, or close is below its 50-day SMA.
4. Score each eligible asset: `0.5 * rank(20d_return) + 0.5 * rank(60d_return)`.
5. Hold the top eligible asset only when its score is at least the cross-sectional median and its 20-day return is positive; otherwise hold cash.
6. Position size is volatility-scaled: target 10% annualised volatility, using `weight = min(1.0, 0.10 / (realised_vol_20d * sqrt(365)))`. No leverage; residual capital is cash.
7. Execute at the next daily close (or, for a conservative implementation, next bar open); the chosen convention must be fixed before the run.
8. Rebalance only when the selected asset or target weight changes by at least 10 percentage points. Apply costs to absolute turnover.
9. For the first clean-room run use 20 bps per 100% turnover, then sensitivity-test 10/20/40/60 bps. If implemented on perps, add observed funding separately; do not assume funding is zero.

Controls: cash (0%), BTC buy-and-hold, ETH buy-and-hold benchmark, SOL buy-and-hold, BTC/ETH/SOL equal-weight buy-and-hold, and the existing BTC SMA20/SMA50 + 7-day momentum rule.

## Required report columns

`timestamp, asset, close, ret20, ret60, sma50, vol20, score, selected_asset, target_weight, turnover, cost, gross_return, net_return, equity, drawdown, regime_label`.

Metrics: total return, CAGR, annual volatility, Sharpe, Sortino, max drawdown, drawdown duration, recovery time, exposure, turnover, trade count, win rate, payoff ratio, profit factor, expectancy per trade and per unit risk, and capacity proxy.

## Validation gates

Advance only if all gates pass on frozen data:

- Data: >=1,095 daily observations per asset, no duplicate timestamps, no gaps silently filled, UTC timestamps, SHA-256 recorded.
- Bias: signal at `t` uses only rows through `t`; execution is shifted one bar; source-data and artifact hashes are saved.
- Walk-forward: at least four chronological folds with an untouched final holdout; no parameter chosen on the holdout.
- Economics: net CAGR must beat cash and the existing BTC baseline on the final holdout, and must not underperform BTC buy-and-hold by more than 5 percentage points unless max drawdown improves by at least 15 percentage points.
- Risk: final-holdout Sharpe >= 0.50, max drawdown no worse than -25%, and no single fold with total return below -15%.
- Robustness: positive net expectancy in >=3/4 folds; 10/20/40/60 bps cost sensitivity does not reverse the primary conclusion at the selected cost; parameter jitter (lookbacks 15/20/30 and 45/60/90) retains the same sign of net expectancy in >=70% of variants.
- Evidence: Monte Carlo path check, RST/DSR or multiple-testing note, regime split, and explicit failure/kill conditions are present.
- Paper: only after the above, emit alerts for a minimum 30 trading days with zero order side effects; compare alert fills against the predeclared next-bar convention.

Any failed gate means `do_not_promote`; revise only one design variable at a time.

## Completed execution step — frozen public input

- Frozen Bybit public spot daily OHLCV for BTCUSDT, ETHUSDT and SOLUSDT at `2026-07-14T12:32:26+00:00` UTC.
- Snapshot directory: `Implementation/data_cache/ttm01/`.
- Each symbol contains 1,000 sorted daily rows, no duplicate timestamps and no non-daily gaps; each file and the manifest has a SHA-256 recorded in `manifest.json`.
- This completes data freezing only. The deterministic TTM-01 backtest is now complete; no promotion decision changed.

## Completed execution step — deterministic TTM-01 backtest

- Ran the frozen local-input candidate with next-close execution, 10/20/40/60 bps turnover sensitivity, required trade-ledger columns, and buy-and-hold controls.
- Artifact: `Implementation/reports/ttm01/ttm01_backtest.md`; machine-readable result: `Implementation/reports/ttm01/ttm01_backtest.json`.
- At 20 bps: total return 0.6533%, CAGR 0.2537%, Sharpe 0.654, max drawdown -0.5376%, exposure 0.52%, turnover 0.924, 124 trades.
- Decision: `do_not_promote`. The input has 1,000 rows per asset, below the >=1,095 gate; walk-forward/holdout, parameter-jitter, Monte Carlo/RST/DSR and paper-monitor gates remain incomplete. No live or paper alerts emitted.

## Next executable step

Next unblocked work is a separately scoped validation task: add the missing >=1,095 observations and implement chronological walk-forward/held-out evaluation; no promotion follows from this run.

## Source links

- [[2026-07-13-QTF-MORNING-01 Tactical Crypto Regime Backtest]]
- [[QTF-008 EMA Momentum Baseline and Volatility Overlay]]
- [[QTF-001 Markov Regime Filter]]
- [[QTF Edge Measurement Toolkit - 2026-07-14]]
- [[QTF Edge-First Production Mandate]]
