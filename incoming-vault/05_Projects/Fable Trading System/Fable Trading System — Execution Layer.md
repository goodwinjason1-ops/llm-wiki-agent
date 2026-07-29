---
title: Fable Trading System — Execution Layer
created: 2026-07-18
updated: 2026-07-18
type: project-hub
status: scaffold
tags: [trading, fable-plan, execution, risk, order-gateway, kill-switch]
---

# Fable Trading System — Execution Layer

## What this is
The Fable Trading System's **execution infrastructure** — the operational backbone that turns the 23-edge playbook into actual paper/live trading. This is the system Jayse created with Fable.

## Master plan
- **Playbook:** `C:/Users/Kidsg/Claude_Trade/TRADING_EDGES_AND_CAPITAL_ALLOCATION.md` (23 edges, capital stack, risk mandates)
- **Infrastructure:** `C:/Users/Kidsg/Claude_Trade/INFRASTRUCTURE_AND_SETUP.md` (3-tier build order)

## Execution components

### 1. Order Gateway (`fable_order_gateway.py`)
- Paper/sandbox order placement with full Fable strategy tagging
- Position tracking and trade journal
- Kill-switch flatten capability
- Risk-budgeted sizing per Fable §8.3
- `PAPER_MODE` flag — swap to `False` only after explicit Jayse approval

### 2. Risk Monitor (`fable_risk_monitor.py`)
- Fable §8.2 drawdown ladder (8% → 12% → 18% → 25% → 35%)
- Portfolio-level vol targeting (16–20% annualized)
- Net delta caps (crypto ≤20%, equity ≤35%)
- Correlation stress test (crypto bucket at 0.9 internal correlation)
- Counterparty limits (≤25% per exchange)
- **LTF discipline** (max 3 concurrent scalps, 75bps daily loss limit, macro event blackout)
- Kill-switch health monitoring

### 3. Kill Switch (independent process)
- Separate tiny process watching heartbeats + NAV
- On breach: cancels all orders and flattens via reduce-only

### 4. LTF Strategy Registry (`fable_order_gateway.py`)
All 5 Fable LTF strategies mapped with order/sizing rules:

| Strategy | Name | Automation | Status |
|---|---|---|---|
| C-LTF-1 | Liquidation cascade fade | Semi-auto | Proxy recorder active |
| C-LTF-2 | Funding-timestamp positioning | Auto | Funding board active |
| C-LTF-3 | Stop-run / liquidity-sweep reversal | Semi-auto | Not implemented |
| C-LTF-4 | Cross-venue perp dislocation | Full-auto (bot-only) | Not implemented |
| C-LTF-5 | New listing / delisting flow | Semi-auto | Not implemented |

**LTF discipline rules enforced by risk monitor:**
- Max 3 concurrent scalps
- 75bps daily loss limit → flat for the day
- No LTF trades during first 15 min after tier-1 macro prints (CPI, FOMC)
- No shared code with strategy host
- Test monthly by actually killing the main host

## Build order (per INFRASTRUCTURE doc §8)

1. ~~Order gateway + LTF registry~~ — ✅ COMPLETE (all 5 LTF strategies mapped)
2. ~~Data recorders~~ — PENDING (websocket capture → parquet)
3. ~~IBKR paper account + ccxt testnet~~ — PENDING
4. ~~Kill-switch node~~ — PARTIAL (scaffolded in gateway)
5. ~~Trade journal schema + Grafana~~ — PARTIAL (journal exists, Grafana PENDING)
6. ~~Backtest harness (nautilus_trader)~~ — PENDING
7. ~~Paper-trade sleeves in order~~ — C-HTF-1 → E-HTF-6 → C-HTF-5 → equity HTF → LTF last
8. ~~API-key hygiene~~ — PENDING (no keys in repo)

## Current status
- **Order gateway:** ✅ Scaffolded, paper-mode tested
- **Risk monitor:** ✅ Scaffolded, drawdown ladder tested
- **Kill-switch:** ✅ Pattern documented, needs independent process
- **Build order:** ✅ Tier 3 (paper) — Docker Compose stack running on laptop
- **Data recorders:** ✅ Running — Hyperliquid prices/funding + Binance force orders
- **Paper sleeve runner:** ✅ Running — executing paper trades per Fable strategy registry
- **Live execution:** 🔒 Not enabled — `PAPER_MODE=True`

## Relationship to AI Quant Floor
- Fable = master framework (defines edges, risk rules, capital allocation)
- AI Quant Floor = research/execution layer (implements specific edges, runs paper tests)
- Fable execution layer = the operational backbone that the QTF strategies plug into
- QTF-011, QTF-015, and other edge cards become orders through this gateway
