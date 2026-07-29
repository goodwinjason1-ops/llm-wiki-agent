---
title: Alternative Research Lab 01 - Prediction Funding DeFi Allocator
created: 2026-07-03
updated: 2026-07-03
type: research-evidence
tags: [quant, sharpe-target, polymarket, hyperliquid, defi, allocator, evidence]
confidence: high
---

# Alternative Research Lab 01 - Prediction Funding DeFi Allocator

## Goal

Continue the Sharpe 1.6–1.8 research path using four higher-risk sleeves:

1. BTC/ETH Polymarket probability model,
2. Hyperliquid funding recorder,
3. DeFi stable/lending yield screener,
4. portfolio-level sleeve allocator.

All modules are **read-only / paper-research only**.

## Built artifacts

| Artifact | Purpose |
|---|---|
| `Implementation/alt_research_lab.py` | Four-part alternative venue research lab |
| `scripts/hyperliquid_funding_recorder.py` | Silent hourly Hyperliquid funding snapshot recorder |
| `scripts/quant_floor_alt_venue_monitor.py` | Daily compact alt-research monitor |
| `Implementation/data_cache/hyperliquid_funding_snapshots.jsonl` | Growing Hyperliquid funding/OI/volume dataset |

## Final smoke-test report

```text
Implementation/reports/alt_research_all_20260703T003836+0000.json
```

## 1. Polymarket BTC/ETH probability model

The model now uses a simplified GBM first-touch probability estimate for price-level markets such as “reach/hit/dip above/below”. It searches broad active markets plus targeted Bitcoin/Ethereum queries.

Top candidates from the smoke test:

| Rank | Market | Market prob | Model prob | Edge | Side | Liquidity | Caveat |
|---:|---|---:|---:|---:|---|---:|---|
| 1 | ETH above $1,700 on July 3 | 43.0% | 94.9% | +51.9% | YES | $20.7k | short expiry; needs intraday vol calibration |
| 2 | BTC above $62,000 on July 3 | 18.1% | 43.4% | +25.4% | YES | $27.2k | short expiry; needs intraday vol calibration |
| 3 | BTC reach $65,000 in July | 61.5% | 48.5% | -13.0% | NO | $59.1k | monthly touch model |
| 4 | BTC reach $67,500 in July | 36.5% | 27.8% | -8.7% | NO | $60.9k | monthly touch model |
| 5 | ETH dip to $1,500 in July | 39.5% | 48.7% | +9.2% | YES | $34.2k | monthly touch model |

Interpretation:

- The biggest short-expiry edges may be model-sensitive; they should be paper-tracked before action.
- Monthly BTC/ETH ladders are better for research because they give enough time for monitoring and probability updates.
- Next improvement: calibrate against historical intraday high/low touch frequency, not only daily close realized vol.

## 2. Hyperliquid funding recorder

Created and verified hourly snapshot recording.

Cron:

```text
Hyperliquid funding hourly recorder
Job ID: 1e51b5d88577
Schedule: hourly
Mode: silent on success, alert on error only
```

Data file:

```text
Implementation/data_cache/hyperliquid_funding_snapshots.jsonl
```

Top funding anomalies at smoke test:

| Coin | Funding annualized | Day volume | Max lev | Notes |
|---|---:|---:|---:|---|
| ME | about -544% | ~$1.68M | 3x | extreme negative funding, dangerous |
| MANTA | about -166% | ~$0.56M | 3x | extreme negative funding |
| CELO | about -110% | ~$0.48M | 3x | extreme negative funding |
| STABLE | about -101% | ~$0.43M | 3x | low-price/high-risk market |
| GRASS | about +78% | ~$2.01M | 3x | positive funding candidate |

Interpretation:

- Funding anomalies are now being recorded for future backtesting.
- No Hyperliquid strategy should be traded until the recorder accumulates enough samples for persistence/mean-reversion testing.

## 3. DeFi stable/lending yield screener

The initial DeFi scanner was tightened to exclude IL pools and focus on stable/lending/single-exposure candidates first.

Top smoke-test candidates:

| Rank | Chain | Project | Symbol | APY | 30d APY | TVL | Notes |
|---:|---|---|---|---:|---:|---:|---|
| 1 | Ethereum | Pendle | REUSDE | 15.81% | 15.14% | $4.29M | stable, no IL, single exposure |
| 2 | Ethereum | Pendle | SUSDAT | 19.93% | 8.28% | $3.35M | stable, no IL, single exposure, APY jump |
| 3 | Ethereum | Pendle | APYUSD | 15.43% | 15.53% | $3.98M | stable, no IL, single exposure |
| 4 | Ethereum | Pendle | APYUSD | 16.74% | 16.46% | $7.74M | stable, no IL, single exposure |
| 5 | Ethereum | APYX Protocol | APXUSD | 14.44% | 13.50% | $145.0M | stable, no IL, single exposure |

Interpretation:

- DeFi stable yield currently offers plausible low-correlation carry, but smart-contract/oracle/depeg/withdrawal risk must be modeled.
- Next improvement: fetch pool history endpoints and score APY persistence/drawdown.

## 4. Portfolio-level allocator

Current research/paper sleeve weights from the final run:

| Sleeve | Weight |
|---|---:|
| Daily ETF tactical core | 40.6% |
| Prediction-market crypto edge | 19.1% |
| Hyperliquid funding/momentum | 15.9% |
| DeFi stable/lending yield | 14.4% |
| Cash reserve | 10.0% |

These are **research weights**, not trade orders.

Signals behind the allocation:

| Signal | Value |
|---|---:|
| Max Polymarket model edge | ~53.2 percentage points |
| Max Hyperliquid abs funding multiple | ~5.44x annualized |
| Max DeFi stable/lending APY | ~19.9% |

## Current Sharpe-target path

The likely route to Sharpe 1.6–1.8 is portfolio-level, not single-strategy:

```text
ETF tactical core + prediction-market edge + funding anomaly sleeve + DeFi carry + cash reserve
```

Next required evidence before any promotion:

1. Polymarket: calibrate touch model against historical intraday high/low data and paper-track edge decay.
2. Hyperliquid: collect at least several days/weeks of hourly funding snapshots; then test persistence/fade rules.
3. DeFi: pull pool history and estimate APY persistence, drawdown, and protocol concentration risk.
4. Allocator: simulate sleeve-level volatility/correlation assumptions and run Monte Carlo portfolio forecast.

## Safety gate

No live execution, no credentials, no private keys, no deposits, no orders.
