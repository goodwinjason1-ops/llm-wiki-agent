# Prediction Market Trading Bot

Risk-first prediction-market research and paper-trading platform for BTC
short-timeframe markets, market-wide mean-reversion opportunities, and the
Reverse Snipe Strategy for late-resolution high-probability markets.

## Current Phase

This repository is scaffolded for the foundation phase:

- shared Python contracts for proposals, risk decisions, paper orders, positions, source health, and operator commands
- conservative risk engine with fixed sizing and Kelly shadow audit values
- paper execution adapter that refuses unapproved trades
- FastAPI app factory with DB-backed market, source-health, metrics, and dashboard summary reads
- PostgreSQL/TimescaleDB schema migration
- one-shot public Polymarket Gamma and CLOB order-book ingestion into Postgres
- scheduled/polling public Polymarket ingestion with automatic CLOB token discovery
- order-book snapshot analytics that persist rolling stats for strategy research
- mean-reversion research signal generation from rolling stats, persisted idempotently with `signal_id`
- Reverse Snipe Strategy research path for unresolved high-probability markets,
  public trade/wallet-flow evidence, late liquidity, and strict paper-only
  validation before any proposal promotion
- evidence ledger and strategy quarantine/promotion workflow
- risk-reviewed paper proposal generation from promoted research signals
- idempotent paper execution from stored approved risk decisions
- paper accounting that marks open positions from latest stored midpoints, closes
  paper positions at stop/target/time-stop triggers, and persists
  portfolio/PnL snapshots
- paper runtime monitor that summarizes paper order/fill counts, open/closed
  positions, stale or unmarked marks, close events, exposure, PnL,
  strategy/category exposure, and active skipped mark/close reasons
- deterministic simulation fixtures proving signal -> risk -> paper execution
  -> position -> PnL repeatability across approval, no-signal, stale-risk
  rejection, target, stop, time-stop, and populated mixed-runtime paths
- deterministic replay validation reporting through a paper-only API/dashboard
  read surface for required scenario coverage, rejection/exit counts, hit rate,
  drawdown, and calibration notes
- DB-backed analytics and research-signal API reads
- DB-backed paper orders, fills, positions, lineage/exit fields, and PnL
  API/dashboard reads
- auditable operator pause, strategy-disable, and kill-switch API commands
- read-only operator command history, kill-switch history, and alert-state
  endpoints for intervention review
- audited, idempotent alert acknowledgement plus deduped operational alerts
  for degraded sources, paper runtime mark attention, and drawdown halt
  thresholds
- audited alert resolution/closure semantics, with unresolved alerts kept
  visible separately from acknowledged-but-still-active conditions
- optional deterministic DB seed scenarios for stale-data rejection, missing
  midpoint, stale mark, and exit-not-triggered paper-runtime skips
- Next.js operator dashboard with source health, rolling analytics, signal,
  rejection, safety, operator intervention, and alert views
- first-time operator guide, paper/live runsheet, and user-perspective guide
  covering setup, dashboard sections, paper workflow, live no-submit evidence,
  external services, safety gates, and operating commands
- Docker Compose and CI skeleton

Live trading is disabled by default and remains blocked unless explicit operator and jurisdiction safety gates are set.

## Strategy Edges

The current strategy family is deliberately conservative:

- `btc_short_timeframe`: BTC-linked prediction markets using spot/perp context,
  momentum/reversal, volatility, order-book imbalance, liquidity, and source
  freshness.
- `mean_reversion`: broad market scans for stretched moves, z-score, velocity,
  liquidity, catalyst risk, and safe contrarian paper opportunities.
- `reverse_sniping`: the Reverse Snipe Strategy. It scans unresolved
  high-probability markets late in their lifecycle, checks fresh CLOB depth,
  spread, public trade flow, repeat wallet behavior, liquidity movement, and
  resolution ambiguity, then records research signals or paper proposals only
  after promotion and risk approval.

Reverse sniping is not a shortcut around risk. It must capture evidence for the
market rules, current bid/ask/midpoint, safe exit liquidity, public wallet-flow
summary, estimated probability versus implied probability, risk sizing, paper
fill, mark, close, PnL, and post-trade reflection. Until replay-backed and
paper-backed evidence proves that the wallet/liquidity-flow signal adds edge
after spread, slippage, fees, and settlement risk, keep `reverse_sniping`
quarantined or paper-only.

## Local Verification

The core unit tests use `unittest` so they can run before the full dependency stack is installed:

```powershell
python -m unittest tests.unit.test_foundation -v
```

When dependencies are installed:

```powershell
python -m pytest
ruff check .
mypy packages services apps
```

Run the local container stack:

```powershell
docker compose -f infra/docker/docker-compose.yml up --build -d postgres redis api dashboard
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion python -m ingestion_service.cli apply-migrations --dry-run
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion python -m ingestion_service.cli apply-migrations --baseline-existing
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion python -m ingestion_service.cli ingest-polymarket-markets --limit 25
```

The local Compose Postgres service also runs the SQL files during first volume
initialization, so `--baseline-existing` stamps those already-created objects
into `schema_migrations` without replaying older SQL. For a managed or empty
database that was not initialized by Docker entrypoint scripts, run
`apply-migrations` without `--baseline-existing`. Applied migration filenames
and checksums are tracked in `schema_migrations`.

After markets are ingested, pick stored `outcomes.token_id` values and ingest public CLOB books:

```powershell
docker compose -f infra/docker/docker-compose.yml exec -T postgres psql -U prediction -d prediction -c "select token_id from outcomes where token_id is not null limit 2;"
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion python -m ingestion_service.cli ingest-polymarket-clob --token-id <token-id-1> --token-id <token-id-2>
```

Run one bounded public-source polling cycle. This ingests Gamma markets,
discovers active CLOB tokens, ingests books, persists Coinbase BTC-USD spot
context plus Hyperliquid and Bybit BTC perp context, computes rolling stats,
persists qualifying research signals, converts promoted signals to
risk-reviewed proposals, and executes stored approvals in paper mode, then
reviews paper exits and marks open paper positions while generating deduped
operational alerts:

```powershell
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion-poller python -m ingestion_service.cli poll-public-sources --cycles 1 --interval-seconds 1 --market-limit 5 --clob-token-limit 10 --coinbase-product-id BTC-USD --hyperliquid-coin BTC --bybit-symbol BTCUSDT
```

BTC context is exposed at `GET /prices/btc-context`; it compares the persisted
Coinbase spot reference with Hyperliquid and Bybit perp ticks and flags missing,
stale, or divergent sources before strategies rely on that market context.

Seed a deterministic DB-backed paper runtime path for container smoke checks.
This creates a local simulation market and exercises signal -> proposal -> risk
approval -> paper order -> fill -> position -> mark -> target close -> PnL:

```powershell
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion python -m ingestion_service.cli seed-paper-runtime
docker compose -f infra/docker/docker-compose.yml --profile ingestion run --rm ingestion python -m ingestion_service.cli seed-paper-runtime --scenario all
Invoke-RestMethod http://localhost:8000/proposals
Invoke-RestMethod http://localhost:8000/risk/decisions
Invoke-RestMethod http://localhost:8000/orders/paper
Invoke-RestMethod http://localhost:8000/fills
Invoke-RestMethod http://localhost:8000/positions
Invoke-RestMethod http://localhost:8000/pnl
Invoke-RestMethod http://localhost:8000/paper/runtime
Invoke-RestMethod http://localhost:8000/replay/validation
Invoke-RestMethod http://localhost:8000/replay/validation/history
```

Replay validation responses include a `replay_validation_freshness` diagnostic
with `current`, `stale`, `missing`, `not_passed`, or `missing_finished_at`
status. The default stale window is `REPLAY_VALIDATION_MAX_AGE_HOURS=24`;
stale or missing replay evidence blocks paper-trading permission, so proposal
conversion remains research-only until deterministic replay is current.
Persisted parameter-sweep and walk-forward responses also include
`backtest_research_freshness`; their default stale window is
`BACKTEST_RESEARCH_MAX_AGE_HOURS=168`, and the dashboard shows those freshness
states beside recorded research and tuning-backlog evidence.

Run the deterministic full-path simulation fixture:

```powershell
python -m pytest tests/simulation/test_deterministic_paper_path.py
```

Useful smoke checks:

```powershell
Invoke-RestMethod http://localhost:8000/health
Invoke-RestMethod http://localhost:8000/markets
Invoke-RestMethod http://localhost:8000/source-health
Invoke-RestMethod http://localhost:8000/analytics/orderbook
Invoke-RestMethod http://localhost:8000/signals
Invoke-RestMethod http://localhost:8000/proposals
Invoke-RestMethod http://localhost:8000/risk/decisions
Invoke-RestMethod http://localhost:8000/orders/paper
Invoke-RestMethod http://localhost:8000/fills
Invoke-RestMethod http://localhost:8000/positions
Invoke-RestMethod http://localhost:8000/pnl
Invoke-RestMethod http://localhost:8000/paper/runtime
Invoke-RestMethod http://localhost:8000/replay/validation
Invoke-RestMethod http://localhost:8000/dashboard/summary
Invoke-RestMethod http://localhost:8000/operator/commands
Invoke-RestMethod http://localhost:8000/operator/kill-switch/events
Invoke-RestMethod "http://localhost:8000/alerts?acknowledged=false"
Invoke-RestMethod "http://localhost:8000/alerts?resolved=false"
Invoke-RestMethod -Method Post http://localhost:8000/alerts/<alert-id>/acknowledge -ContentType "application/json" -Body '{"acknowledged_by":"operator","note":"reviewed"}'
Invoke-RestMethod -Method Post http://localhost:8000/alerts/<alert-id>/resolve -ContentType "application/json" -Body '{"resolved_by":"operator","note":"closed"}'
Invoke-RestMethod "http://localhost:8000/alerts?acknowledged=true"
Invoke-RestMethod "http://localhost:8000/alerts?resolved=true"
Invoke-RestMethod -Method Post http://localhost:8000/operator/pause
docker compose -f infra/docker/docker-compose.yml exec -T postgres psql -U prediction -d prediction -c "select count(*) from order_book_snapshots; select count(*) from rolling_stats; select count(*) from strategy_signals;"
```

Signals may be zero after a successful run if current rolling z-scores are below the research threshold; this is expected and keeps strategy output conservative.

## Safety Rule

Strategies only propose trades. The risk engine approves or rejects every proposal. Execution engines only act on stored approvals.
