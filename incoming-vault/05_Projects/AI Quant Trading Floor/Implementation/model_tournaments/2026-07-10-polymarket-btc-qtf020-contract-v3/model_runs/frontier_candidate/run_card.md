# Run Card — frontier_candidate

Status: pending model run
Risk mode: **research-only / no live trading / no wallet / no auth / no orders**

## Assignment

Use the shared read-only data to produce one evidence-backed Polymarket strategy candidate, or reject the data as insufficient.

## Allowed inputs

- `../../shared_readonly_data/polymarket_edge_candidates.jsonl`
- `../../shared_readonly_data/polymarket_orderbook_snapshots.jsonl`
- `../../shared_readonly_data/polymarket_market_first_seen.json`
- `../../prompt.md`
- `../../data_manifest.md`

Do not inspect other model-run folders before producing your candidate.

## Required artifacts

- `strategy.md` — hypothesis, exact entry/exit logic, market/time filters, sizing, reject conditions.
- `assumptions.md` — fees, slippage, latency, queue, holdout, missing data, known weaknesses.
- `backtest_report.json` — machine-readable metrics and validation flags.
- `diagnostics.md` — leakage checks, robustness checks, failure modes, what would falsify the strategy.
- optional `artifacts/` files — notebooks, CSVs, plots, sampled fills, bootstrap output.

## Minimum backtest_report.json contract

```json
{
  "status": "completed",
  "strategy_id": "...",
  "trade_count": 0,
  "max_drawdown_pct": 0.0,
  "sharpe": null,
  "net_return_pct": 0.0,
  "holdout_used": true,
  "fees_included": true,
  "slippage_included": true,
  "lookahead_controls": "..."
}
```

## Hard stops

- No profitability claim without reproducible metrics.
- No self-promotion to live trading.
- No private keys, wallet auth, exchange auth, or orders.
- If data is sparse or contaminated, mark the candidate rejected/research-only.
