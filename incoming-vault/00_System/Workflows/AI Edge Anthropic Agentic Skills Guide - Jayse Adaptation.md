---
title: AI Edge Anthropic Agentic Skills Guide - Jayse Adaptation
created: 2026-07-09
updated: 2026-07-09
type: workflow
status: active
tags: [agent-skills, hermes, claude, codex, addy-osmani, skill-authoring]
sources:
  - 03_Sources/x/X Bookmark Cap 6 - AI Edge Anthropic Agentic Skills Guide.md
  - 08_Skills/Agent Skill Candidate Template.md
confidence: high
---

# AI Edge Anthropic Agentic Skills Guide - Jayse Adaptation

## Purpose

Turn repeated Ari/Claude/Codex workflows into reusable skills only when they are proven, useful, and specific enough to improve future agent behavior.

## Rule of thumb

A note is **knowledge**. A workflow is **procedure**. A skill is **agent behavior that should load automatically when the trigger appears**.

## When to create a skill

Create or update a skill when at least one is true:

- A workflow required 5+ tool calls and succeeded.
- Ari hit a non-obvious failure and found a reusable fix.
- Jayse corrected the process and the correction should persist.
- A task recurs across projects: capture ingestion, vault loops, quant review, BuyerProof kit generation, code review, etc.
- The workflow has triggers, exact steps, pitfalls, and verification.

Do **not** create a skill for:

- a one-off source summary;
- temporary task progress;
- stale artifact IDs;
- broad generic advice;
- anything that belongs in memory/user profile instead.

## Jayse skill authoring checklist

- [ ] Trigger is clear: “Use when…”
- [ ] Scope is narrow enough to change behavior.
- [ ] Steps are ordered and checkable.
- [ ] Pitfalls are based on real failures.
- [ ] Verification includes concrete commands/files.
- [ ] No secrets or credentials are embedded.
- [ ] For trading/DeFi: read-only/backtest/paper unless explicit live scope is approved.
- [ ] The skill is shorter than the workflow history; it compresses the lesson.

## Local stack mapping

| Source wording | Jayse stack adaptation |
|---|---|
| Claude skill | Hermes skill or Claude Code skill depending on runtime |
| Claude Code | Codex/Hermes for implementation unless Claude-specific capability matters |
| Fable loop | Ari/Hermes scheduled loop + Obsidian dashboards/handoffs |
| Agentic skill docs | Trigger/steps/pitfalls/verification format |
| Addy Osmani skills | External skill library installed under `C:/Users/Kidsg/.agents/skills` |

## Implemented support files

- [[Agent Skill Candidate Template]]
- `00_System/Scripts/agent_skill_candidate_audit.py`
- [[Fable Style Self-Evolving Obsidian Loop]]

## Candidate promotion flow

```text
successful task → workflow note → candidate template → skill draft → verification → install/update skill
```

## Related

- [[X Bookmark Cap 6 - AI Edge Anthropic Agentic Skills Guide]]
- [[Agent Skill Candidate Template]]
- [[Jayse AI Second Brain - 15 Minute Onboarding Demo Runbook]]
