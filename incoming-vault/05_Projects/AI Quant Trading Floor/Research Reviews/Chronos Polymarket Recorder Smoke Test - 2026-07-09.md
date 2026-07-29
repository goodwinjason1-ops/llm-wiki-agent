---
title: Chronos Polymarket Recorder Smoke Test - 2026-07-09
created: 2026-07-09
updated: 2026-07-09
type: evidence
status: complete
sources:
  - [[Claude Chronos Polymarket Scalping Bot - Capture 2026-07-09]]
  - [[QTF-Candidate Chronos Polymarket Directional Edge]]
tags: [quant, polymarket, chronos, kronos, bybit, recorder, paper-only, read-only]
confidence: high
---

# Chronos Polymarket Recorder Smoke Test - 2026-07-09

## Purpose

Start the first read-only/public-data module for [[QTF-Candidate Chronos Polymarket Directional Edge]]. This recorder creates the evidence base needed before any Chronos/Kronos forecasting, Kelly sizing, paper trades, or strategy claims.

## Safety boundary

- Public data only.
- No Polymarket wallet connection.
- No Bybit/exchange auth.
- No API keys.
- No order placement/cancellation.
- No live trading.
- No Martingale promotion.

## Read-only recorder patterns inspected

| Existing Quant Floor pattern | Reused lesson |
|---|---|
| `alt_paper_ops.py` | JSONL paper ledgers, deterministic records, conservative no-fabricated-outcomes rule. |
| `alt_research_lab.py` | Public Polymarket Gamma/CLOB discovery and public venue-data request helpers. |
| `moondev_orderbook_gate.py` | Bybit public endpoint style, append-only data cache, smoke-test vs promotion separation. |
| `venue_metrics_watchlist.py` | Explicit `public/read-only; no wallets, no keys, no deposits, no orders` safety field in outputs. |

## Artifact created

| Artifact | Path |
|---|---|
| Recorder module | `05_Projects/AI Quant Trading Floor/Implementation/chronos_polymarket_recorder.py` |
| Snapshot ledger | `05_Projects/AI Quant Trading Floor/Implementation/data_cache/chronos_polymarket_snapshots.jsonl` |
| Smoke JSON report | `05_Projects/AI Quant Trading Floor/Implementation/reports/chronos_polymarket_recorder_20260709T071014+0000.json` |
| Experiment ledger | `05_Projects/AI Quant Trading Floor/Implementation/ledgers/experiments.jsonl` |

## What the recorder does

```text
Polymarket public Gamma/search discovery
→ strict BTC/ETH “Up or Down” market filter
→ optional public CLOB spread/book snapshot where token IDs exist
→ Bybit public BTCUSDT/ETHUSDT 1m/5m/15m klines
→ append JSONL snapshot + report JSON
```

It does **not** forecast, generate signals, size positions, connect accounts, or execute trades.

## Verified commands

From:

```text
C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation
```

Compile + ledger smoke:

```bash
python3 -m py_compile chronos_polymarket_recorder.py && python3 chronos_polymarket_recorder.py --once --max-markets 10 --bybit-limit 3
```

Output summary:

```json
{
  "bybit_candle_count": 18,
  "errors": [],
  "latest_bybit_close": {
    "BTCUSDT": {"1": 62836.8, "5": 62836.8, "15": 62836.8},
    "ETHUSDT": {"1": 1751.53, "5": 1751.53, "15": 1751.51}
  },
  "polymarket_market_count": 0,
  "report": "C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation/reports/chronos_polymarket_recorder_20260709T071014+0000.json",
  "snapshot_ledger": "C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation/data_cache/chronos_polymarket_snapshots.jsonl",
  "safety": "read-only public-data snapshot; no auth, wallets, orders, or live trading"
}
```

Second report-only smoke:

```bash
date -u +%Y-%m-%dT%H:%M:%SZ && python3 chronos_polymarket_recorder.py --once --max-markets 10 --bybit-limit 3 --no-ledger
```

Output summary at `2026-07-09T07:10:42Z`:

```json
{
  "bybit_candle_count": 18,
  "errors": [],
  "latest_bybit_close": {
    "BTCUSDT": {"1": 62835.9, "5": 62835.9, "15": 62836.3},
    "ETHUSDT": {"1": 1751.97, "5": 1751.98, "15": 1751.98}
  },
  "polymarket_market_count": 0,
  "snapshot_ledger": null,
  "safety": "read-only public-data snapshot; no auth, wallets, orders, or live trading"
}
```

## Interpretation

- The module compiled successfully.
- Bybit public candle collection worked for BTCUSDT and ETHUSDT across 1m, 5m, and 15m intervals.
- The Polymarket short-window up/down discovery returned **0 currently active BTC/ETH up/down markets** during this smoke test. This is acceptable for a recorder smoke test: the code path stays ready, and later scheduled/manual runs can capture markets when they are active.
- This is not strategy evidence yet. It only proves the read-only data capture path works.

## Next gates

1. Run the recorder over multiple windows to catch active Polymarket up/down markets.
2. Add outcome-alignment logic only after enough snapshots exist.
3. Build naive baselines first: random/no-edge, last-candle momentum, mean reversion, and market-implied odds.
4. Add Chronos/Kronos forecasts only after baselines and ledgers are stable.
5. Reject any variant that needs Martingale to look attractive.

## Related

- [[QTF-Candidate Chronos Polymarket Directional Edge]]
- [[Claude Chronos Polymarket Scalping Bot - Capture 2026-07-09]]
- [[Alternative Paper Ops Lab 04 - Signal Ledger Frontier MC Protocol Reviews]]
- [[Alternative Paper Ops Lab 05 - Intraday Outcome Resolver and Obsidian Dashboard]]
