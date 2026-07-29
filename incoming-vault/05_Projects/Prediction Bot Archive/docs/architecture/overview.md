# Architecture Overview

The platform is a risk-first prediction-market research and paper-trading system.

Data flows through this sequence:

1. Public data connectors ingest market metadata, order books, public trade and
   wallet-flow observations, BTC references, news, and enrichment sources.
2. Raw payloads are stored before normalization for audit and replay.
3. Normalized snapshots feed rolling statistics and strategy scoring.
4. Strategies emit research signals and, only after promotion, `TradeProposal`
   records.
5. The risk engine emits `RiskDecision` records.
6. The execution engine simulates or places orders only from approved risk decisions.
7. Paper close review closes stored paper positions when latest midpoints hit
   proposal stops, targets, or time stops.
8. Paper accounting marks remaining open positions from latest stored midpoints
   and persists PnL/portfolio snapshots.
9. The paper runtime monitor summarizes paper orders, fills, open/closed
   positions, stale or unmarked marks, close events, exposure, PnL,
   strategy/category exposure, and active skipped mark/close reasons for
   operator review.
10. Replay validation freshness diagnostics compare the latest deterministic
   replay run against the configured stale window so missing, failed, stale, or
   unfinished evidence cannot be mistaken for current promotion readiness.
11. The dashboard and observability stack expose source health, proposals,
   rejections, positions, PnL, drawdown, replay freshness, and operator
   controls.

The strategy layer currently supports three research edges:

- BTC short-timeframe: BTC-linked prediction markets scored against spot/perp
  context, volatility, momentum/reversal, order-book imbalance, liquidity, and
  source freshness.
- Mean reversion: active-market scans for stretched moves, z-score, velocity,
  liquidity, catalyst risk, and conservative contrarian paper opportunities.
- Reverse Snipe Strategy (`reverse_sniping`): unresolved high-probability
  markets late in their lifecycle, scored with fresh CLOB depth, public
  trade/wallet-flow behavior, late liquidity movement, resolution timing, and
  ambiguity checks.

Reverse sniping adds an extra provenance requirement. A candidate must preserve
the market rules, current bid/ask/midpoint, spread, safe exit liquidity, public
trade flow, wallet-flow summary, estimated probability, implied probability,
and reason to trade or wait. It remains research/paper-only until replay-backed
and paper-backed evidence shows the edge survives spread, slippage, fees, and
settlement risk.

Live trading is not part of the foundation phase. It remains blocked by configuration and compliance gates.
