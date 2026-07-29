---
title: Fable Trading System — Project Context
created: 2026-07-18
type: project-context
status: active
tags: [trading, quant, multi-asset, fable-plan, risk-management]
---

# Fable Trading System — Project Context

## What it is
The Fable Trading System is Jayse's **multi-asset trading framework** — a 23-edge plan spanning crypto, equities, and cross-asset strategies. It serves as the **master risk framework** that other trading sleeves (like Engo Crypto) feed into.

## Location
- **Master plan:** `C:/Users/Kidsg/Claude_Trade/TRADING_EDGES_AND_CAPITAL_ALLOCATION.md`
- **Side-by-side comparison:** `C:/Users/Kidsg/AppData/Local/hermes/side_by_side_comparison/`
- **Engo crypto sub-sleeve:** `C:/Users/Kidsg/AppData/Local/hermes/engo_crypto_research/`

## Structure
- **23 edges** total: 11 crypto, 9 equity, 3 cross-asset
- **Capital allocation rules** with risk-weighted positioning
- **Maturity levels:** C-LTF (short-term) and C-HTF (long-term) categories
- **Promotion gates:** evidence-gated progression from research → paper → guardrailed live

## Relationship to AI Quant Floor
- Fable is the **master framework** — defines edges, risk rules, capital allocation
- AI Quant Floor is the **execution/research layer** — implements specific edges, runs paper tests, collects evidence
- Engo Crypto is a **crypto-only sub-sleeve** within Fable's categories
- They run **completely isolated** — Engo feeds signals into Quant Floor; Quant Floor feeds evidence into Fable's promotion gates

## Current status
- **Execution layer** — order gateway + risk monitor + kill-switch + LTF registry scaffolded and tested (paper mode)
- **Docker Compose stack** — TimescaleDB, Redis, Prometheus, Grafana deployed on laptop (Tier 3)
- **Data recorders** — running, fetching Hyperliquid prices/funding + Binance force orders
- **Paper sleeve runner** — executing paper trades per Fable strategy registry
- **Evidence-gated** — each edge requires backtest results, sample sufficiency, and explicit approval before promotion
- **Paper trading** — LIVE on laptop (Tier 3), no live capital, no broker auth

## Execution layer files
- `fable_order_gateway.py` — paper order placement, position tracking, trade journal, kill-switch flatten, **LTF strategy registry (all 5 strategies)**
- `fable_risk_monitor.py` — drawdown ladder, vol targeting, correlation stress, counterparty limits, **LTF discipline rules**
- `05_Projects/Fable Trading System/Fable Trading System — Execution Layer.md` — project hub documenting build order and status

## Key files
- `05_Projects/AI Quant Trading Floor/Strategies/QTF-011 Political Disclosure Copy Trading Delay Edge.md`
- `05_Projects/AI Quant Trading Floor/Implementation/morning_quant_brief.py`
- `05_Projects/AI Quant Trading Floor/Implementation/qtf_v02_funding_forward_test.py`
- `05_Projects/AI Quant Trading Floor/Dashboards/AI Quant Trading Floor Dashboard.md`
