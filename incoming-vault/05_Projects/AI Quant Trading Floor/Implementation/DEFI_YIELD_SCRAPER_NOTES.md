---
title: DeFi Yield Scraper — Implementation Notes
created: 2026-07-17
updated: 2026-07-17
type: concept
tags: [defi, yield, scraping, defillama, dexscreener, quant-floor]
sources: [00_System/Scripts/defi_yield_scraper.py]
confidence: medium
---

# DeFi Yield Scraper

Paper-only DeFi yield screening pipeline for the AI Quant Floor.

## Architecture

Four-stage pipeline:

1. **DeFiLlama Pool Screening** — `https://yields.llama.fi/pools`
   - Fetches all pools (15k+) with APY, TVL, chain, project
   - Filters by TVL > $1M, APY > 10%, major chains only
   - Flags emission-dependent yields (>70% from rewards)

2. **DexScreener Liquidity Validation** — `https://api.dexscreener.com/latest/dex/search?q=SYMBOL`
   - Validates pool has real 24h volume (> $100k)
   - Checks liquidity depth (> $500k minimum)
   - Computes volume/liquidity ratio

3. **Holder Distribution Analysis** — `https://api.dexscreener.com/latest/dex/tokens/TOKEN_ADDRESS`
   - Top 10 holder concentration (>40% = red flag)
   - Buy:sell ratio skew detection
   - Transaction activity analysis

4. **Composite YieldEdgeScore** — weighted scoring
   - APY percentile (25%) + liquidity depth (25%) + volume/liquidity ratio (20%)
   - Holder distribution (15%) + smart contract risk (15%)
   - Thresholds: HIGH (>0.7), MEDIUM (0.4-0.7), LOW (<0.4)

## API Requirements

| Source | Endpoint | Auth | Rate Limit | Cost |
|--------|----------|------|------------|------|
| DeFiLlama | `https://yields.llama.fi/pools` | None | ~60/min | Free |
| DexScreener | `https://api.dexscreener.com/latest/dex/...` | None | ~60/min | Free |
| No API keys required | | | | |

## Integration with Quant Floor

- Runs alongside funding rate and liquidation proxy recorder
- YieldEdgeScore feeds into cross-sleeve allocation decisions
- Paper-trade top signals for 2 weeks before promotion consideration
- Max 5% portfolio allocation per DeFi position

## Files

- Script: `C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation/defi_yield_scraper.py`
- Cache: `data_cache/defi_yields/`
- Reports: `reports/`
- Ledger: `ledgers/`

## Known Limitations

- DexScreener token lookup by address doesn't always find matching pairs
- Some pools are lending (not DEX pairs) — DexScreener validation skipped gracefully
- Holder data only available for token pairs, not lending pools
- No impermanent loss modeling
- No smart contract audit status checking
