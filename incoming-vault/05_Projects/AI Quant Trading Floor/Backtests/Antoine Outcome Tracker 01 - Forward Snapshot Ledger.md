---
title: Antoine Outcome Tracker 01 - Forward Snapshot Ledger
created: 2026-07-08
updated: 2026-07-08
type: backtest-evidence
status: research-evidence
tags: [quant, on-chain, antoine, outcome-tracking, paper-trading, expectancy]
sources: [05_Projects/AI Quant Trading Floor/Implementation/antoine_alpha_desk.py]
confidence: medium
---

# Antoine Outcome Tracker 01 - Forward Snapshot Ledger

## Purpose

Add forward outcome tracking for Antoine-style DEX candidates so the system can measure expectancy instead of only collecting interesting tokens.

This is still paper/research-only. It uses public DEX Screener pair prices and never places orders.

## Command verified

```bash
cd "05_Projects/AI Quant Trading Floor/Implementation"
python3 antoine_alpha_desk.py --mode outcomes --max-outcome-rows 40
```

Latest report:

```text
05_Projects/AI Quant Trading Floor/Implementation/reports/antoine_alpha_desk_outcomes_20260708T040407+0000.json
```

Outcome ledger:

```text
05_Projects/AI Quant Trading Floor/Implementation/ledgers/antoine_candidate_outcomes.jsonl
```

Candidate ledger read:

```text
05_Projects/AI Quant Trading Floor/Implementation/ledgers/antoine_paper_candidates.jsonl
```

## Design

```text
candidate ledger row
  → DEX Screener pair lookup by chain + pair address
  → compare current price to original discovery price
  → record elapsed hours
  → tag due horizons: snapshot, 1h, 6h, 24h, 168h
  → append outcome JSONL row
```

Tracked fields:

- original candidate timestamp
- symbol / chain / pair / token
- risk-gated paper status
- risk decision
- elapsed hours
- due horizon bucket
- entry price
- current price
- return percentage
- current liquidity
- current 24h volume

## Verified sample result

The first run priced recent candidate rows successfully and wrote snapshots. Most were too young for the 1h horizon, so they were recorded as `snapshot` rows.

Example row:

| Field | Value |
|---|---:|
| Symbol | PUMP |
| Chain | bsc |
| Entry price | `0.01031` |
| Current price | `0.01029` |
| Return | `-0.194%` |
| Horizon | snapshot |

Another earlier BSC snapshot showed `+2.18%`, which confirms the ledger can record live forward movement rather than static metadata.

## Why this matters

The Antoine desk now has both parts of the research loop:

1. **Risk gate:** avoid obvious rugs / concentrated supply / honeypot candidates.
2. **Outcome ledger:** measure whether the remaining candidates actually move favourably over time.

The next decision should be based on a large enough sample, not one lucky run.

## Next gate

Run the tracker hourly or on-demand until there are enough 1h / 6h / 24h / 7d observations to compare:

- risk-gated watch candidates,
- rejected candidates,
- random same-age DEX Screener candidates,
- Antoine/video-method-sourced candidates.
