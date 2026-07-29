---
title: QTF-V02 Funding Extreme Forward Outcome Test
created: 2026-07-15
updated: 2026-07-15
type: project
tags: [quant, funding, carry, paper-only, verification]
confidence: medium
---

# QTF-V02 Funding-Extreme Forward Outcome Test

## Decision
**do_not_promote** — this is a deterministic forward-outcome slice, not production evidence.

- Input: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\data_cache\hyperliquid_funding_snapshots.jsonl`
- Input SHA-256: `a326927609f0ce55134b2bfa39cb7acca26e6e319234b501104819e7ad9a7e0b`
- CASHCAT canonical hourly rows: **163**; chronological split: 114/49
- Rule: funding_hourly >= **0.0003**; entry at signal-row mark; horizons 1h/4h/8h.
- Cost: **10 bps** round-trip proxy; funding is one-hour proxy, not executed payment data.

## Results

| Side | Horizon | Episodes | Dev mean net | Holdout mean net | Holdout hit rate |
|---|---:|---:|---:|---:|---:|
| fade_short | 1h | 86 (21 holdout) | 0.1549% | -1.7017% | 42.8571% |
| fade_short | 4h | 85 (20 holdout) | 2.7963% | 3.3483% | 50.0000% |
| fade_short | 8h | 83 (18 holdout) | 5.7106% | 3.9532% | 55.5556% |
| persistence_long | 1h | 86 (21 holdout) | -0.3549% | 1.5017% | 57.1429% |
| persistence_long | 4h | 85 (20 holdout) | -2.9963% | -3.5483% | 50.0000% |
| persistence_long | 8h | 83 (18 holdout) | -5.9106% | -4.1532% | 44.4444% |

## Gate status
- Forward outcomes: **computed** from canonical local marks.
- Statistical/promotion gate: **blocked** by short single-venue recorder window, proxy funding convention, and insufficient holdout breadth.
- No values were imputed; no orders, alerts, credentials, or allocations were used.

Machine-readable output: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\qtf_v02\qtf_v02_funding_forward_test.json`
