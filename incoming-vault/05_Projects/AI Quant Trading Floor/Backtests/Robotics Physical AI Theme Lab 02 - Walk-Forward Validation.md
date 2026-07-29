---
title: Robotics Physical AI Theme Lab 02 - Walk-Forward Validation
created: 2026-07-08
updated: 2026-07-08
type: backtest-evidence
tags: [quant, robotics, physical-ai, walk-forward, validation, paper-trading]
sources: [05_Projects/AI Quant Trading Floor/Implementation/robotics_walkforward_validation.py, 05_Projects/AI Quant Trading Floor/Strategies/QTF-009 Robotics Physical AI Theme Basket.md]
confidence: medium
---

# Robotics Physical AI Theme Lab 02 - Walk-Forward Validation

## Command run

```bash
python3 robotics_walkforward_validation.py --capital 5000 --years 8
```

## Method

Rolling walk-forward validation: choose the best `lookback/top_n` parameter on a 504-trading-day training window, then test the next 126 trading days. Signals use only prior data; costs are included.

## Aggregate result

| Metric | Value |
|---|---:|
| Folds | 4 |
| Positive folds | 3 |
| Final equity on stitched OOS returns | $6217.32 |
| Total return | 24.35% |
| CAGR | 11.51% |
| Max drawdown | -10.27% |
| Sharpe | 1.15 |
| Sortino | 1.75 |
| Avg exposure | 26.5% |
| Median fold return | 4.71% |
| Median fold Sharpe | 0.95 |
| Decision | paper-monitor candidate after one more validation pass |

## Fold results

| Fold | Train window | Test window | Chosen | Test return | Test max DD | Test Sharpe | Exposure |
|---:|---|---|---|---:|---:|---:|---:|
| 1 | 2022-03-10→2024-03-12 | 2024-03-13→2024-09-11 | L252-T2 | -0.30% | -9.45% | -0.01 | 29.6% |
| 2 | 2022-09-09→2024-09-11 | 2024-09-12→2025-03-14 | L126-T3 | 5.48% | -7.78% | 1.09 | 30.5% |
| 3 | 2023-03-13→2025-03-14 | 2025-03-17→2025-09-15 | L126-T3 | 13.77% | -6.17% | 2.74 | 19.9% |
| 4 | 2023-09-12→2025-09-15 | 2025-09-16→2026-03-17 | L252-T4 | 3.93% | -5.64% | 0.82 | 25.8% |

## Interpretation

This is materially stronger than the first static smoke test because the parameters were selected on prior windows and tested forward. It is still not live-ready: only four folds exist and the first fold was negative. The correct status is **paper-monitor candidate after one more validation pass**, not live allocation.

## Next gate

Add a broader validation pass: same method against adjacent robotics/pick-and-shovel names and a benchmark-matched QQQ/SPY tactical control.
