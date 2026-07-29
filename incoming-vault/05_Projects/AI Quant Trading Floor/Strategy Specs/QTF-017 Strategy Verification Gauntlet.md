---
title: QTF-017 Strategy Verification Gauntlet
created: 2026-07-09
updated: 2026-07-09
type: quant-strategy-spec
status: draft
spec_id: QTF-017
tags: [quant, strategy-verification, gauntlet, forven, ai-agents, p-hacking, paper-trading, risk]
sources:
  - [[Forven Reddit Source Review - 2026-07-09]]
  - [[Native CORE_DEF Run Card Artifact Contract - 2026-07-09]]
  - [[Strategy Lab v2-v3 Sharpe Target Evidence]]
  - [[Vibe-Trading CORE_DEF Benchmark Comparison - 2026-07-09]]
confidence: high
---

# QTF-017 Strategy Verification Gauntlet

## Objective

Build a **native AI Quant Floor verification gauntlet** that prevents AI-generated, source-ingested, or optimized strategies from p-hacking their way into paper/live consideration.

The gauntlet is not a trading strategy. It is a staged evidence system for deciding whether a strategy candidate should be:

```text
archive / revise / backtest-more / paper-monitor / later-live-review
```

This spec is inspired by Forven's verification architecture, but should be implemented natively inside Jayse's Quant Floor and connected to the run-card artifact contract already added to `strategy_lab_v3.py`.

## Why this matters

The current Quant Floor can generate and test strategies, but as agent loops scale, the biggest risk becomes **selection bias**:

- LLMs can generate endless variants.
- Optimizers can overfit parameters.
- A weak idea can be rebranded and re-tested under a new name.
- A single lucky survivor can look like edge if we ignore how many siblings died.

QTF-017 makes the promotion path explicit and auditable.

Core principle:

> Assume every strategy is overfit garbage until it survives deterministic evidence gates.

## Non-negotiable safety boundaries

### Always

- Research/backtest/paper-only by default.
- Public or local historical data only unless explicitly approved.
- Signals must be calculated from data available at that historical bar.
- Execution must be next-bar or explicitly modeled.
- Costs/slippage must be included before any interpretation.
- Every gauntlet decision must save artifacts.
- Every candidate must carry its source lineage and sibling/cluster metadata.

### Ask first

- Adding a new dependency.
- Adding exchange/broker adapters.
- Running an external repo such as Forven beyond static inspection.
- Starting long-running daemons or web servers.
- Scheduling recurring jobs.
- Any paper monitor that uses non-public data or credentials.

### Never

- No live orders.
- No exchange/broker auth.
- No wallet/private-key use.
- No credential storage in notes, repos, or logs.
- No strategy promotion based only on in-sample return.
- No “profitable” claim without benchmark, costs, drawdown, and out-of-sample evidence.
- No Martingale/risk-escalation rescue logic as a promotion path.

## Candidate lifecycle

```text
idea_intake
→ deterministic_spec
→ smoke_backtest
→ benchmark_comparison
→ quick_screen_gate
→ validation_optimization
→ confirmation_backtest
→ walk_forward
→ cost_stress
→ monte_carlo_bootstrap
→ parameter_jitter
→ regime_split
→ deflated_sharpe_selection_bias
→ paper_monitor_gate
→ review_board_decision
```

Each stage emits a machine-readable status:

```text
pass | fail | revise | blocked_data | blocked_runtime | needs_human_review
```

## Stage definitions

### 1. `idea_intake`

Purpose: record where the idea came from before testing begins.

Inputs:

- source URL / video / repo / note / manual idea,
- author/source reliability,
- asset class,
- timeframe,
- claimed edge,
- explicit unknowns.

Artifacts:

```text
intake.json
source_summary.md
raw_source_pointer.txt
```

Pass criteria:

- Source is preserved or limitation is documented.
- Idea can be described without hidden proprietary steps.
- No immediate safety disqualifier.

Fail/archive criteria:

- Requires unavailable private data.
- Requires live execution to test.
- Uses Martingale/grid doubling as the core edge.
- Contains no testable rule or hypothesis.

### 2. `deterministic_spec`

Purpose: convert vague idea into exact mechanical rules.

Required fields:

- strategy ID,
- hypothesis,
- market/timeframe,
- indicators/features,
- entry rules,
- exit rules,
- sizing,
- fees/slippage,
- benchmark,
- failure modes,
- promotion/rejection thresholds.

Artifacts:

```text
strategy_spec.md
strategy_spec.json
```

Pass criteria:

- Another agent/human can implement the strategy without guessing.
- Signals are non-repainting.
- Benchmark is defined.

### 3. `smoke_backtest`

Purpose: prove the implementation runs and produces sensible artifacts.

Artifacts:

```text
run_card.md
run_card.json
artifacts/metrics.csv
artifacts/trades.csv
artifacts/equity.csv
artifacts/positions.csv
source_data/*.csv
```

Pass criteria:

- Backtest completes.
- Trades/positions/equity files are produced.
- No NaN/infinite metrics.
- Data period and symbol coverage are documented.

Fail criteria:

- Runtime failure.
- Obvious lookahead/repainting.
- No trades when the strategy was expected to trade, unless documented.

### 4. `benchmark_comparison`

Purpose: compare against simple alternatives.

Required benchmarks:

- buy-and-hold for same asset/universe,
- cash/SHY style defensive baseline for ETF cores,
- existing Quant Floor candidate where comparable,
- random/naive baseline where relevant.

Pass criteria:

- Strategy beats or justifies underperformance versus benchmark on risk-adjusted basis.
- Drawdown is not materially worse without compensation.

Fail/revise criteria:

- Underperforms benchmark on both return and drawdown.
- Only beats benchmark before fees.

### 5. `quick_screen_gate`

Purpose: cheap early rejection before expensive tests.

Suggested initial thresholds by sleeve:

| Sleeve | Min Sharpe | Max DD | Min trades | Notes |
|---|---:|---:|---:|---|
| ETF core | `0.8` | `-15%` | `30` | Should be stable, lower drawdown |
| Crypto daily/4h | `0.8` | `-30%` | `50` | Higher volatility allowed |
| Intraday crypto | `0.5` | `-35%` | `100` | Must include fees/slippage strongly |
| Prediction/alt venue | TBD | TBD | TBD | Needs outcome-specific model |

Pass criteria:

- Meets sleeve-specific basic thresholds.
- No leak flags.
- No catastrophic drawdown.

### 6. `validation_optimization`

Purpose: limited one-variable or small-grid parameter check, not brute-force p-hacking.

Rules:

- Parameter grid must be declared before running.
- Trial count must be saved.
- Optimization objective must penalize drawdown and instability.
- Do not optimize on the final holdout/paper period.

Artifacts:

```text
optimization_trials.csv
optimization_summary.json
```

Pass criteria:

- Winning parameters are not isolated spikes.
- Neighboring parameter values are not catastrophic.
- Trial count is available for DSR/selection-bias stage.

### 7. `confirmation_backtest`

Purpose: rerun chosen parameters once, cleanly, with the artifact contract.

Pass criteria:

- Results match/approximate optimization summary.
- Run is independently reproducible from config and strategy hash.

### 8. `walk_forward`

Purpose: verify performance across chronological folds.

Initial rule:

- Minimum 4 folds where data allows.
- Prefer 5 folds for daily ETF/crypto systems.

Pass criteria:

- At least 60% profitable folds for research watchlist.
- At least 80% profitable folds for paper-monitor consideration.
- No single fold has unacceptable sleeve-specific drawdown.

CORE_DEF reference currently satisfies:

```text
profitable_windows: 5/5
consistency_rate: 1.0
```

### 9. `cost_stress`

Purpose: test whether the edge survives worse execution assumptions.

Stress levels:

| Level | Fees/slippage multiplier |
|---|---:|
| Base | `1x` |
| Conservative | `2x` |
| Severe | `3x` |

Pass criteria:

- Research candidate: survives `2x` costs without flipping negative on core metrics.
- Paper candidate: still acceptable at `2x`; documented degradation at `3x`.

Fail criteria:

- Strategy only works at unrealistically low costs.
- Profit factor collapses below 1 under conservative costs.

### 10. `monte_carlo_bootstrap`

Purpose: estimate robustness of realized returns/trades.

Required outputs:

```text
bootstrap_sharpe_ci
median_return_forecast
p05_return_forecast
p95_return_forecast
prob_profit
max_drawdown_distribution
```

Pass criteria:

- Probability of positive outcome is acceptable for sleeve.
- Sharpe CI is not wholly dependent on one lucky path.
- Low trade count is flagged as unreliable.

### 11. `parameter_jitter`

Purpose: check whether small parameter changes destroy the edge.

Method:

- Nudge key parameters ±10% where meaningful.
- For discrete windows, test nearby values.
- Record all variants.

Pass criteria:

- Most nearby variants remain same decision class.
- No narrow single-point “needle” result.

Fail/revise criteria:

- Edge evaporates with tiny changes.
- Only one exact parameter set works.

### 12. `regime_split`

Purpose: identify which market conditions support or kill the strategy.

Regime tags may include:

- risk-on,
- risk-off,
- high-vol,
- low-vol,
- trend,
- chop,
- crypto bull/bear,
- rates up/down,
- USD strength/weakness.

Pass criteria:

- Strategy has a clear regime profile.
- Bad regimes are known and can be gated or sized down.

Future extension:

- “Regime champions” — maintain best strategy per regime, but only after evidence.

### 13. `deflated_sharpe_selection_bias`

Purpose: penalize optimizer and swarm-generated selection bias.

Inputs:

- observed returns,
- sample length,
- skew/kurtosis,
- optimizer trial count,
- sibling hypothesis count,
- repeated-cluster count from hypothesis graveyard.

Effective trial count:

```text
effective_trials = max(1, optimizer_trials) * max(1, sibling_hypotheses_in_cluster)
```

Required outputs:

```text
deflated_sharpe_ratio
sr0_selection_benchmark
n_obs
optimizer_trials
sibling_cluster_trials
effective_trials
trial_count_source
```

Pass criteria for paper consideration:

- DSR is positive and not obviously selection-artifact dominated.
- If DSR is weak but other evidence is strong, mark `needs_human_review`, not auto-pass.

Fail/revise criteria:

- Strategy only looks good after many hidden sibling attempts.
- Same cluster has repeated failed variants and the new candidate does not materially differ.

### 14. `paper_monitor_gate`

Purpose: decide if the strategy can enter paper monitoring.

Minimum paper gate for ETF core:

- Max DD under 15%.
- Sharpe preferably above 1.0, minimum 0.8 with strong stability.
- Walk-forward positive in at least 4/5 windows.
- Cost stress survives 2x.
- Parameter jitter not fragile.
- Benchmark comparison acceptable.
- DSR/selection-bias reviewed.
- Clear stop/review conditions.

Paper monitor outputs:

```text
paper_plan.md
paper_ledger.jsonl
review_schedule.md
kill_conditions.json
```

### 15. `review_board_decision`

Purpose: human-readable final decision.

Decision classes:

| Decision | Meaning |
|---|---|
| `archive` | Not worth revisiting unless source changes |
| `revise` | Modify hypothesis/spec and retest |
| `watchlist` | Interesting but not paper-ready |
| `paper_monitor` | Approved for paper tracking only |
| `live_review_candidate` | Eligible for separate live-scope review, not automatic live approval |

Live is never automatic. It requires a separate human-approved scope:

```text
venue + account + capital + max loss + order types + kill switch + monitoring + rollback
```

## Hypothesis graveyard

The gauntlet needs a ledger of falsified strategy families so agents cannot keep rediscovering the same dead idea.

Suggested file:

```text
Implementation/ledgers/hypothesis_graveyard.jsonl
```

Fields:

```json
{
  "cluster_id": "momentum_rsi__btc__4h",
  "family": "momentum_rsi",
  "asset_class": "crypto",
  "symbols": ["BTCUSDT"],
  "timeframe": "4h",
  "first_seen": "2026-07-09T00:00:00Z",
  "last_tested": "2026-07-09T00:00:00Z",
  "attempt_count": 12,
  "best_strategy_id": "QTF-X",
  "best_decision": "revise",
  "failure_reasons": ["cost_stress_fail", "parameter_jitter_fragile"],
  "notes": "Do not retest plain RSI+momentum without a materially new regime filter."
}
```

Usage:

- Before generating a new strategy, check similar clusters.
- If a cluster is repeatedly falsified, require a material novelty note.
- Feed `attempt_count` into DSR effective trial count.

## Artifact contract

Every gauntlet run should use or extend the native run-card bundle:

```text
run_card.md
run_card.json
config.json
code/strategy.py
artifacts/metrics.csv
artifacts/trades.csv
artifacts/equity.csv
artifacts/positions.csv
artifacts/validation.json
source_data/*.csv
artifacts/gauntlet_score.json
artifacts/gauntlet_steps.jsonl
```

`gauntlet_score.json` should include:

```json
{
  "strategy_id": "CORE_DEF-L252-T1-VT0.08",
  "decision": "watchlist",
  "stage_status": {
    "smoke_backtest": "pass",
    "walk_forward": "pass",
    "cost_stress": "pending",
    "parameter_jitter": "pending",
    "deflated_sharpe_selection_bias": "pending"
  },
  "headline_metrics": {
    "sharpe": 1.1146,
    "max_dd_pct": -9.8765,
    "trades": 122
  },
  "blocking_reasons": [],
  "review_notes": [
    "Below aspirational Sharpe 1.6-1.8 target; paper/research only."
  ]
}
```

## Integration points

### Existing native Quant Floor files

Likely first implementation touchpoints:

```text
Implementation/strategy_lab_v3.py
Implementation/test_strategy_lab_v3_artifacts.py
Implementation/reports/runs/*
Implementation/ledgers/
```

### Existing evidence base

- [[Native CORE_DEF Run Card Artifact Contract - 2026-07-09]] proves the artifact bundle works.
- [[Strategy Lab v2-v3 Sharpe Target Evidence]] provides current best CORE_DEF benchmark.
- [[Forven Reddit Source Review - 2026-07-09]] provides the source pattern.

## Commands

Current known verification command for native run-card artifact contract:

```bash
cd "C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Quant Trading Floor/Implementation"
python -m pytest test_strategy_lab_v3_artifacts.py test_moondev_orderbook_gate.py test_moondev_market_maker_lab.py test_opening_range_lab.py -q
python strategy_lab_v3.py --core-def-bundle
```

Future QTF-017 target command:

```bash
python strategy_lab_v3.py --core-def-bundle --gauntlet
```

Alternative future command if split into its own module:

```bash
python strategy_gauntlet.py --run-id <run_dir_or_strategy_id>
```

## Initial implementation plan

### Slice 1 — Native gauntlet score artifact

Add a lightweight `gauntlet_score.json` emitted by `--core-def-bundle`.

Acceptance:

- Existing tests pass.
- New test confirms `artifacts/gauntlet_score.json` exists.
- Score includes stage statuses and decision.

### Slice 2 — Cost stress for CORE_DEF

Run CORE_DEF with 1x, 2x, 3x cost settings.

Acceptance:

- `artifacts/cost_stress.csv` produced.
- `gauntlet_score.json` records pass/fail.

### Slice 3 — Parameter jitter for CORE_DEF

Test nearby lookbacks and vol targets:

```text
lookback: 189, 225, 252, 275, 300
vol_target: 0.06, 0.08, 0.10
```

Acceptance:

- `artifacts/parameter_jitter.csv` produced.
- Decision marks fragile if only one exact config works.

### Slice 4 — Hypothesis graveyard ledger

Add JSONL ledger and simple cluster ID function.

Acceptance:

- Repeated dead clusters count toward `sibling_cluster_trials`.
- A test covers repeated cluster lookup.

### Slice 5 — DSR / selection-bias check

Implement DSR with effective trial count.

Acceptance:

- `artifacts/selection_bias.json` produced.
- DSR stage handles insufficient trades/returns gracefully.

### Slice 6 — Strategy intake queue integration

Connect daily briefs/source reviews to gauntlet intake.

Acceptance:

- A source idea can be queued as `idea_intake` without implementation.
- The next action is explicit: archive/spec/backtest.

## Success criteria for QTF-017 MVP

- [ ] Existing native CORE_DEF run emits `gauntlet_score.json`.
- [ ] Cost-stress and parameter-jitter artifacts exist for CORE_DEF.
- [ ] Hypothesis graveyard ledger prevents repeated dead-family testing.
- [ ] Selection-bias metadata includes optimizer and sibling-cluster counts.
- [ ] Obsidian evidence note is generated/updated after each gauntlet run.
- [ ] No broker/exchange auth or live orders are introduced.
- [ ] All implementation tests pass.

## Open questions

1. Should QTF-017 live inside `strategy_lab_v3.py` initially, or become a separate `strategy_gauntlet.py` once cost stress/jitter expands?
2. What exact DSR threshold should be informational vs blocking for Jayse's ETF core?
3. Should the first graveyard cluster key be simple/manual, or use embeddings/text similarity from the Second Brain later?
4. Should paper monitor approval require human confirmation every time, even if all gates pass? Recommended answer: **yes**.

## Initial verdict

QTF-017 should be the next native Quant Floor architecture layer before any Forven sandbox pilot.

Forven is useful as a reference because it names the right problem: AI agents can generate many plausible strategies, but most should die in validation. Quant Floor should adopt the staged verification and anti-p-hacking logic natively, starting with CORE_DEF as the known baseline.
