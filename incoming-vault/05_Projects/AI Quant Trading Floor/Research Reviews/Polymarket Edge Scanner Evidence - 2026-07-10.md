---
title: Polymarket Edge Scanner Evidence - 2026-07-10
created: 2026-07-10
updated: 2026-07-10
type: evidence-note
status: active
tags: [quant, polymarket, qtf-018, edge-scanner, evidence, paper-trading]
sources:
  - [[QTF-018 Prediction Market Edge Intake]]
confidence: high
---

# Polymarket Edge Scanner Evidence - 2026-07-10

## Purpose

Record the first repeated evidence-collection run for the QTF-018 read-only Polymarket edge scanner.

This is **not** a trading result or profitability claim. It is a public-data scanner smoke/evidence run that records orderbook/candidate snapshots for later replay research.

## Safety boundary

- Public-data only.
- No wallet.
- No Polymarket auth.
- No orders.
- No simulated fills accepted without later queue-aware replay evidence.

## Implementation artifact

```text
C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation/polymarket_edge_scanner.py
```

Ledgers:

```text
Implementation/ledgers/polymarket_edge_candidates.jsonl
Implementation/ledgers/polymarket_orderbook_snapshots.jsonl
Implementation/data_cache/polymarket_market_first_seen.json
```

## Repeated scan run

Command pattern:

```bash
cd "C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation"
python polymarket_edge_scanner.py --max-markets 30
```

Run interval: 3 scans with ~60 seconds between scans.

| Run | Report | Markets scanned | Candidates | PM-E03 | PM-E04 | PM-E06 |
|---:|---|---:|---:|---:|---:|---:|
| 1 | `reports/polymarket_edge_scanner_20260710T002243+0000.json` | 30 | 29 | 17 | 12 | 0 |
| 2 | `reports/polymarket_edge_scanner_20260710T002441+0000.json` | 30 | 29 | 17 | 12 | 0 |
| 3 | `reports/polymarket_edge_scanner_20260710T002637+0000.json` | 30 | 29 | 17 | 12 | 0 |

## Interpretation

- PM-E03 two-sided binary-window baseline snapshots are being captured.
- PM-E04 fresh-window candidates are being captured.
- PM-E06 lifecycle-boundary candidates were not present during this short scan window. This is expected because near-close/open events are time-sensitive and may require scheduled captures around market boundaries.
- Candidate counts were stable across the short interval, which validates the scanner/ledger path but does **not** validate edge.

## Next evidence gates

1. Run longer scheduled snapshots around active 5-minute window boundaries.
2. Add replay logic that only counts a hypothetical fill if visible orderbook/trade data supports it after queue/latency assumptions.
3. Add stale-price persistence fields for PM-E04: first-seen quote, subsequent quote drift, and time-to-efficient-spread.
4. Add PM-E06 timestamp-quality check: API observed time, market end time, quote time, and resolution time.
5. Summarize candidate decay/outcomes before any paper-monitor discussion.

## Verdict

The first repeated scanner run passed as **evidence collection infrastructure**. It remains watch-only/research-only until replay/fill/outcome evidence exists.
