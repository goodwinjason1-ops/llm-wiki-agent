---
title: AI Training Bot ChatGPT 5_6 YouTube Video - Source Review - 2026-07-14
created: 2026-07-14
updated: 2026-07-14
type: source-review
status: ingested-reviewed
source_url: https://youtu.be/BPFwaD0CgZ8
platform: YouTube
raw: 02_Raw/youtube/ChatGPT 5_6 Trading Bot AI Training - 2026-07-14.txt
tags: [chatgpt, trading-bots, backtesting, trdingkit, tradingview, telegram-alerts, youtube]
---

# Ingestion

Full YouTube transcript extracted. 18,587 chars from a ~10 minute video. Creator claims 5+ years backtesting strategies on YouTube, "rated several times the top trader on multiple exchanges."

# What the video describes

## The claim
Creator asked "ChatGPT 5.6 soul" (likely Codex or a misidentified model) to find and backtest the best trading bots. After 24 hours of optimisation, the AI allegedly produced:

- **1,669% net profit**
- **28% max drawdown**
- **31% win rate, 456 trades**
- **Profit factor 1.89**
- **Risk-to-reward 3.8**

Strategy supposedly built around the Asia open with T3 (David Tech) + Range Filter (Donovan Wall) indicators on gold hourly chart. Long-only.

## The stack promoted
1. **ChatGPT** ($8/month Plus plan) + Codex app for code generation
2. **TradingView** ($12/month for technical alerts) — charting and strategy hosting
3. **TradingKit.com** (free tier) — MCP server giving ChatGPT backtesting capability; their community has backtested 152,000+ strategies
4. **Trigger.trade** (free) — bridges TradingView alerts to Telegram

## The honest section (included in video)
Creator does include a "real talk" segment:
- "A back test is a rear view mirror"
- Needs enough trades (456 qualifies)
- Forward testing on unseen data required for months
- Slippage testing on sub-accounts before main account
- Claims he automated 7 bots after 2,000+ tested, most binned
- Shows forward testing results: one strategy on MNTT with 540 closed trades (100 beyond backtest data)
- Claims $10K → $20.2K portfolio trading challenge shared live
- Promises 30-day transparent follow-up on gold strategy

# Positives

1. **Includes genuine caveats** — most trading bot content doesn't. "2,000 tested, 7 used" is realistic attrition. Acknowledges backtests are rear-view and requires forward testing.
2. **TradingKit MCP concept is genuinely useful** — giving an AI access to a proper backtesting server rather than hallucinating results in context. The architecture (server does heavy lifting, AI checks results) is sound.
3. **Free/low-cost stack** — $20/month for the tooling is accessible. No high-ticket upsell.
4. **Discloses the full pipeline honestly** — doesn't hide that TradingView Pro is needed or that Codex has free-tier limits. Transparent about costs.
5. **Forward testing emphasis** — showing that the MNTT strategy had 540 forward-test trades (100 beyond backtest data) is the right evidence standard.
6. **Slippage and sub-account testing** — correctly notes that live execution differs from backtest fills.

# Negatives and risks

1. **1,669% backtest is almost certainly curve-fitted.** Any strategy with a 31% win rate and 28% DD that produced 1,669% profit on a specific asset over a specific period has been optimised to fit historical data. The 456-trade sample doesn't rescue it — you can get 456 trades of curve-fit easily on hourly data over 2+ years.
2. **No held-out/walk-forward protocol.** The video optimises for 24 hours on all available data, then reports the best. There's no mention of train/test split, walk-forward validation, or out-of-sample testing before the "forward test" phase.
3. **"TradingKit did the heavy lifting" obscures the real question.** The community has 152K backtested strategies — that means massive multiple-testing. Picking the best result from 152K tests without adjusting for multiple comparisons is a textbook p-hacking setup.
4. **No Sharpe ratio or risk-adjusted return shown.** A 1,669% return means nothing without knowing the volatility of the equity curve. 28% max DD on a leveraged gold strategy could easily have been 60%+ at some point before recovery.
5. **Gold-specific regime risk.** Gold's 30% pullback + recovery in 2024–2025 is a specific macroenvironment. A strategy discovered in that regime may fail entirely in a range-bound or steady-trend gold market.
6. **"ChatGPT 5.6 soul" is not a real model name.** This is either a hallucinated/transcribed name or the creator is using a model they haven't correctly identified. This undermines technical credibility.
7. **Telegram alert architecture is fine for signals, not for execution.** The video shows alerts, not automated execution. There's a massive gap between receiving a Telegram message about a trade and actually executing it with correct position sizing, slippage management and fills.
8. **The $10K → $20.2K claim is anecdotal.** One portfolio over an unspecified period, with unspecified drawdowns, unspecified number of strategies contributing. Not evidence of edge.
9. **The 30-day follow-up promise is good, but the baseline expectation is low.** If the video gets 100K views and the follow-up gets 20K, the initial impression is already locked in regardless of actual results.
10. **Trigger.trade as a "free" bridge to Telegram** may have data-harvesting incentives. The video doesn't investigate what access they take.

# Alpha extraction assessment

## Useful architecture (MEDIUM)
- **MCP-based backtesting** via TradingKit: the pattern of giving AI access to a proper backtesting server rather than generating fake results is worth investigating for our Quant Floor
- **TradingView → Telegram alert pipeline**: we already have this architecture. The video validates that this is the standard path
- **Forward-test gate before live**: the 100-trade forward test beyond backtest data is a reasonable minimum. We should enforce similar.

## Not useful
- Specific parameter values (T3 + range filter, Asia open): these are optimised for the specific asset/timeframe and will not transfer
- The 1,669% profit figure: textbook curve-fitting
- Any implication that ChatGPT can "find alpha" autonomously: the AI found the best-fitted parameters, not a true edge

# Honesty assessment

**Mixed but above average for this genre.**

The video includes more genuine risk disclosure than most trading bot content:
- Explicitly says backtests are rear-view
- Shows attrition (2,000 → 7)
- Requires forward testing
- Acknowledges slippage and sub-account testing
- Promises transparent follow-up

**Where honesty breaks down:**
- The headline claim (1,669%) is presented as a success story without sufficient framing that this is almost certainly a curve-fitted result
- "ChatGPT 5.6 soul" is either misidentified or fabricated — neither is honest
- The "community has backtested 152,000 strategies" is presented as a feature, not a multiple-testing risk
- The creator benefits from TradingKit and Trigger.trade referrals — incentive to present positive results

**My honest take:** This is one of the more credible trading bot channels out there, primarily because it includes risk talk and forward testing. But the 1,669% headline is exactly the kind of number that looks great in a thumbnail and terrible in a walk-forward test. The underlying architecture (MCP backtesting + TradingView + Telegram) is sound. The specific strategy is not trustworthy without independent verification.

# Implementation recommendations for Quant Floor

## Priority 1 — Research TradingKit MCP (if accessible)
The concept of an MCP server that does real backtesting is worth investigating. If it can connect to our existing Pine Script validation lab, it could dramatically speed up candidate-strategy screening.

## Priority 2 — Enforce the forward-test gate
Adopt the creator's standard: strategies must produce forward-test results on unseen data (minimum 100 trades beyond backtest window) before any consideration of live execution.

## Priority 3 — Multiple-testing adjustment
Any strategy discovered through an automated search across many parameter combinations MUST be penalised for multiple comparisons. A 1,669% result from a grid search of 10,000 parameter sets is not 1,669% — it's whatever survives Bonferroni or Holm correction.

## NOT implementing
- Any specific parameters from this video
- Direct execution via Telegram alerts without human gate
- The "24-hour optimisation" approach without walk-forward validation

# Decision

**Process architecture note only.** The MCP-server-backtesting pattern is worth investigating. The specific strategy claim is rejected as unsupported. Forward-testing gate is reinforced.
