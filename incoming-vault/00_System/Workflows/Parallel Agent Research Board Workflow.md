---
title: Parallel Agent Research Board Workflow
created: 2026-07-08
updated: 2026-07-08
type: workflow
tags: [hermes, multi-agent, kanban, automation, second-brain, quant]
sources: [03_Sources/youtube/Hermes Multi-Agent Kanban Workflow - YouTube 1MaFErWfL24.md]
confidence: medium
---

# Parallel Agent Research Board Workflow

## Purpose

Use role-based agents plus task targets to scale Ari/Hermes work without creating one-off profiles for every topic.

## Core rule

> An agent is a role. A task is a target.

Create reusable roles like `researcher`, `risk-reviewer`, `implementation-scaffold`, and `synthesizer`; then point those roles at different companies, tokens, videos, or vault assets.

## Generic board structure

```text
Task group: <batch name>
  ├─ Research target A — assignee: researcher
  ├─ Research target B — assignee: researcher
  ├─ Research target C — assignee: researcher
  ├─ Risk review target A/B/C — assignee: risk-reviewer
  └─ Synthesis report — assignee: default/Ari; parents: all above
```

## Pattern 1 — Antoine on-chain scan

1. Create one researcher task per candidate source: DEX Screener query, wallet list, tool output, or video method.
2. Create one risk-reviewer task per short-listed candidate batch.
3. Final synthesizer updates [[Antoine On-Chain Alpha Dashboard]], the paper ledger, and `log.md`.

## Pattern 2 — Quant strategy batch

1. One evaluator task per strategy family.
2. One verifier task to check no-lookahead, costs, and benchmark comparison.
3. Synthesizer updates [[AI Quant Trading Floor Dashboard]] and strategy rankings.

## Pattern 3 — Business Context Brain launch pass

1. One asset-mapper task per orphan cluster: BuyerProof, Renovator Quote Brain, Business Context Brain, outreach/proof.
2. One proof-review task checks screenshots/walkthrough readiness.
3. Synthesizer updates [[Business Launch Asset Navigation Dashboard]].

## Task prompt template

```text
Role: <researcher/risk-reviewer/etc.>
Target: <specific token/company/video/note cluster>
Read: <exact files/URLs>
Produce: <specific artifact path>
Rules:
- preserve raw source links
- separate explicit facts from inference
- do not perform live trading/spending/actions
- include verification command/output if applicable
```

## Synthesis prompt template

```text
Read all parent artifacts.
Create one consolidated report with:
1. what each worker found,
2. conflicts or uncertainty,
3. scored priorities,
4. concrete files/scripts/dashboards to update,
5. next-best move.
Update index/log only after verifying artifact paths exist.
```

## When not to use this

- Tiny one-file edits.
- Tasks that need a single live decision from Jayse.
- Anything involving secrets, private keys, payments, or live trading.

## Related

- [[Claude and Ari Second Brain Evolution Loop]]
- [[Antoine On-Chain Alpha Desk]]
- [[AI Quant Trading Floor]]
- [[Business Launch Asset Navigation Dashboard]]
