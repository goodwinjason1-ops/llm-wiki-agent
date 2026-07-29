---
title: Alternative Validation Lab 02 - Calibration History and Monte Carlo
created: 2026-07-03
updated: 2026-07-03
type: research-evidence
tags: [quant, sharpe-target, polymarket, hyperliquid, defi, monte-carlo, validation]
confidence: high
---

# Alternative Validation Lab 02 - Calibration History and Monte Carlo

## Goal

Move the alternative-venue Sharpe-target track from scanning into validation:

1. calibrate Polymarket BTC/ETH first-touch probabilities against intraday high/low data,
2. analyze local Hyperliquid funding recorder data for readiness,
3. score DeFi stable/lending candidates using pool history,
4. run Monte Carlo forecast for the current sleeve allocator.

All work remains **read-only / paper-research only**.

## Built artifact

```text
Implementation/alt_validation_lab.py
```

Final run:

```text
python Implementation/alt_validation_lab.py all
```

Report:

```text
Implementation/reports/alt_validation_all_20260703T013707+0000.json
```

## 1. Polymarket intraday touch calibration

Method:

- Pulled Binance hourly BTCUSDT and ETHUSDT high/low bars.
- Created historical synthetic barriers at 0.5%, 1%, 2%, 4%, and 8% away from spot.
- Tested horizons of 6h, 12h, 24h, 72h, and 168h.
- Compared simplified GBM first-touch probabilities against actual high/low touches.

### Best-calibrated areas

| Symbol | Horizon | Threshold | Model prob | Actual touch | Bias | Samples |
|---|---:|---:|---:|---:|---:|---:|
| BTC | 12h | 4.0% | 4.41% | 4.32% | +0.09% | 1,574 |
| BTC | 24h | 8.0% | 0.78% | 0.65% | +0.13% | 1,550 |
| BTC | 12h | 8.0% | 0.04% | 0.06% | -0.02% | 1,574 |

### Worst-calibrated areas

| Symbol | Horizon | Threshold | Model prob | Actual touch | Bias | Interpretation |
|---|---:|---:|---:|---:|---:|---|
| ETH | 6h | 1.0% | 53.91% | 43.51% | +10.40% | model overestimates short-horizon ETH touches |
| ETH | 168h | 2.0% | 80.67% | 70.52% | +10.15% | model overestimates weekly ETH near-touch odds |
| ETH | 24h | 2.0% | 53.82% | 43.94% | +9.88% | overestimation zone |
| ETH | 168h | 8.0% | 33.93% | 42.55% | -8.62% | model underestimates large weekly ETH moves |
| ETH | 6h | 0.5% | 75.68% | 67.40% | +8.28% | overestimates tiny short-horizon moves |

### Polymarket conclusion

The first-touch model is usable as a **rough screen**, but not yet sufficient as a trade model. It needs a calibration layer:

- BTC medium thresholds behaved reasonably in this sample.
- ETH short-horizon near-barrier markets were materially overestimated.
- Large weekly ETH moves were underestimated.

Practical rule for now:

```text
Treat raw Polymarket model edge as a paper signal only.
Discount ETH short-horizon/tiny-threshold model probabilities by ~10 percentage points until calibrated further.
Require wider margin of safety before considering any real allocation.
```

## 2. Hyperliquid funding analyzer

Method:

- Read local recorder data from:

```text
Implementation/data_cache/hyperliquid_funding_snapshots.jsonl
```

Current status:

- 12 snapshots per tracked coin in the local dataset.
- This is **not enough** for persistence/fade backtesting.
- The analyzer requires at least 48 hourly samples per coin before preliminary testing.

Top anomalies currently observed:

| Coin | Snapshots | Mean funding ann. | Max abs funding ann. | Same-sign fraction | Sample mark return | Readiness |
|---|---:|---:|---:|---:|---:|---|
| ME | 12 | -552.01% | 603.60% | 100% | 0.00% | insufficient history |
| MANTA | 12 | -174.99% | 361.40% | 100% | +0.43% | insufficient history |
| BOME | 12 | -8.21% | 202.29% | 8.33% | -0.24% | insufficient history |
| CELO | 12 | -110.96% | 146.65% | 100% | -0.35% | insufficient history |
| SPX | 12 | +31.90% | 123.35% | 100% | +0.72% | insufficient history |

Conclusion:

- The recorder is working.
- No Hyperliquid sleeve should be promoted yet.
- Let the hourly recorder collect at least 48 hours; better 2–4 weeks.

## 3. DeFi pool-history scorer

Method:

- Pulled DeFiLlama pool chart history for top stable/single-exposure/no-IL candidates.
- Scored recent APY mean, median, min APY, APY volatility, APY drawdown from peak, and TVL trend.

Top paper candidates:

| Rank | Chain | Project | Symbol | Current APY | Recent mean APY | Recent min APY | TVL | Decision |
|---:|---|---|---|---:|---:|---:|---:|---|
| 1 | Ethereum | Pendle | REUSDE | 15.98% | 15.26% | 14.06% | $4.27M | paper candidate |
| 2 | BSC | Pendle | SUSDAT | 15.17% | 14.96% | 14.52% | $2.86M | paper candidate |
| 3 | Ethereum | Pendle | APYUSD | 16.74% | 16.34% | 13.78% | $7.70M | paper candidate |
| 4 | Ethereum | Pendle | APYUSD | 15.43% | 15.39% | 13.73% | $3.97M | paper candidate |
| 5 | Ethereum | APYX Protocol | APXUSD | 14.44% | 13.68% | 11.03% | $145.39M | paper candidate |
| 6 | Ethereum | Mainstreet | MSUSD | 12.00% | 12.00% | 11.99% | $74.21M | paper candidate |

DeFi conclusion:

- The best immediate DeFi sleeve is not the highest APY; it is the most stable, no-IL, high-TVL stable yield.
- MSUSD is especially interesting for stability, while Pendle candidates have higher yield but more structure-specific risk.
- Next step is protocol-level risk classification before any real allocation.

## 4. Monte Carlo sleeve allocator forecast

Assumptions are conservative research priors, not proven live edge:

| Sleeve | Weight | Assumed annual return | Assumed annual vol |
|---|---:|---:|---:|
| Daily ETF tactical core | 40.6% | 10% | 9% |
| Prediction-market crypto edge | 19.1% | 18% | 28% |
| Hyperliquid funding/momentum | 15.9% | 16% | 24% |
| DeFi stable/lending yield | 14.4% | 10% | 6% |
| Cash reserve | 10.0% | 3.5% | 0.5% |

Simulation:

- Starting capital: $10,000
- Horizon: 252 trading days
- Runs: 20,000

Forecast output:

| Metric | Result |
|---|---:|
| Median final equity | $11,197.71 |
| 5th percentile final equity | $9,627.52 |
| 95th percentile final equity | $13,073.45 |
| Probability of profit | 88.99% |
| Median Sharpe | 1.2723 |
| 25th percentile Sharpe | 0.5997 |
| 75th percentile Sharpe | 1.9500 |
| Probability Sharpe ≥ 1.6 | 37.28% |
| Median max drawdown | -6.48% |
| 5th percentile max drawdown | -12.40% |

## Sharpe-target conclusion

Under conservative priors, the current mix does **not yet reliably hit Sharpe 1.6–1.8**.

It does, however, show a plausible research path:

```text
Median Sharpe: 1.27
Upper-quartile Sharpe: 1.95
Probability of Sharpe >= 1.6: 37.28%
```

This means the target is not impossible, but the system needs one or more of:

1. better calibrated prediction-market edge,
2. confirmed Hyperliquid funding persistence/fade edge,
3. lower-correlation DeFi carry sleeve,
4. dynamic allocator that scales down weak sleeves and scales up validated sleeves.

## Next experiment

Implement `alt_validation_lab.py` follow-up:

1. Add calibrated probability multipliers by symbol/horizon/threshold.
2. Add Hyperliquid 48h readiness gate and automatic preliminary funding-persistence test when enough data exists.
3. Add protocol-risk labels for DeFi candidates.
4. Add allocator optimizer that searches sleeve weights under max drawdown and cash-reserve constraints.

## Safety status

No live execution, no credentials, no private keys, no orders.
