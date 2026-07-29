---
title: QTF-013 Hyperliquid Lighter Farming and Perp Venue Watchlist
created: 2026-07-08
updated: 2026-07-08
type: quant-strategy
status: research-watchlist
markets: [crypto-perps, defi]
timeframes: [daily, weekly]
tags: [quant, hyperliquid, lighter, airdrop, defi, farming, paper-trading]
sources:
  - 02_Raw/youtube/transcripts/iYMrbM9ixhU.md
  - 02_Raw/youtube/transcripts/RbksoyPfQZY.md
confidence: medium
---

# QTF-013 Hyperliquid Lighter Farming and Perp Venue Watchlist

## Sources

- Cap 2: `How I am Farming the Next HyperLiquid Before Anyone Else`.
- Cap 6: `Lighter Could 17X If This One Thing Happens`.

## Fit

**Medium/Strong for research.** Jayse is already an active Hyperliquid user, so Hyperliquid-adjacent perp venues, fee/revenue metrics, vaults, and airdrop farming deserve a watchlist. This is not a recommendation to trade, deposit, bridge, or farm automatically.

## Extracted opportunity pattern

1. Find early perp DEX / perps venue before token/airdrop maturity.
2. Check if real users and volume are growing, not just incentive wash volume.
3. Compare to Hyperliquid: fees, revenue, volume, TVL, UI, chain, market coverage, vaults, referral/points.
4. If using the venue anyway, consider whether activity earns points/airdrop exposure.
5. Treat Robinhood/Lighter integration as distribution catalyst, not proof of token upside.

## Watch fields

| Field | Why it matters |
|---|---|
| Daily volume | points farming can be fake; need durable growth |
| Fees/revenue | exchanges are valuable when revenue is real |
| TVL / open interest | liquidity and user confidence |
| Market depth/spread | actual tradability |
| Points / airdrop design | farming economics |
| KYC / region / bridge constraints | whether Jayse can safely use it |
| Contract/security risk | avoid smart-contract or custody blowups |
| Token FDV / float | valuation risk |
| Integrations | Robinhood-style distribution catalysts |

## Implemented ledger fields

`Implementation/venue_metrics_watchlist.py` now appends read-only rows to `Implementation/ledgers/venue_watchlist_metrics.jsonl` with:

```text
venue, url, category, metric_ts, volume_24h_usd, fees_24h_usd,
revenue_24h_usd, tvl_usd, open_interest_usd, market_depth_usd,
points_program_status, token_status, fdv_usd, float_pct,
region_or_kyc_constraints, risk_notes, source_url
```

Current behavior:
- Hyperliquid uses the public `https://api.hyperliquid.xyz/info` `metaAndAssetCtxs` endpoint to aggregate 24h notional volume and open interest.
- Lighter and TX Flow remain manual-review rows until a reliable public endpoint/source is confirmed.
- The ledger is evidence collection only: no venue signup, KYC, deposit, bridge, farming, or trade actions.

## Candidate venues / themes

- Hyperliquid vaults and ecosystem.
- Lighter as Hyperliquid competitor and possible Robinhood distribution beneficiary.
- TX Flow / early perp DEX farming candidate from Cap 2.
- Perp DEX points programs generally.

## Decision rule

Only move from watchlist to paper/research action if:

- venue data is independently verifiable;
- no private-key or deposit action is required from Ari;
- risk/reward is recorded;
- Jayse explicitly approves any real usage outside his existing workflows.

## Related

- [[AI Quant Trading Floor]]
- [[Antoine On-Chain Alpha Dashboard]]
- [[Alternative Venues Strategy Map - Prediction Markets Hyperliquid DeFi]]
- [[Quant Floor Data and News Sources Policy]]
