---
title: AI Quant Trading Floor
created: 2026-07-03
updated: 2026-07-03
type: project
status: active-research
priority: medium
tags: [quant, trading, hermes, self-improvement, paper-trading]
sources: [https://youtu.be/Z-hU97WO30I, https://youtu.be/MbfuJZZ01IU, https://youtu.be/6njREUQAFdg, https://youtu.be/m6d5aqcxZ14]
confidence: medium
---

# AI Quant Trading Floor

## Purpose

Build a safety-first, self-imving research system for quant trading strategies using Hermes, Telegram-style desks, structured strategy specs, backtesting, forward-testing, and lessons learned.

## Current status

- Video transcripts ingested.
- Hidden workbook/strategy links were not available from transcript/search.
- Strategy specs were reconstructed from the videos and marked as research hypotheses.
- Model Trader-style implementation v0 is runnable for public Bybit/Yahoo data; Binance remains legacy fallback only because Jayse prefers Bybit for Australia.
- Crypto/CEX/DEX/on-chain-stock/CMC architecture exists, with private integrations kept as local-secret placeholders.
- Dedicated intraday opening-range lab exists for 15m/5m/1m ORB research using Yahoo 1m equities/ETFs and Bybit 1m crypto.
- No live trading is configured.

## Start here

1. Read [[AI Quant Trading Floor Workflow]].
2. Read [[Self-Improvement Protocol|AI Quant Trading Floor Self-Improvement Protocol]].
3. Pick a strategy from the strategy specs.
4. Send it to the relevant desk prompt.
5. Backtest with no lookahead bias.
6. Save evidence and lessons.

## Strategies

- [[QTF-001 Markov Regime Filter]]
- [[QTF-002 Standalone Markov Directional Strategy]]
- [[QTF-003 Hidden Markov Regime Strategy]]
- [[QTF-004 Enhanced Regime Scoring Model]]
- [[QTF-005 RSI MACD Trend Strategy]]
- [[QTF-006 Strategy Factory Optimizer]]
- [[StrategyFactory Public Names - Clean-Room Strategy Specs]]
- [[Alternative Venues Strategy Map - Prediction Markets Hyperliquid DeFi]]
- [[Opening Range Strategy - 15m 5m 1m YouTube bITIVwysCzM]]
- [[Quant Floor Data and News Sources Policy]]
- [[QTF-008 EMA Momentum Baseline and Volatility Overlay]]
- [[QTF-009 Robotics Physical AI Theme Basket]]
- [[QTF-010 Antoine On-Chain Meme and Airdrop Alpha Pipeline]]
- [[QTF-011 Political Disclosure Copy Trading Delay Edge]]
- [[QTF-012 IBKR AI Trading Bot Ops Pattern]]
- [[QTF-013 Hyperliquid Lighter Farming and Perp Venue Watchlist]]
- [[QTF-014 Antoine Meme Coin Techniques Library]]

## Current batch rankings

- [[Robot James Method Library - Caps 1 to 9]] — causal edge framework and prioritized pairs/forced-flow/risk implementation library.
- [[DeFi Protocol Risk Review Index]] — navigation hub for generated DeFi protocol-review evidence; reviews are not approvals.
- [QTF-020 First Actual Model Tournament Summary](Implementation/model_tournaments/2026-07-10-polymarket-btc-qtf020-first-actual-run/tournament_summary.md) — linked run contract, candidate artifacts and review-board evidence.
- [[StrategyFactory and Playlist Batch 01 Backtest Ranking]]
- [[Strategy Lab v2-v3 Sharpe Target Evidence]]
- [[Alternative Venue Scan 01 Evidence]]
- [[Alternative Research Lab 01 - Prediction Funding DeFi Allocator]]
- [[Alternative Validation Lab 02 - Calibration History and Monte Carlo]]
- [[Alternative Validation Lab 03 - Calibrated Edge Risk and Optimizer]]
- [[Alternative Paper Ops Lab 04 - Signal Ledger Frontier MC Protocol Reviews]]
- [[Alternative Paper Ops Lab 05 - Intraday Outcome Resolver and Obsidian Dashboard]]
- [[Opening Range Lab 01 - Intraday Backtester Smoke Test]]
- [[Robotics Physical AI Theme Lab 01 - Article Basket Evidence]]
- [[Robotics Physical AI Theme Lab 02 - Walk-Forward Validation]]
- [[YouTube Playlist - trade theories inventory]]
- Read-only daily ETF paper monitor cron: `AI Quant Floor daily tactical ETF paper monitor` (`83516ec85064`), weekdays 08:00, allocation alerts only, no orders.
- Read-only alternative venues monitor cron: `AI Quant Floor alternative venues monitor` (`87a2456a3bbb`), daily 09:00, prediction/Hyperliquid/DeFi scan only, no orders.
- Silent Hyperliquid funding recorder cron: `Hyperliquid funding hourly recorder` (`1e51b5d88577`), hourly, data collection only.
- Polymarket paper signal recorder cron: `Polymarket paper signal recorder` (`61f996692d57`), daily 10:00, records calibrated paper signals only.
- Polymarket paper outcome tracker cron: `Polymarket paper outcome tracker` (`55283af680f6`), every 6 hours, resolves paper outcomes when possible.
- Obsidian dashboard refresh cron: `AI Quant Floor Obsidian dashboard refresh` (`a8a58f9b3ee1`), daily 10:30, refreshes [[AI Quant Trading Floor Dashboard]].

## Runnable scaffold and evidence

- Original script: `05_Projects/AI Quant Trading Floor/Scripts/quant_floor_backtest.py`
- Model Trader implementation: `05_Projects/AI Quant Trading Floor/Implementation/quant_floor_system.py`
- Implementation config: `05_Projects/AI Quant Trading Floor/Implementation/config.json`
- Implementation README: `05_Projects/AI Quant Trading Floor/Implementation/README.md`
- Architecture: [[AI Quant Trading Floor Implementation Architecture]]
- First evidence note: [[SPY Initial Backtest Evidence]]
- Model Trader smoke test: [[Model Trader v0 Smoke Test Evidence]]
- Initial result: reconstructed/generic baselines did **not** beat benchmarks; keep as research/revision only.

## Source summaries

- [[I Built an AI Trading System From a Trader's YouTube Videos]]
- [[How To Build A Self-Improving AI Trading Agent]]
- [[Hedge Fund Method Markov Regime System]]
- [[Hermes AI Trading Floor System]]
- [[MoonDev Sharpe Trading Bot X Article - 2016647662637064402]]

## Self-improvement artifacts

- Protocol: [[Self-Improvement Protocol|AI Quant Trading Floor Self-Improvement Protocol]]
- Source summary: [[How To Build A Self-Improving AI Trading Agent]]
- Scorecard template: [[Strategy Scorecard Template]]
- Experiment ledger template: [[Experiment Ledger Template]]
- Learned parameters template: `05_Projects/AI Quant Trading Floor/Templates/learned_parameters.template.json`

## Antoine / Handsome Finance high-risk on-chain desk

- [[Antoine On-Chain Alpha Dashboard]]
- [[Antoine On-Chain Alpha Desk]]
- [[Handsome Finance Corpus Synthesis - 2025-01-08 to 2026-07-08]]
- [[Antoine DEX Screener Adapter 01 - Watch Candidates]]
- [[Antoine Risk Adapter 02 - RugCheck Solana Gate]]
- [[Antoine Risk Adapter 03 - EVM GoPlus Honeypot Gate]]
- [[Antoine Outcome Tracker 01 - Forward Snapshot Ledger]]
- [[QTF-013 Hyperliquid Lighter Farming and Perp Venue Watchlist]]
- [[QTF-014 Antoine Meme Coin Techniques Library]]

## Desk prompts

- [[Strategy Intake and Cleaning Desk Prompt]]
- [[Trend Following Desk Prompt]]
- [[Regime Filter Desk Prompt]]
- [[Optimizer Desk Prompt]]
- [[Forward Testing and Risk Desk Prompt]]

## Non-negotiables

- No live trading without explicit approval.
- No strategy promotion without walk-forward/out-of-sample evidence.
- No “AI says it works” claims; require metrics and reproducible tests.
- Keep all strategy lessons in the second brain or Hermes skills.
