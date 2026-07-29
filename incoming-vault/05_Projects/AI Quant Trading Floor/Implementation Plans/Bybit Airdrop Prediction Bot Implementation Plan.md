---
title: Bybit Airdrop Prediction Bot Implementation Plan
created: 2026-07-09
updated: 2026-07-09
type: implementation-plan
status: proposed
priority: high
tags: [quant, bybit, prediction-markets, airdrop-agent, implementation-plan, guardrails]
sources:
  - 05_Projects/Project Context Registry/Prediction Bot New project 4 Project Context.md
  - 05_Projects/Project Context Registry/Prediction Bot Desktop Project Context.md
  - 05_Projects/Project Context Registry/Airdrop Agent Project Context.md
  - 05_Projects/Project Context Registry/Bybit Downloads Project Context.md
confidence: medium
---

# Bybit Airdrop Prediction Bot Implementation Plan

## Objective

Bring three existing/cataloughed projects into one safe operating program:

1. **Prediction Bot** — risk-first Polymarket/prediction-market research and paper-trading platform.
2. **Airdrop Agent** — safety-first airdrop research, scoring, task/wallet tracking, reporting, and controlled-execution readiness.
3. **Bybit Trading Bot / AI Trading Platform** — Bybit-focused crypto data/trading architecture from reference docs, not yet confirmed as an executable repo.

Default mode for all three: **research, backtest, paper, dry-run, sandbox**. Live execution remains blocked until explicit Jayse approval for exact venue/account/capital/max-loss/kill-switch scope.

## Known local assets

| System | Local source | Current status |
|---|---|---|
| Prediction Bot executable repo | `C:/Users/Kidsg/OneDrive/Documents/New project 4` | Code repo confirmed. README says foundation is substantially built; live blocked by env flags. |
| Prediction Bot reference workspace | `C:/Users/Kidsg/OneDrive/Desktop/Prediction Bot` | Reference/docs workspace. Not executable itself. |
| Airdrop Agent repo | `C:/Users/Kidsg/OneDrive/Documents/Airdrop Agent/airdrop-agent` | Code repo confirmed. 11/12 milestones complete; M11 controlled execution automation remains planned/high risk. |
| Bybit docs/downloads | `C:/Users/Kidsg/CrossDevice/Pixel 9 Pro Fold/storage/Download` | Reference/spec docs found, including Bybit AI Trading Platform specs. Executable Bybit repo not yet confirmed. |

## North-star architecture

```text
AI Quant Floor / Ari dashboard
        |
        +-- Prediction Bot: prediction-market signals, paper ledgers, replay validation
        |
        +-- Bybit Bot: crypto market data, Bybit public/private adapters, sandbox/paper execution
        |
        +-- Airdrop Agent: campaign discovery, risk scoring, wallet/task tracking, assisted participation
        |
        +-- Shared safety layer: no secrets in notes, risk gates, kill switches, operator approvals, audit logs
```

## Phase 0 — Safety freeze and repo confirmation

**Goal:** know what exists before building or running anything.

Tasks:

- [ ] Confirm whether the Bybit Trading Bot has an executable code repo or is currently only docs/specs.
- [ ] Mark OneDrive docs/folders as “Always keep on this device” if extraction fails.
- [ ] Create/refresh `CLAUDE.md` or `AGENTS.md` in any repo that will be edited.
- [ ] Inventory `.env.example` only; do not read real `.env` or secrets.
- [ ] Create a shared `LIVE_BLOCKED_BY_DEFAULT.md` / safety note if missing.

Acceptance criteria:

- [ ] Each project has a confirmed root path.
- [ ] Each project has read-first instructions.
- [ ] We can run documentation/unit-test checks without live keys.
- [ ] Live paths are explicitly blocked.

## Phase 1 — Local verification and dashboards

**Goal:** run what already exists in safe mode and save real evidence.

Prediction Bot:

- [ ] Read `README.md`, `docs/project_status_report.md`, `docs/risk/controls.md`, and `docs/operations/runbook.md`.
- [ ] Run focused unit tests first: `python -m unittest tests.unit.test_foundation -v` or current recommended focused pytest commands.
- [ ] If dependencies/Docker are ready, run a local paper-runtime seed and API smoke.
- [ ] Save evidence note under `05_Projects/AI Quant Trading Floor/Backtests/` or `Research/`.

Airdrop Agent:

- [ ] Read `README.md`, `docs/OPERATOR_GUIDE.md`, `docs/SPEC_CONVENTIONS.md`, `docs/PROGRESS.md`.
- [ ] Run backend tests and web tests if dependencies are installed.
- [ ] Generate/update project progress reports.
- [ ] Verify prohibited-pattern guards still block private keys, seed phrases, sybil/wash/referral-abuse/blind-sign instructions.

Bybit Bot:

- [ ] Extract Bybit build specs into markdown summaries.
- [ ] Identify target architecture: standalone vs unified vs multi-instance.
- [ ] Confirm official Bybit API endpoints from current docs before implementation.
- [ ] Build a read-only data adapter smoke test before any account auth.

Acceptance criteria:

- [ ] We have real command output for each repo that can be run safely.
- [ ] Dashboards show current status, not guessed status.
- [ ] Failures are logged honestly with next repair steps.

## Phase 2 — Integration contracts

**Goal:** make the three systems interoperable without merging them prematurely.

Shared schemas:

- `SignalCandidate`
- `RiskDecision`
- `PaperOrder`
- `PaperPosition`
- `AirdropCampaignDecision`
- `WalletActivityPublicOnly`
- `EvidenceEvent`
- `OperatorApproval`

Integration rules:

- Prediction Bot owns prediction-market paper signals and validation.
- Bybit Bot owns crypto market data, Bybit candles/orderbook/funding, and later sandbox/paper execution.
- Airdrop Agent owns airdrop/campaign scoring, task/wallet tracking, and assisted participation.
- AI Quant Floor owns portfolio-level review, dashboards, evidence gates, and promotion decisions.

Acceptance criteria:

- [ ] No system requires another system’s secrets.
- [ ] Data handoff can happen through JSONL/CSV/API in read-only mode.
- [ ] Each decision has provenance and rejection reasons.

## Phase 3 — Bybit Trading Bot path

**Goal:** turn Bybit docs/specs into a safe executable research/sandbox bot.

Build order:

1. **Data adapter** — Bybit public klines, ticker, orderbook, funding/open interest.
2. **Storage** — append-only market snapshots and normalized candles.
3. **Backtest harness** — deterministic strategy contract, fees/slippage, benchmarks.
4. **Paper engine** — fake fills / sandbox/testnet only.
5. **Risk engine** — max daily loss, max position, no-trade conditions, cooldowns, kill switch.
6. **Operator dashboard** — state, signals, paper orders, risk decisions, halted state.
7. **Testnet connector** — only after read-only/paper proof.
8. **Live connector** — future only after Jayse approval and live-readiness checklist.

Live gate:

- [ ] Strategy contract approved.
- [ ] Backtest reproducible.
- [ ] Paper run reviewed.
- [ ] Bybit testnet/sandbox verified.
- [ ] Kill switch tested.
- [ ] Capital/max-loss explicitly approved by Jayse.

## Phase 4 — Prediction Bot path

**Goal:** move from built foundation to operator-grade paper validation.

Next implementation priorities from current docs:

1. Run a full Docker Compose smoke from ingestion → dashboard with populated DB.
2. Confirm repeated polling is idempotent across signals/proposals/risk/paper/PnL.
3. Add stronger replay datasets and backtest reporting.
4. Define promotion criteria for research strategies before longer paper proposal cycles.
5. Keep live blocked until legal/jurisdiction, venue terms, secrets management, observability, and emergency controls are proven.

Acceptance criteria:

- [ ] Paper validation is current and visible.
- [ ] Replay validation freshness is not stale.
- [ ] Strategies cannot promote without evidence ledger + risk review.

## Phase 5 — Airdrop Agent path

**Goal:** use it as an airdrop research/operations copilot first, not an auto-farmer.

Next implementation priorities:

1. Run local setup and tests.
2. Use the existing M1-M10 stack for discovery, scoring, AI research, task tracking, and reporting.
3. Keep discovery crawlers feature-flagged and allowlist-only.
4. Use assisted participation plans as human-reviewed checklists.
5. Treat M11 controlled execution automation as future/high-risk only.

Hard stops:

- No private keys.
- No seed phrases.
- No blind signing.
- No sybil farming.
- No wash trading.
- No fake engagement/referral abuse.
- No transaction signing/broadcasting until a separate approval and safety review.

## Phase 6 — Unified weekly operating review

Add these to the weekly review rhythm:

| Review item | Question |
|---|---|
| Prediction Bot | Did replay/paper validation produce new evidence? |
| Bybit Bot | Did market data/backtests/paper runs produce safe candidates? |
| Airdrop Agent | Are any campaigns worth human-reviewed participation? |
| Risk | Are any systems halted, stale, over budget, or missing data? |
| Promotion | Should anything move from research → paper, paper → sandbox, or stay parked? |

## Recommended implementation sequence

1. **Prediction Bot first** — most complete executable system; verify and use as the model for paper/live gates.
2. **Airdrop Agent second** — also largely built, but execution automation is higher-risk; keep it as research + assisted checklist.
3. **Bybit Bot third** — clarify executable repo vs docs, then build read-only data adapter and paper harness.
4. **Unify dashboards last** — avoid premature integration before each system is locally verified.

## Related

- [[AI Second Brain Project Registry]]
- [[Prediction Bot New project 4 Project Context]]
- [[Prediction Bot Desktop Project Context]]
- [[Airdrop Agent Project Context]]
- [[Bybit Downloads Project Context]]
- [[AI Quant Trading Floor]]
- [[Trading Bot Safety and Control Rules]]
