---
title: Fable Style Self-Evolving Obsidian Loop
created: 2026-07-09
updated: 2026-07-09
type: workflow
status: active
tags: [obsidian, fable, ari, self-evolving, loop, automation]
sources:
  - 03_Sources/x/X Bookmark Cap 2 - AI Edge Fable Obsidian Self-Evolving Loops.md
confidence: high
---

# Fable Style Self-Evolving Obsidian Loop

## Purpose

Make the AI Second Brain improve through small verified loops, not vague claims of being “self-evolving.” A loop only counts when it reads the vault, writes a durable artifact, verifies the result, and refreshes handoff/state.

## Loop shape

```text
capture → classify → link → summarize → create next action → verify → refresh handoff
```

## Implemented runner

Script:

`00_System/Scripts/vault_loop_runner.py`

Outputs:

- `00_System/Reports/Vault Loop Report - YYYY-MM-DD.md`
- `00_System/Reports/vault_loop_latest.json`
- refreshed `00_System/Handoffs/Current Ari Handoff.md`

The runner currently calls:

1. `00_System/Scripts/inbox_processor.py`
2. `00_System/Scripts/connection_illuminator.py`
3. `00_System/Scripts/vault_lint.py`
4. handoff refresh summary

## Manual command

From the vault root:

```bash
python3 00_System/Scripts/vault_loop_runner.py
```

## Scheduled job

Hermes cron job: `AI Second Brain self-evolving vault loop` (`6bcec8721b62`), daily at 6:20am.

Mode: script-only/no-agent. It is intended to be deterministic, cheap, and auditable.

## What the loop is allowed to do

- Read vault notes.
- Generate reports/dashboards.
- Suggest missing links and next actions.
- Append a concise handoff line.
- Report vault health.

## What the loop must not do automatically

- Delete notes.
- Rewrite raw sources.
- Auto-link every possible suggestion.
- Expose secrets or private data.
- Make trading or DeFi live actions.

## Maturity levels

| Level | Meaning | Current status |
|---|---|---|
| L1 | Deterministic reports and lint | active |
| L2 | Dashboard/handoff refresh | active |
| L3 | Human-approved note edits from suggestions | next |
| L4 | Scheduled project-specific workflows | partial |
| L5 | Guardrailed action agents | future, explicit approval only |

## Related

- [[X Bookmark Cap 2 - AI Edge Fable Obsidian Self-Evolving Loops]]
- [[Ari Context Guard and Handoff Workflow]]
- [[Connection Illumination Dashboard]]
- [[Jayse AI Second Brain - 15 Minute Onboarding Demo Runbook]]
