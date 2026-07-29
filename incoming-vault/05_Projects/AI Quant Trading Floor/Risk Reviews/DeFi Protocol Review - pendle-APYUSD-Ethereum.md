---
title: DeFi Protocol Review - pendle APYUSD Ethereum
created: 2026-07-03
type: risk-review
tags: [quant, defi, protocol-risk, paper-only]
status: draft
---

# DeFi Protocol Review - pendle APYUSD Ethereum

## Candidate snapshot

| Field | Value |
|---|---|
| Project | pendle |
| Chain | Ethereum |
| Symbol | APYUSD |
| Pool ID | `8dc83a62-a160-4bcf-ac7f-a1f812a317dc` |
| TVL | $3,965,186.00 |
| APY | 18.88% |
| Recent mean APY | 21.08% |
| Recent min APY | 15.17% |
| Risk label | medium |
| Risk notes | structured yield or newer stable-yield venue; ethereum base-chain execution; protocol-specific stablecoin/receipt-token risk; low TVL / liquidity risk |

## Review checklist

- [ ] Identify exact asset/token contract and receipt-token mechanics.
- [ ] Confirm whether yield source is lending, basis trade, points/rewards, restaking, market-making, or protocol subsidy.
- [ ] Check smart-contract audit status and upgrade/admin keys.
- [ ] Check oracle dependencies and failure modes.
- [ ] Check withdrawal queue/liquidity limits and lockups.
- [ ] Check depeg history and redemption mechanism.
- [ ] Check chain/bridge/sequencer assumptions.
- [ ] Check APY source: organic, rewards, leverage, or temporary incentive.
- [ ] Check APY persistence over 30/60/90 days.
- [ ] Check protocol TVL concentration and whale/depositor concentration if available.
- [ ] Define paper-only max weight and max-loss assumption.
- [ ] Decide: reject / watch / paper candidate / eligible for future approval discussion.

## Initial decision

Paper-only review candidate. No deposit or live execution.
