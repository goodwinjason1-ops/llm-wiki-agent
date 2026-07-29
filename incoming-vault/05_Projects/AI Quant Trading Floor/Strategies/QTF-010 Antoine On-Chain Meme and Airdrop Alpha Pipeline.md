---
title: QTF-010 Antoine On-Chain Meme and Airdrop Alpha Pipeline
created: 2026-07-08
updated: 2026-07-08
type: strategy
status: research-scaffold
tags: [quant, on-chain, memecoin, airdrop, wallet-intelligence, high-risk, paper-trading]
sources: [03_Sources/youtube/handsomefinance/Handsome Finance Corpus Synthesis - 2025-01-08 to 2026-07-08.md]
confidence: medium
---

# QTF-010 Antoine On-Chain Meme and Airdrop Alpha Pipeline

## Hypothesis

Antoine's edge is not one indicator; it is a workflow for early asymmetric crypto opportunities: tools + wallets + narratives + risk filters + speed. The Quant Floor can make this systematic by treating every idea as a candidate that must pass a rug/risk gate and then be paper-tracked.

## Candidate data fields

- symbol / contract / chain
- market cap and liquidity
- token age
- holder concentration
- dev wallet percentage
- bundled supply percentage
- LP locked/unlocked status
- contract verified / mint/freeze authority
- smart wallet count and wallet PnL quality
- volume growth and narrative score
- source video / source claim

## Scoring

Use `antoine_alpha_desk.py` to calculate:

- edge score: smart wallets, volume growth, narrative, market-cap window, liquidity;
- risk penalty: holder concentration, dev/bundled supply, LP unlock, contract authority, thin liquidity;
- decision: reject, watch-only, watchlist, or paper-candidate.

## Adapter status

First adapter: [[Antoine DEX Screener Adapter 01 - Watch Candidates]]. DEX Screener is useful for discovery and price/liquidity/volume snapshots, but it does not provide enough holder/dev/bundled/contract-authority data to promote candidates to paper bets by itself.

Second adapter: [[Antoine Risk Adapter 02 - RugCheck Solana Gate]]. Solana rows can now be enriched with RugCheck holder concentration, top-holder percentage, dev/insider supply proxy, mint/freeze authority, risk labels, and holder count.

Third adapter: [[Antoine Risk Adapter 03 - EVM GoPlus Honeypot Gate]]. EVM/Base/BSC-style rows can now be enriched with GoPlus holder/ownership/tax/contract fields and Honeypot.is simulation results.

Outcome tracker: [[Antoine Outcome Tracker 01 - Forward Snapshot Ledger]]. Candidate rows are now tracked against DEX Screener forward prices for snapshot / 1h / 6h / 24h / 7d expectancy analysis.

## Promotion criteria

- Candidate survives risk gate.
- Paper ledger records entry thesis, stop/invalidation, expected catalyst, and outcome.
- Basket-level results show expectancy after many candidates, not one lucky win.
- Review board approves any move beyond paper.

## Kill conditions

- Contract not verified or dangerous authority remains.
- Holder/dev/bundled supply concentration fails threshold.
- Liquidity too thin for even planned paper size assumptions.
- Source claim relies on private/insider info that cannot be ethically/publicly validated.

## Related

- [[Antoine On-Chain Alpha Desk]]
- [[Handsome Finance Corpus Synthesis - 2025-01-08 to 2026-07-08]]
- [[Alternative Venues Strategy Map - Prediction Markets Hyperliquid DeFi]]
