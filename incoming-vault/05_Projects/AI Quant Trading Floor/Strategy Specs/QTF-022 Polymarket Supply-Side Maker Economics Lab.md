---
title: QTF-022 Polymarket Supply-Side Maker Economics Lab
created: 2026-07-10
updated: 2026-07-10
type: strategy-ops-spec
status: first-slice-implemented
risk_mode: research-only
venue: Polymarket
source: [[Polymarket Whale Supply-Side Economics - Quant Review - 2026-07-10]]
tags: [qtf, polymarket, market-making, split-merge, maker-rebates, adverse-selection]
---

# QTF-022 Polymarket Supply-Side Maker Economics Lab

## Purpose

Test whether Polymarket supply-side economics — parity, split/merge, spread capture and maker incentives — survive hostile execution assumptions.

This lab does not place orders, connect wallets, authenticate, or claim that whale P&L is reproducible.

## Core hypotheses

### QTF-022-H1 — Buy-both/merge parity

A theoretical candidate exists when:

```text
YES best ask + NO best ask + taker fees + slippage < $1
```

It remains unproven until both legs can be filled at the modeled sizes and prices.

### QTF-022-H2 — Split-sell maker-quote parity

A theoretical maker candidate exists when resting both outcome asks would receive more than the $1 pair cost:

```text
YES resting ask + NO resting ask > $1
```

Selling immediately into existing bids is a taker path, not a maker path. The two resting maker asks need not fill together, and displayed queue ahead must be modeled.

### QTF-022-H3 — Maker reward dependence

Maker rebates/liquidity rewards may improve economics but must be attributed separately from spread, resolution and inventory P&L.

## First implementation slice

Implementation:

```text
Implementation/polymarket_supply_side_lab.py
Implementation/test_polymarket_supply_side_lab.py
```

Implemented:

1. current documented crypto taker-fee formula;
2. binary parity scanner;
3. cost-aware buy-both candidate gate;
4. split-sell theoretical candidate gate;
5. hostile residual-leg flatten replay;
6. research-only evidence writer and decision artifact.

## First real run

Input:

```text
Implementation/ledgers/polymarket_orderbook_snapshots.jsonl
```

Output:

```text
Implementation/supply_side_lab/runs/2026-07-10-first-slice/
```

Result:

| Metric | Value |
|---|---:|
| Snapshot rows | 110 |
| Binary rows scanned | 50 |
| Rows skipped | 60 |
| Minimum observed ask sum | 1.01 |
| Maximum observed bid sum | 0.99 |
| Cost-positive buy-both candidates | 0 |
| Theoretical resting-maker split-sell quote pairs | 50 |
| Taker fee rate | 0.07 |
| Slippage per leg | 0.002 |

Decision: **promotion blocked / insufficient fill evidence**.

The first sample shows a clean one-cent order-book boundary around parity before fees and slippage: asks were no lower than 1.01 and bids no higher than 0.99. Correctly modeled at the resting asks, all 50 scannable books produced a theoretical one-cent-or-more maker quote pair. Those are quote hypotheses, not fills; asynchronous execution and queue risk remain entirely unproven.

## Sequential public L2 slice

Collector:

```text
Implementation/polymarket_l2_collector.py
Implementation/test_polymarket_l2_collector.py
```

Immediate public capture:

```text
Implementation/supply_side_lab/runs/2026-07-10-sequential-l2-slice/
```

| Metric | Result |
|---|---:|
| Market | BTC Up/Down, July 10 5:15–5:20 PM ET |
| Snapshot rows | 20 |
| Token books | 40 |
| Capture span | 49.004 seconds |
| Book errors | 0 |
| Initial maker quotes | Up 0.51 / Down 0.50 |
| Gross quote-pair edge | 0.01 |
| Queue ahead at asks | Up 397.53 / Down 224.91 shares |
| Crossed-quote fill signals | 0 |
| Modeled P&L | 0.0 — no fill signal |
| Reward attribution | not observed |

This market was roughly eight hours before its five-minute resolution window and remained static throughout the capture. The pipeline is validated, but this capture cannot answer active-window adverse selection.

A one-shot active-window public capture is scheduled for `2026-07-10T21:14:00Z`, one minute before the market window, under cron job `b2e9453f3d1a`. It will capture 100 sequential samples, run the hostile replay, save artifacts, and deliver the result automatically.

## Verification

Focused QTF-022 + collector:

```text
9 passed
```

Adjacent Polymarket suite:

```text
25 passed in 0.40s
```

## Next implementation slices

- [x] Parity scanner and hostile one-leg replay contract.
- [x] Sequential L2 snapshot collector.
- [x] Queue-notional-ahead estimator from displayed best-ask size.
- [x] Crossed-quote first-leg/second-leg replay across subsequent snapshots.
- [x] Adverse-selection markout fields at +1s/+5s/+30s when a fill signal occurs.
- [ ] Add public trade-tape/queue-depletion evidence so crossed quotes can be upgraded beyond an unconfirmed fill signal.
- [ ] Split/merge inventory ledger.
- [ ] Maker rebate and liquidity-reward attribution.
- [ ] Capital/uptime/scale viability curve.

## Promotion gate

No paper-monitor promotion unless a meaningful sample demonstrates:

- positive P&L after fees/slippage/flattening;
- positive fill-conditioned expectancy;
- controlled residual inventory;
- stable behavior across markets/regimes;
- reward dependence disclosed separately;
- no assumed simultaneous fills.

## Hard guardrails

- no wallet;
- no keys/auth;
- no orders;
- no exchange connector;
- no claim of profitability;
- public/read-only data only.
