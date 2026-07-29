---
title: QTF-021 TradingView Agentic Strategy Lab
created: 2026-07-10
updated: 2026-07-10
type: strategy-ops-spec
status: proposed
risk_mode: research-only / paper-first
venue: TradingView / Bybit public-data / multi-asset indicators
tags: [qtf, tradingview, pine-script, bybit, indicators, paper-trading, agentic-strategy-lab]
---

# QTF-021 TradingView Agentic Strategy Lab

## Purpose

Build a safe TradingView-centered strategy lab where AI agents can help Jayse turn indicator ideas into Pine Script strategies, validate them, and paper-track alerts before any live automation is considered.

Inspired by: [[Claude TradingView Trading Bot Workflow - Video Ingest - 2026-07-10]]

## Why this matters

Jayse already uses TradingView and has traded successfully with indicator stacks including:

- Bollinger Bands;
- MACD;
- RSI;
- momentum;
- EMA/trend-style concepts.

TradingView is useful because it provides:

- visual chart validation;
- Pine Script strategy backtests;
- alerting infrastructure;
- multi-asset and multi-timeframe coverage;
- a bridge into broker/exchange automation later, if explicitly approved.

## Operating principle

TradingView should start as a **signal lab and visual validation layer**, not as a live execution layer.

```text
Idea → strategy spec → Pine Script → TradingView backtest/visual check → paper alert ledger → review board → guarded live bridge only after approval
```

## Non-negotiable guardrails

- No broker/exchange API keys in prompts, notes, scripts, or source control.
- No Trigger Trade / webhook live execution until explicitly approved.
- No live Bybit orders.
- No leverage automation in early tests.
- No strategy promotion from one optimized backtest.
- Every Pine strategy must avoid lookahead/repainting.
- Fees/slippage must be modeled.
- Alerts must first route to paper logs, not exchange orders.
- Paper tracking must run long enough to compare live-alert behavior vs backtest assumptions.

## Initial candidate families

### TV-E01 — BB/MACD/RSI momentum confluence

Hypothesis: A confluence of Bollinger Band regime, MACD momentum and RSI regime filter can identify trend-continuation or mean-reversion setups with fewer false positives than any single indicator.

Initial markets:

- BTCUSDT;
- ETHUSDT;
- gold / XAUUSD if data supports;
- SPY/QQQ equivalent for non-crypto comparison.

Initial timeframes:

- 1h;
- 4h;
- daily for slower controls.

### TV-E02 — EMA/SuperTrend/MACD trend-following baseline

Hypothesis: A clean-room reconstruction of the video's trend-style strategy can serve as a control strategy, not a trusted alpha source.

Features:

- EMA slow/fast trend filter;
- SuperTrend flip;
- MACD confirmation;
- ATR stop/exit or opposite-signal exit.

### TV-E03 — Jayse discretionary-indicator replay

Hypothesis: Jayse's prior successful TradingView process can be made explicit and testable by logging the indicators, conditions and screenshots that triggered past decisions.

This lane is for turning Jayse's actual eye-tested setups into mechanical detectors.

## Folder contract

```text
Implementation/tradingview_lab/
├─ README.md
├─ pine_strategies/
│  ├─ tv_e01_bb_macd_rsi_confluence.pine
│  ├─ tv_e02_ema_supertrend_macd_baseline.pine
│  └─ templates/
├─ alert_contracts/
│  ├─ tradingview_paper_alert_schema.json
│  └─ alert_message_examples.md
├─ ledgers/
│  └─ tradingview_paper_signals.jsonl
├─ reports/
│  └─ tradingview_strategy_lab_*.json
└─ docs/
   ├─ tradingview_setup_steps.md
   └─ review_scorecard.md
```

## Pine Script contract

Each Pine strategy must include:

- Pine Script v5 or v6 header.
- `strategy()` declaration with commission/slippage assumptions.
- Inputs for all major parameters.
- No `lookahead_on`.
- No repainting signal rules.
- Long/short toggles if relevant.
- Clear entry/exit conditions.
- Alerts using a structured message contract.
- Comments explaining each signal block.

## Alert message contract — paper first

TradingView alert messages should start as JSON-like paper events:

```json
{
  "source": "tradingview",
  "strategy_id": "TV-E01",
  "symbol": "{{ticker}}",
  "timeframe": "{{interval}}",
  "action": "{{strategy.order.action}}",
  "market_position": "{{strategy.market_position}}",
  "price": "{{close}}",
  "time": "{{time}}",
  "run_mode": "paper_only"
}
```

First destination: local/Hermes paper ledger, not exchange orders.

## Review scorecard

| Category | Weight |
|---|---:|
| Clear economic/behavioral thesis | 15 |
| Non-repainting / no-lookahead safety | 20 |
| Backtest quality with fees/slippage | 15 |
| Trade count and sample sufficiency | 10 |
| Drawdown/tail-risk profile | 10 |
| Cross-asset/timeframe stability | 10 |
| Alert reliability / paper-ledger agreement | 10 |
| Operational simplicity | 5 |
| Jayse interpretability / visual usefulness | 5 |

## First implementation slice

1. Create `Implementation/tradingview_lab/` scaffold.
2. Add Pine template with paper-alert contract.
3. Add first BB/MACD/RSI confluence Pine strategy draft.
4. Add first EMA/SuperTrend/MACD baseline Pine strategy draft.
5. Add a local parser/validator for TradingView paper alert JSON lines.
6. Add tests for alert schema validation.
7. Save a manual TradingView setup guide.

## Manual TradingView validation checklist

For each candidate strategy, Jayse or Ari should record:

- symbol;
- timeframe;
- TradingView exchange/feed;
- date range;
- strategy settings;
- commission/slippage;
- net profit;
- max drawdown;
- profit factor;
- closed trades;
- win rate;
- largest losing streak;
- screenshots if useful;
- whether entries visually make sense.

## Promotion gates

| Stage | Requirement |
|---|---|
| spec | exact rules and Pine file saved |
| visual check | TradingView chart/backtest reviewed |
| local sanity | no repaint/lookahead obvious in code |
| paper alert | alerts recorded to paper ledger |
| paper review | live alerts vs backtest behavior compared |
| guarded live candidate | only after explicit user approval, subaccount, caps and kill-switch |

## Security notes

If/when live automation is explored later:

- use Bybit subaccount;
- least-privilege API key;
- withdrawal disabled;
- small capped notional;
- max daily loss;
- max concurrent positions;
- kill-switch;
- alert signing/secret validation;
- logs/audit trail;
- manual pause/resume control.

Until then, this spec is paper-first.
