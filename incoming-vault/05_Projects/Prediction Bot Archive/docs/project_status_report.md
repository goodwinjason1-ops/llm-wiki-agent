# Project Status Report

Generated: 2026-05-15

## Executive Summary

The prediction-trading-bot repo is a risk-first prediction-market research and
paper-trading platform. The foundation is substantially built: public
Polymarket ingestion, order-book analytics, research signal generation,
operator-controlled strategy promotion/quarantine, risk-reviewed proposal
creation, idempotent paper execution, paper accounting, paper position close
review, deterministic DB-backed paper runtime seeding, paper runtime
monitoring, persisted operator intervention reads, API reads, audited alert
acknowledgements and resolution, operational alert generation, deterministic
edge-case seed modes, dashboard views, Docker Compose, and CI workflow
definitions are present.

Live trading should remain blocked. Current defaults are paper-only, with live
execution gated by `ENABLE_LIVE_TRADING=false`,
`JURISDICTION_COMPLIANCE_ATTESTED=false`, and
`OPERATOR_LIVE_CONFIRMATION=false`. The practical next milestone is to harden
operator-grade paper monitoring and run longer paper/replay validation before
any live-readiness discussion.

## Built So Far

- Shared Python contracts/config for settings, enums, proposals, risk
  decisions, paper orders, fills, positions, source health, and operator
  commands.
- Conservative risk engine with fixed sizing, rejection reasons, Kelly shadow
  audit values, stale-data blocking, and trade-level stop/target/time-stop
  requirements.
- Public Polymarket Gamma and CLOB connectors, including one-shot ingestion,
  polling cycles, automatic active token discovery, raw-event persistence, and
  source-health tracking.
- PostgreSQL/TimescaleDB schema and additive migrations through
  `0008_alert_resolution_audit.sql`.
- Order-book snapshot analytics and rolling stats used by the mean-reversion
  research strategy.
- Research `StrategySignal` generation with deterministic `signal_id` values
  and zero-signal tolerance when thresholds are not met.
- Operator-controlled strategy state workflow: quarantined, promoted, disabled,
  plus evidence-ledger events for promotion-to-proposal and risk review.
- Paper proposal generation from promoted signals and risk-reviewed proposal
  handling.
- Idempotent paper execution from stored approved risk decisions, with paper
  orders, fills, and open positions.
- Paper mark-to-market accounting from latest stored order-book midpoints,
  portfolio snapshots, and PnL snapshots.
- Paper position close review for stop, target, and time-stop exits, including
  proposal/order linkage, realized PnL, and close reason persistence.
- Paper runtime monitoring through `/paper/runtime`, including paper order/fill
  counts, open/closed positions, stale or unmarked marks, close events, exposure,
  realized/unrealized PnL, strategy/category exposure, active skipped mark/close
  reasons, and last accounting/close timestamps.
- Deterministic `seed-paper-runtime` CLI path that creates a local simulation
  market and persists signal, proposal, risk approval, paper order, fill,
  position, mark-to-market, target close, evidence, and PnL records for Docker
  smoke checks.
- Persisted operator read APIs for command history, kill-switch history, and
  alert state through `/operator/commands`, `/operator/kill-switch/events`, and
  `/alerts`.
- Audited alert acknowledgement through `/alerts/{alert_id}/acknowledge`,
  linked to persisted operator commands and alert audit fields.
- Audited alert resolution through `/alerts/{alert_id}/resolve`, with
  unresolved and resolved alert filters kept separate from acknowledgement.
- Deduped operational alert generation for degraded source health, paper
  runtime mark attention, and daily drawdown halt thresholds.
- Optional deterministic `seed-paper-runtime --scenario all` matrix for
  approved close, stale-data rejection, missing midpoint, stale mark, and
  exit-not-triggered skipped-action smoke checks.
- FastAPI read/operator API for health, markets, source health, analytics,
  signals, strategies, evidence, proposals, risk decisions, paper orders, fills,
  positions, PnL, paper runtime, dashboard summary, pause, kill switch, and
  strategy state commands.
- Next.js dashboard with source health, rolling analytics, signals, rejections,
  rejected-risk sizing/threshold detail, paper runtime health, exposure drilldowns, skipped-action views with proposal/position lineage and exit thresholds,
  safety/operator intervention, alert views, and API-backed status surfaces.
- Docker Compose local stack for Postgres, Redis, API, dashboard, ingestion
  worker/poller, Prometheus, Grafana, and Loki.
- GitHub Actions CI workflow for backend lint/typecheck/tests/migration
  validation and dashboard typecheck/build.

## Verification/CI Status

Verification highlights:

- `python -m ruff check .` passed.
- `python -m mypy packages services apps` passed: 46 source files checked.
- `python scripts/validate_migration.py` passed: migration validation ok.
- `npm run typecheck` in `apps/dashboard` passed.
- `npm run build` in `apps/dashboard` passed with Next.js production build;
  the dashboard config now limits local build worker fan-out for more reliable
  Windows/OneDrive builds.
- `python -m pytest` passed: 139 passed.
- Docker Compose core stack rebuilt and started for Postgres, Redis, API,
  ingestion, and dashboard.
- Existing Postgres volume accepted additive migrations through
  `0007_alert_acknowledgement_audit.sql`.
- One bounded container polling cycle completed with public Polymarket data:
  `markets_fetched=1`, `tokens=1`, `books_fetched=1`, `snapshots=1`,
  `analytics=0`, `signals_generated=0`, and `signals=0`.
- Container API smoke returned `status=ok` for `/health`.
- Container paper runtime smoke returned `status=ok` for `/paper/runtime`, with
  zero paper orders/fills/open positions, no stale or unmarked marks, and the
  runtime payload shape available for strategy/category exposure and skipped
  actions.
- Container operator safety smoke returned persisted command history from
  `/operator/commands`, current kill-switch state from
  `/operator/kill-switch/events`, and `status=ok` from
  `/alerts?acknowledged=false`.
- Container alert acknowledgement smoke accepted the first
  `/alerts/{alert_id}/acknowledge` request, exposed
  `acknowledged_command_id` on the acknowledged alert read, and rejected a
  repeat acknowledgement without overwriting the original audit record.
- One bounded container polling cycle completed after the rebuild with public
  Polymarket data: `markets_fetched=1`, `tokens=1`, `books_fetched=1`,
  `snapshots=1`, `analytics=0`, `signals_generated=0`, and `signals=0`.
- Browser smoke loaded `http://localhost:3000`, confirmed the smoke alert and
  acknowledgement control rendered, clicked the acknowledgement action, verified
  the alert disappeared and the Alerts panel returned to `ok`, and found no
  relevant console warnings or framework error overlay.
- Current build pass added the deterministic seed command and enriched
  rejected/skipped drilldown payloads; focused verification passed with
  `python -m pytest tests\unit\test_api_read_repository.py tests\unit\test_api_observability.py tests\unit\test_paper_runtime_seed.py tests\unit\test_ingestion_cli.py -q`
  and `npm run typecheck` in `apps/dashboard`.
- Final local verification for this pass also passed `python -m ruff check .`,
  `python -m mypy packages services apps` with 47 source files checked,
  `python -m pytest -q` with 141 tests passing, `python scripts\validate_migration.py`,
  and `cmd /c npm run typecheck` in `apps/dashboard`.
- Docker verification rebuilt the API, ingestion, and dashboard images, then
  ran `seed-paper-runtime` successfully with `signals=1`, `proposals=1`,
  `risk_approved=1`, `paper_executed=1`, `paper_marked=1`,
  `paper_closed=1`, `open_positions=0`, `closed_positions=1`,
  `approved_notional=23.7500`, `unrealized_pnl=3.5625`, and
  `realized_pnl=5.9375`.
- Re-running `seed-paper-runtime` against the same Docker volume produced the
  same one-signal/one-proposal/one-order/one-fill/one-closed-position result,
  confirming the default reset path is repeatable for the deterministic seed.
- Direct Postgres count checks after the rerun confirmed the deterministic seed
  market has exactly one signal, one proposal, one risk decision, one paper
  order, one fill, and one position.
- Container API smoke after seeding returned `status=ok`, one proposal, one risk
  decision with enriched stop/target fields, one paper order, one fill, one
  closed position, realized PnL of about `$5.94`, zero open exposure, and
  `/paper/runtime` counts showing one paper order and one closed position.
- Browser smoke loaded `http://localhost:3000` after the seed and confirmed the
  dashboard rendered seeded paper PnL, runtime counts, order/fill/position rows,
  risk threshold/Kelly context, strategy promotion state, source health, and
  evidence ledger entries.
- Current phase verification on 2026-05-15 passed `python -m pytest -q` with
  148 tests, `python -m ruff check .`, `python -m mypy packages services apps/api`,
  `python scripts/validate_migration.py`, `npm run build`, and `npm run typecheck`
  after the Next build generated `.next/types`.
- Docker core stack rebuilt successfully for Postgres, Redis, API, dashboard,
  ingestion, and ingestion-poller. Existing Postgres volume accepted
  `0008_alert_resolution_audit.sql`.
- Container `seed-paper-runtime --scenario all` completed with `signals=5`,
  `proposals=5`, `risk_approved=4`, `risk_rejected=1`, `paper_executed=4`,
  `paper_marked=1`, `paper_closed=1`, `skipped_seed_positions=3`,
  `open_positions=3`, and `closed_positions=1`.
- Container API smoke confirmed `/risk/decisions` exposes the stale-data
  rejection and `/paper/runtime` exposes `missing_midpoint`, `stale_mark`, and
  `exit_not_triggered` skipped actions.
- Container alert resolution smoke accepted `/alerts/{alert_id}/resolve`,
  removed the alert from `/alerts?resolved=false`, and exposed the closure audit
  fields from `/alerts?resolved=true`.

The repo is locally green for the available backend checks, migration
validator, dashboard build/typecheck, core Docker alert/API smoke, and
dashboard Browser smoke.

## Remaining Punch List by Phase

### Phase 1 - Stabilize Paper Runtime Operations

- Run a full Docker Compose smoke test from ingestion through dashboard with a
  populated local database and persisted paper exits.
- Confirm repeated polling remains idempotent across signals, proposals,
  approvals, paper orders, fills, positions, marks, and closes.
- Verify fresh-database bootstrap and existing-volume migration paths,
  including the latest alert resolution migration.

### Phase 2 - Operator-Grade Paper Monitoring

- Extend the new rejected/skipped drilldowns into a richer operator detail drawer
  if the compact dashboard rows become too dense during paper testing.
- Expand operational alerts to repeated API failures and failed accounting
  cycles.
- Confirm Docker Compose smoke path from ingestion through dashboard with a
  populated local database.

### Phase 3 - Research and Backtesting Depth

- Add replay datasets and reporting on top of the deterministic scenario matrix
  now covering no-signal, stale-data rejection, close-at-stop, close-at-target,
  time-stop, and populated mixed-runtime cases.
- Build backtest reporting around strategy metrics, drawdown, hit rate,
  slippage assumptions, and calibration notes.
- Add stronger replay/audit workflows from raw events through normalized
  snapshots, signals, proposals, risk decisions, paper orders, fills, positions,
  and PnL.
- Define promotion criteria for research strategies before allowing paper
  proposal generation in longer-running cycles.

### Phase 4 - Compliance-First Live Readiness

- Keep live execution disabled until legal/jurisdiction review, venue terms,
  operator attestations, secrets management, observability, and emergency
  controls are all proven.
- Build a live-readiness checklist separate from code-level CI, including
  compliance owner sign-off, dry-run results, incident response, and rollback
  procedure.
- Add venue-specific live connector tests in a sandbox or explicitly approved
  paper environment before any production credentials are introduced.

## Current Risks and Mitigations

- Risk: Resolved alert rows are reopened in place when the same alert key recurs,
  so closure history is compact rather than episode-based.
  Mitigation: add alert episode/history rows if paper operations show a need for
  recurring-condition trend analysis.
- Risk: Initial schema and additive migrations may drift.
  Mitigation: update schema, migrations, and `scripts/validate_migration.py`
  expectations together; test fresh DB and existing-volume migration paths.
- Risk: Dashboard/API may overstate readiness if paper close/PnL semantics are
  not clear to operators.
  Mitigation: label current execution as paper research, expose stale/skipped
  accounting states, and avoid live-trading language.
- Risk: External public data can be stale, sparse, or unavailable.
  Mitigation: continue using source-health scores, freshness checks, zero-signal
  tolerance, and risk rejection on stale data.
- Risk: Strategy promotion could be confused with live permission.
  Mitigation: keep promotion scoped to paper proposals only; require separate
  compliance/operator/live gates for anything beyond paper.

## Recommended Next 3 Build Phases

1. Harden operator intervention detail. Promote the compact rejected/skipped
   and alert context into a richer detail drawer
   if paper testing shows operators need more room.
2. Run extended replay validation. Exercise replay datasets across no signal,
   approval, rejection, execution, mark-to-market, stop, target, and time-stop
   paths before discussing live-readiness.
3. Add alert episode history if recurring resolved conditions need trend
   analysis beyond the current latest-state row.

## Changed Files

- Paper execution/accounting: position lineage, close review, realized PnL
  aggregation, evidence events, paper runtime summaries, exposure drilldowns,
  skipped-action summaries, and deterministic simulation protocol support.
- Ingestion/repository/API reads: persisted close fields, accurate close update
  counts, PnL aggregation, cycle output, `/positions` field exposure,
  enriched `/risk/decisions` context, enriched skipped-action context, and
  `/paper/runtime` monitoring.
- Database: initial schema updated plus additive migrations through
  `0008_alert_resolution_audit.sql`.
- Dashboard: position lineage/exit display, paper runtime monitoring panel,
  strategy/category exposure, rejected-risk threshold/sizing context,
  skipped-action lineage/threshold context, audited alert
  acknowledgement/resolution, and local build-worker reliability tuning.
- Tests: unit, integration, and simulation coverage for the full paper path,
  close review, deterministic scenario matrix, populated mixed-runtime replay,
  PnL snapshots, migration validation, API payloads, alert audit idempotence,
  and cycle behavior.
- Docs: README, architecture, risk controls, operations runbook, and this
  project status report.

## Assumptions and Coordination Notes

- This report does not claim that any live trading path has been enabled or
  validated.
- Docker observability services are scaffolded, but this pass focused on the
  core paper runtime stack because prior Prometheus/Grafana/Loki pulls had
  intermittent Docker Hub/CloudFront EOF issues.
- Live trading remains blocked by configuration and compliance gates.
