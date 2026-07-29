---
title: QTF Perp DEX Pair Screen - Public Bybit Hourly Snapshot - 2026-07-14
created: 2026-07-14
updated: 2026-07-14
status: screening-not-backtest
risk_mode: paper-only
---

# Data

- Source: Bybit public linear-perpetual `v5/market/kline` endpoint.
- Symbols: HYPEUSDT, DYDXUSDT, LITUSDT.
- Interval: 1 hour.
- Bars: 1,000 common bars for all three symbols.
- No private credentials or orders used.

# Pair diagnostics

| Pair | Return correlation | OLS beta (first leg on second) | Current 168-bar spread Z | Lag-1 rho | Approx half-life |
|---|---:|---:|---:|---:|---:|
| HYPE/DYDX | 0.408 | 0.008 | -1.90 | 0.9876 | 55.6 hours |
| HYPE/LIT | 0.487 | 0.182 | -1.78 | 0.9859 | 48.7 hours |
| DYDX/LIT | 0.317 | -0.041 | -1.81 | 0.9879 | 57.1 hours |

# Interpretation

- All three pairs show a current negative residual excursion of roughly 1.8 standard deviations under this preliminary 168-hour window.
- Return correlations are modest, not strong; this is not evidence of a stable pair.
- Approximate half-lives are long enough to create turnover/cost concerns, especially with funding and two-leg execution.
- The tiny or negative betas indicate that a naive “same-function” assumption is not sufficient; rolling beta stability and factor exposure must be tested.
- This is a diagnostic snapshot, not a strategy backtest and not a trade recommendation.

# Next validation gate

Run a point-in-time, rolling-beta residual strategy with funding, fees, spread, slippage, turnover, partial-fill and structural-break controls. Compare against no-trade and beta-neutral benchmarks before any paper allocation.
