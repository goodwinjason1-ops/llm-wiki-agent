# Operations Runbook

## Local Startup

Docker Desktop is required for the full local stack. Docker is available on PATH; use the commands below to start the stack.

```powershell
cd infra/docker
docker compose up --build
```

Services:

- API: `http://localhost:8000`
- Dashboard: `http://localhost:3000`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3001`
- Loki: `http://localhost:3100`

For the core app stack only:

```powershell
docker compose -f infra/docker/docker-compose.yml up --build -d postgres redis api dashboard
```

If the Postgres volume already exists and migration files changed, inspect the
tracked migration runner first:

```powershell
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion python -m ingestion_service.cli apply-migrations --dry-run
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion python -m ingestion_service.cli apply-migrations
```

The runner records applied files and checksums in `schema_migrations`, skips
matching files on later runs, and stops if an already-applied migration file
changes.

Local Compose volumes created before the migration ledger, or created by
Postgres Docker entrypoint scripts, may already have the schema objects but no
`schema_migrations` rows. If `--dry-run` reports every historical migration as
pending on such a volume, baseline the ledger once instead of replaying older
view/table SQL:

```powershell
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion python -m ingestion_service.cli apply-migrations --baseline-existing
```

After that, run `apply-migrations --dry-run` again; it should report the
historical files as skipped and only future new migrations as pending.

If a local development volume reports checksum drift because a historical
fresh-install migration was updated alongside a later forward migration, keep
the default fail-closed behavior for normal runs and explicitly reconcile only
after reviewing the paired forward migration. Use a dry run first:

```powershell
python -m ingestion_service.cli apply-migrations --dry-run --reconcile-applied-checksum-drift
python -m ingestion_service.cli apply-migrations --reconcile-applied-checksum-drift
python -m ingestion_service.cli apply-migrations --dry-run
```

The final dry run should show `would_apply=0` and `checksum_repaired=0`.

Run one public Polymarket metadata ingestion pass:

```powershell
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion python -m ingestion_service.cli ingest-polymarket-markets --limit 25
```

Run one public Polymarket CLOB order-book ingestion pass after outcomes exist:

```powershell
docker compose -f infra/docker/docker-compose.yml exec -T postgres psql -U prediction -d prediction -c "select token_id from outcomes where token_id is not null limit 2;"
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion python -m ingestion_service.cli ingest-polymarket-clob --token-id <token-id-1> --token-id <token-id-2>
```

Run one bounded public-source polling cycle. This performs Gamma ingestion,
active CLOB token discovery, CLOB book ingestion, Coinbase BTC-USD spot context
ingestion, Hyperliquid and Bybit BTC perp context ingestion, rolling-stat
analytics, mean-reversion research signal generation, promoted-signal risk
review, and paper execution from stored approvals, followed by paper close
review and mark-to-market accounting plus operational alert generation:

```powershell
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion-poller python -m ingestion_service.cli poll-public-sources --cycles 1 --interval-seconds 1 --market-limit 5 --clob-token-limit 10 --coinbase-product-id BTC-USD --hyperliquid-coin BTC --bybit-symbol BTCUSDT
```

Confirm cross-source BTC context after polling:

```powershell
Invoke-RestMethod http://localhost:8000/prices/btc-context
```

Seed a deterministic local paper runtime scenario. Use this when public market
data is healthy but does not naturally produce a qualifying signal, or when you
need to prove the operator dashboard and API can display the full paper path:

```powershell
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion python -m ingestion_service.cli seed-paper-runtime
```

Expected CLI output includes `signals=1`, `proposals=1`, `risk_approved=1`,
`paper_executed=1`, `paper_marked=1`, and at least one closed seeded position.
The command resets previous deterministic seed rows by default. Pass
`--no-reset` only for debugging append behavior in a disposable local database.
Use `--scenario all` to additionally seed a stale-data rejection and open
positions that intentionally surface `missing_midpoint`, `stale_mark`, and
`exit_not_triggered` skipped actions in `/paper/runtime`:

```powershell
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion python -m ingestion_service.cli seed-paper-runtime --scenario all
```

Run the poller continuously using `.env.example`/environment interval settings:

```powershell
docker compose -f infra/docker/docker-compose.yml --profile ingestion up -d ingestion-poller
```

Process queued scheduled no-submit live-order submit-simulation soak requests
without running public-source ingestion jobs. This is useful when the operator
has queued a soak run and you want to reconcile the worker path only:

```powershell
python -m ingestion_service.cli process-live-submit-simulation-soak --limit 5
```

Expected output includes `submitted_orders=0`, `submission_enabled=0`, and
`mutation_violations=0`. The pilot acceptance report should show real scheduled
worker evidence, while the 24-hour elapsed-time gate remains open until enough
real wall-clock soak has accumulated.

Run the automated no-submit soak scheduler in Docker. The scheduler queues a
safe operator command, processes it with the existing soak worker, records the
rollup, sleeps for one hour, then repeats. It never enables venue submission:

```powershell
docker compose -f infra/docker/docker-compose.yml --profile ingestion up -d live-submit-soak-scheduler
```

Run one bounded scheduler smoke cycle from the same image:

```powershell
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm live-submit-soak-scheduler python -m ingestion_service.cli run-live-submit-simulation-soak-scheduler --cycles 1 --interval-seconds 0 --limit 5
```

Expected output includes `live_order_submit_simulation_soak_scheduled`,
`submitted_orders=0`, `submission_enabled=0`, and `mutation_violations=0`.
Use the pilot acceptance report to confirm the real elapsed-time, unique-order,
and no-mutation gates are accumulating from scheduled worker rollups.

Confirm persisted data and API visibility:

```powershell
docker compose -f infra/docker/docker-compose.yml exec -T postgres psql -U prediction -d prediction -c "select (select count(*) from markets) as markets, (select count(*) from outcomes) as outcomes, (select count(*) from raw_events) as raw_events, (select count(*) from order_book_snapshots) as order_book_snapshots, (select count(*) from rolling_stats) as rolling_stats, (select count(*) from strategy_signals) as strategy_signals, (select count(*) from source_health) as source_health;"
Invoke-RestMethod http://localhost:8000/markets
Invoke-RestMethod http://localhost:8000/source-health
Invoke-RestMethod http://localhost:8000/analytics/orderbook
Invoke-RestMethod http://localhost:8000/signals
Invoke-RestMethod http://localhost:8000/strategies
Invoke-RestMethod http://localhost:8000/proposals
Invoke-RestMethod http://localhost:8000/risk/decisions
Invoke-RestMethod http://localhost:8000/orders/paper
Invoke-RestMethod http://localhost:8000/fills
Invoke-RestMethod http://localhost:8000/positions
Invoke-RestMethod http://localhost:8000/pnl
Invoke-RestMethod http://localhost:8000/paper/runtime
Invoke-RestMethod http://localhost:8000/evidence
Invoke-RestMethod http://localhost:8000/operator/commands
Invoke-RestMethod http://localhost:8000/operator/kill-switch/events
Invoke-RestMethod "http://localhost:8000/alerts?acknowledged=false"
Invoke-RestMethod "http://localhost:8000/alerts?resolved=false"
```

`strategy_signals` may remain at zero after a healthy run when current z-scores
are below the signal threshold. Treat that as a conservative no-signal state,
not an ingestion failure.

For observability as well:

```powershell
docker compose -f infra/docker/docker-compose.yml --profile observability up --build -d
```

The Prometheus image is pinned to `quay.io/prometheus/prometheus:v2.55.1` to avoid relying on the Docker Hub path that showed intermittent CDN EOF errors during setup.

## Emergency Controls

Use the dashboard or API to:

- pause all trading
- activate kill switch
- disable a strategy
- switch to paper-only mode

Human override takes precedence over automation.

Operator command smoke checks:

```powershell
Invoke-RestMethod -Method Post http://localhost:8000/operator/pause
Invoke-RestMethod -Method Post http://localhost:8000/operator/kill-switch
Invoke-RestMethod -Method Post http://localhost:8000/operator/strategy/mean_reversion/promote
Invoke-RestMethod -Method Post http://localhost:8000/operator/strategy/mean_reversion/quarantine
docker compose -f infra/docker/docker-compose.yml exec -T postgres psql -U prediction -d prediction -c "select count(*) from operator_commands; select count(*) from kill_switch_events;"
Invoke-RestMethod http://localhost:8000/operator/commands
Invoke-RestMethod http://localhost:8000/operator/kill-switch/events
Invoke-RestMethod "http://localhost:8000/alerts?acknowledged=false"
```

The operator command and kill-switch history endpoints are read-only audit
views. The alerts endpoint exposes persisted alert state and can be filtered to
unacknowledged or unresolved records. Alert acknowledgement is audited through
an operator command and persists `acknowledged_at`, `acknowledged_by`,
`acknowledgement_note`, and `acknowledged_command_id`. Repeat
acknowledgement attempts are rejected so the first audit record is preserved.
Alert resolution is a separate closure action and persists `resolved_at`,
`resolved_by`, `resolution_note`, and `resolved_command_id`:

```powershell
Invoke-RestMethod -Method Post http://localhost:8000/alerts/<alert-id>/acknowledge -ContentType "application/json" -Body '{"acknowledged_by":"operator","note":"reviewed in dashboard"}'
Invoke-RestMethod -Method Post http://localhost:8000/alerts/<alert-id>/resolve -ContentType "application/json" -Body '{"resolved_by":"operator","note":"condition cleared"}'
Invoke-RestMethod "http://localhost:8000/alerts?resolved=true"
Invoke-RestMethod http://localhost:8000/alerts/history
```

The `/alerts` endpoint remains the latest current-state view. The
`/alerts/history` endpoint is append-only episode history for alert lifecycle
events: opened, reopened, acknowledged, and resolved. Use it to see recurring
conditions that would otherwise be compacted into a single latest alert row.
Some operational alerts are also resolved automatically when current machine
evidence proves the condition cleared. These system resolutions write the same
`resolved` episode event with `operator=system`, `command_id=null`, and a
resolution note. Verify them with:

```powershell
Invoke-RestMethod "http://localhost:8000/alerts?resolved=true"
Invoke-RestMethod "http://localhost:8000/alerts/history?alert_key=<alert-key>"
```

Machine-verifiable system clears are limited to owned operational alert keys:
healthy source freshness clears source-health and repeated-failure alerts,
explicit source-worker resume commands clear stale pause reminders, clean paper
runtime marks clear paper runtime attention, drawdown below the halt threshold
clears the daily halt alert, zero open scoped lineage issues clears lineage
integrity attention, and successful accounting clears paper accounting cycle
failure.

Polling cycles also summarize recent degraded `source_health` rows and raise a
`source_failure:<source>:repeated` alert when the same source has repeated
failures inside the recent health window. Paper accounting exceptions are
converted into a degraded `paper_accounting` health row plus a
`paper_accounting:cycle_failure` alert so the operator can acknowledge, resolve,
and review the episode history even when the accounting result itself could not
be produced.

Polling cycles also raise `source_worker_pause:<worker-id>:stale` when a source
worker remains paused beyond `SOURCE_WORKER_PAUSE_REMINDER_SECONDS`. Inspect the
Source Workers panel, confirm whether the pause is intentional maintenance, then
resume the worker or update the pause reason. Acknowledge the alert after review
and resolve it once the worker is resumed or the maintenance window is
documented.

Polling cycles also raise an aggregate `lineage:scoped_pnl:integrity` alert
when scoped PnL evidence links are missing or when stale scoped links remain
open. Use the scoped lineage diagnostics endpoint or dashboard panel to inspect
the exact links, run the safe missing-link repair, and acknowledge or resolve
stale scoped links after review:

```powershell
Invoke-RestMethod http://localhost:8000/lineage/scoped-pnl/integrity
Invoke-RestMethod http://localhost:8000/lineage/scoped-pnl/history
```

## Strategy Promotion And Evidence

Strategies start research-only. Promote a strategy only when it is allowed to
turn qualifying research signals into paper proposals:

```powershell
Invoke-RestMethod -Method Post http://localhost:8000/operator/strategy/mean_reversion/promote
```

Quarantine blocks proposal generation while preserving signals for review:

```powershell
Invoke-RestMethod -Method Post http://localhost:8000/operator/strategy/mean_reversion/quarantine
```

Reverse Snipe Strategy operations use the `reverse_sniping` strategy id. Keep it
quarantined while collecting initial candidate, replay, and paper PnL evidence:

```powershell
Invoke-RestMethod -Method Post http://localhost:8000/operator/strategy/reverse_sniping/quarantine
```

Promote it to paper proposal generation only after current evidence shows that
late public trade/wallet-flow behavior, CLOB liquidity, and resolution clarity
add value after spread, slippage, fees, and settlement risk:

```powershell
Invoke-RestMethod -Method Post http://localhost:8000/operator/strategy/reverse_sniping/promote
```

The polling cycle now runs this sequence: public ingestion, rolling analytics,
research signal generation, promoted-signal proposal conversion, risk review,
paper execution from stored approvals, paper close review, mark-to-market
accounting from latest stored order-book midpoints, operational alert
generation, and evidence-ledger persistence. A zero-proposal, zero-execution,
zero-close, or zero-alert run is valid when no promoted signal clears the
strategy/risk thresholds and runtime health is current.

Replay validation freshness is a paper-trading permission gate. Check
`/replay/validation/history` or the dashboard Promotion Freshness metric before
promoting: `current` is acceptable, while `missing`, `stale`, `not_passed`, or
`missing_finished_at` means rerun deterministic replay and keep the strategy
paper/research-only. The operator action is still recorded for audit, but
proposal conversion remains blocked until replay freshness is current. The
default stale window is 24 hours and can be adjusted with
`REPLAY_VALIDATION_MAX_AGE_HOURS`.
Persisted parameter-sweep and walk-forward artifacts expose
`backtest_research_freshness` with a separate default stale window of 168
hours, controlled by `BACKTEST_RESEARCH_MAX_AGE_HOURS`. Treat stale, missing,
not-ready, or timestamp-missing research evidence as a prompt to rerun the
paper research job before promoting or relying on tuning-backlog conclusions.

For reverse sniping, do not promote from observed wallet behavior alone. The
operator should see evidence for active/unresolved status, clear market rules,
fresh CLOB source timestamps, bid/ask/midpoint, spread, safe exit liquidity,
public trade flow, wallet-flow repeatability, estimated probability versus
implied probability, and why-not-trade reasons for rejected candidates. Common
valid blockers are stale books, thin depth, wide spreads, ambiguous resolution,
single-wallet flow, and no residual edge at the offered price.

## Paper Execution

Paper execution is idempotent by `paper_orders.proposal_id`. The execution
service loads only stored approved risk decisions with positive approved size
and no existing paper order, then simulates an order, fill, and position.

```powershell
Invoke-RestMethod http://localhost:8000/orders/paper
Invoke-RestMethod http://localhost:8000/fills
Invoke-RestMethod http://localhost:8000/positions
Invoke-RestMethod http://localhost:8000/pnl
Invoke-RestMethod http://localhost:8000/paper/runtime
```

Paper positions include `proposal_id` and `opened_order_id` lineage for audit
and dashboard inspection. Live orders remain disabled and are not created by
the paper execution path.

## Paper Accounting

The close-review step loads open paper positions, joins their proposal stop,
target, and time-stop rules, and closes only positions whose latest stored
midpoint has triggered an exit. Closed positions persist `exit_price`,
`close_reason`, `closed_at`, and realized PnL.

The accounting step then loads remaining open paper positions, marks each one
from the latest stored `order_book_snapshots.midpoint_price`, updates position
mark fields, and writes one `portfolio_snapshots` row plus one `pnl_snapshots`
row per cycle. Positions without a stored midpoint are skipped so stale or
missing mark data does not invent PnL.

The `/paper/runtime` endpoint and dashboard panel provide the operator summary
for this loop. `status=ok` means the paper runtime has no stale or unmarked open
positions. `status=attention` means at least one open paper position has never
been marked or has not been marked in the last five minutes. The payload also
shows order/fill counts, open and closed positions, close events, open exposure,
strategy/category exposure, realized/unrealized position PnL, latest PnL
snapshots, active skipped mark/close reasons, and the last accounting and
close-review timestamps.

Run the deterministic proof fixture locally:

```powershell
python -m pytest tests/simulation/test_deterministic_paper_path.py
```

The fixture is deterministic and now covers the approved mark-to-market path,
no-signal/no-trade behavior, stale-data risk rejection, target exit, stop exit,
time-stop exit, and a populated mixed-runtime replay with closed, marked,
missing-midpoint, and exit-not-triggered states.
