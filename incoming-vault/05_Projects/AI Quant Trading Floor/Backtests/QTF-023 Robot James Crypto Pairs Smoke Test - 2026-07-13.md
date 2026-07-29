---
title: QTF-023 Robot James Crypto Pairs Smoke Test - 2026-07-13
created: 2026-07-13
updated: 2026-07-13
type: backtest-evidence
status: parked-funding-missing
managed_as: paper-only
script: Implementation/robot_james_pairs_smoke.py
machine_report: Backtests/2026-07-13-QTF-023-pairs-smoke.json
---

# Result

The first actual Robot James crypto-pairs smoke test is now complete using public Bybit linear-perpetual daily klines. No authentication, accounts or orders were used.

## Rules

- 20-bar log-price spread mean and standard deviation
- Enter after +/-2 sigma
- Exit after mean cross
- Next-bar position execution
- Equal-notional long/short legs
- 0.1% per leg cost assumption
- Funding not yet included

## Results

| Pair | Bars | Trades | Exposure | Return | Sharpe | Max drawdown | Decision |
|---|---:|---:|---:|---:|---:|---:|---|
| BTCUSDT/ETHUSDT | 1,000 | 75 | 55.7% | -12.91% | -0.24 | -36.65% | Park |
| ETHUSDT/SOLUSDT | 1,000 | 68 | 54.1% | -42.32% | -0.81 | -46.29% | Park |

Data window for both: 2023-10-18 to 2026-07-13 UTC.

## Interpretation

The simple ratio/20/2 baseline does not currently justify paper promotion. Both pairs lost money after the two-leg cost assumption, and the test still omits funding, so adding realistic funding is unlikely to improve the decision.

This does not disprove all crypto pairs trading. It rejects the first naive baseline and supports the Robot James warning that pair choice, common-factor stability and divergence cause matter more than a simple Bollinger rule.

## Required next experiment

Do not optimise the 20/2 rule against this same sample. Build the next one-variable experiment around:

1. rolling hedge-ratio residual rather than raw ratio;
2. pair-universe and beta-stability gates;
3. funding and liquidation/forced-flow context;
4. event/news quarantine;
5. held-out/walk-forward evaluation;
6. same-age control pairs.

Promotion remains blocked until funding, held-out and robustness gates are complete.
