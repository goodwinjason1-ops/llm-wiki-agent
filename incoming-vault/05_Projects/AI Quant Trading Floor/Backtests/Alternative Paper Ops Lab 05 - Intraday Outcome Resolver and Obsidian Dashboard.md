---
title: Alternative Paper Ops Lab 05 - Intraday Outcome Resolver and Obsidian Dashboard
created: 2026-07-03
updated: 2026-07-03
type: research-evidence
tags: [quant, paper-trading, polymarket, dashboard, obsidian, sharpe-target]
confidence: high
---

# Alternative Paper Ops Lab 05 - Intraday Outcome Resolver and Obsidian Dashboard

## Goal

Continue the paper-evidence machine after Obsidian visual setup:

1. Upgrade Polymarket paper outcome tracking so touch-style markets can be resolved with intraday high/low data after expiry.
2. Add paper-ledger health summaries.
3. Create a visual Obsidian dashboard for the AI Quant Trading Floor.
4. Schedule the dashboard to refresh automatically.

All work remains **read-only / paper-research only**.

## Updated artifacts

| Artifact | Update |
|---|---|
| `Implementation/alt_paper_ops.py` | Added Binance intraday high/low resolver and `ledger-health` command |
| `Implementation/quant_floor_dashboard.py` | New dashboard generator for Obsidian |
| `scripts/quant_floor_dashboard_refresh.py` | Silent cron wrapper for dashboard refresh |
| `00_System/Dashboards/AI Quant Trading Floor Dashboard.md` | New visual dashboard note |

## Intraday outcome resolver

The previous tracker refused to resolve touch-style markets such as:

- “Will BTC reach $65,000 in July?”
- “Will ETH dip to $1,500 in July?”
- “Will BTC hit $62,000?”

That was safe but left too much manual work. The tracker now:

1. waits until `endDate` has passed,
2. parses the target and direction,
3. fetches Binance public hourly candles from signal record time to market expiry,
4. resolves using max high / min low for touch-style markets,
5. records unit paper PnL,
6. still notes that official Polymarket resolution is preferred.

Resolution statuses now include:

| Status | Meaning |
|---|---|
| `resolved_intraday_hilo` | Touch-style market resolved from Binance intraday high/low bars |
| `resolved_approx` | Simple expired above/below market resolved from spot-at-check |
| `needs_manual_review` | Cannot safely parse/fetch/resolve |

## Verification run

Commands run:

```text
python -m py_compile Implementation/alt_paper_ops.py
python Implementation/alt_paper_ops.py track-outcomes
python Implementation/alt_paper_ops.py ledger-health
python Implementation/quant_floor_dashboard.py
```

Reports:

```text
Implementation/reports/alt_paper_ops_track-outcomes_20260703T095610+0000.json
Implementation/reports/alt_paper_ops_ledger-health_20260703T095610+0000.json
```

Current ledger health:

| Metric | Value |
|---|---:|
| Paper signals total | 12 |
| Outcomes total | 0 |
| Resolved total | 0 |
| Open/unresolved | 12 |
| Unit paper PnL total | 0 |

Confidence buckets:

| Confidence | Signals | Resolved | Unit PnL |
|---|---:|---:|---:|
| low | 1 | 0 | 0 |
| medium_low | 11 | 0 | 0 |

Interpretation:

- No signal has reached resolvable expiry yet.
- The tracker is ready to resolve expired touch-style markets automatically once expiry passes.

## Obsidian dashboard

Created:

```text
00_System/Dashboards/AI Quant Trading Floor Dashboard.md
```

Dashboard includes:

- quick links to the project and evidence notes,
- paper-ledger health,
- confidence-bucket stats,
- latest paper signals,
- latest resolved outcomes,
- optimizer frontier snapshot,
- latest report files,
- active read-only cron jobs,
- next gates.

This makes the vault visually useful beyond the Graph View: there is now a single “control panel” note to open in Obsidian.

## Scheduled dashboard refresh

Created cron job:

```text
AI Quant Floor Obsidian dashboard refresh
Job ID: a8a58f9b3ee1
Schedule: daily 10:30
Mode: silent on success, alert on error
```

This runs after the daily Polymarket paper signal recorder.

## Active paper/evidence jobs after this stage

| Job | ID | Schedule | Purpose |
|---|---|---|---|
| Polymarket paper signal recorder | `61f996692d57` | daily 10:00 | Record calibrated paper signals |
| AI Quant Floor Obsidian dashboard refresh | `a8a58f9b3ee1` | daily 10:30 | Refresh dashboard note |
| Polymarket paper outcome tracker | `55283af680f6` | every 6h | Resolve paper outcomes when possible |
| Hyperliquid funding hourly recorder | `1e51b5d88577` | hourly | Build funding history |
| Alternative venues monitor | `87a2456a3bbb` | daily 09:00 | Scan prediction/funding/DeFi candidates |
| Tactical ETF monitor | `83516ec85064` | weekdays 08:00 | Read-only ETF allocation monitor |

## Current next gates

1. Wait for Polymarket signal expiries and evaluate hit rate/PnL by confidence bucket.
2. Wait for Hyperliquid 48+ hourly snapshots and run preliminary persistence/fade test.
3. Complete DeFi protocol-risk review checklists before any future allocation discussion.
4. Replace allocator priors with measured paper returns as evidence accumulates.

## Safety status

No live execution. No credentials. No private keys. No deposits. No orders.
