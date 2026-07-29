---
title: Vibe-Trading Paper-Only Smoke Test - 2026-07-09
created: 2026-07-09
updated: 2026-07-09
type: evidence
status: complete
sources:
  - [[Vibe-Trading Paper-Only Pilot Plan]]
  - [[Vibe-Trading Evaluation Report - 2026-07-09]]
tags: [quant, vibe-trading, paper-only, public-data, backtest, evidence]
confidence: high
---

# Vibe-Trading Paper-Only Smoke Test - 2026-07-09

## Purpose

Run the smallest practical Vibe-Trading no-key/public-data paper-only backtest in an isolated local evaluation environment before deciding whether to integrate any Vibe-Trading components into the [[AI Quant Trading Floor]].

## Safety boundary

- Public Yahoo/yfinance data only.
- No broker or exchange auth.
- No wallet connection.
- No API keys.
- No account linking.
- No order placement/cancellation.
- No live trading.
- No externally reachable server.

## Environment

| Field | Value |
|---|---|
| Repo | `C:/Users/Kidsg/ai-tools/evaluation/Vibe-Trading` |
| Python env | `C:/Users/Kidsg/ai-tools/evaluation/Vibe-Trading/.venv-vibe-paper-311` |
| Python version | `3.11.15` |
| Install command | `uv pip install --python .venv-vibe-paper-311/Scripts/python.exe -e .` |
| Package installed | `vibe-trading-ai==0.1.10` editable from local repo |

Note: the isolated install resolved and installed 186 packages. This was an evaluation environment only.

## Backtest setup

Run directory:

```text
C:/Users/Kidsg/ai-tools/evaluation/Vibe-Trading/agent/runs/vibe_paper_smoke_20260709
```

Config summary:

```json
{
  "codes": ["SPY.US"],
  "start_date": "2024-01-01",
  "end_date": "2024-03-31",
  "source": "yfinance",
  "interval": "1D",
  "engine": "daily",
  "initial_cash": 5000,
  "leverage": 1.0,
  "slippage_us": 0.0005
}
```

Strategy:

- 5-day SMA above 20-day SMA = long.
- Otherwise flat.
- No shorting.
- Signals are shifted by the Vibe-Trading engine before execution, giving next-bar semantics.

## Commands run

From:

```text
C:/Users/Kidsg/ai-tools/evaluation/Vibe-Trading/agent
```

Backtest:

```bash
../.venv-vibe-paper-311/Scripts/python.exe -m backtest.runner runs/vibe_paper_smoke_20260709
```

Validation:

```bash
../.venv-vibe-paper-311/Scripts/python.exe -m backtest.validation runs/vibe_paper_smoke_20260709
```

## Backtest output

```json
{
  "final_value": 5349.924333602906,
  "total_return": 0.06998486672058113,
  "annual_return": 0.32240153857513776,
  "max_drawdown": -0.014208954677611711,
  "sharpe": 2.9987047056693394,
  "calmar": 22.69,
  "sortino": 4.2932,
  "win_rate": 1.0,
  "profit_loss_ratio": 0.0,
  "profit_factor": 0.0,
  "max_consecutive_loss": 0,
  "avg_holding_days": 40.0,
  "trade_count": 1,
  "benchmark_return": 0.106675,
  "excess_return": -0.03669,
  "information_ratio": -2.5949
}
```

## Trade output

```csv
timestamp,code,side,price,qty,reason,pnl,holding_days,return_pct
2024-01-31,SPY.US,buy,488.8643,10.23,signal,0.0,0,0.0
2024-03-28,SPY.US,sell,523.07,10.23,end_of_backtest,349.9243,57,7.0
```

## Validation output

```json
{
  "monte_carlo": {
    "error": "need at least 3 trades",
    "p_value_sharpe": 1.0
  },
  "bootstrap": {
    "observed_sharpe": 3.0496,
    "ci_lower": -1.1544,
    "ci_upper": 6.9382,
    "median_sharpe": 2.9678,
    "prob_positive": 0.936,
    "confidence": 0.95,
    "n_bootstrap": 1000
  },
  "walk_forward": {
    "n_windows": 5,
    "profitable_windows": 4,
    "consistency_rate": 0.8,
    "return_mean": 0.010769,
    "return_std": 0.009168,
    "sharpe_mean": 2.2109,
    "sharpe_std": 1.5133
  }
}
```

## Artifacts created

| Artifact | Path |
|---|---|
| Run card | `agent/runs/vibe_paper_smoke_20260709/run_card.md` |
| Run card JSON | `agent/runs/vibe_paper_smoke_20260709/run_card.json` |
| Metrics | `agent/runs/vibe_paper_smoke_20260709/artifacts/metrics.csv` |
| Trades | `agent/runs/vibe_paper_smoke_20260709/artifacts/trades.csv` |
| Positions | `agent/runs/vibe_paper_smoke_20260709/artifacts/positions.csv` |
| Equity | `agent/runs/vibe_paper_smoke_20260709/artifacts/equity.csv` |
| OHLCV snapshot | `agent/runs/vibe_paper_smoke_20260709/artifacts/ohlcv_SPY.US.csv` |
| Validation | `agent/runs/vibe_paper_smoke_20260709/artifacts/validation.json` |

## Interpretation

This is a **successful system smoke test**, not a profitable-strategy claim.

Positive signs:

- The isolated Python 3.11 environment installed.
- The built-in Vibe-Trading backtest runner executed with no credentials.
- yfinance public data loaded for `SPY.US`.
- Vibe-Trading generated run cards, hashes, metrics, trades, positions, equity, and OHLCV artifacts.
- Validation command produced bootstrap and walk-forward diagnostics.

Caveats:

- Only one completed trade, so Monte Carlo validation refused to infer significance: `need at least 3 trades`.
- The strategy underperformed buy-and-hold SPY over the test window: benchmark return `10.6675%` vs strategy return `6.9985%`.
- The headline Sharpe is not meaningful with one trade and a short Q1 2024 sample.
- No live/paper broker execution was tested or approved.

## CLI note

Calling the installed `vibe-trading.exe --help` from inside this environment appeared to resolve to the local Hermes CLI path and ended with a Windows Rich-console `OSError: [Errno 22] Invalid argument`. The direct Python module entry point `python -m backtest.runner` worked, so the backtest path is usable, but the packaged CLI entry point needs separate investigation before relying on it.

## Decision

**Pilot gate passed for public-data backtest infrastructure.**

Do not integrate strategy logic from this smoke. The useful part is the artifact/reporting pipeline: run cards, hashes, metrics/trade/equity CSVs, and validation JSON.

## Recommended next step

Run a slightly broader public-data paper benchmark with at least 3–10 trades, for example:

- SPY/QQQ/GLD/TLT daily tactical momentum, or
- BTC/ETH public crypto daily trend baseline, or
- the same SMA strategy over a longer period with benchmark comparison.

Then compare Vibe-Trading artifacts against the current AI Quant Floor evidence notes before deciding what to port.

## Related

- [[Vibe-Trading Paper-Only Pilot Plan]]
- [[Vibe-Trading Evaluation Report - 2026-07-09]]
- [[AI Quant Trading Floor]]
- [[Model Trader v0 Smoke Test Evidence]]
