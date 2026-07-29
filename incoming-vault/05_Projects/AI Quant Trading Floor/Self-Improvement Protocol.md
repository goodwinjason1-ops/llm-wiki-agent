---
title: AI Quant Trading Floor Self-Improvement Protocol
created: 2026-07-03
updated: 2026-07-03
type: protocol
tags: [quant, trading-floor, self-improvement, hermes, agents]
sources: [https://youtu.be/MbfuJZZ01IU, https://youtu.be/Z-hU97WO30I, https://youtu.be/6njREUQAFdg]
confidence: medium
---

# AI Quant Trading Floor Self-Improvement Protocol

> This protocol must be included in every trading-floor desk/agent. It improves research quality; it does **not** authorize live trading.

## Purpose

Every trading agent should get better over time by recording what worked, what failed, why it failed, and what should change in future strategy research.

The operating model is:

```text
prompt → strategy/action → measurable outcome → diagnosis → new hypothesis → one-variable change → new baseline or revert
```

## Four gates for every trading agent

Every agent must satisfy these before it is trusted with repeated research work:

| Gate | Meaning | Required check |
|---|---|---|
| Accuracy | Data, scoring, and interpretation are correct | Validate data source, timestamp, symbol, fees, slippage, and objective scoring |
| Reliability | Agent can run consistently | Clear cadence, durable artifacts, failure handling, and no hidden laptop-only state |
| Defined goal | Success/failure are numeric | Scorecard exists before optimization starts |
| Self-improvement | Agent learns from outcomes | Lessons, hypotheses, and artifact updates are recorded every cycle |

## Non-negotiables

1. **No live trading by default.** Agents may research, backtest, paper-test, and propose candidates only.
2. **Evidence before claims.** No agent may call a strategy profitable without reproducible metrics and assumptions.
3. **Past-only data.** All tests must avoid lookahead, repainting, and future leakage.
4. **Failure is data.** Losing or underperforming strategies must be recorded with lessons, not hidden.
5. **Improve process, not just parameters.** Agents should improve prompts, specs, test design, and risk gates — not blindly optimize until a curve looks good.
6. **One-variable rule.** A learning iteration may change only one meaningful variable unless the experiment is explicitly labeled exploratory.
7. **Read-only first cycle.** A new or modified agent must produce a review/report first before it is allowed to write strategy changes.
8. **Human approval before write/live mode.** No agent may switch to write-mode, paper-trading automation, or live trading without explicit human approval.

## Required success/failure scorecard

Before an agent optimizes anything, define a scorecard.

Minimum scorecard fields:

| Field | Example |
|---|---|
| Target asset/market | SPY, BTC-USD, SOL-USD, XAUUSD |
| Timeframe | daily, 4H, 1H, 30m |
| Benchmark | buy-and-hold, cash, simple trend model |
| Target return | e.g. positive CAGR after fees |
| Minimum risk-adjusted score | e.g. Sharpe > 1, Sortino > benchmark |
| Max drawdown limit | e.g. max DD less than benchmark or below fixed cap |
| Minimum trade count | enough to avoid statistical noise |
| Slippage/fee assumptions | explicit bps or exchange model |
| Failure threshold | e.g. underperforms benchmark, drawdown breach, low trade count |
| Review cadence | per run, daily, weekly, monthly |

## Per-run learning loop

Every trading agent must follow this loop:

1. **State mission** — What is this desk trying to improve?
2. **Select candidate** — Which strategy/spec/idea is being tested?
3. **Declare hypothesis** — What edge should exist and why?
4. **Confirm scorecard** — What counts as success/failure?
5. **Run or design test** — Backtest, walk-forward test, paper-test, or exact next test.
6. **Record evidence** — Metrics, assumptions, market/timeframe, fees/slippage, trade count, drawdown, benchmark.
7. **Score result** — Did the outcome move toward or away from the goal?
8. **Diagnose outcome** — Why did it pass, fail, or remain inconclusive?
9. **Form next hypothesis** — What single change should be tested next?
10. **Apply one-variable change** — Change one parameter/rule/filter/process element at a time.
11. **Update baseline** — If robustly better, promote the change to the new baseline; if worse, revert/archive.
12. **Update artifact** — Patch the strategy spec, prompt, workflow, parameter file, or backlog.
13. **Decide next action** — Promote to forward test, revise, archive, or request missing data.

## Required output block for every agent

```text
## Self-improvement log
- Candidate tested/reviewed:
- Scorecard used:
- Evidence produced:
- Result vs goal:
- What improved:
- What failed or remains weak:
- Diagnosis:
- Next hypothesis:
- One variable to change next:
- Reusable lesson:
- Artifact to update:
- Baseline decision: keep current / promote new baseline / revert / archive branch
- Next action:
- Promotion status: reject / revise / forward-test candidate / human-review candidate
```

## Artifact model

Each agent should maintain or update these artifacts when relevant:

| Artifact | Purpose |
|---|---|
| Strategy spec markdown | Human-readable rules, risk, validation plan |
| Backtest evidence note | Raw command, metrics, interpretation |
| Learned parameters JSON/YAML | Current accepted parameters and rejected variants |
| Experiment ledger | Every test, changed variable, result, decision |
| Review markdown | Periodic agent review and next actions |
| Desk prompt | Updated desk behavior when a reusable lesson is discovered |

## Cadence model

Recommended cadence for the trading floor:

| Agent type | Cadence | Mode |
|---|---|---|
| Strategy Intake | On new strategy or source | Write specs only |
| Backtester | On demand / batch runs | Research only |
| Optimizer | Weekly or per strategy batch | Parameter proposal only |
| Reviewer/Risk desk | Weekly, offset from optimizer by 2–3 days | Read-only first, then human-approved notes |
| Forward-test journal | Daily or weekly | Evidence collection only |

Use cadence offsets so optimizer changes have time to produce evidence before the review agent judges them.

## Memory policy

- Save **generalizable procedures** as Hermes skills or vault workflow notes.
- Save **strategy-specific evidence** in project/backtest notes.
- Save **accepted parameters** in learned-parameters JSON/YAML, not vague memory.
- Do **not** save one-off performance claims as durable memory.
- Do **not** overwrite raw transcripts or evidence logs.

## Promotion ladder

| Stage | Meaning | Required evidence |
|---|---|---|
| Idea | Rough hypothesis | Strategy spec exists |
| Backtest candidate | Testable rules | Baseline backtest with fees/slippage |
| Robust candidate | Survives basic scrutiny | Walk-forward / out-of-sample evidence |
| Incubation | Paper-trading candidate | Forward-test journal |
| Human-review candidate | Potential live consideration | Risk review + explicit human approval |

## Rejection triggers

Reject or revise if:

- underperforms a benchmark after fees,
- only works in one narrow optimized window,
- has too few trades,
- has unclear rules,
- relies on repainting/future-looking data,
- drawdown is unacceptable,
- edge disappears with realistic slippage,
- improvement required changing multiple variables at once and cannot be attributed,
- success/failure scorecard was defined after seeing the result.

## What agents should improve over time

- Strategy definitions
- Indicator/feature selection
- Regime filters
- Parameter ranges
- Risk rules
- Walk-forward design
- Backtest code
- Data quality checks
- Desk prompts
- Review criteria
- Scorecards
- Experiment ledgers
- Learned-parameter files
