---
title: How to DeFi Advanced - CoinGecko
type: source-summary
created: 2026-07-08
updated: 2026-07-08
tags: [quant, defi, risk, source, coingecko]
sources: [02_Raw/papers/how-to-defi-advanced-coingecko.pdf, 02_Raw/papers/how-to-defi-advanced-coingecko.md]
confidence: medium
---

# How to DeFi Advanced - CoinGecko

Source: https://assets.coingecko.com/books/How+to+DeFi+(Advanced).pdf  
Raw extracted text: [[how-to-defi-advanced-coingecko]]

## Scope

CoinGecko's *How to DeFi: Advanced* is a broad DeFi taxonomy and risk primer covering yield farming, AMMs, DEX aggregators, lending/borrowing, stablecoins/stableassets, derivatives, insurance, indexes, prediction markets, fixed interest, yield aggregators, oracles, scaling, exploits, and due diligence.

The book is from **May 2021**, so it should not be used as current protocol recommendation. Its durable value for Jayse's Quant Floor is as a **risk taxonomy** and checklist source.

## DeFi risk controls extracted for the Quant Floor

| Theme | Applied control |
|---|---|
| Eye-popping APY | Penalize very high APY and unstable APY vs 30d mean; treat as likely temporary/subsidized until persistence evidence exists. |
| AMM exposure | Add slippage, front-running/MEV, and impermanent-loss gates for LP/AMM strategies. |
| DEX aggregation | Do not trust quoted prices blindly; check route/liquidity/slippage, especially for small/illiquid pools. |
| Lending/borrowing | Review collateral factor, liquidation thresholds, utilization, borrow-rate spikes, and keeper/liquidator dependencies. |
| Stablecoins/stableassets | Review collateral design, peg history, redemption path, recursive/native-token collateral, and emergency powers. |
| Yield aggregators | Penalize composability/stacking risk; check underlying protocols, strategy permissions, harvest/compound mechanics, and prior exploit history. |
| Insurance | Treat insurance as risk mitigation, not a guarantee; review cover terms and payout limitations. |
| Oracles/bridges/chains | Review oracle dependency, bridge/sequencer assumptions, and chain-specific risks. |

## Implemented changes

Updated Quant Floor code:

- `Implementation/alt_research_lab.py`
  - Adds `advanced_defi_flags` and `advanced_defi_penalty` to DeFi candidates.
  - Penalizes APY instability, eye-popping/subsidized APY, structured yield/points/basis exposure, yield aggregator composability, LP/IL exposure, lending/liquidation exposure, stablecoin collateral/peg exposure, and chain/bridge/sequencer exposure.
  - Expands allocator risk controls.

- `Implementation/alt_paper_ops.py`
  - Expands DeFi protocol-review checklist with the CoinGecko advanced risk gates.

## Resulting Quant Floor policy

The DeFi sleeve remains **public-data / read-only / paper-only**. No wallets, deposits, auth, or live execution. The book supports more caution, not a direct promotion to live DeFi allocation.

## Related

- [[Alternative Venues Strategy Map - Prediction Markets Hyperliquid DeFi]]
- [[Alternative Research Lab 01 - Prediction Funding DeFi Allocator]]
- [[Alternative Validation Lab 03 - Calibrated Edge Risk and Optimizer]]
- [[AI Quant Trading Floor Dashboard]]
