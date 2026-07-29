---
title: QTF-019 Hyperliquid Agentic Heartbeat Ops Spec
created: 2026-07-10
updated: 2026-07-10
type: quant-strategy-spec
status: draft
spec_id: QTF-019
tags: [quant, hyperliquid, agentic-trading, heartbeat, read-only, paper-trading, qtf-017]
sources:
  - [[Queued YouTube Capture Batch - 2026-07-09]]
  - [[QTF-013 Hyperliquid Lighter Farming and Perp Venue Watchlist]]
  - [[QTF-017 Strategy Verification Gauntlet]]
confidence: medium
---

# QTF-019 Hyperliquid Agentic Heartbeat Ops Spec

## Purpose

Convert Caps 7 and 10 from the queued YouTube batch into a **safe Hyperliquid operations spec** for Jayse's AI Quant Trading Floor.

This is not a live trading setup. The immediate implementation should be a read-only / public-data heartbeat that gathers market and paper-position state, summarizes it cheaply, and only promotes decisions through saved evidence gates.

## Safety boundary

- Start read-only and public-data only.
- No Hyperliquid private API keys.
- No exchange account control from Ari.
- No deposits, orders, leverage changes, vault actions, bridging, or wallet signing.
- Any future paper/live execution requires an explicit separate scope: venue, account, capital, max loss, order types, kill switch, and monitoring.

## Source extraction

### Cap 7 — Agentic AI Trading Heartbeat

Source claims / observed workflow:

- Agentic trading needs a **heartbeat** loop when monitoring live/paper positions.
- Smaller/faster sub-agents can process structured data from a feed and send a compact state summary to a main model.
- Example cadence mentioned: around **30 seconds**.
- Inputs can include websocket or position data, current price, goal, margin, loss tolerance, signal strength, and risk targets.
- The main model can be asked to reason over the heartbeat and propose actions.

Quant Floor interpretation:

- Useful architecture pattern: split data collection and decision-review.
- Unsafe part: letting a model directly control leveraged positions.
- Safe first version: sub-agent/script heartbeat produces state summaries and **paper recommendations only**.

### Cap 10 — Hyperliquid trading pod setup

Source claims / observed workflow:

- Build isolated “trading pods” per asset/strategy.
- Start with an asset, e.g. BTC on Hyperliquid.
- Ask Codex for 3 candidate strategies, then specify best-practice backtesting for each.
- Collect historical data; Hyperliquid has public historical/data endpoints but some data may need custom collection.
- Evaluate Sharpe / risk-adjusted performance and iterate.

Quant Floor interpretation:

- Good fit for Jayse's existing staged Quant Floor: source idea → deterministic spec → backtest/replay → paper monitor → review board.
- Must be routed through [[QTF-017 Strategy Verification Gauntlet]], not direct API trading.

## Proposed architecture

```text
Hyperliquid public endpoints
        ↓
read-only data collector
        ↓
heartbeat state summarizer
        ↓
paper pod ledger + risk snapshot
        ↓
review/veto layer
        ↓
QTF-017 gauntlet / paper-review decision
```

## Heartbeat state schema

```json
{
  "ts": "2026-07-10T00:00:00Z",
  "venue": "hyperliquid",
  "asset": "BTC",
  "mid_price": null,
  "funding_rate": null,
  "open_interest_usd": null,
  "volume_24h_usd": null,
  "spread_proxy": null,
  "volatility_proxy": null,
  "paper_position": {
    "side": "flat",
    "notional_usd": 0,
    "entry_price": null,
    "unrealized_pnl_usd": 0,
    "max_loss_usd": 0
  },
  "strategy_pod": "watch_only",
  "risk_state": "no_position",
  "recommended_action": "observe_only",
  "reason": "public-data heartbeat snapshot"
}
```

## Candidate pod families for later specs

| Pod | Hypothesis | First data requirement | Status |
|---|---|---|---|
| HL-P01 Funding persistence/fade | Funding extremes may persist or mean-revert | Hourly funding snapshots, price returns, OI | data collection already started |
| HL-P02 Momentum with funding filter | Momentum works better when funding/OI confirms | Candles, funding, OI, volume | spec later |
| HL-P03 Volatility breakout pod | Breakouts after compression may have edge | OHLCV + volatility state | spec later |
| HL-P04 Mean reversion / liquidity sweep | Extreme moves fade when funding/positioning diverges | Intraday candles + OI/funding | spec later |

## Recommended first build

1. Extend the existing `venue_metrics_watchlist.py` / Hyperliquid recorder into a **heartbeat snapshot** output.
2. Keep it script-only/no-agent where possible.
3. Append rows to:

```text
Implementation/ledgers/hyperliquid_heartbeat_snapshots.jsonl
```

4. Use the heartbeat for **paper-state summaries only**.
5. Do not add private-key/API-key execution adapters.

## Promotion gates

A Hyperliquid pod cannot leave watch-only until it has:

- deterministic spec,
- public historical or collected data,
- fee/slippage assumptions,
- benchmark comparison,
- walk-forward or out-of-sample evidence,
- cost stress,
- parameter jitter,
- drawdown and liquidation-risk checks,
- paper ledger and kill conditions,
- explicit human review.

## Implemented first heartbeat artifact

Created and smoke-tested:

```text
Implementation/hyperliquid_heartbeat.py
Implementation/ledgers/hyperliquid_heartbeat_snapshots.jsonl
```

Verified command:

```bash
python hyperliquid_heartbeat.py
```

Latest verified run recorded public/read-only heartbeat rows for BTC, ETH, SOL, and HYPE with mark/mid price, 24h change, funding, open interest proxy, 24h volume, flat paper-position state, and `observe_only` recommendation. No private endpoints, keys, wallets, orders, or account actions were used.

## Initial verdict

Caps 7 and 10 are useful for **operations architecture**, not direct trading instructions. The first safe implementation slice now exists: a read-only Hyperliquid heartbeat snapshot ledger connected to [[QTF-013 Hyperliquid Lighter Farming and Perp Venue Watchlist]] and [[QTF-017 Strategy Verification Gauntlet]].
