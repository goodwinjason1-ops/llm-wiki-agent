---
title: Fable Obsidian Second-Brain Loop
type: source-summary
created: 2026-07-08
updated: 2026-07-08
tags: [second-brain, obsidian, workflow, claude, hermes, loop]
sources: [02_Raw/articles/x-aiedge-fable-obsidian-loop-2026-07-07.md]
confidence: medium
---

# Fable Obsidian Second-Brain Loop

Source: [[x-aiedge-fable-obsidian-loop-2026-07-07]]  
Original: https://x.com/i/status/2074606895701319913

## What the source says

AI Edge recommends a simple Fable/Claude Code pattern:

1. Create an Obsidian vault as the local database for notes.
2. Start adding personal goals, meeting notes, fitness goals, and other life/project material.
3. Ask Claude Code to connect to the Obsidian database so it can create and update notes.
4. Set a recurring `/loop` that scans the notes database weekly, suggests new workflows, identifies patterns, and performs a deep dive based on the second brain.

## Jayse adaptation

Jayse already has the vault and Hermes/Ari access:

- Vault: `C:/Users/Kidsg/Documents/AI Second Brain`
- Claude global project registry: `C:/Users/Kidsg/.claude/CLAUDE.md`
- Hermes vault instructions: `HERMES.md`
- Existing Obsidian/Second Brain workflows: [[Capture Workflow]], [[Skill Improvement Workflow]], [[Weekly Lint Workflow]]

The local implementation should use a **Claude + Ari pair loop**:

| Agent | Role |
|---|---|
| Claude Code | Local vault editor/coder: run project-specific implementation, refactors, markdown maintenance, and deep Claude sessions when Jayse opens the vault in Claude Code. |
| Ari / Hermes | Always-on scheduler and Telegram companion: run weekly reviews, surface concise findings, maintain cron jobs, dashboards, and cross-session continuity. |

## Implementation decision

Create a workflow note: [[Claude and Ari Second Brain Evolution Loop]].

The loop should not merely summarize notes. It should:

- find repeated problems, goals, stalled projects, and useful patterns;
- propose new workflows, templates, dashboards, and skills;
- identify notes that should be connected, split, archived, or promoted;
- keep recommendations small and implementable;
- avoid reading or exposing secrets;
- treat trading/live execution, health, and mental-health material with extra safety constraints.

## Related

- [[ai-second-brain]]
- [[self-improvement-loop]]
- [[agent-reach]]
- [[codex-execution-engine]]
- [[Claude and Ari Second Brain Evolution Loop]]
