# Prediction Trading Bot Updated Punchlist

Generated: 2026-05-18
Branch: codex/paper-execution-engine
Baseline: docs/punchlists/prediction_bot_punchlist_2026-05-16.md, generated 2026-05-16

## Executive Summary

The prediction-trading-bot has moved from broad paper-runtime visibility into
more operator-grade diagnosis: row-level inspection, scoped lineage health and
repair, alert episode history, durable operational records, and a BTC
context-to-proposal-to-rejection investigation workflow. The safety posture is
unchanged: live trading remains blocked by default and the project should still
be treated as a research and paper-trading platform until compliance,
jurisdiction, operator, secret-management, venue, and risk gates are explicitly
cleared.

Since the 2026-05-16 punchlist, the largest progress areas are audit lineage
inspection, PnL snapshot lineage, scoped PnL trend comparison, lineage
diagnostics and repair, alert closure/history, real BTC context ingestion,
derivatives context risk gates, BTC proposal/rejection review diagnostics, and
CI-facing fixes around real database row payload handling and persisted
operational records. The current phase adds the Why Not Trade research queue so
persisted proposal-review and risk-review rejections can explain why the system
stayed out of a trade before any paper or live execution path is considered.

## Progress Snapshot

![Project progress snapshot](../../output/pdf/prediction_bot_progress_2026-05-18.png)

This visual is a planning view of tracked punchlist items, not a live-readiness
claim. Completed work is counted globally from the punchlist; remaining backlog
is grouped by the phases below. The 26 completed / 12 remaining split is
supported by recent repository history and is approximately 68% complete.

| Status | Count | Share |
| --- | ---: | ---: |
| Completed overall | 26 | 68% |
| Remaining phase backlog | 12 | 32% |

| Remaining phase | Open items |
| --- | ---: |
| Phase 1 - Paper Operations Verification | 2 |
| Phase 2 - Operator Alert And Lineage Polish | 1 |
| Phase 3 - Research And BTC Context Hardening | 4 |
| Phase 4 - Documentation And Operations | 2 |
| Phase 5 - Compliance-First Live Readiness | 3 |

## Completed Overall

- Foundation monorepo with FastAPI backend, Next.js dashboard, shared Python
  contracts, Docker Compose, CI, config, logging, and environment templates.
- PostgreSQL/Timescale schema plus additive migrations through operator command
  metadata, alert resolution, promotion workflow, PnL lineage, alert episode
  history, operational records, and BTC review evidence additions.
- Public Polymarket Gamma and CLOB ingestion with polling cycles, automatic
  active token discovery, raw-event persistence, source health, and order-book
  analytics.
- Conservative risk engine with fixed sizing, Kelly shadow values, stale-data
  blocking, rejection reasons, stop/target/time-stop requirements, and paper
  proposal gating.
- Mean-reversion research signal generation with deterministic signal IDs and
  zero-signal tolerance when thresholds are not met.
- Evidence ledger, strategy quarantine/promotion/disable workflow, and
  promotion-to-proposal/risk review evidence.
- Idempotent paper execution from stored approved risk decisions only, with
  paper orders, fills, positions, mark-to-market accounting, realized/unrealized
  PnL, portfolio snapshots, and close review for stop/target/time-stop exits.
- Paper runtime monitor covering counts, exposure, PnL, stale/unmarked marks,
  skipped accounting actions, close events, and strategy/category drilldowns.
- Deterministic seed and simulation fixtures for approval, no-signal,
  stale-data rejection, target close, stop close, time-stop, missing midpoint,
  stale mark, exit-not-triggered, and populated mixed-runtime paths.
- Replay validation reporting and persisted replay history with scenario
  coverage, rejection/exit counts, hit rate, drawdown, PnL waterfall,
  calibration notes, and promotion gate warnings.
- Backtest research controls, persisted parameter sweep and walk-forward runs,
  research artifact drilldowns, and dashboard views for parameter sets,
  scenario evidence, and promotion diagnostics.
- Operator safety reads and commands for pause, kill switch, strategy disable,
  promotion gate actions, command history, kill-switch history, alert
  acknowledgement, and alert resolution.
- Operational alerts for degraded source health, paper runtime mark attention,
  drawdown halt, acknowledgement audit, resolution audit, repeated API/source
  failures, accounting failures, and scoped lineage integrity issues.
- Operator command filters by strategy, command ID, recommendation ID, and
  evidence event ID.
- Operator decision timeline connecting operator commands to strategy evidence,
  replay validation, paper lineage evidence, paper orders, fills, positions, and
  accounting events.
- Link summary, per-event IDs, entity metadata, and Linked Audit IDs chips for
  operator decision timeline payloads.
- Clickable timeline audit chips that open an operator detail view with the
  linked ID, link source, confidence, event, entity, and reason.
- Row-level audit lineage inspect actions and audit lineage drilldowns for
  focused operator investigation.
- PnL snapshot drilldowns, backend snapshot lineage, persisted PnL evidence
  links, historical snapshot lineage, snapshot history selection, and portfolio
  trend dashboard support.
- Backend-owned PnL trend policy, trend filters, scoped PnL comparison controls,
  comparison drilldowns, and scoped lineage database regression coverage.
- Scoped PnL evidence links and scoped PnL lineage integrity repair.
- Stale scoped lineage review workflow, scoped lineage health history, and
  alerts for scoped lineage integrity issues.
- Alert episode history and repeated source/accounting failure alerts.
- Durable operational record persistence and real database row payload handling
  for CI-facing read paths.
- Real BTC context ingestion, dashboard mock hardening, derivatives context risk
  gates, and BTC short-timeframe proposal path.
- BTC readiness diagnostics, proposal review diagnostics, persisted BTC review
  rejection evidence, and BTC rejection investigation workflow.
- Next.js dashboard covering source health, analytics, signals, proposals, risk
  rejections, Why Not Trade analysis, replay validation, backtest research,
  strategy promotion, paper runtime, exposure, skipped actions, alerts,
  operator intervention, command filters, decision timeline audit views, PnL
  trends, scoped lineage, and BTC context/review surfaces.

## Completed Since Previous Punchlist

The previous punchlist was generated on 2026-05-16. Since then:

- Row-level inspect and audit lineage investigation was added:
  - f66676f Add row-level audit lineage inspect actions
  - 3b9a597 Add audit lineage drilldown
- PnL snapshot lineage and trend inspection expanded:
  - 2f8fd7e Add PnL snapshot drilldown
  - 63bdf7a Add backend PnL snapshot lineage
  - b579dfa Persist PnL snapshot evidence links
  - 4083b2b Support historical PnL snapshot lineage
  - ae13a0a Add PnL snapshot history selector
  - a9c04e4 Add portfolio trend dashboard
  - 38d93be Add backend-owned PnL trend policy
  - 14440ae Add scoped PnL trend filters
  - 7ae4c14 Add scoped PnL comparison drilldowns
  - 1c2c8d7 Add scoped PnL comparison controls
- Lineage diagnostics, repair, and regression coverage were added:
  - 8662fe1 Add scoped PnL lineage DB regression
  - 22f2c70 Add scoped PnL evidence links
  - b6a1b3c Add scoped PnL lineage integrity repair
  - fccfc1f Add stale scoped lineage review workflow
  - e430d04 Add scoped lineage health history
  - 8381418 Alert on scoped lineage integrity issues
- Alert closure/history and operational persistence advanced:
  - 9ff951e Add alert episode history
  - 7b6921b Alert on repeated source and accounting failures
  - ac7f380 Persist operational records
  - adf9b42 Handle real database row payloads
- BTC context, proposal, and rejection investigation workflow was added:
  - 80605a6 Add real BTC context ingestion
  - 1daa435 Harden BTC context dashboard mock
  - b0bbcef Add derivatives context risk gates
  - df8e692 Add BTC short timeframe proposal path
  - d4a38cc Add BTC readiness diagnostics
  - 2036efc Add BTC proposal review diagnostics
  - bedd76a Persist BTC review rejection evidence
  - 7bc3831 Add BTC rejection investigation workflow
- Current phase: added the Why Not Trade queue endpoint and dashboard panel,
  summarizing persisted proposal-review and risk-review rejections by reason,
  source freshness, market, investigation status, and promotion/risk impact.

## Verification Snapshot

Verification combines the recent CI-oriented history with local checks from this
phase. Recent changes explicitly covered database-row handling, lineage
regression, alert history, operational record persistence, BTC rejection
investigation workflow paths, and the new Why Not Trade queue.

Local verification for this report and phase included:

- python scripts\generate_punchlist_artifacts.py
  - expected outputs: PNG progress chart, PDF report, and DOCX report under
    output\pdf
- python -m pytest tests/unit/test_api_read_repository.py
  tests/unit/test_api_observability.py tests/unit/test_dashboard_operator_detail.py -q
- npm run typecheck, from apps/dashboard
- npm run e2e -- replay-drilldown.spec.ts, from apps/dashboard

## Remaining Punchlist By Phase

### Phase 1 - Paper Operations Verification

- Run full Docker Compose smoke from ingestion through dashboard with a
  populated database, persisted paper exits, alert history, and BTC context
  review data.
- Verify repeated polling idempotency across signals, proposals, approvals,
  orders, fills, positions, marks, closes, replay runs, backtest runs, PnL
  snapshot lineage, alerts, and BTC review records.

### Phase 2 - Operator Alert And Lineage Polish

- Keep operator timeline, row-level inspect actions, lineage health, and alert
  episode history aligned so source-specific drilldowns do not overclaim
  causality when links are derived or repaired.

### Phase 3 - Research And BTC Context Hardening

- Move beyond deterministic fixtures into historical replay datasets.
- Validate parameter sweeps and walk-forward comparisons against real replay
  windows, not only synthetic scenario coverage.
- Persist dataset IDs, code/commit refs, calibration assumptions, stale-run
  warnings, and source-data fingerprints for BTC context and strategy research.
- Tighten promotion criteria before allowing longer-running paper proposal
  generation from research strategies or BTC short-timeframe paths.

### Phase 4 - Documentation And Operations

- Update README, runbook, architecture, risk controls, and status reports for
  replay/backtest/promotion/timeline, PnL lineage, alert history, BTC context,
  and Why Not Trade surfaces.
- Add a formal operator runbook for replay validation, promotion gate review,
  command timeline inspection, alert closure, lineage repair, BTC rejection
  investigation, and paper runtime triage.

### Phase 5 - Compliance-First Live Readiness

- Keep live execution blocked.
- Maintain a separate live-readiness checklist covering legal access, venue
  terms, jurisdiction, dedicated wallet, secrets, operator attestation,
  observability, incident response, rollback, and sandbox/live connector tests.
- Do not introduce production credentials until paper, replay, BTC context, and
  rejection review validation have run for a sustained period with documented
  results.

## Risks And Mitigations

- Risk: deterministic replay and BTC context diagnostics may overstate strategy
  validity.
  Mitigation: add historical replay datasets, walk-forward validation,
  paper-only labels, source-data fingerprints, and performance decay alerts.
- Risk: promotion gate actions or BTC proposal paths may look like live
  approval.
  Mitigation: keep promotion scoped to paper proposals only and require separate
  compliance/operator/live gates.
- Risk: lineage repairs can hide the original failure mode if only the repaired
  path is shown.
  Mitigation: keep repair events, health history, scoped diagnostics, and raw
  audit payloads visible in row-level inspect views.
- Risk: recurring alert rows can obscure repeated operational incidents.
  Mitigation: retain alert episode history and make closure/reopen behavior
  explicit in operator views.
- Risk: external public data can be stale, sparse, or unavailable.
  Mitigation: continue using source health, freshness checks, stale-data risk
  rejections, BTC readiness diagnostics, and zero-signal tolerance.
- Risk: dashboard density may make operator decisions hard to inspect.
  Mitigation: keep compact summaries in rows, move details to drilldowns, and
  preserve the Why Not Trade queue as the current non-trade review surface.

## Recommended Next 3 Build Phases

1. Deepen the Why Not Trade queue with filters, row-level lineage drilldowns,
   and operator review actions for risk-review rejections in addition to BTC
   proposal-review rejections.
2. Run the full Docker Compose smoke with seeded operational records, scoped
   lineage history, alert episodes, and BTC rejection evidence.
3. Add historical replay datasets and walk-forward validation with persisted
   dataset IDs, source fingerprints, calibration assumptions, and decay alerts.

## Assumptions

- This report does not claim live trading has been enabled or validated.
- The current project remains a paper/research platform.
- Polymarket or other venue live execution remains blocked until legal,
  jurisdiction, and compliance requirements are cleared.
- The tracked markdown remains the source of truth for future artifact updates.
