---
title: Vibe-Trading CORE_DEF Benchmark Comparison - 2026-07-09
created: 2026-07-09
updated: 2026-07-09
type: evidence
status: complete
sources:
  - [[Strategy Lab v2-v3 Sharpe Target Evidence]]
  - [[Vibe-Trading Broad Tactical Momentum Benchmark - 2026-07-09]]
  - [[Vibe-Trading Paper-Only Pilot Plan]]
tags: [quant, vibe-trading, paper-only, public-data, core-def, tactical-momentum, comparison]
confidence: high
---

# Vibe-Trading CORE_DEF Benchmark Comparison - 2026-07-09

## Purpose

Run the next gate after the broad Vibe-Trading benchmark: express the Quant Floor's stronger `CORE_DEF` defensive ETF tactical momentum candidate inside Vibe-Trading and compare the result/artifact quality against the native Quant Floor evidence.

This remained **read-only / public-data / paper-only**.

## Safety boundary

- Public yfinance data only.
- No broker/exchange auth.
- No API keys.
- No wallets.
- No live trading.
- No order placement/cancellation.
- No external server.

## Native Quant Floor reference

Source: [[Strategy Lab v2-v3 Sharpe Target Evidence]].

Current best balanced research candidate:

> `CORE_DEF-L252-T1-VT0.08` — daily, 252-day momentum, hold top 1 from `SPY`, `QQQ`, `TLT`, `IEF`, `SHY`, `GLD`, `UUP`, risk-scaled around 8% volatility target.

Native Strategy Lab reference row:

| Metric | Native Quant Floor result |
|---|---:|
| Starting equity | `$10,000` |
| Final equity | `$23,525.40` |
| Total return | `135.2540%` |
| CAGR | `10.0090%` |
| Max DD | `-9.8765%` |
| Sharpe | `1.1146` |
| Sortino | `1.4642` |
| Trades | `122` |
| Win rate | `53.2787%` |
| Profit factor | `2.6032` |
| First half return | `51.3450%` |
| Second half return | `55.4422%` |
| Decision | `watchlist/revise` |

## Vibe-Trading benchmark setup

Run directory:

```text
C:/Users/Kidsg/ai-tools/evaluation/Vibe-Trading/agent/runs/vibe_core_def_l252_t1_vt008_20260709
```

Config summary:

```json
{
  "codes": ["SPY.US", "QQQ.US", "TLT.US", "IEF.US", "SHY.US", "GLD.US", "UUP.US"],
  "start_date": "2016-07-01",
  "end_date": "2026-07-01",
  "source": "yfinance",
  "interval": "1D",
  "engine": "daily",
  "initial_cash": 10000,
  "leverage": 1.0,
  "slippage_us": 0.0005
}
```

Signal engine:

- 252-day momentum using prior close data.
- Top 1 positive-momentum ETF.
- 63-day realized-vol estimate.
- 8% volatility target cap.
- No shorting.
- Flat if no positive-momentum asset qualifies.
- Vibe-Trading applies next-bar style execution via shifted signals.

## Commands run

From:

```text
C:/Users/Kidsg/ai-tools/evaluation/Vibe-Trading/agent
```

Backtest:

```bash
../.venv-vibe-paper-311/Scripts/python.exe -m backtest.runner runs/vibe_core_def_l252_t1_vt008_20260709
```

Validation:

```bash
../.venv-vibe-paper-311/Scripts/python.exe -m backtest.validation runs/vibe_core_def_l252_t1_vt008_20260709
```

## Vibe-Trading output

```json
{
  "final_value": 23117.78460453006,
  "total_return": 1.3117784604530063,
  "annual_return": 0.08766711747459088,
  "max_drawdown": -0.13999453620107183,
  "sharpe": 0.8742025782328897,
  "calmar": 0.6262,
  "sortino": 1.0098,
  "win_rate": 0.5714285714285714,
  "profit_loss_ratio": 2.8067,
  "profit_factor": 3.7422,
  "max_consecutive_loss": 4,
  "avg_holding_days": 17.8,
  "trade_count": 126,
  "benchmark_return": 0.819197,
  "excess_return": 0.492581,
  "information_ratio": 0.2691
}
```

## Vibe-Trading validation output

```json
{
  "monte_carlo": {
    "actual_sharpe": 2.6875,
    "actual_max_dd": -0.0594,
    "p_value_sharpe": 0.439,
    "p_value_max_dd": 0.479,
    "simulated_sharpe_mean": 2.6145,
    "simulated_sharpe_std": 0.2589,
    "simulated_sharpe_p5": 2.2014,
    "simulated_sharpe_p95": 2.9931,
    "n_simulations": 1000,
    "n_trades": 126
  },
  "bootstrap": {
    "observed_sharpe": 0.8746,
    "ci_lower": 0.2309,
    "ci_upper": 1.5136,
    "median_sharpe": 0.8654,
    "prob_positive": 0.998,
    "confidence": 0.95,
    "n_bootstrap": 1000
  },
  "walk_forward": {
    "n_windows": 5,
    "profitable_windows": 5,
    "consistency_rate": 1.0,
    "return_mean": 0.187341,
    "return_std": 0.117401,
    "sharpe_mean": 0.9078,
    "sharpe_std": 0.3873
  }
}
```

## Walk-forward detail

| Window | Period | Return | Sharpe | Max DD | Trades | Win rate |
|---|---|---:|---:|---:|---:|---:|
| 1 | 2016-07-01 → 2018-06-28 | 16.0088% | 1.0022 | -7.3426% | 0 | 0.00% |
| 2 | 2018-06-29 → 2020-06-26 | 2.6151% | 0.1686 | -13.9995% | 36 | 55.56% |
| 3 | 2020-06-29 → 2022-06-24 | 18.8727% | 1.0905 | -7.1679% | 42 | 54.76% |
| 4 | 2022-06-27 → 2024-06-25 | 16.9753% | 0.9736 | -12.5044% | 11 | 63.64% |
| 5 | 2024-06-26 → 2026-07-01 | 39.1985% | 1.3039 | -12.5775% | 37 | 59.46% |

## Comparison

| Metric | Native Quant Floor | Vibe-Trading expression | Read |
|---|---:|---:|---|
| Final equity | `$23,525.40` | `$23,117.78` | close |
| Total return | `135.2540%` | `131.1778%` | close |
| CAGR / annual return | `10.0090%` | `8.7667%` | lower in Vibe |
| Max DD | `-9.8765%` | `-13.9995%` | worse in Vibe |
| Sharpe | `1.1146` | `0.8742` | lower in Vibe |
| Sortino | `1.4642` | `1.0098` | lower in Vibe |
| Trades | `122` | `126` | close |
| Win rate | `53.2787%` | `57.1429%` | slightly higher in Vibe |
| Profit factor | `2.6032` | `3.7422` | higher in Vibe |
| Decision | `watchlist/revise` | `watchlist/revise` | same broad decision |

## Interpretation

This gate is a **qualified pass for Vibe-Trading infrastructure**, not a strategy promotion.

What worked:

- Vibe-Trading expressed the Quant Floor `CORE_DEF-L252-T1-VT0.08` idea closely enough to compare.
- The result direction matched the native Quant Floor result: profitable, materially better than the broad tactical test, and not yet Sharpe-target/live-ready.
- Vibe produced useful artifact packaging: run card, config/strategy hashes, per-symbol OHLCV, trades, positions, equity, metrics, and validation JSON.
- Walk-forward was positive in all five windows.

Caveats:

- Vibe's implementation showed lower Sharpe and worse drawdown than the native Quant Floor reference.
- The Monte Carlo validation output reports a trade-level `actual_sharpe` that is not directly comparable to the main daily-return Sharpe; use the bootstrap observed Sharpe and main metrics for strategy comparison.
- Differences likely come from engine accounting, turnover/cost modeling, date alignment, and signal/weight handling rather than a true strategy change.
- This remains paper-only research. No broker/exchange connection is approved.

## Decision

**Keep the native Quant Floor engine as the strategy source of truth.**

**Borrow or mirror Vibe-Trading's evidence/reporting pattern**, especially:

- run cards,
- config and strategy hashes,
- standardized artifacts folder,
- validation JSON,
- OHLCV snapshots tied to each run.

Do **not** replace the Quant Floor engine with Vibe-Trading for CORE_DEF yet.

## Recommended next step

Port the Vibe-style run-card/report bundle into the native Quant Floor strategy lab so each Quant Floor run emits:

```text
run_card.md
run_card.json
artifacts/metrics.csv
artifacts/trades.csv
artifacts/equity.csv
artifacts/positions.csv
artifacts/validation.json
source_data/*.csv
```

Then rerun `CORE_DEF-L252-T1-VT0.08` natively with the same artifact contract.

## Related

- [[Strategy Lab v2-v3 Sharpe Target Evidence]]
- [[Vibe-Trading Broad Tactical Momentum Benchmark - 2026-07-09]]
- [[Vibe-Trading Paper-Only Smoke Test - 2026-07-09]]
- [[Vibe-Trading Evaluation Report - 2026-07-09]]
- [[AI Quant Trading Floor]]
