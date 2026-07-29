---
title: DeFi Sleeve Advanced Risk Upgrade - CoinGecko How to DeFi
type: evidence
created: 2026-07-08
updated: 2026-07-08
tags: [quant, defi, risk, paper-trading]
sources: [03_Sources/papers/how-to-defi-advanced-coingecko.md]
confidence: medium
---

# DeFi Sleeve Advanced Risk Upgrade - CoinGecko How to DeFi

## Decision

Use CoinGecko's *How to DeFi: Advanced* as a risk-taxonomy upgrade for the Quant Floor DeFi sleeve, not as a current protocol recommendation list.

## Code changes

- `Implementation/alt_research_lab.py`
  - Added candidate-level `advanced_defi_flags`.
  - Added `advanced_defi_penalty` into DeFi scoring.
  - Expanded `risk_note` and allocator `risk_controls`.

- `Implementation/alt_paper_ops.py`
  - Added advanced DeFi review checklist gates.

## New candidate flags

- `apy_instability`
- `eye_popping_or_subsidized_apy`
- `structured_yield_or_points_basis_review`
- `yield_aggregator_composability_review`
- `lp_impermanent_loss_review`
- `lending_liquidation_or_utilization_review`
- `stablecoin_collateral_peg_review`
- `chain_bridge_sequencer_review`

## Interpretation

This makes the DeFi scanner stricter. It should reduce false confidence in high-APY pools and push more candidates into **review/watch** until APY persistence, collateral/peg, composability, and withdrawal risks are understood.

## Live gate

No DeFi deposit/live execution is approved. The next correct action is paper review plus protocol checklist completion.
