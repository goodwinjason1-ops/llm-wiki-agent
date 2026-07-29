---
title: AI Second Brain Dashboard
created: 2026-07-02
updated: 2026-07-21
type: dashboard
tags: [second-brain, obsidian]
sources: []
confidence: high
---

# AI Second Brain Dashboard

## Pinned / frequently needed docs
- [[Daily Second Brain Update - 2026-07-21]] — today's full update summary.
- [[Jayse Portfolio Command Dashboard]] — portfolio status, next jobs, achieved dates, target dates and conditional live-readiness forecasts.
- [[Android Obsidian Sync via Syncthing]] — phone connection setup for the AI Second Brain vault.
- [[AI Quant Morning Brief - Latest]] — latest daily three-idea quant brief.
- [[AI Quant Morning Next Step Queue]] — where morning-brief next steps/results are queued.
- [[Hermes Remote VPS Migration Plan - Oracle Always Free]] — remote Ari/Hermes uptime and disaster-recovery setup.
- [[Ari Context Guard and Handoff Workflow]] — how Ari preserves context before long sessions overflow.
- [[Karpathy Self-Learning Lessons Review and Implementation Workflow]] — how generated self-learning lessons get reviewed, approved, implemented, and verified.
- [[Bybit Airdrop Prediction Bot Implementation Plan]] — staged plan for Bybit bot, Airdrop Agent, and Prediction Bot integration under guardrails.

## Runbooks
- [[Capture Workflow]]
- [[Inbox Capture Template Guide]]
- [[Telegram Quick Capture Workflow]]
- [[Ari Context Guard and Handoff Workflow]]
- Inbox processor script: `00_System/Scripts/inbox_processor.py` (dry-run default; reports to `00_System/Reports/`)
- [[YouTube Ingest Workflow]]
- [[Weekly Lint Workflow]]
- [[Skill Improvement Workflow]]
- [[Claude and Ari Second Brain Evolution Loop]]
- [[Karpathy Connection Illumination Workflow]]
- [[Karpathy Self-Learning Lessons Review and Implementation Workflow]]
- [[Obsidian Graph Visual Language]]
- [[Second Brain Agentic Capture Improvements - Captures 1 and 4]]
- [[Connection Illumination Dashboard]]
- [[AOD Weekly Approval and Follow-up Surface - 2026-07-13]]
- [[BCB Demo and Outreach Action Pack - 2026-07-13]]
- [[Business Launch Asset Navigation Dashboard]]

## Scheduled loops
- **Daily 06:00** — AI Quant Morning Brief — cron `46c173e5f73f`
- **Daily 06:20** — Second Brain vault loop — cron `6bcec8721b62`
- **Daily 07:00** — Jayse daily morning start brief — cron `bff3c3d3cacd`
- **Daily 19:00** — Jayse daily evening close brief — cron `d1d255ce80b0`
- **Weekdays 07:00** — AOD placement/job finder — cron `5e930e76407f`
- **Weekdays 08:00** — Tactical ETF paper monitor — cron `83516ec85064`
- **Daily 09:00** — Alternative venues monitor — cron `87a2456a3bbb`
- **Hourly** — Hyperliquid funding recorder — cron `1e51b5d88577`
- **Hourly** — Antoine outcome watchdog — cron `99832edcba1e`
- **Daily 10:00** — Polymarket paper signal recorder — cron `61f996692d57`
- **Every 6h** — Polymarket outcome tracker — cron `55283af680f6`
- **Every 2h** — Edge execution worker — cron `a6da4f635be5`
- **Every 2h** — Liquidation proxy recorder — cron `8056f3abb454`
- **Every 15m** — Due-task reminder watchdog — cron `e0456e341bb1`
- **Sundays 09:00** — Weekly AI Second Brain Health Check — cron `adb6041493e3`
- **Mondays 09:30** — Weekly Claude + Ari Evolution Review — cron `95c8a6caf2a1`
- **Weekdays 08:30** — Engo Crypto Framework daily runner — cron `d7e78d74443d`
- **Weekdays 08:00** — DeFi yield scanner — cron `c6612138e39d`
- **Daily 10:30** — AI Quant Floor Obsidian dashboard refresh — cron `a8a58f9b3ee1`

## Core concepts
- [[ai-second-brain]]
- [[karpathy-llm-wiki]]
- [[self-improvement-loop]]
- [[agent-reach]]
- [[codex-execution-engine]]

## Active inbox
```dataview
LIST FROM "01_Inbox"
SORT file.mtime DESC
```

Latest processor report: `00_System/Reports/Inbox Processor Report - 2026-07-21.md`

## Capture templates
- Template folder: `00_System/Templates/`
- Use Obsidian command: **Templates: Insert template**
- Start with [[Inbox - Quick Capture]] or [[Inbox - Universal Capture]] when unsure.
- From Telegram, send `cap` and Ari should prompt the source type and missing intent fields. Avoid `/cap` until it is registered as a real Hermes/Telegram command.

## Recent sources
```dataview
TABLE source_url, updated, confidence FROM "03_Sources"
SORT updated DESC
```

## Latest capture synthesis
- [[Cap Batch 2026-07-08 - Sequential Capture Review]]
- [[Fable Extraction Master Status]] — tracks all durable extractions from the Fable/Claude workflow

## Self-evolving loop
- [[Jayse AI Second Brain - 15 Minute Onboarding Demo Runbook]]
- [[Fable Style Self-Evolving Obsidian Loop]]
- Latest loop report: [[Vault Loop Report - 2026-07-21]]
- Skill workflow: [[AI Edge Anthropic Agentic Skills Guide - Jayse Adaptation]] / [[Agent Skill Candidate Audit]]
- Cron: `AI Second Brain self-evolving vault loop` (`6bcec8721b62`), daily 6:20am

## Personal agent workflows
- [[Unigram Share-to-Ari Capture Workflow]] — use share/copy-link into Telegram/Unigram for X and web captures.
- [[AI Job Hunter Workflow - Personal Career Agent]] / [[Job Hunter Dashboard]] — useful; assistive only, no auto-apply.
- [[AI Health Fitness Coach Workflow]] / [[Fitness Coach Dashboard]] — useful; habit coaching only, not medical advice.
- [[AI Travel Planner - Parked Assessment]] — parked/low priority.

## Projects tracked in registry
- [[AI Second Brain Project Registry]] — maps all Jayse's local project folders into the vault
- [[Jayse Portfolio Command Dashboard]] — executive snapshot of all workstreams with progress percentages
- [[Fable Trading System Project Context]] — 23-edge multi-asset trading framework (master risk plan)
- [[Fable Trading System — Execution Layer]] — order gateway, risk monitor, kill-switch (paper mode, ready for paper execution)
