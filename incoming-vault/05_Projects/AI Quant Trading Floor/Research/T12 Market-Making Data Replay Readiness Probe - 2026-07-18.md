---
title: T12 Market-Making Data/Replay Readiness Probe
created: 2026-07-18
updated: 2026-07-18
type: concept
status: verified-complete
confidence: high
tags: [quant, t12, market-making, data-readiness, paper-only]
sources: [05_Projects/AI Quant Trading Floor/Implementation/t12_market_maker_readiness_probe.py]
---
# T12 Market-Making Data/Replay Readiness Probe

> **Task:** T12 — Verify forced-flow and market-making data/replay readiness, or document the exact block.
> **Status:** `verified-complete` — both forced-flow and market-making blocks documented.
> **Decision:** `blocked` for both sleeves.

## Scope

Tests whether public Bybit REST endpoints can support the two market-making evidence requirements from the Edge-First Mandate:
1. **Fill-conditioned adverse-selection analysis**
2. **Inventory-economics analysis**

## Data sources probed

| Endpoint | URL | Result |
|---|---|---|
| Kline (spot) | `/v5/market/kline` | ✅ 5 rows, array format `[ts,open,high,low,close,volume,turnover]` |
| Kline (linear) | `/v5/market/kline` | ✅ 5 rows, array format |
| Orderbook L2 (spot) | `/v5/market/orderbook` | ✅ 10 asks + 10 bids, array format `[[price,qty],...]` |
| Recent trades (spot) | `/v5/market/recent-trade` | ✅ 5 rows with `execId, price, size, side, time, seq` |

## Adverse-selection feasibility

All three symbols (BTCUSDT, ETHUSDT, SOLUSDT):
- **Fill price proxy:** Available (recent-trade `price` field + `side` = Buy/Sell)
- **Subsequent movement data:** Available (klines provide high/low/close)
- **Order-book depth:** Available (L2 snapshot with price/qty arrays)
- **Trade direction:** Available (`side` field)
- **Feasible:** ❌ **NO** — critical gaps remain

### Blocking factors
1. **Missing fill conditioning:** Recent-trade price gives the executed trade price, not the exact limit-order fill level. Adverse-selection requires knowing whether the fill was at bid, ask, or mid.
2. **Missing inventory tracking:** No historical order-placement/removal data from public API — cannot reconstruct inventory buildup from submitted but unfilled resting orders.
3. **Missing latency data:** REST polling introduces unknown latency between OB snapshot and fill; adverse-selection measurement requires sub-second timing.

## Inventory-economics feasibility

All three symbols:
- **Order-book evolution:** ❌ **NOT available** — the orderbook endpoint returns a single point-in-time snapshot, not a time series.
- **Fill execution data:** ✅ Available (recent-trade endpoint)
- **Price impact measurement:** ✅ Available (klines provide post-fill prices)
- **Feasible:** ❌ **NO** — blocking factor is fundamental

### Blocking factor
Historical L2 order-book snapshots at sufficient frequency are not available from Bybit public REST API. Without historical book evolution, we cannot track how resting inventory accumulates and decays.

**Required data:** Time-series of L2 order-book states (at least every few seconds) with price, quantity, and update timestamps. This is only available via WebSocket replay (requires subscription) or a purchased historical data feed.

**Alternative approach:** Use tick-level trade data as a proxy for inventory changes (assuming trades come from market makers), but this conflates maker/taker flows and cannot distinguish between inventory accumulation and simple price discovery.

## Conclusion

**Decision: `blocked`** — Neither adverse-selection nor inventory-economics can be supported by public Bybit REST data alone.

The market-making sleeve (QTF-V08) requires:
1. Historical L2 order-book snapshots (WebSocket replay service or purchased data feed)
2. Sub-second timing precision for fill conditioning
3. Order-placement/removal history for inventory tracking

Until one of these data sources is obtained, the market-making sleeve remains **blocked**.

## Related

- [[QTF Edge-First Production Mandate]] — Market-making requires fill-conditioned adverse-selection and inventory-economics evidence
- [[2026-07-14 Forced-Flow Liquidation Continuation-Reversion Edge Card]] — Forced-flow block documented
- `Implementation/forced_flow/feed_capability_probe.py` — Forced-flow liquidation-history API rejection
- `Implementation/moondev_market_maker_lab.py` — Candle-proxy market-maker lab (already rejected: Sharpe -23.9 to -32.1)
- `Implementation/reports/t12_market_maker_readiness.json` — Machine output artifact
