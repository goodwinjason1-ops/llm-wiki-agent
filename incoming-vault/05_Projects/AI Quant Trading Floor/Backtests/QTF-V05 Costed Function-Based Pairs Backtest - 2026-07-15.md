---
title: QTF-V05 Costed Function-Based Pairs Backtest - 2026-07-15
created: 2026-07-15
updated: 2026-07-15
type: backtest-report
status: partial
managed_as: paper-only
tags: [quant, pairs, backtest, bybit, costed, paper-only]
sources: [https://api.bybit.com/v5/market/kline, https://api.bybit.com/v5/market/funding/history]
confidence: medium
---

# QTF-V05 Costed Function-Based Pairs Backtest

## Scope

One substantive QTF-V05 execution item: a reproducible, read-only Bybit public-data test using point-in-time rolling beta/residual signals, next-bar fills, two-leg transaction costs, and observed funding-history costs. No credentials, orders, wallets, or live alerts were used.

- Script: `05_Projects/AI Quant Trading Floor/Implementation/qtf_v05_costed_pairs_backtest.py`
- Machine report: `05_Projects/AI Quant Trading Floor/Backtests/qtf_v05/qtf_v05_costed_pairs_report.json`
- Universe: BTCUSDT/ETHUSDT and ETHUSDT/SOLUSDT
- Signal: 60-bar rolling beta residual, 20-bar z-score, entry at +/-2, mean-cross exit
- Execution: signal-close / next-bar fill; 10 bp per leg per position change
- Split: chronological 70/30; 300 out-of-sample bars per pair

## Verified result

| Pair | Bars | Trades | Total return | OOS return | OOS Sharpe | Max drawdown | Decision |
|---|---:|---:|---:|---:|---:|---:|---|
| BTC/ETH | 1,000 | 52 | -36.63% | -5.60% | -0.44 | -39.15% | do not promote |
| ETH/SOL | 1,000 | 49 | -24.65% | -12.72% | -1.20 | -35.80% | do not promote |

Transaction costs were 10.40% and 9.80% respectively. Observed funding cost contributions were -0.078% and +0.136%; the funding panel is only the latest public history window, so this is not a full-history funding study.

## Gate outcome

**Partial; promotion blocked.** The artifact satisfies the basic reproducible-run, point-in-time signal, next-bar fill, two-leg cost, funding inclusion, and chronological holdout requirements. It does not satisfy full QTF-V05 promotion evidence: funding history is short relative to the 1,000 daily price bars, and parameter jitter, broader pair breadth, and forward-paper agreement were not run. The negative OOS results independently support `do_not_promote` for both tested pairs.

## Verification command

From `05_Projects/AI Quant Trading Floor/Implementation/`:

```text
python qtf_v05_costed_pairs_backtest.py
```

Returned exit code `0`, `errors: []`, and wrote the JSON machine report above. This is evidence for the run only, not a production-edge claim.

## Related

- [[Dami-Defi Robot James TradingView Implementation Sprint - 2026-07-13]]
- [[QTF Verification and Delivery Control - 2026-07-15]]
- [[QTF Edge-First Production Mandate]]
- [[QTF-023 Robot James Crypto Pairs Smoke Test - 2026-07-13]]
