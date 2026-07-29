---
title: QTF-V04B Relaxed-Regime Jitter Robustness
created: 2026-07-17
type: quant-backtest
tags: [quant, mean-reversion, regime, jitter, robustness, paper-only, qtf-v04b]
confidence: low
---

# QTF-V04B Relaxed-Regime Mean-Reversion — Parameter Robustness / Jitter Analysis

**Decision: do_not_promote.**

Generated: 2026-07-17T19:10:09+00:00
Input manifest SHA-256: `356420e8a737f967a32ab3cf740f0bcfa069a7c6cbf3276b91b30c5c630ceae7`
Output SHA-256: `7949b2d8302717306227d93261ccafb39134bb6c983a58f9e0f18c0eab5155ab`

## Base Config (relaxed_20pct)

| Symbol | Trades | Net Return | Hit Rate | Max DD |
|---|---:|---:|---:|---:|
| BTCUSDT | 3 | -1.3219% | 66.67% | -7.0146% |
| ETHUSDT | 3 | 4.5650% | 66.67% | -3.3946% |
| SOLUSDT | 1 | -4.5607% | 0.00% | -4.5607% |

**Aggregate**: 7 trades, -1.3176% net, HR 57.14%

## Jitter Grid

- Dimensions: 8
- Combinations tested: 6561

| Parameter | Values |
|---|---|
| return_threshold | [0.15, 0.2, 0.25] |
| sma_band_lo | [0.7, 0.75, 0.8] |
| sma_band_hi | [1.2, 1.25, 1.3] |
| rsi_entry_cross | [25, 30, 35] |
| rsi_exit_level | [50, 55, 60] |
| stop_pct | [0.02, 0.03, 0.04] |
| max_hold_days | [3, 5, 7] |
| cost_bps | [10, 20, 40] |

## Robustness Results

- Total combinations tested: 6561
- Net survival rate (>= base): 38.5% (2529/6561)
- Trade count survival rate: 56.0% (3672/6561)
- Hit rate survival rate: 22.8% (1494/6561)
- Mean holdout net: -16.0992% (std: 21.8596%)
- Mean holdout trades: 12
- **Robustness gate: FAILED**

## Per-Symbol Survival

| Symbol | Base Net | Net Survival | Trades Survival | HR Survival |
|---|---:|---:|---:|---:|
| BTCUSDT | -1.3219% | 44.2% | 77.8% | 23.0% |
| ETHUSDT | 4.5650% | 9.5% | 48.1% | 19.3% |
| SOLUSDT | -4.5607% | 56.8% | 66.7% | 66.7% |

## Parameter Sensitivity (Pearson correlation with holdout net)

Sorted by absolute correlation:
- **rsi_entry_cross**: -0.7881
- **max_hold_days**: -0.3081
- **stop_pct**: +0.0668
- **return_threshold**: -0.0402
- **rsi_exit_level**: +0.0014

## Best Jittered Config

- Config key: `j4476`
- Parameters: return_threshold=0.25, sma_band=[0.7, 1.2], rsi_entry=30, rsi_exit=50, stop=0.04, max_hold=5, cost=0.001bps
- Aggregate holdout net: 12.9641%
- Aggregate trades: 9
- Aggregate HR: 66.67%

## Interpretation

The jittered parameter space shows only 38.5% survival rate at or above the base relaxed_20pct result. The robustness gate FAILED (threshold >= 60%). This indicates the mean-reversion rule is sensitive to parameter choice.

## Gate status
- Frozen input manifest and three symbol files were hash-recorded.
- 6561 parameter combinations tested across 3 symbols.
- Chronological holdout and next-bar execution were run.
- Robustness gate: **FAILED** (38.5% survival).
- Promotion gate: **blocked**; benchmark comparison and paper-forward agreement remain outstanding.
- No values were imputed; no alerts, credentials, orders, or allocations were used.

Machine-readable output: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\qtf_v04b_relaxed_regime_jitter\qtf_v04b_relaxed_regime_jitter_robustness.json`
