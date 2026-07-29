---
title: QTF-022 Supply-Side Economics Dashboard
created: 2026-07-10
updated: 2026-07-10
type: dashboard
status: active
risk_mode: research-only
tags: [qtf, dashboard, polymarket, market-making, supply-side]
---

# QTF-022 Supply-Side Economics Dashboard

## Current decision

> **Research-only — promotion blocked.** The scanner sees theoretical resting-maker quote edges, but no trade-confirmed fills or attributable rewards.

## Static parity sample

**Run:** `2026-07-10-first-slice`

| Metric | Result |
|---|---:|
| Snapshot rows | 110 |
| Scannable binary books | 50 |
| Rows skipped | 60 |
| Minimum YES/NO ask sum | 1.01 |
| Maximum YES/NO bid sum | 0.99 |
| Buy-both candidates after costs | 0 |
| Theoretical resting-maker split-sell pairs | 50 |
| Taker fee rate | 0.07 |
| Slippage assumption per leg | 0.002 |

### Modeling correction

A maker split-sell strategy rests asks at or near the existing asks. Selling immediately into bids is a taker path. The 50 quote pairs are hypotheses with queue and legging risk—not executable arbitrage evidence.

## Immediate sequential L2 capture

**Run:** `2026-07-10-sequential-l2-slice`

| Metric | Result |
|---|---:|
| Market | BTC Up/Down, July 10 5:15–5:20 PM ET |
| Snapshot rows | 20 |
| Successful token books | 40 |
| Capture span | 49.004 seconds |
| Book errors | 0 |
| Up bid / ask | 0.50 / 0.51, unchanged |
| Down bid / ask | 0.49 / 0.50, unchanged |
| Initial gross maker quote edge | 0.01 per pair |
| Queue ahead — Up ask | 397.53 shares |
| Queue ahead — Down ask | 224.91 shares |
| Crossed-quote fill signals | 0 |
| +1s/+5s/+30s markouts | unavailable — no fill signal |
| Residual flatten | not triggered |
| Maker reward attribution | not observed |
| Modeled P&L | 0.0 — no fill signal |

The market was still around eight hours before its five-minute window, so this validates the collection/replay pipeline but does not test active-window adverse selection.

## Scheduled active-window capture

- **Market:** `2864090`
- **Window:** July 10, 5:15–5:20 PM ET
- **Collector start:** `2026-07-10T21:14:00Z`
- **Cron job:** `b2e9453f3d1a`
- **Samples:** 100
- **Target interval:** 0.5 seconds plus public API latency
- **Delivery:** automatic result to the originating Telegram chat

The scheduled job uses public CLOB data only and runs the sequential replay automatically.

## Evidence

```text
Implementation/supply_side_lab/runs/2026-07-10-first-slice/
Implementation/supply_side_lab/runs/2026-07-10-sequential-l2-slice/
Implementation/polymarket_l2_collector.py
Implementation/polymarket_supply_side_lab.py
```

## Verification

- Focused QTF-022 and collector tests: `9 passed`
- Adjacent Polymarket suite: `25 passed in 0.40s`

## Six-point evidence coverage

- [x] Determine which maker quote gets crossed first.
- [x] Record displayed queue notional ahead.
- [x] Determine whether the second quote is crossed.
- [x] Calculate seller adverse markout at +1s/+5s/+30s when triggered.
- [x] Model residual-leg taker flattening with slippage and fee.
- [x] Keep maker rewards separately attributed as `not-observed` rather than inventing income.
- [ ] Upgrade crossed-quote signals with public trade-tape or stronger queue-depletion evidence.
- [ ] Accumulate enough active-window runs for economic interpretation.

## Guardrails

- no wallet;
- no authentication;
- no orders;
- no live execution;
- public/read-only data only.
