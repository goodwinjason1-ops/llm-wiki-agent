---
title: Ari Context Guard and Handoff Workflow
created: 2026-07-08
updated: 2026-07-08
type: workflow
status: active
tags: [ari, hermes, handoff, context, reliability]
sources:
  - 03_Sources/youtube/Claude Code Money Partner - YouTube iTY8Q449YNQ.md
  - 03_Sources/youtube/Oracle Cloud Free VPS - YouTube TAZfDdQha3U.md
confidence: high
---

# Ari Context Guard and Handoff Workflow

## Purpose

Prevent long Telegram/Hermes work sessions from losing state near the context-window limit.

## Operating rule

Ari should create or refresh a handoff **before** continuing when any of these are true:

- a task batch has 5+ tool calls or multiple durable file edits;
- a new cap/source is ingested and converted into notes;
- a trading/DeFi/infra task changes scripts, cron, config, or dashboards;
- the conversation feels long enough that the next task could exceed context;
- Jayse explicitly asks for context-limit protection.

## Handoff target

Update:

- `00_System/Handoffs/Current Ari Handoff.md`

For major checkpoints, also create a timestamped handoff:

- `00_System/Handoffs/Ari Handoff - YYYY-MM-DD HHMM.md`

## Minimum handoff contents

```text
- Current objective
- Completed since last handoff
- Files created/edited
- Verification output
- Blockers / source limitations
- Active next actions
- Safety guardrails
```

## Current context checkpoint

Latest checkpoint after processing the Oracle VPS cap:

- Raw transcript: `02_Raw/youtube/transcripts/TAZfDdQha3U.md`
- Source summary: [[Oracle Cloud Free VPS - YouTube TAZfDdQha3U]]
- Infra plan: [[Hermes Remote VPS Migration Plan - Oracle Always Free]]
- Guardrail: no cloud account, billing, ports, or live server changes without Jayse's explicit approval.

## Practical commitment

For ongoing sessions, Ari should not wait until the model is struggling. After each meaningful implementation/cap, save a compact handoff and then continue.
