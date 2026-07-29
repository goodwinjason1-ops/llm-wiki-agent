---
title: QTF-020 Polymarket Model Tournament Harness
created: 2026-07-10
updated: 2026-07-10
type: strategy-ops-spec
status: contract-validator-implemented
risk_mode: research-only
venue: Polymarket / alternative venues
tags: [qtf, polymarket, model-tournament, llm-review-board, btc, prediction-markets]
---

# QTF-020 Polymarket Model Tournament Harness

## Purpose

Create a repeatable harness for using multiple LLM/model agents to propose, backtest/replay, and review Polymarket and alternative-venue strategies without contaminating the research process or jumping to live trading.

Inspired by: [[GPT 5.6 Polymarket BTC Strategy Workflow - Video Ingest - 2026-07-10]]

## Scope

Initial markets:

- Polymarket BTC / crypto up-down or price-threshold markets.
- Existing QTF-018 candidate families:
  - PM-E03: two-sided cheap binary-window maker bids.
  - PM-E04: fresh-window stale pricing.
  - PM-E06: near-close/open lifecycle anomaly.
- New candidate: BTC 5m/up-down fair-value model.

## Core idea

Run the same research challenge across multiple isolated model workspaces, then have a separate review pass score each strategy.

The models do not get to see each other's outputs until after they have completed their own candidate.

## Folder contract

```text
Implementation/model_tournaments/YYYY-MM-DD-polymarket-btc/
├─ README.md
├─ data_manifest.md
├─ prompt.md
├─ usage_ledger.jsonl
├─ shared_readonly_data/
├─ model_runs/
│  ├─ model_a/
│  │  ├─ run_card.md
│  │  ├─ strategy.md
│  │  ├─ assumptions.md
│  │  ├─ backtest_report.json
│  │  ├─ diagnostics.md
│  │  └─ artifacts/
│  ├─ model_b/
│  └─ control_baseline/
├─ review_board/
│  ├─ review_prompt.md
│  ├─ scorecard.md
│  ├─ validation_summary.json
│  ├─ rankings.json
│  └─ decision.md
└─ tournament_summary.md
```

## Data manifest

Every tournament starts with a data manifest:

| Field | Description |
|---|---|
| markets | market IDs/slugs/questions |
| date_range | first/last timestamp |
| rows_by_type | orderbook snapshots, market metadata, candles, candidates, outcomes |
| known_missing_data | gaps, no L2, no fill history, etc. |
| execution_constraints | no wallet/auth/orders; simulated fills only |
| leakage_controls | what files/results were removed from model view |
| holdout_period | untouched chronological holdout |

## Model run prompt template

```text
You are a quant research agent working on Polymarket prediction-market data.

Goal: propose and test the strongest research-only strategy hypothesis from the provided data.

Constraints:
- no live trading, wallets, auth, or orders;
- no claims of profitability without reproducible evidence;
- avoid slippage and taker fees where possible;
- include conservative fees/slippage/latency/queue assumptions;
- use only data available at the historical timestamp;
- preserve an untouched chronological holdout;
- report drawdowns, trade count, exposure, loss clustering and failure modes;
- run Monte Carlo/bootstrap or similar robustness checks if enough trades exist;
- output strategy.md, assumptions.md, backtest_report.json and diagnostics.md.

Work until you have the best evidence-backed candidate you can produce, or reject the dataset as insufficient.
```

## Review-board scorecard

Each model candidate gets a 0–100 score.

| Category | Weight |
|---|---:|
| Economic thesis clarity | 15 |
| Data sufficiency / cleanliness | 10 |
| Leakage/lookahead controls | 15 |
| Execution realism: fees, slippage, latency, queue | 15 |
| Out-of-sample/holdout evidence | 15 |
| Drawdown / tail-risk / loss clustering | 10 |
| Robustness across markets/regimes | 10 |
| Simplicity and operational reliability | 5 |
| Paper-monitor readiness | 5 |

## Promotion gates

| Score | Decision |
|---:|---|
| 0–29 | Reject / archive |
| 30–49 | Research-only; needs better data or thesis |
| 50–64 | Build better replay/backtest; no paper yet |
| 65–79 | Eligible for paper monitor after review |
| 80+ | Strong paper-monitor candidate, still not live |

No model can self-promote to live.

## Usage ledger

Track:

```json
{"run_id":"...","model":"...","reasoning":"...","start":"...","end":"...","wall_seconds":0,"prompt_tokens":null,"completion_tokens":null,"tool_calls":0,"files_read":[],"artifacts":[],"score":null,"decision":"pending"}
```

If exact token/cost data is unavailable, record nulls plus wall time, tool calls and artifact count.

## First implementation slice

1. [x] Build `polymarket_model_tournament.py` that creates the folder structure and data manifest from existing QTF-018 outputs.
2. [x] Add static prompt templates.
3. [x] Add scorecard template.
4. [x] Add usage ledger schema.
5. [x] Run a dry-run tournament folder creation without calling external models.
6. [x] Add run-card generation, candidate output-contract validation, and review aggregation.
7. [x] Use the first actual tournament run layer to fill frontier/control/baseline candidate contracts and review scores.
8. [x] Build outcome/fill replay layer so scores use resolved market/fill evidence rather than scanner-contract evidence.
9. [x] Add automatic verified outcome resolver for settled Polymarket markets, then rerun replay with real outcomes.
10. [ ] Re-run resolver after the remaining 22 markets settle; only reconsider candidate scores if replay-proven fills appear.

## Second implementation slice — 2026-07-10

Added:

- per-model `run_card.md` with allowed inputs, required outputs, minimum `backtest_report.json` contract, and hard stops;
- `validate_model_run(model_dir)` to reject pending or incomplete strategy artifacts;
- `validate_tournament(tournament_dir)` to write `review_board/validation_summary.json`;
- `aggregate_review_scores(tournament_dir)` to read per-model `review_score.json`, rank candidates, apply promotion gates, and write `review_board/rankings.json` plus `review_board/decision.md`.

Validation behavior is intentionally strict: newly scaffolded model runs are marked invalid/unscored until a real model candidate fills the required artifacts and review score.

## Implementation evidence — 2026-07-10

Implemented files:

- `Implementation/polymarket_model_tournament.py`
- `Implementation/test_polymarket_model_tournament.py`

Verification:

```text
python -m pytest test_polymarket_edge_scanner.py test_polymarket_model_tournament.py -q
9 passed in 0.22s
```

Dry-run tournament created:

```text
Implementation/model_tournaments/2026-07-10-polymarket-btc-qtf020-contract-v3/
```

Dry-run data manifest summarized:

- candidate ledger rows: 116
- orderbook snapshot rows: 110
- PM-E03 rows: 61
- PM-E04 rows: 55
- market count from candidates: 38
- date range: 2026-07-09T23:58:40+00:00 to 2026-07-10T00:26:37+00:00

Contract validation command result:

```json
{
  "validation_status": "invalid",
  "invalid_runs": ["baseline_simple", "control_candidate", "frontier_candidate"],
  "aggregation_status": "ranked",
  "ranking_count": 3,
  "decisions": {
    "baseline_simple": "unscored",
    "control_candidate": "unscored",
    "frontier_candidate": "unscored"
  }
}
```

This is the expected result for a fresh scaffold: it proves the gate blocks empty/pending candidates rather than pretending a strategy exists.

## First actual tournament run layer — 2026-07-10

Created:

```text
Implementation/model_tournaments/2026-07-10-polymarket-btc-qtf020-first-actual-run/
```

Implemented `seed_first_actual_tournament_run(tournament_dir)`, which fills all three model contracts, writes `review_score.json` for each run, validates the tournament, and aggregates the rankings.

Result:

```json
{
  "validation_status": "valid",
  "aggregation_status": "ranked",
  "rankings": [
    {"model": "frontier_candidate", "score": 47.0, "decision": "research-only"},
    {"model": "control_candidate", "score": 39.0, "decision": "research-only"},
    {"model": "baseline_simple", "score": 25.0, "decision": "reject-archive"}
  ]
}
```

Interpretation: this is the first complete tournament run layer, but it remains **scanner-contract evidence only**. It does not claim profitability. Next layer should resolve market outcomes and replay passive fills.

## Outcome/fill replay layer — 2026-07-10

Implemented:

- `replay_outcome_fills(candidate_rows, outcome_map, ...)`
- `run_outcome_fill_replay(tournament_dir, ...)`

Artifacts written into the first tournament:

```text
review_board/outcome_fill_replay_summary.json
review_board/paper_replay_trades.jsonl
outcome_fill_replay_run_summary.json
shared_readonly_data/manual_outcomes_template.json
```

Verification:

```text
python -m pytest test_polymarket_edge_scanner.py test_polymarket_model_tournament.py -q
12 passed in 0.81s
```

Actual replay result on current data:

```json
{
  "candidate_rows": 116,
  "filled_trades": 0,
  "unresolved_markets": 38,
  "net_pnl": 0,
  "max_entry_price": 0.02
}
```

Interpretation: the replay layer works and blocks promotion. Current markets have no supplied verified outcomes and no replay-proven cheap fills, so candidates remain research-only/data-insufficient.

## Automatic verified outcome resolver — 2026-07-10

Implemented public-data resolution through:

```text
https://gamma-api.polymarket.com/markets/{market_id}
```

Acceptance rule:

- market must report `closed=true`;
- exactly one outcome price must be `>= 0.999`;
- all other outcome prices must be `<= 0.001`;
- pending/ambiguous/error markets are not treated as resolved;
- no winner is inferred from market wording or non-final probabilities.

Verified implementation:

```text
14 passed in 1.04s
```

Actual resolver/replay result:

```json
{
  "verified_count": 16,
  "pending_count": 22,
  "ambiguous_count": 0,
  "error_count": 0,
  "filled_trades": 0,
  "net_pnl": 0
}
```

Sixteen outcomes were verified, but none met the conservative two-cent paper-fill gate. Candidates therefore remain research-only.

Artifacts:

```text
shared_readonly_data/verified_outcomes.json
review_board/outcome_resolution_status.json
verified_outcome_resolver_run_summary.json
```

## Guardrails

- Research-only.
- Public data only.
- No wallet/API/private auth.
- Simulated fills only.
- Conservative adverse-selection assumptions.
- Explicit Jayse approval required before any paper/live automation beyond read-only evidence collection.
