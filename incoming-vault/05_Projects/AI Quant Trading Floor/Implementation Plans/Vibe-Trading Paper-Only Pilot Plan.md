---
title: Vibe-Trading Paper-Only Pilot Plan
created: 2026-07-09
updated: 2026-07-09
type: implementation-plan
status: proposed
sources:
  - [[Vibe-Trading Evaluation Report - 2026-07-09]]
  - [[Chronos Polymarket Recorder Smoke Test - 2026-07-09]]
tags: [quant, vibe-trading, paper-only, implementation-plan, ai-quant-floor]
confidence: medium
---

# Vibe-Trading Paper-Only Pilot Plan

## Decision

Run Vibe-Trading as a **paper-only / public-data evaluation lane**, not as a live trading system.

The goal is to find reusable infrastructure and verify whether its research/backtest/reporting components improve Jayse's [[AI Quant Trading Floor]] without exposing accounts, wallets, broker credentials, or exchange execution.

## Jayse framing

Martingale is treated as gambling-style risk escalation, not a valid promotion path. Any strategy that only looks attractive with Martingale is rejected or used as a cautionary benchmark.

## Allowed scope

- Static inspection.
- Local isolated dependency install if needed.
- Public-data-only examples/backtests.
- Paper-only ledgers and reports.
- Read-only MCP/tool inspection.
- Borrowing patterns into AI Quant Floor if they are useful.

## Forbidden without explicit scoped approval

- Broker/exchange/wallet OAuth or auth.
- API keys or credentials.
- Live/paper broker order placement through real accounts.
- Polymarket wallet connection.
- Deposits, withdrawals, account linking, KYC, or cloud/payment actions.
- Externally reachable servers.
- Anything that can place, cancel, flatten, or approve orders.

## Pilot phases

| Phase | Goal | Pass condition | Stop condition |
|---|---|---|---|
| 0. Static safety check | Confirm safe local shape | Compile/import key read-only modules; identify order/live surfaces | Import requires secrets or starts server/auth flow |
| 1. Isolated install | Create local eval env only | Package imports with no credentials | Dependency install too heavy or risky |
| 2. Public-data smoke | Run a small no-key backtest/example | Generates report/run artifact from public data | Needs broker/exchange auth or private keys |
| 3. Paper-only comparison | Compare Vibe output to Quant Floor baselines | Better evidence/reporting than current scaffold | Metrics poor, opaque, or unverified |
| 4. Pattern extraction | Port useful pieces, not the whole system | Clear reusable module/workflow identified | Tight coupling to live broker stack |
| 5. Review board | Decide adopt / watch / reject | Saved evidence and risk review | No reproducible improvement |

## First candidate uses

1. **Run cards / evidence reports** — compare with Quant Floor evidence notes.
2. **Research Goal lifecycle** — useful for objective acceptance criteria and completion audits.
3. **Read-only MCP surface** — inspect whether tool exposure is cleanly separated from execution tools.
4. **Alpha/factor strict checks** — possible anti-fake-alpha guard for future strategy intake.
5. **Mandate / halt / audit design** — reference only for eventual guardrailed live architecture.

## Initial static check already run

From `C:/Users/Kidsg/ai-tools/evaluation/Vibe-Trading`:

```bash
git status --short --branch && python -m py_compile agent/mcp_server.py
```

Observed:

```text
## main...origin/main
agent/src/live/order_guard.py exists=True
agent/src/live/halt.py exists=True
agent/src/live/audit.py exists=True
agent/src/live/enforcement.py exists=True
agent/src/live/mandate/model.py exists=True
agent/src/trading/service.py exists=True
```

Interpretation: the repo is clean at the shallow clone point, `agent/mcp_server.py` compiles in the current environment, and expected safety modules exist. This does **not** prove the system is safe for live use; it only clears the first static gate.

## Success metrics for the pilot

- Reproducible command output saved in Obsidian.
- No secrets or account connections used.
- Backtest/report includes fees, drawdown, trade count, benchmark, and validation caveats.
- Output is clearer or more useful than the current Quant Floor artifact.
- Any adopted code/pattern stays paper-only until separately approved.

## Next action

Create an isolated Vibe-Trading evaluation environment and try the smallest public-data-only backtest or example that does not require credentials. Save the command output as a new evidence note before deciding whether to integrate any component.

## Related

- [[Vibe-Trading Evaluation Report - 2026-07-09]]
- [[Chronos Polymarket Recorder Smoke Test - 2026-07-09]]
- [[AI Quant Trading Floor]]
- [[Bybit Airdrop Prediction Bot Implementation Plan]]
