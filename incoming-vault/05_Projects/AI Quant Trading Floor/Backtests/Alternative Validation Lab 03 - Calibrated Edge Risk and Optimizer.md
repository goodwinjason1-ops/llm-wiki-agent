---
title: Alternative Validation Lab 03 - Calibrated Edge Risk and Optimizer
created: 2026-07-03
updated: 2026-07-03
type: research-evidence
tags: [quant, sharpe-target, polymarket, defi, hyperliquid, optimizer, validation]
confidence: high
---

# Alternative Validation Lab 03 - Calibrated Edge Risk and Optimizer

## Goal

Continue the Sharpe 1.6–1.8 research track by adding the next high-value validation layer:

1. calibrated Polymarket edge haircuts,
2. DeFi protocol-risk labels,
3. readiness-gated Hyperliquid persistence/fade testing,
4. constrained sleeve optimizer.

All modules remain **read-only / paper-research only**.

## Updated artifacts

| Artifact | Update |
|---|---|
| `Implementation/alt_research_lab.py` | Added calibrated Polymarket probabilities, raw vs calibrated model probability, and confidence labels |
| `Implementation/alt_validation_lab.py` | Added protocol-risk classifier, Hyperliquid readiness-gated preliminary tests, and constrained sleeve optimizer |

Final verification reports:

```text
Implementation/reports/alt_research_polymarket_20260703T014924+0000.json
Implementation/reports/alt_validation_all_20260703T015842+0000.json
Implementation/reports/alt_validation_allocator-optimize_20260703T015626+0000.json
```

## 1. Calibrated Polymarket scanner

The Polymarket scanner now outputs both:

- `raw_model_yes_prob`
- `model_yes_prob` after calibration adjustment
- `calibration_confidence`
- `calibration_reason`

Calibration logic:

| Case | Adjustment |
|---|---|
| ETH short-horizon near-barrier | subtract ~10 percentage points |
| ETH larger weekly moves | add ~5 percentage points |
| BTC medium-threshold 12–24h | no haircut |
| Outside calibrated grid | shrink 10% toward 50% |

Current calibrated top paper signals from smoke test:

| Market | Raw model | Calibrated model | Market | Edge | Confidence | Side |
|---|---:|---:|---:|---:|---|---|
| BTC above $62,000 on July 3 | 68.57% | 66.71% | 33.25% | +33.46% | medium-low | YES |
| ETH above $1,700 on July 3 | 100.00% | 90.00% | 71.00% | +19.00% | low | YES |
| ETH dip to $1,500 in July | 44.52% | 49.52% | 36.50% | +13.02% | medium-low | YES |
| BTC reach $65,000 in July | 52.51% | 52.26% | 61.50% | -9.24% | medium-low | NO |
| BTC reach $62,500 in July | 85.51% | 81.96% | 90.25% | -8.29% | medium-low | NO |

Interpretation:

- The scanner is now deliberately less overconfident.
- ETH near-barrier short-expiry signals are flagged low-confidence even when edge appears large.
- This is still a paper signal, not a trading instruction.

## 2. Hyperliquid readiness-gated testing

The Hyperliquid analyzer now computes preliminary fields but only activates them when sufficient history exists.

Current state:

| Coin | Snapshots | Mean funding annualized | Max abs funding | Preliminary test | Readiness |
|---|---:|---:|---:|---|---|
| ME | 12 | -552.01% | 603.60% | wait_for_48h | insufficient history |
| MANTA | 12 | -174.99% | 361.40% | wait_for_48h | insufficient history |
| CELO | 12 | -110.96% | 146.65% | wait_for_48h | insufficient history |
| SPX | 12 | +31.90% | 123.35% | wait_for_48h | insufficient history |

Gate:

```text
< 48 snapshots: do not test/publish persistence/fade edge
>= 48 snapshots: compute persistence_score and fade_score
```

Interpretation:

- The recorder is working.
- The research system will not pretend to have a funding edge before minimum evidence exists.

## 3. DeFi protocol-risk classifier

The DeFi scorer now adds:

- `protocol_risk_label`
- `protocol_risk_score`
- `protocol_risk_notes`
- `risk_adjusted_score`

Important result: high-yield candidates with high structural risk are now downgraded to watch-only.

Examples:

| Candidate | APY | Risk label | Risk-adjusted score | Decision | Notes |
|---|---:|---|---:|---|---|
| Pendle REUSDE | 15.98% | high | 16.11 | watch_only | Ethena/restaked synthetic-dollar + low TVL + short history |
| Pendle SUSDAT on BSC | 15.17% | high | 17.25 | watch_only | alt-chain + low TVL + structured yield |
| Pendle APYUSD | 16.74% | medium | 19.16 | paper_candidate | medium TVL + receipt-token risk |
| Pendle APYUSD | 15.43% | medium | 17.67 | paper_candidate | low TVL but stable history |
| APYX APXUSD | 14.44% | medium | 19.11 | paper_candidate | high TVL but protocol-specific stablecoin risk |
| Mainstreet MSUSD | 12.00% | medium | 18.24 | paper_candidate | very stable APY, high TVL, protocol-specific risk |

Interpretation:

- The risk-adjusted filter is doing its job: not all high-APY stable pools survive.
- Current best paper DeFi candidates are APYUSD, APXUSD, and MSUSD-style pools, pending manual protocol review.

## 4. Constrained sleeve optimizer

The optimizer searches 5% weight increments subject to:

| Constraint | Value |
|---|---:|
| Cash reserve | 10–35% |
| Prediction-market cap | 20% |
| Hyperliquid cap | 18% |
| DeFi cap | 25% |
| ETF tactical range | 25–65% |
| Annual vol max | 14% |
| Rough 95% one-year stress floor | -23% |

Top optimized research frontier:

| Rank | ETF | Prediction | Hyperliquid | DeFi | Cash | Ann. return | Ann. vol | Analytic Sharpe |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 35% | 5% | 0% | 25% | 35% | 8.13% | 4.05% | 2.01 |
| 2 | 35% | 0% | 5% | 25% | 35% | 8.03% | 4.00% | 2.01 |
| 3 | 30% | 5% | 5% | 25% | 35% | 8.43% | 4.21% | 2.00 |
| 4 | 40% | 0% | 0% | 25% | 35% | 7.73% | 3.97% | 1.94 |
| 5 | 35% | 5% | 5% | 25% | 30% | 8.75% | 4.57% | 1.92 |

Interpretation:

- The optimizer strongly prefers **cash + DeFi carry + ETF core** until prediction and Hyperliquid sleeves are proven.
- This is a major risk-control improvement: instead of forcing high-risk sleeves, it waits for evidence.
- The analytic Sharpe is not a claim of achieved performance; it is a prior-based frontier that must be validated with paper returns.

## Current best research posture

Until more evidence accumulates:

```text
ETF tactical core: 30–40%
DeFi stable/lending paper sleeve: up to 25%
Cash reserve: 30–35%
Prediction-market sleeve: 0–5% paper weight until calibrated PnL exists
Hyperliquid sleeve: 0–5% paper weight until 48h+ funding history exists
```

## Next highest-value experiment

1. Build a **paper ledger** for Polymarket signals: record timestamp, market, market price, calibrated model probability, side, and later outcome.
2. Build a **DeFi protocol-review checklist** for APYUSD/APXUSD/MSUSD candidates.
3. Let Hyperliquid recorder reach 48+ hourly samples, then run the now-wired preliminary persistence/fade test.
4. Run Monte Carlo on the optimizer's top frontier weights, not just the previous heuristic allocation.

## Safety status

No live execution. No credentials. No private keys. No deposits. No orders.
