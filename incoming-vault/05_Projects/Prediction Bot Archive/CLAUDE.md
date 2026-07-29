# CLAUDE.md — Prediction Market Trading Bot

## Project status

Risk-first prediction-market research and paper-trading platform. Live trading is disabled by default and remains blocked unless explicit operator and jurisdiction safety gates are set.

Project root:

`C:/Users/Kidsg/OneDrive/Documents/New project 4`

## Read first

Before non-trivial work, read:

- `README.md`
- `docs/architecture/overview.md`
- `docs/risk/controls.md`
- `docs/strategies/strategy-contract.md`
- `docs/operations/runbook.md`
- `docs/operations/paper_live_system_runsheet.md`
- `docs/operations/first_time_operator_guide.md`
- `docs/project_status_report.md`

## Non-negotiable safety rules

- Default to research, backtest, paper, and dry-run modes.
- Do not place live orders, submit live trades, change live risk limits, or use real exchange keys without explicit Jayse authorization for that exact action.
- Do not read, print, or store secrets/API keys. If encountered, redact and stop.
- Do not weaken kill switches, drawdown halts, paper/live gates, quarantine rules, source-health checks, or operator approval flows.
- AI output cannot override deterministic hard rules.
- Any strategy promotion requires evidence ledger, risk review, and paper validation.

## Verification commands from README

Core unit tests before full dependency stack:

```bash
python -m unittest tests.unit.test_foundation -v
```

When dependencies are installed:

```bash
python -m pytest
ruff check .
mypy packages services apps
```

Container stack / migrations / ingestion are documented in `README.md`; run only with safe local/test config.

## Architecture notes

- Python contracts for proposals, risk decisions, paper orders, positions, source health, and operator commands.
- Conservative risk engine with fixed sizing and Kelly shadow audit values.
- Paper execution adapter refuses unapproved trades.
- FastAPI app and DB-backed APIs.
- PostgreSQL/TimescaleDB migrations.
- Polymarket public Gamma/CLOB ingestion.
- BTC market context can include Coinbase spot, Hyperliquid perp, and Bybit perp.
- Next.js operator dashboard.

## Strategy families

- `btc_short_timeframe`
- `mean_reversion`
- `reverse_sniping`

Reverse sniping remains paper/quarantined until replay-backed and paper-backed evidence proves edge after spread, slippage, fees, settlement risk, and source-health controls.

## Definition of done for code changes

- [ ] Read relevant docs above.
- [ ] Identify safety gates affected.
- [ ] Avoid secrets/live keys.
- [ ] Add/update tests for changed behavior.
- [ ] Run available focused tests.
- [ ] Run broader verification where feasible.
- [ ] Report real command output and changed files.
- [ ] Keep live mode blocked unless explicitly authorized.
