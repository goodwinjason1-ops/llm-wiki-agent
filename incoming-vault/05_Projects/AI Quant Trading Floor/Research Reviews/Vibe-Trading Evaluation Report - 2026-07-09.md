---
title: Vibe-Trading Evaluation Report - 2026-07-09
created: 2026-07-09
updated: 2026-07-09
type: research-review
status: complete
repo: HKUDS/Vibe-Trading
local_path: C:/Users/Kidsg/ai-tools/evaluation/Vibe-Trading
commit_observed: b8a7c5e
sources:
  - [[Vibe Trading Automated Trading System - Capture 2026-07-09]]
  - https://github.com/HKUDS/Vibe-Trading
tags: [quant, vibe-trading, evaluation, ai-quant-floor, paper-only, read-only]
confidence: medium
---

# Vibe-Trading Evaluation Report - 2026-07-09

## Executive verdict

**Worth studying and selectively borrowing from, but do not connect it to accounts yet.**

`HKUDS/Vibe-Trading` looks like a mature open-source finance-agent workspace: natural-language research, backtesting, factor libraries, MCP tools, multi-agent swarms, IM channels, shadow-account analysis, and broker connector safety layers. For Jayse's stack, the strongest value is as a **pattern/reference repo** for the [[AI Quant Trading Floor]], [[Bybit Airdrop Prediction Bot Implementation Plan]], and future Prediction Bot/Bybit safety architecture.

It should remain isolated in the evaluation folder until we have deeper code review and a public-data-only smoke test plan. No broker credentials, OAuth, exchange auth, API keys, wallets, order placement, or externally reachable services should be used during this evaluation phase.

## Repo facts observed

| Field | Observation |
|---|---|
| Repo | `HKUDS/Vibe-Trading` |
| Local evaluation path | `C:/Users/Kidsg/ai-tools/evaluation/Vibe-Trading` |
| Observed shallow commit | `b8a7c5e` |
| Package | `vibe-trading-ai` |
| Version in `pyproject.toml` | `0.1.10` |
| Python | `>=3.11` |
| License | MIT |
| Backend/package path | `agent/` |
| Frontend path | `frontend/` |
| Public wiki path | `wiki/` |
| MCP entry point | `agent/mcp_server.py` / `vibe-trading-mcp` |
| CLI entry point | `agent/cli/` / `vibe-trading` |

## Architecture map

```text
User prompt / CLI / Web / IM channel / MCP client
→ Vibe-Trading agent runtime
→ tool registry + skills + research goals
→ market-data loaders / screeners / documents / web / backtests
→ reports, run cards, factors, strategy exports, dashboards
→ optional broker connector layer, guarded separately
```

Important local areas found during static inspection:

- `agent/mcp_server.py` exposes research/market-data/trading-read tools to MCP clients.
- `agent/src/live/` contains live-action safety pieces: `classification.py`, `enforcement.py`, `halt.py`, `order_guard.py`, `sdk_order_gate.py`, `audit.py`, and `daily_count.py`.
- `agent/src/live/mandate/` contains mandate commit/model/store code.
- `agent/src/trading/` contains profile/service/types abstractions.
- `AGENT_CONTRIBUTOR_GUIDE.md` explicitly marks broker connectors, mandate, order gate, halt, and audit-ledger logic as safety-critical.

## Safety model observed

Good signs:

- `AGENT_CONTRIBUTOR_GUIDE.md` warns AI/automation contributors not to run broker writes, OAuth/exchange auth, credential writes, wallet/payment/cloud auth, externally reachable servers, package releases, or live trading during routine validation.
- `agent/mcp_server.py` states that MCP exposes read-only/research-only tools and **does not surface order-placing or order-cancelling tools**.
- MCP risk-tier parsing rejects live trading/execution goals.
- The repo has explicit live safety modules for mandate, halt, order gate, daily count, enforcement, and audit.
- README/release notes claim hardening around API auth, path containment, generated-code validation, CSRF, and credential/cache boundaries.

Cautions:

- README/news claims are not proof; individual controls need targeted tests before trust.
- The repo includes live/paper broker connector concepts, so an operator could still misconfigure a dangerous path if guardrails are misunderstood.
- It has a large dependency and feature surface. Treat it as a research system first, not a drop-in execution engine.
- Crypto exchange coverage may not align with Jayse's Bybit-first preference without adapter work.

## What to borrow for Jayse's systems

| Borrowable pattern | Why it matters for Jayse |
|---|---|
| Research Goal lifecycle | Gives each quant task acceptance criteria, evidence rows, and completion audit instead of chat-only claims. |
| Run cards / validation artifacts | Fits Jayse's need for reproducible evidence before paper/live promotion. |
| MCP read-only tool boundary | Useful model for letting Ari/Codex inspect data without exposing write/execution tools. |
| Mandate + halt + audit concepts | Strong reference for eventual guardrailed live trading approval flows. |
| Multi-agent swarm presets | Can inspire desk-specific [[AI Quant Trading Floor]] workflows. |
| Shadow-account / trade-journal analysis | Relevant to Jayse's future discretionary-to-systematic feedback loop. |
| Alpha Zoo / strict factor gates | Useful for avoiding fake alpha and leakage in quant research. |
| IM/channel runtime | Good product pattern for Telegram-style Quant Floor reporting. |

## What not to run yet

Do **not** run these without explicit scoped approval:

- Broker connector authorization, OAuth, account login, exchange auth, wallet connection, payment, cloud auth, or real credentials.
- `place_order`, `cancel_order`, flatten/approve/live-runner style flows, or anything touching live brokerage state.
- Externally reachable Web/API/MCP/SSE servers.
- Commands that write real secrets into `.env`, `~/.vibe-trading/`, token caches, or external services.
- Package publishing, wiki deploys, CI secret edits, force-pushes, or release workflows.

## Comparison to Jayse's stack

| System | Fit | Notes |
|---|---:|---|
| [[AI Quant Trading Floor]] | High | Borrow evidence/report/goal patterns while keeping our current public-data/paper-first ledgers. |
| Prediction Bot | Medium-high | Compare run cards, outcomes, and paper/live boundary design. |
| Bybit Bot | Medium | Use Vibe's mandate/order-gate architecture as reference, but Bybit adapter should be reviewed/build separately. |
| Business Context Brain | Low-medium | Product/workspace UX patterns may be useful, but trading-specific code is less direct. |

## No-key read-only trial plan

1. Keep repo isolated at `C:/Users/Kidsg/ai-tools/evaluation/Vibe-Trading`.
2. Run only static or read-only validation first:
   - `git status --short --branch`
   - `python -m py_compile agent/mcp_server.py`
   - targeted tests that do not require broker/exchange auth.
3. Inspect MCP tool registration to confirm only research/read-only tools are exposed.
4. Run a tiny public-data-only backtest/example if dependencies are manageable.
5. Save the command output as an evidence note before any adoption decision.
6. If useful, port **patterns** into AI Quant Floor rather than making Vibe-Trading the primary execution system.

## Decision

**Decision: watch / evaluate further.**

Vibe-Trading is relevant enough to stay on the research bench. The near-term use is not live trading; it is a design reference for safer agentic quant infrastructure: goals, evidence, run cards, read-only MCP surfaces, and mandate/halt/audit concepts.

## Related

- [[Vibe Trading Automated Trading System - Capture 2026-07-09]]
- [[AI Quant Trading Floor]]
- [[AI Quant Trading Floor Workflow]]
- [[Bybit Airdrop Prediction Bot Implementation Plan]]
- [[QTF-Candidate Chronos Polymarket Directional Edge]]
