---
title: DeFi Protocol Review - mainstreet MSUSD Ethereum
created: 2026-07-08
type: risk-review
tags: [quant, defi, protocol-risk, paper-only]
status: draft
---

# DeFi Protocol Review - mainstreet MSUSD Ethereum

## Candidate snapshot

| Field | Value |
|---|---|
| Project | mainstreet |
| Chain | Ethereum |
| Symbol | MSUSD |
| Pool ID | `8a28570f-2316-488a-94a7-67c87e76c1f1` |
| TVL | $74,207,581.00 |
| APY | 12.00% |
| Recent mean APY | 12.00% |
| Recent min APY | 11.99% |
| Risk label | medium |
| Risk notes | structured yield or newer stable-yield venue; ethereum base-chain execution; protocol-specific stablecoin/receipt-token risk |

## Review checklist

- [ ] Identify exact asset/token contract and receipt-token mechanics.
- [ ] Confirm whether yield source is lending, basis trade, points/rewards, restaking, market-making, or protocol subsidy.
- [ ] Check smart-contract audit status and upgrade/admin keys.
- [ ] Check oracle dependencies and failure modes.
- [ ] Check withdrawal queue/liquidity limits and lockups.
- [ ] Check depeg history and redemption mechanism.
- [ ] Check chain/bridge/sequencer assumptions.
- [ ] Check APY source: organic, rewards, leverage, points, basis trade, or temporary incentive.
- [ ] Check APY persistence over 30/60/90 days; flag eye-popping APYs as temporary until proven otherwise.
- [ ] Check protocol TVL concentration and whale/depositor concentration if available.
- [ ] Check stablecoin/stableasset collateral design, peg history, recursive/native-token collateral, redemption path, and emergency powers.
- [ ] Check AMM/LP exposure: slippage, front-running/MEV, impermanent loss, pool composition, and fee tier.
- [ ] Check yield aggregator strategy stack: underlying protocols, composability depth, strategy permissions, harvest/compound mechanics, and prior exploit history.
- [ ] Check lending/leverage exposure: collateral factor, liquidation threshold, borrow-rate spikes, utilization, and keeper/liquidator dependency.
- [ ] Check insurance availability and limitations; do not assume cover guarantees full payout.
- [ ] Define paper-only max weight and max-loss assumption.
- [ ] Decide: reject / watch / paper candidate / eligible for future approval discussion.

## Initial decision

Paper-only review candidate. No deposit or live execution.
