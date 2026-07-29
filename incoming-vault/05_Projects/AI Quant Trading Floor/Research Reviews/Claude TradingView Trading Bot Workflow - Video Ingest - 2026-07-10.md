---
title: Claude TradingView Trading Bot Workflow - Video Ingest
date: 2026-07-10
type: source-ingest
status: captured
source_url: https://youtu.be/G6l6HfMbOLc?si=boxRpxSG8enKwEMC
video_id: G6l6HfMbOLc
channel: Trading with DaviddTech
duration: 21:34
tags: [ai-quant, tradingview, pine-script, claude, bybit, strategy-research, automation]
---

# Claude TradingView Trading Bot Workflow - Video Ingest

## Source

- YouTube: https://youtu.be/G6l6HfMbOLc?si=boxRpxSG8enKwEMC
- Title: **I Built a FREE AI Trading Bot With Claude + TradingView (Step by Step)**
- Channel: Trading with DaviddTech
- Duration: 21:34
- Transcript provenance: YouTube transcript API was blocked; transcript captured via `uvx yt-dlp --write-auto-subs` auto-subtitle fallback.

## Video workflow summary

The creator shows an AI-assisted TradingView bot pipeline:

1. Use Claude/Claude Code as the coding agent.
2. Use TradingKit/tradingkit.com as a backtest/optimizer tool for Claude.
3. Ask Claude to build and backtest a Pine Script strategy.
4. Optimize indicator parameters.
5. Paste generated Pine Script into TradingView.
6. Verify strategy backtest in TradingView with commission/capital/order-size settings.
7. Configure TradingView alerts.
8. Route alerts through Trigger Trade to a broker/exchange, using Bybit in the video.
9. Add alert wiring to Pine Script.
10. Run the TradingView alert as the automation layer.

## Concrete details mentioned

### Tools

- Claude / Claude Code.
- TradingView.
- TradingKit / `tradingkit.com` for AI backtesting/optimization tooling.
- Trigger Trade / `trigger.trade` as a TradingView-to-exchange connector.
- Bybit as the broker/exchange example.

### Strategy examples mentioned

- Simple EMA crossover optimization:
  - EMA slow searched roughly 110–400.
  - EMA fast searched roughly 10–100.
  - Example result: EMA slow 400, EMA fast 45.
  - Reported profit factor: 1.86.
  - Reported net profit: 281%.

- 24-hour automated Claude optimization loop:
  - Goal: search for profitable strategy/settings.
  - Loop every 15 minutes.
  - If a strategy fails, move to next candidate rather than over-optimizing.
  - Reported final strategy optimized for Sharpe ratio.
  - Reported >500% net profit, ~11% max drawdown, 141 closed trades.

- TradingView strategy shown:
  - “super trend flip EMA MACD”
  - BTCUSDT
  - 4-hour timeframe
  - TradingView reported over 500% net profit, 15% max drawdown, 141 trades, profit factor 2.295.

### Automation details

- TradingView strategy code is pasted into Pine Editor.
- TradingView strategy settings should include:
  - commission/fees;
  - initial capital;
  - default order size.
- Alerts are set up with webhook/connector URL.
- Alert message uses `strategy.order.alert_message`.
- Connector translates TradingView alerts to exchange orders.

## Important safety points from the video

The creator explicitly cautions:

- Backtests are historical only.
- “95% of strategies will fail once you put them into real markets.”
- Always forward test.
- Use paper trading or small capital first.
- Use subaccounts to isolate risk.
- Diversify across multiple bots/assets/timeframes/strategies.
- The video is not financial advice.

## My interpretation for Jayse's Quant Floor

This is highly relevant, but the live automation part should **not** be copied directly yet.

The best part to borrow is:

```text
AI agent → Pine strategy generator → local/TradingView validation → paper alert ledger → only later broker bridge
```

For Jayse's stack, TradingView becomes a strong **signal and visual validation layer**, not the first execution layer.

## What maps well to Jayse

Jayse already has experience with TradingView indicators:

- Bollinger Bands;
- MACD;
- RSI;
- momentum;
- trend/EMA-style systems.

So we can build a TradingView Agent lane where Ari/Claude/Codex help:

1. Convert indicator ideas into Pine Script strategy specs.
2. Generate Pine Script.
3. Backtest locally where possible.
4. Validate visually in TradingView.
5. Export/record alerts into the Quant Floor ledger.
6. Paper-track alerts before any exchange connector.

## What not to copy yet

Do **not** immediately connect:

- Bybit API keys;
- Trigger Trade;
- TradingView webhooks to live exchange orders;
- any auto-order bridge.

Reason: this bypasses the Quant Floor's required evidence gates and introduces key/security/live-execution risk.

## Recommended QTF adaptation

Create a new lane:

```text
QTF-021 TradingView Agentic Strategy Lab
```

Core pipeline:

```text
Idea → Strategy spec → Pine Script → TradingView visual/backtest check → alert message schema → paper ledger → review board → optional guarded live bridge later
```

## Proposed first candidate families

Given Jayse's prior TradingView experience:

1. **BB-MACD-RSI momentum confluence**
   - Bollinger Band expansion or reclaim.
   - MACD histogram/line confirmation.
   - RSI regime filter.
   - Momentum/volume confirmation if data supports it.

2. **EMA/SuperTrend/MACD trend-following control**
   - Similar to the video, but rebuilt clean-room.
   - Use as baseline/control rather than trusted alpha.

3. **BTC/ETH 4H swing strategy**
   - Better fit for TradingView alerts and avoiding overtrading.

4. **Bybit-compatible signal paper monitor**
   - Use public Bybit candles first.
   - No API keys.
   - Record signals to JSONL and Obsidian dashboard.

## QTF guardrails

Before anything can move from TradingView signal to live automation:

- Pine Script must be versioned and saved.
- Backtest must include fees/slippage.
- Signal logic must avoid repainting/lookahead.
- TradingView and local backtest should broadly agree.
- Paper alerts must be recorded for weeks, not just days.
- Subaccount + max loss + kill-switch must be defined.
- User must explicitly approve venue, capital, leverage, symbols, and automation scope.

## Useful prompt pattern for Jayse

```text
You are a systematic trading strategy researcher.

Build a TradingView Pine Script v5 strategy from the following idea:
[describe indicators, timeframe, asset, long/short preference]

Constraints:
- no repainting;
- no lookahead;
- include commission and slippage assumptions;
- expose key parameters as inputs;
- use strategy.entry/strategy.exit or strategy.close;
- include alert_message fields that can be routed to a paper ledger;
- include comments explaining each signal;
- do not claim profitability;
- provide a test plan and failure modes.

After generating Pine Script, give me:
1. exact TradingView setup steps;
2. backtest metrics to record;
3. paper-tracking plan;
4. conditions under which this should be rejected.
```

## Next build recommendation

Implement a research-only **TradingView Strategy Lab** scaffold inside the Quant Floor:

- `tradingview_strategy_lab.py`
- `pine_strategies/`
- `tradingview_alerts/`
- `ledgers/tradingview_paper_signals.jsonl`
- `reports/tradingview_strategy_lab_*.json`
- template Pine strategies for:
  - EMA/SuperTrend/MACD baseline;
  - BB/MACD/RSI momentum confluence.

The first deliverable should be **Pine Script + paper ledger contract**, not live webhooks.
