---
title: AI Quant Trading Floor Workflow
created: 2026-07-03
updated: 2026-07-03
type: workflow
tags: [quant, trading-floor, hermes, telegram, self-improvement]
sources: [https://youtu.be/Z-hU97WO30I, https://youtu.be/MbfuJZZ01IU, https://youtu.be/6njREUQAFdg]
confidence: medium
---

# AI Quant Trading Floor Workflow

> Research and education workflow only. Do not place live trades from this system without explicit human approval and separate broker/exchange risk controls.

## Goal

Create a self-improving Hermes-assisted trading research floor that can:

1. generate strategy hypotheses,
2. convert them into precise strategy specs,
3. backtest with no lookahead bias,
4. rank strategies by robust metrics,
5. forward-test promising candidates,
6. store lessons learned in the second brain,
7. improve strategy prompts/specs over time.

## Trading floor desks

| Desk | Mission | Primary outputs |
|---|---|---|
| Strategy Intake | Clean vague strategy ideas into precise specs | Strategy spec markdown |
| Trend Following | Build momentum/trend systems | Pine/Python prototype, backtest report |
| Regime Filter | Build Markov/HMM regime filters | Regime model, filter signal |
| Optimizer | Tune parameters without overfitting | Walk-forward optimization report |
| Risk + Forward Testing | Validate paper/live readiness | Incubation journal, risk notes |
| Review Board | Reject weak or overfit systems | Decision: keep, revise, archive |
| Agentic Architecture / Challenge | Separate perception, thesis, challenge, risk and paper-control stages; measure coupling and observability | Decision object, disagreement/coupling report, audit trail |

## Agentic architecture control layer

Use [[Agentic Finance Architecture Edge Experiment - QTF-022]] as the current research implementation of the four-layer agentic-finance pattern. Every candidate must be represented as a decision object with provenance, exact rules, benchmark, costs, risk limits, challenge findings, paper-ledger path and promotion gate. Track model/data heterogeneity, execution coupling, infrastructure concentration and supervisory observability; do not interpret agent agreement as alpha without checking shared dependencies.

The default operating mode remains bounded autonomy: agents may collect, analyse, challenge, propose and record paper outcomes, while human review controls promotion and any future execution scope.


All trading desks must follow [[Self-Improvement Protocol|AI Quant Trading Floor Self-Improvement Protocol]].

Each agent must pass four gates before repeated operation:

1. **Accuracy** — verified data, objective scoring, explicit fees/slippage.
2. **Reliability** — clear cadence, durable artifacts, failure handling.
3. **Defined goal** — success and failure scorecard exists before testing.
4. **Self-improvement** — outcomes create diagnosis, one-variable experiments, and artifact updates.

For each strategy iteration:

1. **Hypothesis** — write one clear edge hypothesis.
2. **Spec** — define market, timeframe, indicators, entries, exits, risk, and invalidation.
3. **Backtest** — run using past-only data; no future leakage.
4. **Walk-forward** — optimize on training windows, test on unseen windows.
5. **Stress test** — check multiple markets, fees/slippage, volatility regimes, and drawdown periods.
6. **Record evidence** — save metrics, equity curve notes, failure modes, screenshots/logs where available.
7. **Decide** — promote to forward test, revise, or archive.
8. **Improve** — update strategy spec, desk prompts, and reusable lessons.

## Minimum acceptance gates

A strategy cannot be promoted unless it has:

- clear rules that can be implemented without discretion,
- no lookahead/repainting/future leakage,
- sufficient trade count for its timeframe,
- positive expectancy after fees and slippage,
- tolerable max drawdown,
- walk-forward or out-of-sample evidence,
- documented failure modes,
- explicit market/timeframe scope.

## Suggested Telegram topics

If using Telegram group topics, create:

1. `01 Strategy Intake`
2. `02 Trend Following Desk`
3. `03 Regime Filter Desk`
4. `04 Optimizer Desk`
5. `05 Forward Testing Journal`
6. `06 Risk Review Board`
7. `07 Strategy Archive`

## Cron-style recurring prompt template

```text
Run the AI Quant Trading Floor workflow for the current desk. Do not place live trades. Review the current strategy backlog, pick one strategy candidate, clean its spec, propose a backtest plan, and record one improvement lesson. Save durable lessons to the second brain or a Hermes skill only if reusable.
```

## Related strategy specs

- [[QTF-001 Markov Regime Filter]]
- [[QTF-002 Standalone Markov Directional Strategy]]
- [[QTF-003 Hidden Markov Regime Strategy]]
- [[QTF-004 Enhanced Regime Scoring Model]]
- [[QTF-005 RSI MACD Trend Strategy]]
- [[QTF-006 Strategy Factory Optimizer]]
