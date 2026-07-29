---
title: GitHub Tool Staging - 2026-07-08
created: 2026-07-08
updated: 2026-07-08
type: project
status: active-staging
tags: [github, tools, ai-agent, quant, infrastructure]
sources:
  - 03_Sources/x/Git Tools Install Review - X 2061870611115188297.md
confidence: medium
---

# GitHub Tool Staging - 2026-07-08

## Purpose

Track GitHub tools staged from Jayse's X cap so they can be evaluated without unsafe execution.

## Staging folder

`C:/Users/Kidsg/ai-tools/git-caps/2061870611115188297/`

## Repos

| Tool | Local path | Use | Status |
|---|---|---|---|
| TradingAgents | `.../TradingAgents` | AI Quant research-board/paper analysis | cloned; not run |
| LibreChat | `.../LibreChat` | self-hosted AI UI / cost-control lab | cloned; not deployed |
| FinceptTerminal | `.../FinceptTerminal` | finance research terminal | cloned; not installed/run |
| VoxCPM | `.../VoxCPM` | TTS/voice stack | cloned; no model weights downloaded |
| agent-skills | `.../agent-skills` | AI coding agent workflows | cloned + installed globally via `skills` CLI |

## Installed Addy skills

Installed globally:

`C:/Users/Kidsg/.agents/skills/`

Verified visible for Claude Code / Hermes Agent / Pi via:

```bash
npx -y skills@latest list -g -a claude-code
```

Notable skills:

- `context-engineering`
- `spec-driven-development`
- `planning-and-task-breakdown`
- `incremental-implementation`
- `test-driven-development`
- `code-review-and-quality`
- `security-and-hardening`
- `source-driven-development`
- `doubt-driven-development`

## Guardrails

- No live trading.
- No broker/exchange/wallet keys.
- No running unreviewed install scripts.
- No downloading large model weights without disk/GPU check.
- No exposing self-hosted services publicly without auth/TLS/firewall review.
