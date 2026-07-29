---
title: QTF-V04B Relaxed-Regime Mean-Reversion Test
created: 2026-07-17
updated: 2026-07-17
type: backtest-evidence
tags: [quant, mean-reversion, regime, paper-only, verification, qtf-v04b]
confidence: medium
---

# QTF-V04B Relaxed-Regime Mean-Reversion Test

## Purpose

QTF-V04 produced zero holdout trades because the neutral-regime filter (abs(20-day return)<=10% AND close/SMA50 in [0.85,1.15]) was too tight for the frozen 1,200-row Bybit daily snapshot. This test relaxes the regime filter in four graduated steps to determine whether a wider regime window produces tradeable holdout signals and whether the mean-reversion edge survives costs.

## Rule

- **Entry**: RSI(14) crosses up through 30 (previous bar < 30, current >= 30)
- **Regime**: Neutral window defined by 20-day absolute return threshold and SMA50 band (four configurations tested)
- **Exit**: RSI >= 55 (recovery), 3% stop-loss, or 5-day max hold
- **Execution**: Next daily bar open
- **Cost**: 20 bps round trip
- **Split**: 70/30 chronological development/holdout

## Relaxed Regime Configurations

| Config | Return Threshold | SMA Band |
|---|---|---|
| relaxed_10pct | 10% | [0.85, 1.15] |
| relaxed_15pct | 15% | [0.8, 1.2] |
| relaxed_20pct | 20% | [0.75, 1.25] |
| ultra_relaxed | 30% | [0.7, 1.3] |

## Results

### BTCUSDT (1200 rows, split=840)

| Config | Dev Trades | Dev Net | Dev HR | Holdout Trades | HO Net | HO HR | HO MDD |
|---|---:|---:|---:|---:|---:|---:|---:|
| relaxed_10pct | 1 | -6.6285% | 0.00% | 0 | 0.0000% | n/a | 0.0000% |
| relaxed_15pct | 5 | -0.6111% | 60.00% | 1 | 2.6736% | 100.00% | 0.0000% |
| relaxed_20pct | 5 | -0.6111% | 60.00% | 3 | -1.3219% | 66.67% | -7.0146% |
| ultra_relaxed | 5 | -0.6111% | 60.00% | 5 | -10.1346% | 40.00% | -13.1537% |

### ETHUSDT (1200 rows, split=840)

| Config | Dev Trades | Dev Net | Dev HR | Holdout Trades | HO Net | HO HR | HO MDD |
|---|---:|---:|---:|---:|---:|---:|---:|
| relaxed_10pct | 3 | -15.0216% | 33.33% | 0 | 0.0000% | n/a | 0.0000% |
| relaxed_15pct | 4 | -10.0349% | 50.00% | 2 | -2.3739% | 50.00% | -3.3946% |
| relaxed_20pct | 6 | -23.6885% | 33.33% | 3 | 4.5650% | 66.67% | -3.3946% |
| ultra_relaxed | 7 | -27.0008% | 28.57% | 3 | 4.5650% | 66.67% | -3.3946% |

### SOLUSDT (1200 rows, split=840)

| Config | Dev Trades | Dev Net | Dev HR | Holdout Trades | HO Net | HO HR | HO MDD |
|---|---:|---:|---:|---:|---:|---:|---:|
| relaxed_10pct | 0 | 0.0000% | n/a | 0 | 0.0000% | n/a | 0.0000% |
| relaxed_15pct | 0 | 0.0000% | n/a | 0 | 0.0000% | n/a | 0.0000% |
| relaxed_20pct | 0 | 0.0000% | n/a | 1 | -4.5607% | 0.00% | -4.5607% |
| ultra_relaxed | 2 | 9.0950% | 50.00% | 4 | -6.6585% | 25.00% | -16.3360% |

## Key Findings

- **Best holdout signal density**: BTCUSDT with `ultra_relaxed` produced 5 holdout trades (net -10.1346%, hit rate 40.00%).
- **Holdout trade count** across all configs:
  - BTCUSDT/ultra_relaxed: 5 trades, net -10.1346%, HR 40.00%
  - SOLUSDT/ultra_relaxed: 4 trades, net -6.6585%, HR 25.00%
  - BTCUSDT/relaxed_20pct: 3 trades, net -1.3219%, HR 66.67%
  - ETHUSDT/relaxed_20pct: 3 trades, net 4.5650%, HR 66.67%
  - ETHUSDT/ultra_relaxed: 3 trades, net 4.5650%, HR 66.67%
  - ETHUSDT/relaxed_15pct: 2 trades, net -2.3739%, HR 50.00%
  - BTCUSDT/relaxed_15pct: 1 trades, net 2.6736%, HR 100.00%
  - SOLUSDT/relaxed_20pct: 1 trades, net -4.5607%, HR 0.00%
  - BTCUSDT/relaxed_10pct: 0 trades, net 0.0000%, HR n/a
  - ETHUSDT/relaxed_10pct: 0 trades, net 0.0000%, HR n/a
  - SOLUSDT/relaxed_10pct: 0 trades, net 0.0000%, HR n/a
  - SOLUSDT/relaxed_15pct: 0 trades, net 0.0000%, HR n/a

## Gate status
- Frozen input manifest and three symbol files were hash-recorded.
- Four relaxed regime configurations tested across three symbols.
- Chronological holdout and next-bar execution were run.
- Promotion gate: **blocked**; robustness/jitter, benchmark-relative comparison, and paper-forward agreement remain outstanding.
- No values were imputed; no alerts, credentials, orders, or allocations were used.

Machine-readable output: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\qtf_v04b_relaxed_regime\qtf_v04b_relaxed_regime_result.json`
