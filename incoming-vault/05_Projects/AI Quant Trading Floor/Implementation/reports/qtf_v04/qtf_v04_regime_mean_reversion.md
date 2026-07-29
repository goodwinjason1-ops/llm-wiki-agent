---
title: QTF-V04 Regime-Gated Mean-Reversion Test
created: 2026-07-15
updated: 2026-07-15
type: backtest-evidence
tags: [quant, mean-reversion, regime, paper-only, verification]
confidence: medium
---

# QTF-V04 Regime-Gated Mean-Reversion Test

Decision: **do_not_promote**.

Fixed rule: RSI(14) cross above 30; neutral regime requires absolute 20-day return <=10% and close/SMA50 between 0.85 and 1.15. Entry is next-bar open; exit is RSI 55, 3% stop, or five-day maximum hold; cost is 20 bps round trip.

| Symbol | Rows | Dev trades | Dev net | Holdout trades | Holdout net | Holdout hit rate |
|---|---:|---:|---:|---:|---:|---:|
| BTCUSDT | 1200 | 1 | -6.6285% | 0 | 0.0000% | n/a |
| ETHUSDT | 1200 | 3 | -15.0216% | 0 | 0.0000% | n/a |
| SOLUSDT | 1200 | 0 | 0.0000% | 0 | 0.0000% | n/a |

## Gate status
- Frozen input manifest and three symbol files were hash-recorded.
- Chronological holdout and next-bar execution were run.
- Promotion gate: **blocked**; robustness/jitter, benchmark-relative comparison, and paper-forward agreement remain outstanding.
- No values were imputed; no alerts, credentials, orders, or allocations were used.

Machine-readable output: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\qtf_v04\qtf_v04_regime_mean_reversion.json`
