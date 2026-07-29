---
title: Antoine On-Chain Alpha Desk
created: 2026-07-08
updated: 2026-07-08
type: desk
status: research-scaffold
tags: [quant, handsome-finance, antoine, on-chain, memecoin, high-risk, paper-trading]
sources: [03_Sources/youtube/handsomefinance/Handsome Finance Corpus Synthesis - 2025-01-08 to 2026-07-08.md]
confidence: medium
---

# Antoine On-Chain Alpha Desk

## Mission

Incorporate Antoine / Handsome Finance style knowledge into the Quant Floor as a high-risk, high-upside **research desk** focused on on-chain discovery, wallet intelligence, memecoin tooling, airdrop/farming opportunities, and prediction-market edges.

This desk does **not** replace the existing risk desk. It feeds candidates into explicit gates.

## Pipeline

```text
Video/source idea
  → technique extraction
  → wallet/tool/narrative signal definition
  → rug/liquidity/supply risk gate
  → paper candidate sizing
  → outcome ledger
  → review board promote/reject/revise
```

## Subdesks

| Subdesk | Job | Example source themes |
|---|---|---|
| Wallet Intelligence | Track smart wallets, insiders, whales, repeat winners | copy-trading, secret wallets, smart trader AI |
| Memecoin Discovery | Find early tokens/tools/narratives | StalkFun, BullX, Axiom, Padre, GMGN, Photon, Nova |
| Rug/Risk Gate | Reject bad contracts/liquidity/supply concentration | rug avoidance, scams, evil bots, bundled supply |
| Airdrop/Farming | Track high-upside campaigns and effort/EV | Aster, Paradex, Hyperliquid-style, Plasma |
| Prediction-Market Edge | Turn Polymarket/tooling ideas into calibrated paper bets | prediction-market pro, Polymarket tools |

## Non-negotiable gates

- Read-only/public-data first.
- No wallet/API/private-key storage in vault.
- No live execution without Jayse approving chain, venue, capital, max loss, and kill switch.
- Every candidate must pass contract/liquidity/supply gates before paper tracking.
- Use tiny paper sizing logic for asymmetric bets: assume many zeros, cap loss per idea.

## Implementation artifact

- Script: `05_Projects/AI Quant Trading Floor/Implementation/antoine_alpha_desk.py`
- Corpus report: latest `Implementation/reports/antoine_alpha_desk_corpus_*.json`
- Candidate strategy spec: [[QTF-010 Antoine On-Chain Meme and Airdrop Alpha Pipeline]]
