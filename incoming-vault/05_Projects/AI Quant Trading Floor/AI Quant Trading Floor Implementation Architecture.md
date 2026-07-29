---
title: AI Quant Trading Floor Implementation Architecture
created: 2026-07-03
updated: 2026-07-03
type: architecture
status: implemented-v0
sources: [https://youtu.be/m6d5aqcxZ14, https://youtu.be/MbfuJZZ01IU, https://youtu.be/6njREUQAFdg]
tags: [quant, trading-system, crypto, cex, dex, cmc, architecture]
confidence: medium
---

# AI Quant Trading Floor Implementation Architecture

## Scope

Research/paper-trading system for crypto, CEX/DEX/on-chain-stock opportunities, CMC-covered stocks, precious metals, and ETFs.

No live trading is enabled in v0.

## Pipeline

```text
Sources → Distillation → Detectors → Scanner → Scorer → LLM veto/review → Backtest/Paper ledger → Self-improvement loop
```

## Modules implemented in v0

| Module | File | Purpose |
|---|---|---|
| Config | `Implementation/config.json` | Assets, thresholds, execution mode |
| Core system | `Implementation/quant_floor_system.py` | Data adapters, detectors, scorer, backtester, ledger |
| Experiment ledger | `Implementation/ledgers/experiments.jsonl` | Append-only test history |
| Paper ledger | `Implementation/ledgers/paper_trades.jsonl` | Append-only simulated trade records |

## Data adapters

| Adapter | Status | Use |
|---|---|---|
| Binance public klines | Implemented | Crypto OHLCV research without API keys |
| Yahoo chart API | Implemented | Stocks, ETFs, precious-metal ETFs, crypto fallback |
| CMC | Placeholder | Requires local `CMC_API_KEY`; do not paste in chat |
| CEX private trading | Placeholder | Future CCXT/exchange-specific adapter; keys stored locally only |
| DEX/on-chain | Placeholder | Future RPC/indexer adapter for on-chain assets/stocks |

## Detectors in v0

- RSI momentum
- MACD trend
- Markov-style 20-bar regime state
- Swing highs/lows
- Failure-swing clustering
- Fair value gap approximation
- Basic confluence scoring

## Agent rules

- Mechanical scoring comes first.
- LLM/trader-mindset layer can only veto or request waiting; it cannot create trades.
- Every run writes an experiment ledger row.
- New strategies start read-only/research-only.
- Human approval required before write-mode, paper automation, testnet, or live trading.

## Next implementation upgrades

1. Add CCXT for authenticated CEX read-only balances/orderbooks.
2. Add CMC adapter for Jayse's CMC market universe using local `.env` only.
3. Add DEX/on-chain scanner with public RPC/indexer providers.
4. Add image/chart ingestion for screenshots.
5. Add LLM distillation CLI for turning trader transcripts into detector specs.
6. Add cron jobs for scheduled scans once assets/thresholds are confirmed.
