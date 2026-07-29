---
title: QTF-018 Prediction Market Edge Intake
created: 2026-07-10
updated: 2026-07-10
type: quant-strategy-spec
status: draft
spec_id: QTF-018
tags: [quant, prediction-markets, polymarket, edge-intake, paper-trading, qtf-017]
sources:
  - [[Queued YouTube Capture Batch - 2026-07-09]]
  - [[QTF-017 Strategy Verification Gauntlet]]
  - [[Forven Reddit Source Review - 2026-07-09]]
confidence: medium
---

# QTF-018 Prediction Market Edge Intake

## Purpose

Convert Jayse's Polymarket / prediction-market capture batch into **testable, read-only strategy intake specs** for the AI Quant Trading Floor.

This note is not a profitability claim. It is an intake layer that turns anecdotal video claims and Jayse's hypotheses into detector specs, data requirements, conservative replay assumptions, and [[QTF-017 Strategy Verification Gauntlet]] gates.

## Safety boundary

- Public-data and local historical/replay research only.
- No wallet connection.
- No Polymarket auth.
- No live orders.
- No private keys, browser wallet automation, account funding, or credential storage.
- No “profitable” label until reproducible metrics survive costs, fills, latency, selection-bias, and paper review.
- Any later live scope requires explicit approval for venue, capital, max loss, order types, kill switch, and monitoring.

## Source summary

| Source | Useful signal | Caution |
|---|---|---|
| Cap 1 — AI Automation 30 Day Update | Maker rebates, 5-minute windows, fair-value/orderbook snapshots, fill-event logging, small passive edges | Balance screenshots and anecdotes do not prove edge |
| Cap 3 — Polymarket AI Trading Update | Asymmetric 1c-to-$1 outcome orders, fresh-window orders, cancel-after-120s concept | Very low fill rate, survivorship bias, marketing/treasure-hunt noise |
| Cap 4/5 — Find 100x Polymarket Strategies | Two-sided cheap up/down bids, newly listed future windows, near-open/near-close microstructure anomaly | Requires real orderbook lifecycle data and conservative fill simulation |
| Jayse hypotheses | Event-shock mean reversion and smart-money late-game following | Requires external fair probability model and copy-lag/identity reliability checks |

## Edge candidates

### PM-E01 — Event-shock mean reversion

**Hypothesis:** sudden sports/news events can push market price outside a reasonable fair-probability range; after overreaction, price mean-reverts.

- **Source evidence:** Jayse's explicit hypothesis; overlaps with prediction-bot/fair-value style thinking.
- **Detector sketch:** watch event-timestamped markets; compute pre-event fair probability, post-event market probability, deviation z-score, spread/liquidity filter, and reversion trigger.
- **Required data:** market prices/orderbook snapshots, event timestamps, score/game state or news timestamps, independent fair-probability model, outcomes, liquidity/spread.
- **Paper/replay method:** record snapshots; only allow simulated fills at prices/depth available after the signal timestamp; exit on reversion target, timeout, or adverse fair-value update.
- **Costs/fill model:** maker/taker fee/rebate model, spread crossing penalty, latency delay, minimum depth, partial fill accounting.
- **Failure modes:** market moves for valid information; stale fair model; spoofed/illiquid prices; reversion never arrives; event feed lag.
- **Reject if:** no independent fair model; signal only works on cherry-picked examples; edge disappears after spread/latency; insufficient events.
- **QTF-017 gate:** deterministic spec → public-data recorder → replay backtest → cost stress → paper monitor only if stable.

### PM-E02 — Smart-money late-game following

**Hypothesis:** wallets/traders with persistent P/L or accuracy may signal high-probability late-game markets; copying with lag may capture small consistent wins.

- **Source evidence:** Jayse's explicit hypothesis, especially late tennis/high-probability outcomes.
- **Detector sketch:** identify candidate trader addresses/accounts, compute historical accuracy/PnL by market type, detect fresh late-stage positions, apply lag/liquidity filter, paper-follow only when price still offers positive expected value.
- **Required data:** trader activity if public, market time-left/state, position changes, market prices, settlement outcomes, liquidity and spread.
- **Paper/replay method:** simulate copy after realistic detection lag; record missed fills and worse prices; compare to naive late-favorite baseline.
- **Costs/fill model:** include copy latency, spread, orderbook depth, adverse selection, and low-edge compounding risk.
- **Failure modes:** trader identity changes, public leaderboards are gamed, copied trades arrive too late, negative convexity from rare upsets.
- **Reject if:** copied edge is not better than naive baseline after lag/costs; identity reliability is weak; drawdown from rare losses dominates.
- **QTF-017 gate:** source reliability → deterministic spec → benchmark comparison → Monte Carlo rare-loss stress → paper-only review.

### PM-E03 — Two-sided cheap binary-window maker bids

**Hypothesis:** in binary up/down micro-windows, if both legs fill at 1–2c, one side resolves to $1, creating large asymmetric payout relative to combined cost.

- **Source evidence:** Cap 4/5 examples of both up and down legs filled cheaply around 5-minute BTC windows.
- **Detector sketch:** find binary pairs where both outcomes can be bid at extreme low prices, post passive bids below a max combined cost in replay, cancel quickly if not filled.
- **Required data:** paired market IDs, orderbook snapshots at high frequency, market open/close/reset timestamps, fill events if public or conservative simulated fills, settlement outcomes.
- **Paper/replay method:** strict queue-aware replay; fill only when trade-through or visible depth supports it; require both-leg accounting and mark single-leg partial outcomes separately.
- **Costs/fill model:** maker rebate, queue position, latency, cancel reliability, partial fill risk, adverse selection near resolution.
- **Failure modes:** both sides cannot realistically fill; one leg fills because it is adverse-selected; lifecycle behavior changes; paper replay overfills.
- **Reject if:** paired fills depend on impossible queue assumptions; single-leg losses dominate; opportunity count too low.
- **QTF-017 gate:** orderbook recorder first → conservative replay → parameter jitter on bid cents/cancel time → paper monitor gate only after many windows.

### PM-E04 — Fresh-window / newly listed future-window stale pricing

**Hypothesis:** newly listed future windows up to ~24h ahead may briefly contain stale or underpriced orders before efficient quoting arrives.

- **Source evidence:** Cap 3 and Cap 4/5 mention placing orders 24h ahead, targeting fresh windows, cancel after 120 seconds.
- **Detector sketch:** poll public markets for newly listed BTC/ETH/sports windows; record first-seen orderbook; score stale/empty/bad quotes versus fair-probability baseline; simulate passive orders with short TTL.
- **Required data:** first-seen timestamps, market lifecycle metadata, orderbook snapshots from listing onward, fair model, resolution outcomes.
- **Paper/replay method:** only simulate orders after the scanner could have observed the market; enforce cancel TTL and missed-opportunity accounting.
- **Costs/fill model:** conservative non-fill default, latency to discovery, queue ahead, order cancellation delay.
- **Failure modes:** API listing timestamps differ from tradable timestamps; fresh markets have no fillable liquidity; model fair value is wrong.
- **Reject if:** scanner cannot reliably identify first listing; fills are unobservable/unrealistic; expected value is negative after low fill rate.
- **QTF-017 gate:** public-data scanner → evidence ledger → blocked_data if lifecycle timestamps unavailable.

### PM-E05 — Maker rebate / passive market-making micro-edge

**Hypothesis:** maker rebates plus small passive spreads may create repeatable small edges in active prediction markets.

- **Source evidence:** Cap 1 maker setup and maker rebate framing; related to existing market-making gate patterns.
- **Detector sketch:** monitor active high-liquidity markets; estimate fair mid/price bands; place simulated passive bids/asks only when spread/rebate exceeds adverse-selection threshold.
- **Required data:** fee/rebate schedule, L2 orderbook, trades/fills, market volatility, settlement/outcome data, fair model.
- **Paper/replay method:** queue-aware passive fill replay with adverse move measurement; compare to doing nothing and naive midpoint quoting.
- **Costs/fill model:** maker rebates, taker unwind costs, queue notional ahead, inventory risk, stale quote cancellation.
- **Failure modes:** rebates insufficient; toxic flow; inventory trapped near resolution; regime/lifecycle changes.
- **Reject if:** high win rate still negative expectancy; adverse selection exceeds rebates/spread; no reliable fill data.
- **QTF-017 gate:** use orderbook-gate style artifacts before any paper monitor.

### PM-E06 — Near-close/open resolution/reset anomaly

**Hypothesis:** market lifecycle transitions around close/open/reset can create temporary mispricing or post-close winner-side opportunities.

- **Source evidence:** Cap 4/5 asks how both sides filled around 1 second after window opened/ended and mentions post-close winner-side snipe.
- **Detector sketch:** record last N seconds before close and first N seconds after open/reset; compare orderbook/trades to final resolution; flag impossible/late quotes.
- **Required data:** precise lifecycle timestamps, orderbook/trade snapshots at sub-minute cadence, settlement timestamps, API clock skew estimate.
- **Paper/replay method:** conservative: no fill after known resolution; enforce timestamp uncertainty buffer; mark opportunities as invalid if data cannot prove tradability.
- **Costs/fill model:** timestamp skew, API latency, queue priority, cancellation delay, dispute/resolution risk.
- **Failure modes:** apparent anomaly is only delayed data; trades after resolution are non-replicable; exchange rules/API change.
- **Reject if:** replay cannot prove quote existed and was tradable before public resolution; edge is one-off.
- **QTF-017 gate:** blocked_data unless timestamp quality is strong.

## Recommended first build slice

Build a **read-only public-data recorder/scanner**, not a trader.

1. Discover Polymarket BTC/ETH and selected sports/event micro-markets.
2. Record market metadata, lifecycle timestamps, orderbook snapshots, spread/depth, and first-seen time.
3. Emit JSONL candidate rows for PM-E01 to PM-E06 detectors.
4. Keep a conservative simulated-fill ledger with `no_fill` as the default outcome unless evidence supports a fill.
5. Score candidates, but do not place orders or connect credentials.

Suggested artifact paths:

```text
Implementation/ledgers/polymarket_edge_candidates.jsonl
Implementation/ledgers/polymarket_orderbook_snapshots.jsonl
Implementation/reports/polymarket_edge_intake_YYYYMMDDTHHMMSS.json
```

## Minimum schema fields

```json
{
  "candidate_id": "PM-E03-20260710-0001",
  "edge_id": "PM-E03",
  "market_id": "unknown",
  "market_slug": "unknown",
  "first_seen_at": "2026-07-10T00:00:00Z",
  "signal_at": "2026-07-10T00:00:00Z",
  "price_yes": null,
  "price_no": null,
  "spread": null,
  "depth_usd": null,
  "fair_probability": null,
  "detector_reason": "two-sided cheap maker bid candidate",
  "simulated_action": "watch_only",
  "fill_model": "conservative_queue_aware",
  "status": "candidate_watch_only",
  "rejection_reason": null
}
```

## Cautions to carry forward

- Viral 50x/100x screenshots are not evidence of positive expectancy.
- The key unknown is fill probability after queue, latency, cancellation, spread, and adverse selection.
- Low cost per attempt does not imply low portfolio risk if attempts are numerous or correlated.
- Prediction-market settlement/dispute/legal/geo/access constraints can dominate expected value.
- Paper/live fill mismatch is especially dangerous for passive orders in thin markets.

## Initial verdict

QTF-018 should move forward as a **prediction-market edge intake and recorder spec**. The best next action is to extend the existing read-only Chronos/Polymarket recorder into a candidate-ledger scanner for PM-E03/PM-E04/PM-E06 first, while PM-E01/PM-E02 wait for better event-state and trader-identity data.
