---
title: Miles Claude Trading Bot Article - X 2075615711150608468
created: 2026-07-11
updated: 2026-07-11
type: source-capture
status: quant-review-complete-evidence-blocked
tags: [x, claude, trading-bot, tradingview, pine-script, ai-quant, source-claim]
source_url: https://x.com/i/status/2075615711150608468
author: Miles Deutscher
source_access: full-x-article-via-public-fxtwitter-fallback
confidence: medium
---

# Miles Claude Trading Bot Article - X 2075615711150608468

## Queue intent

Review as a possible architecture and workflow input for [[AI Quant Trading Floor]], especially [[QTF-021 TradingView Agentic Strategy Lab]]. Do **not** treat the headline profit as verified evidence.

## Retrieved article

- **Author:** Miles Deutscher (`@milesdeutscher`)
- **Title:** `I Built A Trading Bot With Claude That Made +$168,236`
- **Published:** 2026-07-10
- **Article ID:** `2074879369059934208`
- **Tweet ID:** `2075615711150608468`
- **Access provenance:** X CLI was unavailable, but the complete public X Article text and metadata were retrieved through Agent Reach's documented FxTwitter fallback.

## Article's stated workflow

1. Use Claude/Fable in VS Code to convert a named trading idea into objective rules.
2. Require computable entry, stop, exit and position-sizing rules.
3. Convert those rules into TradingView Pine Script v6.
4. Model `0.1%` commission per side, next-bar-open fills and a stated starting balance.
5. Paste the script into TradingView and inspect results across timeframes.
6. Export TradingView's trade-list CSV.
7. Feed the CSV back to Claude for an improvement plan.
8. Optionally connect an exchange MCP/API for execution, or use the safer middle ground where an agent flags setups and a human approves them.

## Claims requiring independent verification

- The headline `+$168,236` result.
- Twelve famous strategies were reportedly tested against BTC and only one beat buy-and-hold.
- The winning strategy was reportedly tested on stocks.
- An RSI mean-reversion example reportedly produced `+$5,251` on one configuration but suffered deep drawdown on the 4-hour chart.
- The article does not establish from text alone whether the headline result is in-sample, out-of-sample, walk-forward, fee/slippage complete, or free of parameter-selection bias.

## Potentially useful Quant Floor inputs

- Strong overlap with our source-to-spec and TradingView-lab pipeline.
- Explicit next-bar fill and commission assumptions are better than frictionless same-bar tests.
- TradingView CSV export can become a standardized evidence artifact.
- Multi-timeframe and multi-asset testing should be formalized rather than selected after seeing results.
- Human-approved alerts are appropriate before any execution bridge.
- Strategy refinement must use held-out/walk-forward data to avoid Claude optimizing the same sample repeatedly.

## Safety and quality cautions

- Do not provide an exchange API key to an LLM/MCP during evaluation.
- Do not connect Bybit or another exchange until exact capital, permissions, maximum loss, monitoring and kill switches are explicitly approved.
- Treat screenshots and headline P&L as claims until the full strategy, date range, symbol set, starting capital, costs and trade CSV are reproduced.
- Separate strategy discovery, validation data and final confirmation data.
- Compare against buy-and-hold and simple baselines using risk-adjusted metrics, not headline dollars.

## Queued review task

- [ ] Extract the twelve-strategy result table from the article image.
- [ ] Identify the reported winning strategy and all disclosed parameters.
- [ ] Reconstruct the claimed test with public data and explicit costs.
- [ ] Run in-sample versus held-out/walk-forward checks.
- [ ] Compare the workflow with [[QTF-021 TradingView Agentic Strategy Lab]].
- [ ] Decide which architecture/process elements should be adopted independently of the profit claim.
- [ ] Keep all work read-only/backtest/paper-only.

## Preliminary classification

**Useful workflow source; unverified performance claim.** The strongest immediate value is process design—objective rules, Pine generation, CSV evidence and human-approved alerts—not the headline profit number.
