---
tags:
  - trading-strategy/opening-range
  - research/video
  - quant-floor/candidate
source: https://youtu.be/bITIVwysCzM
status: captured-not-backtested
created: 2026-07-04
---

# Opening Range Strategy - 15m/5m/1m

Source: YouTube video `bITIVwysCzM`.

## Clean-room strategy description

This is an **Opening Range Breakout / Retest / Reversal** strategy focused on the New York cash/session open.

The method uses three timeframes:

| Timeframe | Role |
|---|---|
| 15-minute | Define opening range high/low from the first New York session candle |
| 5-minute | Confirm breakout by requiring a candle close outside the 15m opening range |
| 1-minute | Fine-tune entry using breakout, retest, or reversal structure |

## Core continuation rules

1. At New York session open, mark the high and low of the first 15-minute candle.
2. Wait for a 5-minute candle to close above the 15m opening range high or below the 15m opening range low.
3. Move to 1-minute chart for entry model.
4. Preferred continuation entries:
   - **Breakout:** strong 1m displacement/bullish or bearish gap after confirmed 5m close.
   - **Break and retest:** price returns to the opening range boundary and holds.
5. Risk target described in video: fixed 1:2 R/R.

## Reversal variant

If price breaks out but immediately fails and returns inside the range, avoid continuation. If structure breaks back the other way with displacement, a mean-reversion/reversal setup may target the opposite side or high/low of day.

This variant was especially suggested for indices/forex/range days.

## Claimed examples in video

- Tesla: breakout continuation after 15m range high break and 1m bullish gap.
- NVIDIA: 5m close above opening range, then 1m retest/hold.
- QQQ: failed continuation and reversal/mean reversion toward high of day.

## Backtest translation requirements

To test this properly, the backtester needs intraday OHLCV data with 1m bars and session-aware timestamps.

Initial parameterization:

```yaml
session: NY cash open
opening_range_minutes: 15
confirmation_timeframe: 5m
entry_timeframe: 1m
long_trigger: 5m close > 15m OR high
short_trigger: 5m close < 15m OR low
entry_models:
  - breakout_displacement
  - boundary_retest
  - failed_break_reversal
risk_reward: 2.0
max_trade_window: first 2 hours after open
symbols:
  - QQQ
  - SPY
  - TSLA
  - NVDA
```

## Risks / research cautions

- Video uses selected examples, not statistical evidence.
- P&L claims are not audited.
- Exact definitions of “bullish gap,” “displacement,” and “strong price action” need precise numeric rules before testing.
- First 2 hours of market open have high volatility and slippage.
- Must account for spreads, fees, execution delay, and PDT/options/futures constraints.

## Research status

Captured for AI Quant Trading Floor strategy inventory. Not backtested. Do not trade live from this note.
