---
title: Antoine Cohort Comparison 01 - Random Same-Age Controls
created: 2026-07-08
updated: 2026-07-08
type: backtest-evidence
status: research-evidence
tags: [quant, on-chain, antoine, cohort, controls, expectancy, paper-trading]
sources: [05_Projects/AI Quant Trading Floor/Implementation/antoine_alpha_desk.py]
confidence: medium
---

# Antoine Cohort Comparison 01 - Random Same-Age Controls

## Purpose

Compare Antoine-style risk-gated watch candidates against a same-age DEX Screener control cohort before deciding whether the outcome tracker deserves scheduled hourly collection.

This is still research-only. It uses public/read-only DEX Screener, RugCheck, GoPlus, and Honeypot.is endpoints. It does not connect wallets or place trades.

## Commands verified

```bash
cd "05_Projects/AI Quant Trading Floor/Implementation"
python3 -m py_compile antoine_alpha_desk.py
python3 antoine_alpha_desk.py --mode cohort --queries 'meme,dog,cat,base,bsc,eth,solana,pump,pepe,ai' --max-pairs 24 --per-bucket 4
python3 antoine_alpha_desk.py --mode outcomes --max-outcome-rows 80
python3 antoine_alpha_desk.py --mode compare
```

Latest reports:

```text
Implementation/reports/antoine_alpha_desk_cohort_20260708T041516+0000.json
Implementation/reports/antoine_alpha_desk_outcomes_20260708T041623+0000.json
Implementation/reports/antoine_alpha_desk_compare_20260708T041623+0000.json
```

## Method

DEX Screener does not expose a true random token endpoint. The control cohort therefore uses broad neutral search queries and matches the available candidate ledger by token-age bucket:

```text
candidate ledger age buckets
  → broad DEX Screener control searches
  → exclude already-seen candidate pairs
  → risk-enrich controls with RugCheck / GoPlus / Honeypot where supported
  → tag as control_only
  → append to the same candidate ledger
  → run outcome snapshots
  → compare groups
```

Age buckets:

- `<24h`
- `1d–7d`
- `7d–30d`
- `>30d`

## First comparison result

Current comparison report used `157` priced outcome rows.

| Group | n | Avg return | Median | Positive rate | Best | Worst |
|---|---:|---:|---:|---:|---:|---:|
| control_only | 21 | 0.439% | 0.000% | 4.76% | 9.212% | 0.000% |
| risk_gated_watch | 86 | -0.003% | 0.000% | 2.33% | 2.180% | -1.103% |
| rejected_or_danger | 50 | -0.032% | 0.000% | 0.00% | 0.000% | -1.103% |

## Interpretation

Do **not** treat this as a performance claim yet:

- most observations are still snapshot-age, not mature 1h / 6h / 24h / 7d observations;
- control selection is broad-search matched, not true exchange-wide random;
- sample size is small;
- many rows are inactive or stale DEX pairs.

Useful early signal: the pipeline can now separate candidate groups, attach controls, and compute forward returns without fabricating outcomes.

## Scheduling decision

Do not promote or trade from this yet. However, an hourly read-only tracker is now justified if it stays silent unless it has a material matured-horizon update.

Implemented watchdog:

```text
hourly no-agent cron
  → run outcomes for recent rows
  → run compare
  → only deliver when new 1h / 6h / 24h / 7d observations are recorded or when a report materially changes
```

This avoids Telegram spam while collecting enough evidence for an Antoine-vs-control expectancy test.

Cron job:

```text
99832edcba1e — Antoine outcome horizon watchdog — every 60m
```

Script:

```text
00_System/Scripts/antoine_outcome_watchdog.py
```
