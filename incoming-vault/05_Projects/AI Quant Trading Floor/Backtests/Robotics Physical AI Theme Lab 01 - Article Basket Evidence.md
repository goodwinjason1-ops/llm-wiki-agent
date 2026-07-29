---
title: Robotics Physical AI Theme Lab 01 - Article Basket Evidence
created: 2026-07-08
updated: 2026-07-08
type: backtest-evidence
tags: [quant, robotics, physical-ai, backtest, paper-trading]
sources: [03_Sources/articles/robotics-physical-ai-investing-guide-miles-deutscher-2026-07-07.md, 05_Projects/AI Quant Trading Floor/Implementation/robotics_theme_lab.py]
confidence: medium
---

# Robotics Physical AI Theme Lab 01 - Article Basket Evidence

## Command run

```bash
python3 robotics_theme_lab.py --capital 5000 --years 8
```

## Data and assumptions

Yahoo daily data; BOTZ, ROBO, ARKQ, TSLA, AMZN, OUST, SYM, SPY, and QQQ fetched successfully. Starting capital $5,000. Costs: 2 bps fee + 3 bps slippage per turnover. Smoke test only.

## Top result

| Field | Value |
|---|---:|
| Strategy | ROBO-MOM-L126-T3 |
| Window | 2021-09-08 → 2026-07-07 |
| Final equity | $7663.55 |
| Total return | 53.27% |
| CAGR | 9.29% |
| Max drawdown | -13.00% |
| Sharpe | 0.95 |
| Sortino | 1.47 |
| Average exposure | 32.0% |
| Decision | watchlist/paper-research candidate |

## Ranked smoke-test rows

| Strategy | Name | Return | CAGR | Max DD | Sharpe | Exposure | Decision |
|---|---|---:|---:|---:|---:|---:|---|
| ROBO-MOM-L126-T3 | Robotics positive-momentum / vol-target overlay | 53.27% | 9.29% | -13.00% | 0.95 | 32.0% | watchlist/paper-research candidate |
| ROBO-MOM-L126-T2 | Robotics positive-momentum / vol-target overlay | 49.44% | 8.72% | -12.12% | 0.86 | 28.1% | watchlist/paper-research candidate |
| ROBO-MOM-L126-T4 | Robotics positive-momentum / vol-target overlay | 41.68% | 7.52% | -12.06% | 0.79 | 34.9% | watchlist only |
| BENCH-QQQ | Buy and hold QQQ | 321.29% | 19.78% | -35.12% | 0.87 | 100.0% | benchmark |
| ROBO-MOM-L252-T4 | Robotics positive-momentum / vol-target overlay | 29.05% | 6.10% | -17.34% | 0.62 | 28.1% | watchlist only |
| BENCH-SPY | Buy and hold SPY | 203.89% | 14.97% | -33.72% | 0.82 | 100.0% | benchmark |
| ROBO-MOM-L252-T2 | Robotics positive-momentum / vol-target overlay | 30.15% | 6.31% | -17.34% | 0.62 | 21.2% | watchlist only |
| ROBO-MOM-L252-T3 | Robotics positive-momentum / vol-target overlay | 23.88% | 5.10% | -17.34% | 0.52 | 26.0% | watchlist only |

## Interpretation

The static equal-weight article basket captured upside but had ~-50% max drawdown, so it remains research-only/revise. The 126-day top-3 positive-momentum overlay reduced drawdown and exposure and becomes a watchlist/paper-research candidate only.

## Artifacts

- `05_Projects/AI Quant Trading Floor/Implementation/robotics_theme_lab.py`
- `05_Projects/AI Quant Trading Floor/Implementation/reports/robotics_theme_lab_20260708T012258+0000.json`
- `05_Projects/AI Quant Trading Floor/Implementation/reports/robotics_theme_lab_20260708T012258+0000.csv`
