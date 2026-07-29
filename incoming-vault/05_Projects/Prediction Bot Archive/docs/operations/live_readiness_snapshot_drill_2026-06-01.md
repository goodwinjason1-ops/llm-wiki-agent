# Live-Readiness Snapshot Drill - 2026-06-01

This drill was run against the local Docker stack after rebuilding the API and
dashboard images to branch head. It is an audit-only readiness review. It did
not enable live trading and did not submit any venue orders.

## Drill Inputs

- API: `http://localhost:8000`
- Dashboard: `http://localhost:3000`
- Rebuilt services: `api`, `dashboard`
- Poller/soak services: `ingestion-poller`, `live-submit-soak-scheduler`
- Migration validation command: `operator-74f38fdf-c042-4d6d-bb26-b96768542559`
- Snapshot command: `operator-3bea9878-1476-4c43-b4e8-78063aa7220e`
- Snapshot id: `live-readiness-snapshot-ce74631e-009c-4915-a9dc-abd8c6f27e36`
- Snapshot evidence: `0d521a5c-0b7c-482e-abc9-86abfbe49de8`
- Drill time: `2026-06-01 21:11 AEST`

## Result

The drill passed its purpose: the operator readiness review shows the new paper
acceptance reflection gate, live no-submit evidence, migration validation,
source/provenance checks, and risk gates together in the same review surface.

The system correctly remained blocked for live order submission.

## Readiness Summary

| Field | Value |
| --- | --- |
| Readiness status | `blocked` |
| Live order submission | `blocked` |
| Snapshot status | `blocked` |
| Blocker count | `16` |
| Drift count | `0` |
| Live trading enabled | `false` |

## Gate Evidence

| Gate | Status | Evidence |
| --- | --- | --- |
| Paper acceptance reflection | `blocked` | `operator_paper_acceptance_reflection=missing`; blocker `paper_acceptance_reflection_missing` |
| Live adapter dry-run | `blocked` | Latest evidence `e09aa1ee-2b3f-489c-928c-dbc62892b742`, status `no_candidate`, `submitted_orders=0`, `order_submission_enabled=false` |
| Signing preflight | `blocked` | `persisted_live_signing_preflight=missing` because no fresh candidate was available |
| Database migrations | `pass` | `applied=36`, `pending=0`, `ledger_missing=0`, `checksum_drift=0` |
| Migration validation audit | `pass` | Latest validation command is current; `readiness=ok`, `applies_migrations=false`, `age_seconds=56` |
| Source health present | `pass` | `7` sources reported |
| Source health current | `blocked` | Degraded source: `polymarket_clob` |
| Real market-data provenance | `blocked` | Required live sources present, but only `4` healthy and fixture source `deterministic_paper_seed` still visible |
| Kill switch | `blocked` | `active_kill_switches=1` |
| Danger alerts | `blocked` | `danger_unresolved=26` |
| Alert suppressions | `pass` | `active_suppressions=0`, `suppressed_danger=0` |
| Alert lifecycle | `pass` | `risk_rollups=0`, `repeated=0`, `expiries=0` |
| Paper runtime | `pass` | `paper_orders=12`, `fills=12`, runtime status `ok` |
| Scoped lineage | `pass` | Scoped lineage status `ok`, `missing_link_count=0`, `stale_link_count=0` |

## No-Submit Soak Evidence

The no-submit acceptance report is visible alongside readiness review evidence.
It is not ready for pilot acceptance yet, but it preserves the safety invariant.

| Field | Value |
| --- | --- |
| Report status | `needs_drill_report_ready` |
| Report ready | `false` |
| Scheduled soak runs | `25` |
| Real scheduled soak runs | `25` |
| Real scheduled soak cycles | `0` |
| Real soak window hours | `0.0` |
| Real unique orders | `0` |
| Submitted orders | `0` |
| Order submission enabled | `false` |
| No-submit violations | `0` |
| Live state mutation | `false` for mutation; report attests `no_live_state_mutation=true` |
| History indexed | `true` |

The report next action is to keep the scheduled no-submit soak worker running
until real elapsed-time and unique-order coverage meet acceptance thresholds.

## Why This Is The Correct Safety Outcome

No accepted paper acceptance reflection exists in the local database. That is an
operator decision, so the drill did not fabricate one. The new readiness gate
therefore blocks live readiness with `paper_acceptance_reflection_missing`.

The latest no-submit dry-run found no fresh approved candidate. That is also
correct behavior: stale or non-qualifying proposal history is not allowed to
masquerade as live-ready evidence.

The migration ledger is current and the migration validation audit is fresh
after the read-only validation action. Source and risk gates still correctly
hold the system in blocked mode.

## Follow-Up Actions

1. Submit an operator paper acceptance reflection only after the operator
   explicitly accepts the paper evidence.
2. Restore `polymarket_clob` source health and confirm real market-data
   provenance is healthy.
3. Clear or document the kill switch only after root-cause review.
4. Resolve critical/high alerts or preserve them as intentional blockers.
5. Generate fresh approved proposals from real data before expecting live
   signing preflight and no-submit candidate coverage.
6. Keep no-submit soak running until real elapsed-time and unique-order coverage
   are present.

## Commands Used

```powershell
docker compose -f infra/docker/docker-compose.yml up --build -d api dashboard

Invoke-RestMethod -Method Post `
  http://localhost:8000/operator/database-migrations/validation/run-now `
  -ContentType "application/json" `
  -Body '{"requested_by":"codex","note":"live_readiness_snapshot_drill_refresh_validation"}'

Invoke-RestMethod -Method Post `
  http://localhost:8000/operator/live-readiness/snapshot `
  -ContentType "application/json" `
  -Body '{"requested_by":"codex","note":"live_readiness_snapshot_drill_paper_reflection_no_submit_migration_source_risk"}'

Invoke-RestMethod http://localhost:8000/live/readiness
Invoke-RestMethod "http://localhost:8000/operator/live-readiness/snapshots?limit=5"
Invoke-RestMethod "http://localhost:8000/operator/live-orders/submit-simulation/acceptance-report?limit=25&min_drill_count=3&min_soak_hours=24&min_unique_orders=2"
```
