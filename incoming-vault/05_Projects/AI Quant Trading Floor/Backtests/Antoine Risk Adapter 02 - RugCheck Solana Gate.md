---
title: Antoine Risk Adapter 02 - RugCheck Solana Gate
created: 2026-07-08
updated: 2026-07-08
type: backtest-evidence
status: research-evidence
tags: [quant, on-chain, antoine, rugcheck, solana, risk-gate, paper-trading]
sources: [05_Projects/AI Quant Trading Floor/Implementation/antoine_alpha_desk.py, 00_System/Dashboards/Antoine On-Chain Alpha Dashboard.md]
confidence: medium
---

# Antoine Risk Adapter 02 - RugCheck Solana Gate

## Purpose

Add the second read-only risk adapter requested by the Antoine desk: a public Solana RugCheck gate for holder concentration, dev/insider supply, contract authority, RugCheck risk labels, and holder count.

This is still research-only. It does not connect wallets, store keys, place orders, or approve live trading.

## Command verified

```bash
cd "05_Projects/AI Quant Trading Floor/Implementation"
python3 -m py_compile antoine_alpha_desk.py
python3 antoine_alpha_desk.py --mode dexscreener_rugcheck --queries 'ai,pump,solana' --max-pairs 12
```

Latest report:

```text
05_Projects/AI Quant Trading Floor/Implementation/reports/antoine_alpha_desk_dexscreener_rugcheck_20260708T032843+0000.json
```

Ledger updated:

```text
05_Projects/AI Quant Trading Floor/Implementation/ledgers/antoine_paper_candidates.jsonl
```

## Adapter design

```text
DEX Screener discovery
  → normalize market/liquidity/volume fields
  → if chain == solana, call RugCheck public report endpoint
  → extract holder/dev/authority/risk fields
  → rescore candidate
  → append risk-gated watch/paper status to ledger
```

RugCheck fields extracted:

- RugCheck normalized score
- rugged flag
- danger/warn count
- top-holder percentage
- top-10 holder concentration
- creator / insider supply proxy
- mint/freeze authority status
- total holders
- total market liquidity
- risk names

## Verified sample result

The scan returned real public data and correctly **did not promote** candidates to paper trades.

Best Solana row in the sample:

| Field | Value |
|---|---:|
| Symbol | AI |
| Chain | solana |
| Token | `99ouK5YUK3JPGCPX9joNtHsMU7NPpU7w91JN4kdQ97po` |
| Liquidity | ~$69k |
| RugCheck score | 7 |
| RugCheck risk | Mutable metadata |
| Top holder | ~52.04% |
| Top-10 holder concentration | ~75.14% |
| Holders | 4,254 |
| Mint/freeze authority | false |
| Decision | watch-only: fails rug/liquidity gate |

Several fake/derivative `SOL` rows showed high RugCheck scores, very concentrated holders, low holder counts, and danger labels such as large LP unlocked / low holders / freeze authority. These were correctly rejected or held as reject/watch-only.

## Current limitation

RugCheck is Solana-focused. Non-Solana rows from DEX Screener remain watch-only until an EVM/Base/BSC holder/honeypot adapter is added.

## Promotion interpretation

A token can only move from watch-only to paper-candidate when:

- Rug data is complete for its chain;
- no mint/freeze authority or contract danger flags remain;
- holder concentration is below the current threshold;
- liquidity is not thin relative to market cap;
- there is still an actual edge source, not only a clean risk report.

Passing RugCheck is **not** a safety guarantee. It only makes the risk visible enough to support paper tracking.

## Next gate

Add either:

1. EVM/Base/BSC honeypot + holder adapter for non-Solana DEX candidates, or
2. outcome tracking for RugCheck-gated Solana watch candidates at `1h / 6h / 24h / 7d`.
