---
title: Strategy Lab v2-v3 Sharpe Target Evidence
generated: 2026-07-03
type: backtest-evidence
tags: [quant, sharpe-target, tactical-momentum, trend-rider, portfolio, evidence]
confidence: high
---

# Strategy Lab v2-v3 Sharpe Target Evidence

## Goal

Develop toward a strategy that can reach **Sharpe 1.6–1.8 consistently** while growing a ~$10,000 account across probable tradable assets: crypto, shares/ETFs, bonds, metals, defensive assets.

## Important result

The target was **not honestly achieved** in the current tests.

Best robust Sharpe observed in these runs was roughly **1.11**, not 1.6–1.8. That means the current best strategies are research/watchlist candidates, not live-ready systems.

## Reports

- v2 report: `Implementation/reports/strategy_lab_v2_20260702T170026+0000.csv`
- v3 report: `Implementation/reports/strategy_lab_v3fast_20260702T173153+0000.csv`

## SF-003 Trend Rider ATR-stop test

SF-003 was the prior strongest raw performer, so v2 tested ATR trailing stops from 1.5x to 5.0x.

| Variant | Final equity | Return | CAGR | Max DD | Sharpe | Trades | Decision |
|---|---:|---:|---:|---:|---:|---:|---|
| ATR 5.0x | $31,815 | +218.15% | 47.09% | -50.03% | 0.98 | 127 | reject/revise |
| ATR 4.0x | $28,296 | +182.96% | 41.45% | -51.76% | 0.91 | 133 | reject/revise |
| ATR 3.0x | $25,119 | +151.19% | 35.94% | -54.05% | 0.84 | 154 | reject/revise |
| ATR 2.0x | $21,827 | +118.27% | 29.72% | -52.43% | 0.76 | 212 | reject/revise |
| ATR 1.5x | $12,013 | +20.13% | 6.30% | -62.87% | 0.37 | 290 | reject/revise |

Conclusion: ATR trailing stops alone did **not** solve the drawdown/stability problem. SF-003 remains unsuitable for live implementation.

## Broader daily tactical search

The strongest research direction shifted from single-coin trend following to **daily tactical multi-asset momentum**.

Universe examples:

- Core defensive: SPY, QQQ, TLT, IEF, SHY, GLD, UUP
- Sector/risk: SPY, QQQ, XLK, XLV, XLP, XLU, XLE, TLT, GLD, UUP

Top v3 candidates:

| Rank | ID | Universe | Lookback | Top N | Vol target | Final equity | CAGR | Max DD | Sharpe | Decision |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | CORE_DEF-L252-T3-VT0.15 | Core defensive | 252d | 3 | 15% | $24,513 | 10.51% | -14.02% | 1.06 | watchlist/revise |
| 2 | CORE_DEF-L126-T3-VT0.08 | Core defensive | 126d | 3 | 8% | $19,036 | 7.04% | -10.99% | 1.11 | watchlist/revise |
| 3 | SECTOR_RISK-L252-T2-VT0.12 | Sector/risk | 252d | 2 | 12% | $26,240 | 11.36% | -13.43% | 1.02 | watchlist/revise |
| 4 | CORE_DEF-L252-T1-VT0.08 | Core defensive | 252d | 1 | 8% | $23,525 | 10.01% | -9.88% | 1.11 | watchlist/revise |

## Recommendation for $10k capital growth

Best current timeframe: **daily**.

Reason:

- lower noise and transaction cost than 15m/1h crypto scalping,
- feasible for a $10k account without excessive churn,
- works across ETFs/bonds/metals/USD defensives,
- max drawdown was materially lower than crypto trend systems,
- daily monitoring is operationally simpler and safer.

Current best research candidate:

> **CORE_DEF daily tactical momentum, 252-day lookback, top 1 or top 3 allocation, 8–15% vol target.**

The most balanced version for a $10k account is probably:

> **CORE_DEF-L252-T1-VT0.08** — daily, 252-day momentum, hold top 1 asset from SPY/QQQ/TLT/IEF/SHY/GLD/UUP, risk-scaled around 8% vol target.

Why this one despite not being the highest return:

- Sharpe 1.11,
- max DD -9.88%,
- CAGR 10.01%,
- both halves positive,
- simple to monitor,
- low trade count and lower churn.

## Sharpe target development plan

The target remains active, but it should be treated as a research goal, not a current claim.

Next one-variable experiments:

1. Add ensemble momentum score: 1m + 3m + 6m + 12m instead of single 252d lookback.
2. Add volatility/crash filter: reduce exposure when SPY and QQQ are below 200d SMA.
3. Add correlation cap: avoid top assets that are highly correlated in the same risk bucket.
4. Add out-of-sample split and rolling walk-forward selection.
5. Add crypto sleeve only after daily ETF core is stable.

Promotion gate toward live:

- Sharpe target: ideally 1.6–1.8, minimum 1.25 before paper promotion.
- Max DD: under 15% for ETF core, under 25% for crypto sleeve.
- Both in-sample and out-of-sample positive.
- 30–60 day paper monitor with alerts only.
- Explicit human approval before any broker/exchange write mode.

## Decision

- SF-003/SOL trend: **reject/revise**, not live-ready.
- Daily ETF tactical momentum: **best current research direction**, paper monitor only.
- Live trading: **not approved / not recommended yet**.
