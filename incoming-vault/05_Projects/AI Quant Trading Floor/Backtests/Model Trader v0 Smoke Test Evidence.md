---
title: Model Trader v0 Smoke Test Evidence
created: 2026-07-03
updated: 2026-07-03
type: backtest-evidence
tags: [quant, crypto, model-trader, backtest, evidence]
sources: [https://youtu.be/m6d5aqcxZ14]
confidence: high
---

# Model Trader v0 Smoke Test Evidence

## Purpose

Verify that the AI Quant Trading Floor implementation scaffold runs against public data for crypto, ETFs, and precious-metal ETFs.

## Commands run

```bash
python "C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation/quant_floor_system.py" init
python "C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation/quant_floor_system.py" scan --interval 1d --limit 500
python "C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation/quant_floor_system.py" backtest --symbol BTCUSDT --adapter binance --interval 1d --limit 1000
python "C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation/quant_floor_system.py" backtest --symbol SPY --adapter yahoo --interval 1d --limit 1000
python "C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation/quant_floor_system.py" backtest --symbol GLD --adapter yahoo --interval 1d --limit 1000
```

## Scan results snapshot

| Symbol | Adapter | Score | Direction | Action | Regime | Notes |
|---|---|---:|---|---|---|---|
| BTCUSDT | Binance | 0 | flat | observe | sideways | Mixed MACD/RSI/FVG |
| ETHUSDT | Binance | 2 | flat | observe | sideways | Mild positive but below alert |
| SOLUSDT | Binance | 7 | long_watch | alert_candidate | bull | Bull regime + MACD + RSI + failure swing |
| SPY | Yahoo | 0 | flat | observe | sideways | Mixed |
| QQQ | Yahoo | 0 | flat | observe | sideways | Mixed |
| GLD | Yahoo | -2 | flat | observe | bear | Below alert threshold |
| SLV | Yahoo | -4 | flat | observe | bear | Below alert threshold |

## Backtest metrics

Assumptions: 6 bps fee + 4 bps slippage per unit turnover.

| Symbol | Adapter | Total return | CAGR | Max DD | Sharpe | Exposure | Trades | Decision |
|---|---|---:|---:|---:|---:|---:|---:|---|
| BTCUSDT | Binance | -25.64% | -10.26% | -53.18% | -0.21 | 33.3% | 118 | revise/reject v0 |
| SPY | Yahoo | -17.46% | -5.43% | -24.51% | -0.44 | 25.1% | 126 | revise/reject v0 |
| GLD | Yahoo | +2.67% | +0.77% | -23.50% | 0.13 | 28.4% | 109 | weak/inconclusive |

## Interpretation

The implementation works, but the initial v0 scoring model is **not** a tradable edge.

Useful lessons:

- The Model Trader architecture is implemented and can scan/backtest public markets.
- SOLUSDT produced an alert candidate, but not a paper-trade candidate under current threshold.
- BTC and SPY backtests reject the v0 confluence model.
- GLD was barely positive but too weak to promote.
- Next iteration should add trader-derived detector specs from the actual strategy list, not generic RSI/MACD/regime/FVG weighting.

## Self-improvement log

- Candidate tested/reviewed: Model Trader v0 confluence scanner.
- Scorecard used: positive return after 10 bps turnover cost, reasonable drawdown, benchmark comparison required.
- Evidence produced: public scan + BTCUSDT/SPY/GLD backtests.
- Result vs goal: failed for BTC/SPY, inconclusive/weak for GLD.
- What improved: system is now runnable, ledgered, and multi-asset.
- What failed or remains weak: generic scoring model does not create reliable edge.
- Diagnosis: detectors are too generic; need strategy-specific rules from the trading-floor strategy list and/or trader transcript distillation.
- Next hypothesis: import/flesh actual strategy list, encode each as detector functions, then test one variable at a time.
- One variable to change next: replace generic score weights with one strategy-specific detector spec.
- Reusable lesson: architecture can be valid while the first detector model is invalid; reject the model, not the system.
- Artifact to update: strategy specs and detector library.
- Baseline decision: keep system scaffold, reject v0 scoring as tradable baseline.
- Next action: flesh/import strategy list and build QTF-007+ detector specs.
- Promotion status: revise.
