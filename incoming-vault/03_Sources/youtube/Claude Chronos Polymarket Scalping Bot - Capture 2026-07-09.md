---
title: Claude Chronos Polymarket Scalping Bot - Capture 2026-07-09
created: 2026-07-09
type: source-summary
source: "https://youtu.be/jnJF0W2XgqA?si=A_eyNKbzd_EDbAYY"
video_id: "jnJF0W2XgqA"
author: "Trading with DaviddTech"
tags: [youtube-capture, quant, polymarket, chronos, scalping, prediction-markets]
---

# Claude Chronos Polymarket Scalping Bot - Capture 2026-07-09

## Jayse capture note

Scalping Claude bot. Useful for AI Quant as another method.

## Source summary

The video presents a Claude/Codex-built dashboard for Polymarket BTC/ETH 5-minute and 15-minute up/down markets. The key idea is not to ask a general chatbot for a trade call, but to use a time-series forecasting model — described as **Chronos/Kronos** — to forecast the next candle, then only trade when price/odds/filters imply positive edge.

## Claimed components

- Polymarket BTC and ETH 5-minute / 15-minute up-down markets.
- Chronos-style time-series model predicts next candle direction/price move.
- Dashboard shows current price, forecast, confidence, edge, news, equity curve, and backtest stats.
- Filters/gates mentioned:
  - ATR volatility gate;
  - ADX sideways-market gate;
  - odds/edge check;
  - variable position sizing using Kelly.
- Four backtest variants mentioned:
  1. naked Chronos signal;
  2. Chronos + indicators/gates;
  3. Kelly position sizing;
  4. Martingale + Kelly.

## Ari assessment

Useful as a **research candidate**, but the claims require independent validation. The most valuable part for us is the architecture pattern:

```text
public market data + Polymarket ladder data
→ time-series forecast model
→ mechanical filters/gates
→ price/odds edge calculation
→ conservative paper sizing
→ evidence dashboard
```

The **Martingale** piece should be rejected for our live roadmap; it can be tested as a cautionary benchmark only. Kelly should be capped/fractional if ever used.

## Suggested Quant Floor candidate

Create a research-only desk candidate:

`QTF-CANDIDATE Chronos Polymarket 5m/15m Directional Edge`

First implementation should be paper-only:

1. Record BTC/ETH 5m and 15m Polymarket market snapshots.
2. Align snapshots with Bybit BTCUSDT/ETHUSDT candles.
3. Add naive baselines first: momentum, last candle, random/no-edge, market-implied odds.
4. Add Chronos model forecast only after baselines work.
5. Score edge after fees/spread/slippage.
6. Store paper outcomes and reject if not robust.

## Risks

- Prediction-market spread and liquidity can erase tiny 5-minute edge.
- Polymarket resolution mechanics and timing need exact modeling.
- The source's headline PnL claims are not evidence.
- Martingale can create catastrophic tail risk.
- Any live use requires location/terms/legal review and explicit scope approval.

## Transcript status

Transcript fetched with `yt-dlp` auto-subs because the regular YouTube transcript API was blocked by YouTube. Working transcript length: 15953 chars.

## Wiki concepts

Synthesised from this source:

- [[llm-built-trading-bot]]
