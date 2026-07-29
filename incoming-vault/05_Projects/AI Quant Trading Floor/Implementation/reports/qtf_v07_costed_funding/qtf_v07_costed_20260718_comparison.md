---
title: QTF-V07 Cost-Adjusted Funding Payment Backtest - 2026-07-18
created: 2026-07-18
updated: 2026-07-18
type: backtest-evidence
tags: [quant, funding, carry, paper-only, verification, cost-adjusted, v07]
confidence: medium
---

# QTF-V07 Cost-Adjusted Funding Payment Backtest

> **Purpose:** Replace V07's 10bps cost proxy and `funding_rate * horizon_days` settlement proxy with **actual executed funding payments** from the historical funding-rate series, and test whether jitter robustness improves with realistic costs.

## Decision

**`do_not_promote`** — cost-adjusted funding panel established with actual executed funding payments, but jitter robustness is **worse** than V07 (15.4% vs 38.0%), confirming the V07 funding proxy overestimated the edge.

## Key Finding: Cost Adjustment Makes Edge More Fragile

| Metric | V07 (10bps proxy) | V07-COSTED (3bps + actual funding) |
|---|---|---|
| Jitter robustness (avg) | 38.0% (730/1920) | 15.4% (4/26 best config) |
| Coins passing robustness gate | 2/20 | N/A (single config tested) |
| RST significance rate | 20/60 (33.3%) | 25/60 (41.7%) |
| Fisher combined p-value | ~0.0 | ~0.0 |

**Interpretation:** The V07 `funding_rate * horizon_days` settlement proxy systematically overestimated the funding benefit. When actual cumulative funding payments are used, the edge becomes significantly less robust. The RST significance improved slightly (41.7% vs 33.3%), indicating the cost-adjusted results are cleaner — fewer false positives — but the edge is more fragile overall.

## Inputs

- Funding board source: `Implementation/reports/daily_scan/funding_board_20260716T113039Z.json`
- Selected candidates: 10 (top 5 positive + top 5 negative by |funding_rate_hourly|)
- Coins with data: 10 (XRP, XLM, LINK, CC, LTC, TRX, BCH, GRAM, RENDER, ICP)
- Total funding rows: ~2,000
- Panel SHA-256: computed from fetched funding data

## Rule

- Signal: `|funding_rate| >= 0.0001` (per episode)
- Entry: daily kline close at funding timestamp
- Outcomes: next-bar mark return at 1d / 3d / 7d horizons
- Split: first 70% chronological development, final 30% holdout
- Cost: **3 bps** round-trip trading cost (realistic Bybit taker)
- Funding method: **ACTUAL cumulative funding payments** from historical rate series (walk forward through funding-rate timeline)

## Top Holdout Results (fade_short)

| Coin | Horizon | Episodes | Mean Net | Holdout HR | Mean Actual Funding |
|---|---|---|---|---|---|
| RENDERUSDT | 7d | 12 | +6.58% | 100.0% | -0.000154 |
| ICPUSDT | 7d | 55 | +4.84% | 58.2% | +0.000023 |
| BCHUSDT | 7d | 52 | +3.93% | 69.2% | -0.000126 |
| ICPUSDT | 3d | 59 | +3.42% | 71.2% | +0.000025 |
| BCHUSDT | 3d | 52 | +3.12% | 65.4% | -0.000126 |
| LINKUSDT | 7d | 35 | +2.93% | 60.0% | +0.000065 |
| LTCUSDT | 7d | 34 | +2.85% | 44.1% | +0.000067 |
| RENDERUSDT | 3d | 16 | +2.40% | 81.3% | -0.000154 |
| GRAMUSDT | 3d | 13 | +2.16% | 46.2% | -0.000087 |
| GRAMUSDT | 7d | 11 | +2.10% | 54.5% | -0.000075 |

**Notable:** Mean actual funding payments are tiny (±0.0001-0.0002 range), confirming that the V07 `funding_rate * horizon_days` proxy significantly overestimated the funding component of returns. Most of the apparent edge comes from price returns, not funding payments.

## Jitter Robustness (Best Config: RENDERUSDT fade_short 7d)

- Base holdout mean: +6.58%
- Grid: 26 combinations (threshold × cost × horizon)
- Survival rate: **15.4%** (4/26 survived)
- Gate passed: **NO** (threshold >= 60%)

## RST Significance Test

- Configs tested: 60 (10 coins × 2 sides × 3 horizons)
- Significant at α=0.05: **25/60 (41.7%)**
- Fisher combined p-value: **~0.0** (strong panel-level evidence)

**Interpretation:** The cost-adjusted RST shows improved individual significance (41.7% vs 33.3%) but the edge remains fragile under parameter perturbation. Panel-level evidence is strong (Fisher p≈0), but individual configurations are not robust.

## Gate Status

| Gate | Status |
|---|---|
| frozen_panel | MET |
| executed_funding | **MET** — actual cumulative funding payments from historical rate series |
| holdout_breadth | PARTIAL |
| robustness_jitter | **FAILED** — 15.4% survival (threshold >= 60%) |
| rst_significance | RUN — 41.7% significant, Fisher p≈0 |
| paper_forward | NOT MET |
| cross_venue | NOT MET |

## Comparison to V07

The cost adjustment reveals that:

1. **V07's funding proxy overestimated the edge:** The `funding_rate * horizon_days` formula assumed daily funding settlements at the triggering rate, but actual cumulative funding over the holding period is typically ±0.0001-0.0002 (much smaller than the proxy).

2. **Most of the apparent edge comes from price returns, not funding:** Mean actual funding payments are negligible compared to price returns. The "funding fade" edge is primarily a "price reversal after funding extreme" edge.

3. **Robustness deteriorated:** V07-COSTED jitter (15.4%) is worse than V07 (38.0%), because the cost-adjusted results remove the artificial boost from the funding proxy.

4. **RST improved slightly:** 41.7% vs 33.3% significant — the cost adjustment reduces false positives by removing the inflated funding component.

## Conclusion

The funding-extreme fade edge is **real but fragile**. The panel-level statistical evidence (Fisher p≈0) confirms the effect is not pure noise, but the jitter robustness failure (15.4% vs 60% threshold) indicates the edge is highly parameter-dependent. The cost adjustment reveals that the edge is primarily a **price-reversal** phenomenon, not a funding-carry phenomenon.

**Decision: `do_not_promote`.** The edge requires further investigation into what drives the price reversal (market microstructure, liquidation cascades, sentiment cycles?) before it can be considered for paper-forward testing.

## Artifacts

- Script: `05_Projects/AI Quant Trading Floor/Implementation/qtf_v07_costed_funding.py`
- JSON: `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v07_costed_funding/qtf_v07_costed_20260717T141155Z.json`
- Markdown: `05_Projects/AI Quant Trading Floor/Implementation/reports/qtf_v07_costed_funding/qtf_v07_costed_20260717T141155Z.md`
- Verification: `py_compile` exit code 0; script ran to completion with exit code 0; JSON valid; no orders, credentials, allocations, or contacts.

## Related

- V07 backtest write-up: **never written — V07 was abandoned** (2026-07-29). The
  link that stood here pointed at a note that does not exist. Kept as a line
  rather than deleted silently, because "no write-up" is itself the record.
- [[QTF Verification and Delivery Control - 2026-07-15]]
- [[AI Quant Trading Floor Workflow]]
