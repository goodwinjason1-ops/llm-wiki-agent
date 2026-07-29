---
title: Dami-Defi + Robot James + TradingView Implementation Sprint - 2026-07-13
created: 2026-07-13
updated: 2026-07-13
type: implementation-plan
status: active-paper-only
priority: high
sources:
  - [[DamiDefi UCL Finance Paper Agent Architectures - Source Summary - 2026-07-13]]
  - [[TradingView Candidate Indicator Slate - 2026-07-13]]
  - [[Robot James Method Library - Caps 1 to 9]]
  - [[QTF-021 TradingView Agentic Strategy Lab]]
---

# Bottom line

Implement the useful architecture and research controls today, but keep all market interaction at:

```text
public/read-only data -> backtest/replay -> paper alert -> review board -> explicit production gate
```

No broker/exchange keys, wallet access, order routing or live TradingView webhooks are part of this sprint.

# Source-derived additions

## Dami-Defi exact article

The supplied MHT confirms three accessible architectures:

1. RAG research agent
2. Multi-agent trading review system: perception -> reasoning -> strategy
3. DeFi monitoring agent: liquidity, governance/contract risk, whale activity and competitive context

Additional controls confirmed by the full article:

- Level 1/2 bounded autonomy only
- human review before action
- source citations and knowledge-base limits
- bullish, bearish and neither-priced hypotheses
- explicit confirmation/refutation data points
- risk flags Green/Amber/Red
- autonomy, heterogeneity, execution coupling, infrastructure concentration and observability tracking

## Robot James

The highest-priority executable lane is clean-room crypto relative-value research:

- Bybit public linear-perpetual data
- genuinely similar pairs, not correlation-only pairs
- ratio and residual-spread baselines
- 20-bar Bollinger / +/-2 sigma entry baseline
- next-bar execution
- mean-cross exit
- two-leg fees, slippage and funding costs
- token-specific news/event veto
- funding/liquidation/volume forced-flow context
- hard time, divergence and portfolio risk stops
- held-out, walk-forward, jitter and paper gates

The prior BTC momentum test was not a pairs test. Pair backtesting remains to be run.

# Implementation slices

## Slice 1 — research contracts (today)

- [ ] Decision-object schema for all agent outputs
- [ ] Perception/reasoning/strategy prompt contracts
- [ ] Evidence/provenance fields
- [ ] Green/Amber/Red DeFi monitoring schema
- [ ] Paper-only alert JSON contract with `paper_only: true`
- [ ] Robot James pair candidate schema and rejection reasons

Acceptance: malformed outputs reject; no output can imply an order.

## Slice 2 — crypto-pairs research lane (today)

- [ ] Fetch Bybit public linear-perpetual klines
- [ ] Build candidate universe from major liquid, economically related pairs
- [ ] Calculate ratio and rolling hedge-ratio residual variants
- [ ] Implement 20/2 baseline
- [ ] Add two-leg fee/slippage/funding model
- [ ] Add next-bar fills and no-lookahead checks
- [ ] Add divergence-cause quarantine fields
- [ ] Produce first smoke report and evidence note

Acceptance: real Bybit data, reproducible command, benchmark, costs, trade count, drawdown and decision.

## Slice 3 — TradingView/Pine lane

- [ ] Compile TV-N01 Regime-Weighted Trend Pressure manually in TradingView
- [ ] Compile TV-N02 Liquidity Sweep Reclaim manually in TradingView
- [ ] Add same-cost Strategy Tester comparison
- [ ] Create paper-only alert conditions
- [ ] Validate exported alerts against local contract
- [ ] Do not connect alerts to Bybit/Trigger Trade

Acceptance: scripts compile, no-repaint review passes, outputs are paper-only and comparable to baseline.

## Slice 4 — Dami agent workflows

- [ ] RAG research prompt with source citation and missing-knowledge flag
- [ ] Perception agent output contract
- [ ] Reasoning agent: bullish/bearish/neither hypotheses
- [ ] Strategy agent: conditional proposal only, no execution
- [ ] DeFi monitor report using public data only
- [ ] Agent dependency/heterogeneity log

Acceptance: each output contains provenance, uncertainty, invalidation and next evidence step.

## Slice 5 — Miles merge checkpoint

When the user supplies the Miles article capture/link:

- [ ] ingest exact article
- [ ] compare claims, indicators, connectors and testing methods
- [ ] mark additions as adopt/reject/unknown
- [ ] revise scripts/specs only where the new source adds testable value
- [ ] run regression tests after changes

# Robot James candidate pairs

Initial candidates should be selected from liquid, related assets available on Bybit perpetuals. Candidate selection is not final until live symbol availability, history, spread, volume, open interest and funding are verified.

First research buckets:

- BTC/ETH: broad crypto beta, likely too structurally different for naive ratio; control candidate only
- ETH/SOL: ecosystem beta divergence; higher model/event risk
- major exchange tokens or infrastructure pairs where the economic relationship is explicit and both contracts are liquid
- sector/theme baskets only after a stable common-factor explanation exists

Do not call any pair an edge until it survives a same-age control universe and held-out periods.

# Promotion gates

| Gate | Required result |
|---|---|
| Source/logic | Exact rules and unknowns recorded |
| Code | Reproducible run and tests pass |
| Bias | No lookahead, repainting or future symbol selection |
| Costs | Two-leg fees, slippage and funding included |
| Robustness | OOS, walk-forward and parameter jitter |
| Breadth | More than one pair/regime or explicit reason |
| Risk | Max drawdown, time stop, divergence stop and exposure caps |
| Forward | Paper alerts match the tested logic |
| Production | Separate approval for exact venue, capital and max loss |

# Today’s order of operations

1. Build/verify pair research lane and run first smoke tests.
2. Compile and inspect TV-N01/TV-N02 in the user’s TradingView account.
3. Create Dami prompt/contracts and paper-only output ledger.
4. Receive Miles article capture/link.
5. Merge/reject Miles additions.
6. Run combined regression/smoke suite.
7. Review evidence and decide which candidates enter forward paper monitoring.

# Explicit non-goals

- No live trade
- No exchange authentication
- No wallet/API key collection
- No autonomous order execution
- No profitability claim from any source or backtest
