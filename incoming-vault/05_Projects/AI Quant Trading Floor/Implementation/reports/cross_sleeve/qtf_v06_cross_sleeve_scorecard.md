---
title: QTF-V06 Cross-Sleeve Evidence Scorecard
created: 2026-07-15
updated: 2026-07-15T14:56:27.047857+00:00
type: backtest-evidence
status: partial_do_not_allocate
tags: [quant, cross-sleeve, allocation, paper-only, evidence-gated]
confidence: medium
---

# QTF-V06 Cross-Sleeve Evidence Scorecard

> Paper-only comparison artifact. It reports existing evidence; it is not an allocation engine.

## Observed metrics
| Sleeve | Role | Return / OOS mean | CAGR | Sharpe | Max DD | Decision |
|---|---|---:|---:|---:|---:|---|
| ETF CORE_DEF | diversifying tactical control sleeve | 135.2540% | 10.0090% | 1.1146 | -9.8765% | `partial_do_not_allocate` |
| TTM-01 crypto trend | crypto tactical candidate | -0.2096% | -0.2131% | -0.5526 | -0.5376% | `do_not_promote` |
| CASHCAT funding fade | funding/carry candidate | 5.6330% | n/a% | n/a | n/a% | `do_not_promote` |
| QTF-V05 crypto pairs | market-neutral candidate | -9.1603% | n/a% | -0.8191 | -39.1482% | `do_not_promote` |

## Evidence and limitations

- **ETF CORE_DEF** — 5/5 profitable walk-forward windows; bootstrap CI stated; no untouched holdout; cost model: not stated as bps in run card.
- **TTM-01 crypto trend** — chronological 70/30 holdout; 1,200 rows/symbol; cost model: 20 bps per position change.
- **CASHCAT funding fade** — 70/30 chronological holdout; 11 holdout episodes at 4h; cost model: 10 bps round-trip proxy; one-hour funding proxy.
- **QTF-V05 crypto pairs** — chronological 70/30 holdout; 2 pairs; funding panel shorter than price panel; cost model: two-leg 10 bps plus observed daily funding.

## Decision

**Zero allocation / no promotion.** The scorecard intentionally does not manufacture a cross-sleeve rank because the samples, horizons, costs and validation gates are not comparable.

Open gates:
- ETF and crypto samples use different windows and instruments.
- ETF run card does not state a comparable bps cost model or untouched holdout.
- CASHCAT has only 11 four-hour holdout episodes and a one-hour funding proxy.
- QTF-V05 pairs are negative OOS and remain partial due to funding-history and robustness gaps.
- No sleeve has passed all cross-sleeve comparability, robustness and paper-forward gates.

## Source artifacts

Machine-readable output: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\cross_sleeve\qtf_v06_cross_sleeve_scorecard.json`
- `run_card.md` — `82febd84f178a6383b029a73fcd726c1251cb411f9904fc5f7ea4766f0e02b06`
- `qtf_v01_walkforward.json` — `2efc3702d36a76565af42d95043b8236fa083edf767abbb455d51b51e3cb0af9`
- `qtf_v02_funding_forward_test.json` — `29e99b562f949bf237bfdb7366630c90a344ac14e4db9b15fdaae4f2a73eec9e`
- `qtf_v05_costed_pairs_report.json` — `073cce9e233d68010a5147a9d6b18740c61c5fb2d7b320bc12be4ae199b59e38`
