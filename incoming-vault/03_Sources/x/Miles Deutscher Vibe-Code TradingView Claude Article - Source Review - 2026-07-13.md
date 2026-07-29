---
title: Miles Deutscher Vibe-Code TradingView Claude Article - Source Review - 2026-07-13
created: 2026-07-13
updated: 2026-07-13
type: source-review
status: ingested-exact-mht
source_url: https://x.com/milesdeutscher/status/2052839506659958845
raw_extract: 02_Raw/x/Miles Deutscher Vibe Code TradingView Claude X Article Extract - 2026-07-13.txt
linked_repo: https://github.com/tradesdontlie/tradingview-mcp
tags: [source, x, tradingview, pine-script, claude, mcp, quant]
---

# Exact article

**Vibe-Code Custom Trading Indicators with Claude Code + TradingView (FULL GUIDE)** by Miles Deutscher.

The supplied MHT contains the full article: 11,440 extracted characters and embedded page assets.

# Verified workflow

1. Install Claude Desktop and TradingView Desktop.
2. Install Node.js 18+.
3. Install the third-party `tradesdontlie/tradingview-mcp` project.
4. Launch TradingView Desktop with a local CDP debug port.
5. Use Claude Code in a dedicated indicator folder.
6. Describe the indicator in plain English.
7. Generate Pine Script v6.
8. Paste/import it into TradingView.
9. Add it to the chart and inspect signals.
10. Convert indicators into strategies for Strategy Tester.
11. Add alerts and iterate.

# Article examples

- RSI oversold + above-average volume
- RSI bullish divergence
- Multi-signal entry: RSI below 40 + price above 200 EMA + volume 1.5x 20-period average
- “Liquidation zone” proxy: highest high/lowest low over 20 candles
- BTC dominance using `BTC.D`
- Adding alerts
- Converting an indicator to a backtestable strategy

# Evidence classification

| Claim | Classification |
|---|---|
| Pine Script is TradingView’s scripting language | Source/platform fact |
| AI can accelerate Pine drafting | Plausible workflow benefit |
| The workflow can create custom indicators quickly | Demonstrated development workflow |
| A signal produced 190%/95%/85% on selected higher timeframes | Author report; unverified and selection-biased until reproduced |
| Custom indicators can “print money” | Marketing claim; rejected as evidence |
| Liquidation zone example identifies actual liquidations | **Incorrect/overstated**; it is a rolling high/low proxy, not liquidation data |
| TradingView MCP is official | False; the repository states it is unaffiliated with TradingView |

# Connector review

The linked repository is a public, unofficial MCP bridge. It communicates with the local TradingView Desktop app through Chrome DevTools Protocol on port 9222 and uses undocumented internal application interfaces. It can read charts, set Pine source, compile, inspect values, manage alerts and perform UI/chart operations.

Safe initial scope:

- local install review
- static dependency/security inspection
- read-only chart health check
- Pine source development and compilation
- no alert creation initially
- no data redistribution
- no broker/exchange/wallet credentials
- no automated trading

The repository README itself warns that use may conflict with TradingView terms and says it must not be used for automated trading or algorithmic decision-making using extracted data. That warning controls our implementation scope.

# Updated recommendation

Adopt the workflow as a **Pine development accelerator**, not as a signal-validation shortcut. Every indicator must pass:

- no-repaint/lookahead review
- exact source/rule specification
- same-cost benchmark comparison
- in-sample/held-out split
- walk-forward and parameter-jitter checks
- paper-alert forward test

Promote the following as research candidates, not proven alpha:

1. TV-N01 Regime-Weighted Trend Pressure — existing control-compatible composite
2. TV-N02 Liquidity Sweep Reclaim — existing novel crypto candidate
3. TV-N03 RSI Divergence Detector — test only with pivot confirmation and no-repaint delay
4. TV-N04 Multi-Signal Regime Entry — likely baseline/filter, not novel; test for incremental value
5. TV-N05 BTC Dominance Regime Filter — cross-symbol `request.security()` candidate
6. TV-N06 Rolling High/Low “Liquidation Zone” Proxy — label honestly as liquidity-zone proxy; never call it liquidation data

# Relation to Dami-Defi and Robot James

- Dami supplies the agent workflow: perception, reasoning, strategy and bounded review.
- Miles supplies the Pine/TradingView implementation loop.
- Robot James supplies the causal filter: distinguish forced technical flow from informed repricing and bad comparisons.
- The combined system is a research-to-paper pipeline, not an autonomous trading bot.
