---
title: 2026-07-13 QTF Morning 01 Tactical Crypto Regime Backtest
created: 2026-07-13
type: backtest-evidence
status: do_not_promote
tags: [quant, backtest, read-only, bybit]
---

# 2026-07-13 QTF Morning 01 Tactical Crypto Regime Backtest

> Public-data/read-only research. No orders or account access.

## First-test result

- **Decision:** `do_not_promote`
- **Rule:** Long BTC only when close>SMA20>SMA50 and 7-day momentum>0; otherwise cash.
- **Execution:** next-bar close-to-close; signal formed at prior close
- **Cost:** 20.0 bps per position change
- **Exposure:** 27.246%
- **Position changes:** 62

| Test | Total return | CAGR | Sharpe | Max drawdown |
|---|---:|---:|---:|---:|
| Momentum/chop filter | -2.772% | -1.5% | 0.03 | -27.71% |
| BTC buy-and-hold | 11.403% | 5.976% | 0.353 | -52.968% |
| BTC/ETH/SOL equal-weight | -15.475% | -8.641% | 0.15 | -64.312% |

## Gate

Do not promote. Revise or archive this formulation.
