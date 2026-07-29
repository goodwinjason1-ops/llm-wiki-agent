---
title: AI Quant Trading Floor Dashboard
updated: 2026-07-29T00:15:31+00:00
type: dashboard
tags: [quant, dashboard, paper-trading, sharpe-target]
---

# AI Quant Trading Floor Dashboard

> Read-only / paper-research dashboard. No live execution, no credentials, no orders.

## Quick links

- [[AI Quant Trading Floor]]
- [[Alternative Paper Ops Lab 04 - Signal Ledger Frontier MC Protocol Reviews]]
- [[Alternative Validation Lab 03 - Calibrated Edge Risk and Optimizer]]
- [[Alternative Validation Lab 02 - Calibration History and Monte Carlo]]
- [[Alternative Research Lab 01 - Prediction Funding DeFi Allocator]]
- [[Strategy Lab v2-v3 Sharpe Target Evidence]]

## Current paper-ledger health

| Metric | Value |
|---|---:|
| Signals total | 192 |
| Outcomes total | 35 |
| Resolved total | 35 |
| Open/unresolved | 157 |
| Unit paper PnL total | 10.9305 |

### By calibration confidence

| Confidence | Signals | Resolved | Unit PnL |
|---|---:|---:|---:|
| low | 7 | 6 | 1.8795 |
| medium_low | 185 | 29 | 9.0510 |

## Latest paper signals

| Recorded | Market | Side | Market | Model | Edge | Confidence | Expiry |
|---|---|---|---:|---:|---:|---|---|
| 2026-07-29T00:11 | Will Bitcoin dip to $62,500 in July? | YES | 0.449 | 0.5222 | 0.0732 | medium_low | 2026-08-01 |
| 2026-07-29T00:11 | Will Ethereum dip to $1,800 in July? | YES | 0.1865 | 0.2747 | 0.0882 | medium_low | 2026-08-01 |
| 2026-07-29T00:11 | Will Ethereum reach $2,100 in July? | YES | 0.0865 | 0.1396 | 0.0531 | medium_low | 2026-08-01 |
| 2026-07-29T00:11 | Will the price of Ethereum be above $2,000 on July 29? | YES | 0.0515 | 0.1401 | 0.0886 | medium_low | 2026-07-29 |
| 2026-07-29T00:11 | Will Bitcoin reach $67,500 in July? | YES | 0.095 | 0.1644 | 0.0694 | medium_low | 2026-08-01 |
| 2026-07-29T00:11 | Will the price of Ethereum be above $1,900 on July 29? | YES | 0.74 | 0.9 | 0.16 | low | 2026-07-29 |
| 2026-07-28T00:11 | Will the price of Ethereum be above $2,000 on July 28? | YES | 0.0115 | 0.0629 | 0.0514 | medium_low | 2026-07-28 |
| 2026-07-28T00:11 | Will Ethereum dip to $1,700 in July? | YES | 0.076 | 0.1453 | 0.0693 | medium_low | 2026-08-01 |

## Latest resolved outcomes

| Checked | Market | Status | Side | Yes won | Unit PnL | Reason |
|---|---|---|---|---|---:|---|
| 2026-07-28T20:00 | Will the price of Ethereum be above $2,000 on July 28? | resolved_approx | YES | False | -0.0115 | approx spot-at-check for expired above/below market |
| 2026-07-28T20:00 | Will the price of Ethereum be above $1,900 on July 28? | resolved_approx | YES | True | 0.58 | approx spot-at-check for expired above/below market |
| 2026-07-28T20:00 | Will the price of Bitcoin be above $64,000 on July 28? | resolved_approx | YES | False | -0.385 | approx spot-at-check for expired above/below market |
| 2026-07-27T20:00 | Will the price of Ethereum be above $2,000 on July 27? | resolved_approx | YES | False | -0.13 | approx spot-at-check for expired above/below market |
| 2026-07-26T20:00 | Will the price of Ethereum be between $1,700 and $1,800 on July 26? | resolved_approx | YES | True | 0.9955 | approx spot-at-check for expired above/below market |
| 2026-07-24T20:00 | Will the price of Ethereum be above $1,900 on July 24? | resolved_approx | YES | False | -0.255 | approx spot-at-check for expired above/below market |
| 2026-07-21T20:00 | Will the price of Bitcoin be above $66,000 on July 21? | resolved_approx | YES | True | 0.815 | approx spot-at-check for expired above/below market |
| 2026-07-21T20:00 | Will the price of Bitcoin be between $58,000 and $60,000 on July 21? | resolved_approx | YES | True | 0.9885 | approx spot-at-check for expired above/below market |

## Optimizer frontier snapshot

| Rank | ETF | Prediction | Hyperliquid | DeFi | Cash | Ann Ret | Ann Vol | Analytic Sharpe |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 35% | 5% | 0% | 25% | 35% | 8.13% | 4.05% | 2.0076 |
| 2 | 35% | 0% | 5% | 25% | 35% | 8.03% | 4.00% | 2.007 |
| 3 | 30% | 5% | 5% | 25% | 35% | 8.43% | 4.21% | 1.9991 |
| 4 | 40% | 0% | 0% | 25% | 35% | 7.72% | 3.97% | 1.9446 |
| 5 | 35% | 5% | 5% | 25% | 30% | 8.75% | 4.57% | 1.9159 |

## Evidence files

- latest_paper_ops: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\alt_paper_ops_record-signals_20260729T001122+0000.json`
- latest_validation: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\alt_validation_all_20260703T015842+0000.json`
- latest_research: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\alt_research_all_20260728T231241+0000.json`

## Active read-only cron jobs

- Polymarket paper signal recorder: `61f996692d57`, daily 10:00
- Polymarket paper outcome tracker: `55283af680f6`, every 6 hours
- Hyperliquid funding hourly recorder: `1e51b5d88577`, hourly
- AI Quant Floor alternative venues monitor: `87a2456a3bbb`, daily 09:00
- AI Quant Floor daily tactical ETF paper monitor: `83516ec85064`, weekdays 08:00

## Next gates

- Wait for Polymarket outcomes; compare hit rate/PnL by confidence bucket.
- Wait for Hyperliquid 48+ hourly samples; then run persistence/fade test.
- Complete DeFi protocol reviews before any deposit/live discussion.
- Replace allocator priors with measured paper returns as they accumulate.
