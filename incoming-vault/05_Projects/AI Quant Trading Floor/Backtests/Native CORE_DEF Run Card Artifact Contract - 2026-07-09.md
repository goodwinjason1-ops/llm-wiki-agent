---
title: Native CORE_DEF Run Card Artifact Contract - 2026-07-09
created: 2026-07-09
updated: 2026-07-09
type: backtest-evidence
status: complete
sources:
  - [[Vibe-Trading CORE_DEF Benchmark Comparison - 2026-07-09]]
  - [[Strategy Lab v2-v3 Sharpe Target Evidence]]
tags: [quant, core-def, tactical-momentum, artifact-contract, native-quant-floor, evidence]
confidence: high
---

# Native CORE_DEF Run Card Artifact Contract - 2026-07-09

## Purpose

Port the useful Vibe-Trading artifact pattern into the native Quant Floor `strategy_lab_v3.py`, then rerun the strongest current native defensive ETF candidate so the native engine emits a clean reproducibility bundle.

## Safety boundary

- Research/backtest only.
- Public yfinance-cached data only.
- No broker/exchange auth.
- No API keys.
- No wallets.
- No live trading.
- No orders.

## Implementation change

Updated:

```text
05_Projects/AI Quant Trading Floor/Implementation/strategy_lab_v3.py
```

Added:

- `--core-def-bundle` CLI mode.
- Native Vibe-style bundle writer:
  - `run_card.md`
  - `run_card.json`
  - `config.json`
  - `code/strategy.py`
  - `artifacts/metrics.csv`
  - `artifacts/trades.csv`
  - `artifacts/equity.csv`
  - `artifacts/positions.csv`
  - `artifacts/validation.json`
  - `source_data/ohlcv_<symbol>.csv`
- SHA-256 hashes for config, strategy source, and artifacts.
- Bootstrap + walk-forward validation summary for the native run.

Added regression tests:

```text
05_Projects/AI Quant Trading Floor/Implementation/test_strategy_lab_v3_artifacts.py
```

## Test commands

Red/green artifact tests:

```bash
python -m pytest test_strategy_lab_v3_artifacts.py -q
```

Final regression check:

```bash
python -m pytest test_strategy_lab_v3_artifacts.py test_moondev_orderbook_gate.py test_moondev_market_maker_lab.py test_opening_range_lab.py -q
```

Result:

```text
16 passed in 0.27s
```

## Native CORE_DEF rerun command

From:

```text
C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation
```

Command:

```bash
python strategy_lab_v3.py --core-def-bundle
```

## Run directory

```text
C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation/reports/runs/core_def_l252_t1_vt008_20260709T102738+0000
```

## Strategy config

| Field | Value |
|---|---|
| Strategy ID | `CORE_DEF-L252-T1-VT0.08` |
| Universe | `SPY`, `QQQ`, `TLT`, `IEF`, `SHY`, `GLD`, `UUP` |
| Lookback | `252` days |
| Top N | `1` |
| Vol target | `8%` |
| Starting capital | `$10,000` |
| Fee/slippage | `1 bps + 1 bps` per unit turnover |
| Data source | yfinance cache via native Strategy Lab |
| Days requested | `3650` |

## Output metrics

| Metric | Native CORE_DEF rerun |
|---|---:|
| Final equity | `$23,525.40` |
| Return | `135.2540%` |
| CAGR | `10.0090%` |
| Max DD | `-9.8765%` |
| Sharpe | `1.1146` |
| Sortino | `1.4642` |
| Trades | `122` |
| Win rate | `53.2787%` |
| Profit factor | `2.6032` |
| First half return | `51.3450%` |
| Second half return | `55.4422%` |
| Median 90d forecast | `3.7369%` |
| 5th percentile 90d forecast | `-4.6347%` |
| 95th percentile 90d forecast | `13.4855%` |
| 90d probability of profit | `76.0%` |

## Validation summary

Bootstrap:

| Metric | Value |
|---|---:|
| Observed Sharpe | `1.1146` |
| 95% CI lower | `0.4578` |
| 95% CI upper | `1.7958` |
| Median bootstrap Sharpe | `1.0896` |
| Probability positive Sharpe | `0.999` |
| Bootstrap samples | `1000` |

Walk-forward:

| Window | Period | Return | Sharpe |
|---:|---|---:|---:|
| 1 | 2017-07-06 → 2019-04-23 | `14.1966%` | `0.9008` |
| 2 | 2019-04-24 → 2021-02-05 | `25.5457%` | `1.3771` |
| 3 | 2021-02-08 → 2022-11-21 | `8.5294%` | `0.5482` |
| 4 | 2022-11-22 → 2024-09-11 | `13.7665%` | `0.9635` |
| 5 | 2024-09-12 → 2026-07-02 | `32.8986%` | `1.7241` |

Summary:

```text
profitable_windows: 5/5
consistency_rate: 1.0
```

## Artifact manifest

The run produced the full target contract:

```text
run_card.md
run_card.json
config.json
code/strategy.py
artifacts/metrics.csv
artifacts/trades.csv
artifacts/equity.csv
artifacts/positions.csv
artifacts/validation.json
source_data/ohlcv_SPY.csv
source_data/ohlcv_QQQ.csv
source_data/ohlcv_TLT.csv
source_data/ohlcv_IEF.csv
source_data/ohlcv_SHY.csv
source_data/ohlcv_GLD.csv
source_data/ohlcv_UUP.csv
```

Reproducibility hashes:

```text
config_hash:   7e286e89b5a753a4d5f64a5f7ddde826d60d2879f8ed4bb52016909152ea630f
strategy_hash: 4e06df83e13ea886e5893a1a57c01a289d28ceb540ca5a7a7c5dcea1f78558cf
```

## Interpretation

This completes the artifact-port gate. The native Quant Floor engine now retains source-of-truth status for CORE_DEF while also producing the cleaner Vibe-style evidence bundle.

The strategy result is still **watchlist/revise**, not live-ready:

- Sharpe is solid but below the aspirational `1.6–1.8` target.
- Max DD is under the ETF-core 15% gate.
- Both halves and all walk-forward windows are positive.
- It is suitable for continued paper/research monitoring and next one-variable experiments.

## Decision

- **Keep** native `strategy_lab_v3.py` as the engine source of truth.
- **Adopt** Vibe-style run-card/artifact bundle pattern for native Quant Floor runs.
- **Do not** approve live trading.
- Next research step: one-variable CORE_DEF improvements such as ensemble momentum score, crash filter, or correlation cap, each using the new bundle output.

## Related

- [[Strategy Lab v2-v3 Sharpe Target Evidence]]
- [[Vibe-Trading CORE_DEF Benchmark Comparison - 2026-07-09]]
- [[Vibe-Trading Broad Tactical Momentum Benchmark - 2026-07-09]]
- [[AI Quant Trading Floor]]
