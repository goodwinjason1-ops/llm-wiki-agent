---
title: Antoine DEX Screener Adapter 01 - Watch Candidates
created: 2026-07-08
updated: 2026-07-08
type: evidence
status: watch-only
aliases: [Antoine DEX Screener Watch Candidates]
tags: [quant, antoine, dexscreener, on-chain, memecoin, paper-trading]
sources: [05_Projects/AI Quant Trading Floor/Implementation/antoine_alpha_desk.py]
confidence: medium
---

# Antoine DEX Screener Adapter 01 - Watch Candidates

## Command run

```bash
python3 antoine_alpha_desk.py --mode dexscreener --queries 'pump,ai,bonk,solana,base,aster,hyperliquid' --max-pairs 25
```

## Real output artifact

- JSON report: `C:\Users\Kidsg\Documents\AI Second Brain\05_Projects\AI Quant Trading Floor\Implementation\reports\antoine_alpha_desk_dexscreener_20260708T025544+0000.json`
- Ledger: `05_Projects/AI Quant Trading Floor/Implementation/ledgers/antoine_paper_candidates.jsonl`

## Top watch rows

| Symbol | Chain | DEX | Market cap | Liquidity | 24h volume | Score | Decision |
|---|---|---|---:|---:|---:|---:|---|
| HYPE | solana | raydium | $4,317,717 | $3,773,770 | $103,707 | 22.0 | watch-only: needs rug/holder/dev checks before paper |
| SOL | solana | raydium | $2,310,809 | $901,315 | $101,891 | 22.0 | watch-only: needs rug/holder/dev checks before paper |
| SOL | solana | raydium | $3,293,493 | $2,466,972 | $101,891 | 22.0 | watch-only: needs rug/holder/dev checks before paper |
| BASE | solana | pumpswap | $620,312 | $0 | $15,483,707 | 18.75 | watch-only: fails rug/liquidity gate |
| Bonk | solana | raydium | $3,279,727 | $1,705,567 | $103,707 | 18.0 | watch-only: needs rug/holder/dev checks before paper |
| PUMP | pulsechain | pulsex | $1,209,409 | $50,336 | $2,174 | 17.053 | watch-only: needs rug/holder/dev checks before paper |
| SOL | solana | raydium | $4,654,266 | $4,438,026 | $92,476 | 17.005 | watch-only: needs rug/holder/dev checks before paper |
| PUMP | bsc | pancakeswap | $2,837,986 | $126,422 | $6,578 | 17.0 | watch-only: needs rug/holder/dev checks before paper |
| HYPE | solana | raydium | $4,997,062 | $4,851,205 | $248 | 17.0 | watch-only: needs rug/holder/dev checks before paper |
| HYPE | solana | raydium | $4,510,124 | $4,059,127 | $248 | 17.0 | watch-only: needs rug/holder/dev checks before paper |

## Interpretation

This completes the first **read-only DEX Screener adapter** for the Antoine desk. It correctly keeps all rows as watch-only because DEX Screener search data does not include the holder concentration, dev wallet, bundled supply, contract authority, LP-lock, or smart-wallet PnL fields required by the Antoine risk gate.

That is a good result: the adapter is useful for discovery, but it is not enough for paper bets yet.

## Next gate

Add a second read-only risk adapter for holder/supply/contract/liquidity safety checks before anything can move from watch-only to paper-candidate.

## Related

- [[Antoine On-Chain Alpha Desk]]
- [[QTF-010 Antoine On-Chain Meme and Airdrop Alpha Pipeline]]
- [[Antoine On-Chain Alpha Dashboard]]
