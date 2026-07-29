---
title: QTF-014 Antoine Meme Coin Techniques Library
created: 2026-07-08
updated: 2026-07-08
type: quant-strategy
status: research-library
markets: [dex, solana, base, meme-coins]
timeframes: [intraday]
tags: [quant, antoine, memecoin, dex, on-chain, high-risk, paper-trading]
sources:
  - 02_Raw/youtube/cap_batch_2026-07-08_metadata.json
  - 02_Raw/youtube/cap_batch_2026-07-08_packet.md
confidence: medium
---

# QTF-014 Antoine Meme Coin Techniques Library

## Source

Cap 5 playlist: `How to trade meme coins` by Handsome Finance, 15 transcripts saved under `02_Raw/youtube/transcripts/`.

## Fit

**Strong as a high-risk research library.** The playlist expands Antoine with practical on-chain tactics, but most ideas require strict paper-only handling, risk gates, and no wallet actions from Ari.

## Extracted techniques

### 1. Fast execution / tool latency

- Photon/GMGN/Trojan/Based-style tools matter because DEX Screener can lag.
- Latency, priority fees, slippage, and MEV/validator ordering are part of the edge.
- Research implication: candidate detection should record discovery timestamp and source latency.

### 2. Wallet intelligence

- Find wallets by realized performance, influence, bot fees paid, and repeated successful early entries.
- Exclude snipers, one-hit wonders, and fake PnL screenshots.
- Research implication: create a wallet-score schema before copy-trade consideration.

### 3. Copy-trading as dangerous source, not action

- Copy-trading wallets is a source of candidate ideas, not something Ari should execute.
- Research implication: watch wallet buys/sells and run risk gates on tokens before paper classification.

### 4. Launch mechanics

- Pump-style bonding curves, Raydium/pool migration, Base launches, and early liquidity formation create different risk windows.
- Research implication: add launch-stage tags to Antoine candidates: bonding_curve, pre_migration, migrated_pool, mature_pool.

### 5. Risk screens

Repeated playlist themes:

- liquidity depth;
- holders and concentration;
- smart wallet behavior;
- community/attention;
- market cap bands;
- transaction speed;
- stop loss/take profit settings;
- fake performance avoidance.

## Additions to Antoine schema

Implemented fields in `Implementation/antoine_alpha_desk.py` and `Implementation/templates/antoine_candidate_template.csv`:

```text
source_tool
first_seen_at
discovery_latency_estimate
launch_stage
wallet_source_count
smart_wallet_score
bot_fee_signal
priority_fee_required
slippage_risk
bonding_curve_progress
migration_status
```

Notes:
- DEX Screener rows now default `source_tool=DEX Screener`, stamp `first_seen_at`, and infer a coarse `launch_stage` from pool age / DEX context.
- Wallet and bot-fee fields remain explicit `unknown`/`0` unless a source supplies them; Ari must not fabricate wallet alpha.
- `slippage_risk` and `priority_fee_required` can penalize candidate scoring but do not authorize trades.

## Verdict

Use Cap 5 to improve Antoine's **research schema and watchlist**, not to perform live trades. The first wallet/tool/launch-stage schema pass is now implemented; the next useful pass is adding trusted public wallet-intelligence adapters while keeping copy-trading as candidate discovery only.

## Related

- [[Antoine On-Chain Alpha Dashboard]]
- [[QTF-010 Antoine On-Chain Meme and Airdrop Alpha Pipeline]]
- [[Antoine DEX Screener Adapter 01 - Watch Candidates]]
- [[Antoine Risk Adapter 02 - RugCheck Solana Gate]]
- [[Antoine Risk Adapter 03 - EVM GoPlus Honeypot Gate]]
