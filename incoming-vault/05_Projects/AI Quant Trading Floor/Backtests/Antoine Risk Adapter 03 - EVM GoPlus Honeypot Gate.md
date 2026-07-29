---
title: Antoine Risk Adapter 03 - EVM GoPlus Honeypot Gate
created: 2026-07-08
updated: 2026-07-08
type: backtest-evidence
status: research-evidence
tags: [quant, on-chain, antoine, evm, goplus, honeypot, risk-gate, paper-trading]
sources: [05_Projects/AI Quant Trading Floor/Implementation/antoine_alpha_desk.py]
confidence: medium
---

# Antoine Risk Adapter 03 - EVM GoPlus Honeypot Gate

## Purpose

Complete the non-Solana risk gate for Antoine-style DEX candidates using public/read-only EVM security endpoints.

This adds EVM risk enrichment after DEX Screener discovery for chains including:

- Ethereum
- BSC
- Base
- Arbitrum
- Optimism
- Polygon
- Avalanche
- Fantom
- Linea

No wallet connections, private keys, exchange actions, or live trades are used.

## Command verified

```bash
cd "05_Projects/AI Quant Trading Floor/Implementation"
python3 -m py_compile antoine_alpha_desk.py
python3 antoine_alpha_desk.py --mode evm_risk --chain ethereum --tokens '0x2598c30330D5771AE9F983979209486aE26dE875'
python3 antoine_alpha_desk.py --mode dexscreener_fullrisk --queries 'ai,pump,base,bsc' --max-pairs 12
```

Latest report:

```text
05_Projects/AI Quant Trading Floor/Implementation/reports/antoine_alpha_desk_dexscreener_fullrisk_20260708T040337+0000.json
```

Manual EVM report:

```text
05_Projects/AI Quant Trading Floor/Implementation/reports/antoine_alpha_desk_evm_risk_20260708T040202+0000.json
```

## Adapter design

```text
DEX Screener discovery
  → if Solana: RugCheck risk gate
  → if EVM/Base/BSC/etc: GoPlus token security + Honeypot.is simulation
  → normalize holder/tax/ownership/honeypot fields
  → rescore candidate
  → append risk-gated status to ledger
```

Fields extracted:

- holder count
- top-holder percentage
- top-10 holder concentration
- owner/creator percentage proxy
- LP unlocked proxy from locked holder percentage
- contract open-source status
- buy/sell tax
- Honeypot simulation result
- Honeypot risk level
- execution/ownership flags such as blacklist, cannot sell, transfer pause, proxy, hidden owner, take-back ownership, selfdestruct, external call, gas abuse, anti-whale modification

## Verified sample result

The full-risk scan successfully enriched BSC, Ethereum, Base, and Solana rows. It kept candidates watch-only or rejected when concentration, authority, liquidity, or simulation issues were present.

Example BSC row:

| Field | Value |
|---|---:|
| Symbol | BSC |
| Chain | bsc |
| Holders | 15,012 |
| Top holder | ~25.27% |
| Top-10 concentration | ~39.89% |
| Buy tax | 0% |
| Sell tax | 0% |
| Honeypot risk | low |
| Decision | watch-only: fails rug/liquidity gate |

Example Base row was rejected/watch-only because Honeypot simulation failed and holder concentration/dev ownership were high.

## Interpretation

The Antoine desk now has a unified read-only risk pipeline:

```text
Solana → RugCheck
EVM/Base/BSC/etc → GoPlus + Honeypot.is
Unsupported chains → watch-only
```

Passing this gate is not a safety guarantee. It only means the candidate has enough public risk data to be tracked honestly in a paper ledger.

## Next gate

Use the outcome tracker to measure whether risk-gated watch candidates have positive forward expectancy at:

- 1h
- 6h
- 24h
- 7d
