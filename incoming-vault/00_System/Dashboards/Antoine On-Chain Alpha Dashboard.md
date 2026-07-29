---
title: Antoine On-Chain Alpha Dashboard
created: 2026-07-08
updated: 2026-07-08
type: dashboard
tags: [quant, handsome-finance, antoine, on-chain, memecoin, high-risk]
sources: [03_Sources/youtube/handsomefinance/Handsome Finance Corpus Synthesis - 2025-01-08 to 2026-07-08.md]
confidence: medium
---

# Antoine On-Chain Alpha Dashboard

> High-risk research dashboard. No live execution, no private keys, no exchange/wallet actions.

## Start here

- [[Antoine On-Chain Alpha Desk]]
- [[QTF-010 Antoine On-Chain Meme and Airdrop Alpha Pipeline]]
- [[Handsome Finance Channel Inventory - 2025-01-08 to 2026-07-08]]
- [[Handsome Finance Corpus Synthesis - 2025-01-08 to 2026-07-08]]

## Raw corpus

- Inventory JSON: `02_Raw/youtube/handsomefinance/handsomefinance-channel-inventory-2025-01-08-to-2026-07-08.json`
- Inventory CSV: `02_Raw/youtube/handsomefinance/handsomefinance-channel-inventory-2025-01-08-to-2026-07-08.csv`
- Category CSV: `02_Raw/youtube/handsomefinance/handsomefinance-video-category-map.csv`
- Transcript text: `02_Raw/youtube/handsomefinance/transcript-text/`

## Operating pipeline

```text
Source/video idea → candidate fields → rug/risk gate → paper watchlist → outcome ledger → review board
```

## Latest read-only evidence

- [[Moon Dev Robinhood Meme Discovery Bot - X 2075628021118099917]] — Robinhood Chain discovery pattern accepted as a watch-only research spike; chain-specific contract/holder/sell-risk coverage remains a hard block.
- [[Antoine DEX Screener Adapter 01 - Watch Candidates]] — first public DEX Screener scan; all rows kept watch-only until rug/holder/dev checks exist.
- [[Antoine Risk Adapter 02 - RugCheck Solana Gate]] — second public read-only adapter; Solana rows now receive holder/dev/authority/risk fields before any paper promotion.
- [[Antoine Risk Adapter 03 - EVM GoPlus Honeypot Gate]] — EVM/Base/BSC-style rows now receive public GoPlus + Honeypot.is holder, tax, contract, and simulation checks.
- [[Antoine Outcome Tracker 01 - Forward Snapshot Ledger]] — public DEX Screener forward-price snapshots now track candidate outcomes toward 1h / 6h / 24h / 7d expectancy.
- [[QTF-013 Hyperliquid Lighter Farming and Perp Venue Watchlist]] — Hyperliquid/Lighter/TX Flow-style venue and farming research watchlist.
- [[QTF-014 Antoine Meme Coin Techniques Library]] — meme-coin tool/wallet/launch-stage technique library from Handsome Finance playlist.
- Ledger: `05_Projects/AI Quant Trading Floor/Implementation/ledgers/antoine_paper_candidates.jsonl`
- Outcome ledger: `05_Projects/AI Quant Trading Floor/Implementation/ledgers/antoine_candidate_outcomes.jsonl`
- Venue metrics ledger: `05_Projects/AI Quant Trading Floor/Implementation/ledgers/venue_watchlist_metrics.jsonl`
- Watchdog: `99832edcba1e` — hourly no-agent horizon tracker; silent unless new 1h / 6h / 24h / 7d observations mature.

## Implementation

```bash
cd "05_Projects/AI Quant Trading Floor/Implementation"
python3 antoine_alpha_desk.py --mode corpus
python3 antoine_alpha_desk.py --mode candidates --candidates-csv templates/antoine_candidate_template.csv
python3 antoine_alpha_desk.py --mode dexscreener --queries 'pump,ai,bonk,solana,base,aster,hyperliquid' --max-pairs 25
python3 antoine_alpha_desk.py --mode dexscreener_rugcheck --queries 'ai,pump,solana' --max-pairs 12
python3 antoine_alpha_desk.py --mode rugcheck --tokens '<solana_mint_1>,<solana_mint_2>'
python3 antoine_alpha_desk.py --mode dexscreener_fullrisk --queries 'ai,pump,base,bsc' --max-pairs 12
python3 antoine_alpha_desk.py --mode evm_risk --chain ethereum --tokens '<evm_contract_1>,<evm_contract_2>'
python3 antoine_alpha_desk.py --mode outcomes --max-outcome-rows 40
python3 venue_metrics_watchlist.py
```

## Current next gates

- [x] Connect a public DEX Screener read-only discovery adapter.
- [x] Add a public RugCheck Solana holder/dev/contract risk adapter.
- [x] Add an EVM/Base/BSC honeypot + holder adapter for non-Solana DEX candidates.
- [x] Add outcome tracking for candidates at 1h / 6h / 24h / 7d.
- [x] Compare Antoine-style candidates against random same-age token cohorts.
- [x] Schedule a silent hourly matured-horizon outcome watchdog.
- [x] Add Antoine source-tool / wallet-score / launch-stage schema fields.
- [x] Add read-only Hyperliquid/Lighter/TX Flow venue metrics ledger.
- [ ] Wait for enough matured 1h / 6h / 24h / 7d observations before any promotion decision.
- [ ] Verify DEX Screener discovery and GoPlus/Honeypot/Blockscout risk coverage for Robinhood Chain ID `4663`; keep every candidate watch-only until coverage is proven.
