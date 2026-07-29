---
title: I Built an AI Trading System From a Trader's YouTube Videos
created: 2026-07-03
updated: 2026-07-03
type: source-summary
tags: [model-trader, trading-system, crypto, cex, dex, ai-agent, youtube]
sources: [https://youtu.be/m6d5aqcxZ14]
confidence: medium
---

# I Built an AI Trading System From a Trader's YouTube Videos

## Source

- Video: https://youtu.be/m6d5aqcxZ14
- Raw transcript: [[m6d5aqcxZ14]]

## Core architecture extracted

The video describes a five-stage “Model Trader” pipeline:

1. **Ingest** — collect YouTube captions, tweets, blogs, screenshots, and chart examples from successful discretionary traders.
2. **Distill** — human + LLM loop converts vague trading language into exact mechanical rules.
3. **Scan** — scanner runs periodically over 1m–4h candles across selected instruments.
4. **Score** — confluence points decide whether a setup is weak, watchlist-worthy, alert-worthy, or trade-worthy.
5. **Execute** — paper trade first; optionally testnet/live only with explicit approval and exchange controls.

## Detectors mentioned

- Fair value gaps
- Swings / swing highs / swing lows
- Failure swings
- SMT divergence between correlated assets, e.g. gold vs silver
- Weak high / weak low liquidity draws
- Entry breaker / confirmation
- Multi-gate screening where a setup must pass each gate before action

## Agent discretion layer

The video adds an LLM “trader mindset” gate after mechanical scoring. Important constraints:

- The LLM can only **veto / wait / allow** setups that already passed mechanical rules.
- It cannot invent trades.
- If the LLM/API fails, the system should fall back to deterministic gates.
- This layer is experimental and should not replace mechanical evidence.

## Adaptation for Jayse

Jayse currently trades crypto and has access to major CEXs/DEXs for crypto/on-chain stocks, plus CMC access for stocks, precious metals, and ETFs. The local implementation should support:

- public Binance/Yahoo data for research now,
- future CEX adapters via CCXT/API credentials stored outside chat,
- future DEX/on-chain adapters via RPC/indexers,
- future CMC market data adapter via local env var/API key,
- paper trading and backtesting before any live execution.

## Safety interpretation

This project implements research, scanning, backtesting, paper ledgers, and human-review candidates only. Live execution remains disabled until explicitly approved and separately scoped.
