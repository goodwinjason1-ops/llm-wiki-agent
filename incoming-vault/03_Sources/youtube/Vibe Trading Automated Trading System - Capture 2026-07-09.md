---
title: Vibe Trading Automated Trading System - Capture 2026-07-09
created: 2026-07-09
type: source-summary
source: "https://youtu.be/hh8G8_6v0Sg?si=3_WeLXzexMl0nyPv"
video_id: "hh8G8_6v0Sg"
author: "Full Stack"
tags: [youtube-capture, quant, vibe-trading, multi-agent, backtesting, trading-system]
---

# Vibe Trading Automated Trading System - Capture 2026-07-09

## Jayse capture note

Automated trading system. Looks very interesting; assess whether we can utilise it.

## Source summary

The video describes **Vibe-Trading** as a full AI trading research workspace rather than a simple chatbot. It claims natural-language strategy research, backtesting, risk controls, portfolio analysis, broker connectors, multi-agent swarms, market data fallbacks, an Alpha Zoo, shadow account analysis, strategy export, dashboard UI, scheduler, MCP tools, and security hardening.

## Repository verified

GitHub search confirmed the likely repo:

- `HKUDS/Vibe-Trading`
- URL: `https://github.com/HKUDS/Vibe-Trading`
- Stars at check time: ~18.7k
- Primary language: Python
- README says Python 3.11+, FastAPI backend, React 19 frontend, PyPI package `vibe-trading-ai`.

## Claimed useful features

- Natural-language research workflow.
- Backtests with Sharpe, max drawdown, win rate, profit factor.
- Monte Carlo, bootstrap confidence intervals, walk-forward validation, run cards.
- Data sources across equities, crypto, macro, options, SEC filings, fund flow.
- Multi-agent swarm presets: investment committee, quant desk, crypto desk, risk workflows.
- Alpha Zoo with hundreds of factor alphas and leakage checks.
- Shadow account analysis for broker-history behavior review.
- Broker connectors with paper/live boundary, pre-trade gates, exposure caps, daily caps, kill switch, audit ledger.
- MCP integration exposing trading research tools to agent clients.
- Local API auth, path containment, generated-code sandboxing.

## Ari assessment

This is highly relevant, but we should treat it as an **evaluation candidate**, not something to connect to accounts. It may save months of scaffold work if its backtest/risk/MCP components are solid.

Recommended use for Jayse:

```text
Clone/read-only evaluation
→ no broker keys
→ inspect architecture and safety model
→ run sample backtest using public data only
→ compare against AI Quant Floor/Prediction Bot needs
→ reuse patterns or adapters only after code review
```

## What to test first

1. Clone `HKUDS/Vibe-Trading` into `C:/Users/Kidsg/ai-tools/evaluation/`.
2. Run static inspection and dependency review.
3. Run docs/examples only with public/read-only data.
4. Confirm install size and Windows compatibility.
5. Verify whether MCP tools can be used from Hermes/Claude/Codex.
6. Evaluate if its data loaders/backtest reports outperform our current scaffolds.

## Relevance to our systems

| Jayse system | Possible use |
|---|---|
| AI Quant Floor | borrow run-card, backtest report, scheduler, data-loader, and eval patterns |
| Prediction Bot | compare backtesting, run-card, and paper/live safety gate design |
| Bybit Bot | inspect broker connector/risk gate architecture before implementing ours |
| Business Context Brain | less direct, but useful as a mature agent/workspace product pattern |

## Risks

- Do not trust broker execution connectors without deep review.
- Crypto exchange coverage may not match Bybit-first preference.
- Some data sources may be China/A-share oriented or require keys.
- Large dependency surface; isolate from main projects.
- Validate claims; do not assume star count equals quality.

## Transcript status

Transcript fetched with `yt-dlp` auto-subs because the regular YouTube transcript API was blocked by YouTube. Working transcript length: 10220 chars.

## Wiki concepts

Synthesised from this source:

- [[llm-built-trading-bot]]
