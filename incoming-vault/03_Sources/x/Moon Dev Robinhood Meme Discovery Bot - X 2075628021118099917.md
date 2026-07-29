---
title: Moon Dev Robinhood Meme Discovery Bot - X 2075628021118099917
created: 2026-07-11
updated: 2026-07-11
type: source-review
status: reviewed-watch-only
priority: medium-high
related_workstream: Antoine On-Chain Alpha
source_url: https://x.com/i/status/2075628021118099917
author: Moon Dev
confidence: medium
access_provenance: public FxTwitter metadata plus sampled video frames
risk_class: very-high
---

# Moon Dev Robinhood Meme Discovery Bot - X 2075628021118099917

## Verdict

**Strongly adjacent to Antoine, but suitable only as a new-chain discovery adapter until Robinhood-specific contract and holder-risk coverage exists.**

The reusable part is not “buy memes before they explode.” It is the read-only workflow:

```text
DEX Screener Robinhood feed
→ filter by age/liquidity/transactions/market cap
→ sort and rank candidates
→ enrich contract/holder/creator risk
→ watch-only ledger
→ forward outcome snapshots
→ compare against same-age random cohort
```

## Source evidence

- **Post:** `I Built a Free Bot to Catch Robinhood Memes Before They EXPLODE`
- **Author:** Moon Dev (`@MoonDevOnYT`)
- **Video duration:** about 6 minutes 38 seconds
- **Published:** 2026-07-10
- **Source retrieval:** public X metadata and video URL via Agent Reach's FxTwitter fallback.
- **Visual review:** sampled chronological frames show DEX Screener Robinhood token charts, a terminal token feed, Python code and filtering/ranking logic.

### Visually supported implementation details

The sampled frames visibly show:

- DEX Screener's Robinhood chain page and tokens including CASHCAT and HOODRAT.
- A terminal feed with token names, apparent age, liquidity/market-cap-style values and DEX Screener URLs.
- Python constants/filters resembling minimum transaction count, minimum/maximum market cap, minimum liquidity and a recent-token age window.
- Sorting/ranking of token rows.
- A periodic loop, apparently rerunning every several minutes.

Exact thresholds could not all be read reliably from sampled frames, so they are **not copied as authoritative parameters**.

## Independent network context

Current public reporting describes Robinhood Chain as:

- an Arbitrum-based Ethereum Layer 2;
- public mainnet since 2026-07-01;
- chain ID `4663`, ETH gas;
- using Uniswap V3/V4 and other DEX infrastructure;
- experiencing a very new memecoin wave led by CASHCAT;
- supported in DEX Screener's Robinhood view;
- newly integrated into Pump.fun trading flows.

Reported activity is material but extremely young. Headline TVL is partly driven by a large stablecoin/lending deposit, not solely organic meme activity. This is important because meme traction should not be inferred from total TVL.

## Antoine fit

| Existing Antoine capability | Robinhood-chain applicability |
|---|---|
| DEX Screener discovery | Likely reusable with Robinhood chain/search adapter |
| Token age, liquidity, volume, transactions | Reusable |
| Source tool, first-seen and launch-stage fields | Reusable |
| Forward 1h/6h/24h/7d outcome tracking | Reusable |
| Random same-age cohort comparison | Reusable and essential |
| Solana RugCheck | **Not applicable** |
| Current EVM GoPlus/Honeypot coverage | Must be verified for Robinhood chain ID 4663 before use |
| Paper/watch-only gate | Required |

## Main risks

- Network and token ecosystem are only days old.
- Extreme insider, bundled-supply, creator-wallet and honeypot risks.
- Thin or rapidly disappearing liquidity.
- DEX Screener visibility is discovery evidence, not safety evidence.
- New-chain API/indexer gaps may cause false or stale fields.
- Viral survivors create severe survivorship bias.
- Fast discovery can increase losses if risk checks and execution assumptions are weak.

## Recommended next slice

Create a **Robinhood Chain Antoine discovery spike** with no wallet or execution:

1. Confirm a stable public DEX Screener adapter for chain `robinhood`.
2. Record token address, pair address, DEX, first seen, pair age, liquidity, volume, buys/sells, transaction count, market cap/FDV and migration/launch source.
3. Probe GoPlus/Honeypot/Blockscout support for chain ID `4663`; unknown coverage remains a hard watch-only block.
4. Record same-age random cohorts and 1h/6h/24h/7d outcomes.
5. Reject any candidate missing verified contract, holder concentration, creator/dev exposure, sell simulation, liquidity and authority/upgrade checks.
6. Judge cohort expectancy after many candidates—not showcase winners.

## Decision

- **Adopt:** architecture pattern and read-only discovery idea.
- **Do not adopt:** promotional “before they explode” framing or any automatic-buy behavior.
- **Current status:** research/watch-only.
- **Live status:** blocked.

## Related

- [[Antoine On-Chain Alpha Dashboard]]
- [[Antoine On-Chain Alpha Desk]]
- [[QTF-010 Antoine On-Chain Meme and Airdrop Alpha Pipeline]]
- [[QTF-014 Antoine Meme Coin Techniques Library]]
