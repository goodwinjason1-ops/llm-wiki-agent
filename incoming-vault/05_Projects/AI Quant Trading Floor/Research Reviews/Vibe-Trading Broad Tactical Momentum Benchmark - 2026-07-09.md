---
title: Vibe-Trading Broad Tactical Momentum Benchmark - 2026-07-09
created: 2026-07-09
updated: 2026-07-09
type: evidence
status: complete
sources:
  - [[Vibe-Trading Paper-Only Smoke Test - 2026-07-09]]
  - [[Vibe-Trading Paper-Only Pilot Plan]]
tags: [quant, vibe-trading, paper-only, public-data, benchmark, tactical-momentum]
confidence: high
---

# Vibe-Trading Broad Tactical Momentum Benchmark - 2026-07-09

## Purpose

Run the next broader no-key/public-data Vibe-Trading benchmark after the first one-trade `SPY.US` smoke test. The goal was to test Vibe-Trading's artifact and validation pipeline on a multi-asset, multi-year paper-only benchmark with enough trades to make validation meaningful.

## Safety boundary

- Public yfinance data only.
- No broker/exchange auth.
- No API keys.
- No wallets.
- No order placement/cancellation.
- No live trading.
- No externally reachable server.

## Environment

| Field | Value |
|---|---|
| Repo | `C:/Users/Kidsg/ai-tools/evaluation/Vibe-Trading` |
| Python env | `.venv-vibe-paper-311` |
| Runner | `../.venv-vibe-paper-311/Scripts/python.exe -m backtest.runner` |
| Validator | `../.venv-vibe-paper-311/Scripts/python.exe -m backtest.validation` |
| Run dir | `agent/runs/vibe_broad_momentum_20260709` |

## Strategy tested

**Universe:** `SPY.US`, `QQQ.US`, `GLD.US`, `TLT.US`, `SHY.US`.

**Period:** `2020-01-01` to `2024-12-31`.

**Starting paper capital:** `$5,000`.

**Rules:**

1. Compute 63-trading-day momentum for each ETF.
2. Require price above a rolling 126-day mean as a trend filter.
3. Hold the top 2 positive/trend-qualified ETFs.
4. If none qualify, hold `SHY.US` as defensive proxy.
5. Vibe-Trading engine shifts signals before execution, so fills use next-bar semantics.
6. No leverage, no broker account, no live orders.

## Commands run

From:

```text
C:/Users/Kidsg/ai-tools/evaluation/Vibe-Trading/agent
```

Backtest:

```bash
../.venv-vibe-paper-311/Scripts/python.exe -m backtest.runner runs/vibe_broad_momentum_20260709
```

Validation:

```bash
../.venv-vibe-paper-311/Scripts/python.exe -m backtest.validation runs/vibe_broad_momentum_20260709
```

## Backtest output

```json
{
  "final_value": 5591.3282917435245,
  "total_return": 0.11826565834870495,
  "annual_return": 0.022643902483437284,
  "max_drawdown": -0.2922684935697125,
  "sharpe": 0.24083031389236803,
  "calmar": 0.0775,
  "sortino": 0.2818,
  "win_rate": 0.3509933774834437,
  "profit_loss_ratio": 2.1104,
  "profit_factor": 1.1413,
  "max_consecutive_loss": 9,
  "avg_holding_days": 12.5,
  "trade_count": 151,
  "benchmark_return": 0.421801,
  "excess_return": -0.303535,
  "information_ratio": -0.4061
}
```

## Validation output

```json
{
  "monte_carlo": {
    "actual_sharpe": 0.5397,
    "actual_max_dd": -0.2555,
    "p_value_sharpe": 0.925,
    "p_value_max_dd": 0.71,
    "simulated_sharpe_mean": 0.5881,
    "simulated_sharpe_std": 0.1487,
    "simulated_sharpe_p5": 0.5146,
    "simulated_sharpe_p95": 0.6874,
    "n_simulations": 1000,
    "n_trades": 151
  },
  "bootstrap": {
    "observed_sharpe": 0.241,
    "ci_lower": -0.6903,
    "ci_upper": 1.1658,
    "median_sharpe": 0.2702,
    "prob_positive": 0.705,
    "confidence": 0.95,
    "n_bootstrap": 1000
  },
  "walk_forward": {
    "n_windows": 5,
    "profitable_windows": 3,
    "consistency_rate": 0.6,
    "return_mean": 0.034063,
    "return_std": 0.147891,
    "sharpe_mean": 0.1572,
    "sharpe_std": 1.3279
  }
}
```

## Walk-forward detail

| Window | Period | Return | Sharpe | Max DD | Trades | Win rate |
|---|---|---:|---:|---:|---:|---:|
| 1 | 2020-01-02 → 2020-12-29 | 19.7548% | 1.2572 | -8.8381% | 18 | 50.00% |
| 2 | 2020-12-30 → 2021-12-28 | 11.6539% | 1.0094 | -7.8813% | 30 | 30.00% |
| 3 | 2021-12-29 → 2022-12-27 | -21.8933% | -2.2852 | -24.7373% | 30 | 10.00% |
| 4 | 2022-12-28 → 2023-12-27 | 11.4385% | 1.0327 | -8.8979% | 31 | 25.81% |
| 5 | 2023-12-28 → 2024-12-31 | -3.9225% | -0.2282 | -14.7671% | 42 | 57.14% |

## Artifacts created

| Artifact | Path |
|---|---|
| Run card | `agent/runs/vibe_broad_momentum_20260709/run_card.md` |
| Run card JSON | `agent/runs/vibe_broad_momentum_20260709/run_card.json` |
| Metrics | `agent/runs/vibe_broad_momentum_20260709/artifacts/metrics.csv` |
| Trades | `agent/runs/vibe_broad_momentum_20260709/artifacts/trades.csv` |
| Positions | `agent/runs/vibe_broad_momentum_20260709/artifacts/positions.csv` |
| Equity | `agent/runs/vibe_broad_momentum_20260709/artifacts/equity.csv` |
| OHLCV snapshots | `agent/runs/vibe_broad_momentum_20260709/artifacts/ohlcv_*.csv` |
| Validation | `agent/runs/vibe_broad_momentum_20260709/artifacts/validation.json` |
| Config hash | `85b680eeec48b689b750b00b908966c5bce1f74fe89188b02c188cd6508373ff` |
| Strategy hash | `3712311f60c3f39f161d422091ca3617052cac600d612d9a74004e95f70eae7c` |

## Interpretation

This is a **useful infrastructure pass** and a **strategy rejection/revision signal**.

Positive system evidence:

- Vibe-Trading handled a 5-ETF public-data benchmark.
- It produced run cards, hashes, per-symbol OHLCV snapshots, metrics, trades, positions, equity, and validation artifacts.
- Validation ran meaningfully this time because the run had `151` trades.

Negative strategy evidence:

- Total return was only `11.83%` over five years.
- Benchmark return was `42.18%`, so excess return was `-30.35%`.
- Max drawdown was high at `-29.23%`.
- Sharpe was low at `0.24`.
- 2022 was a major failure window: `-21.89%` return and `-24.74%` max drawdown.
- Bootstrap confidence interval crossed below zero, and Monte Carlo did not support strong Sharpe significance.

## Decision

**Do not adopt this tactical momentum strategy.**

**Do keep evaluating Vibe-Trading's artifact pipeline.** The strongest value remains run cards, reproducibility hashes, artifact packaging, and validation JSON that could be ported or mirrored into the Quant Floor.

## Recommended next gate

Run one more benchmark focused on a candidate we already know is stronger in Jayse's Quant Floor: defensive ETF tactical core using the Quant Floor's existing `CORE_DEF` universe and ranking assumptions, then compare Vibe-Trading's artifact quality against the Quant Floor's native results.

If Vibe-Trading's engine makes it awkward to express the known-good Quant Floor candidate, port the **reporting/artifact pattern** rather than the engine.

## Related

- [[Vibe-Trading Paper-Only Smoke Test - 2026-07-09]]
- [[Vibe-Trading Paper-Only Pilot Plan]]
- [[Vibe-Trading Evaluation Report - 2026-07-09]]
- [[Strategy Lab v2-v3 Sharpe Target Evidence]]
- [[AI Quant Trading Floor]]
