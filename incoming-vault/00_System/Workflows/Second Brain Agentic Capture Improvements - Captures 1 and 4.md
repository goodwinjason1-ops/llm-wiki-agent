---
title: Second Brain Agentic Capture Improvements - Captures 1 and 4
created: 2026-07-08
updated: 2026-07-08
type: workflow
tags: [second-brain, obsidian, claude, hermes, capture, agentic-loop]
sources:
  - 02_Raw/youtube/transcripts/L2JKgj7WzU4.md
  - 02_Raw/youtube/transcripts/VaGpWWiHXm8.md
confidence: medium
---

# Second Brain Agentic Capture Improvements - Captures 1 and 4

## Sources

- Cap 1: `6 Claude Code GitHub Repos That Change Everything` — skills, agents, hooks, planning/TDD, design-agent repos.
- Cap 4: `Obsidian Vault Deep Dive! Custom Plugins + Agentic Loops` — Obsidian as local memory + agent workspace.

## Fit

**Strong.** These both reinforce the direction already started in Jayse's vault: Obsidian is the memory/graph layer; Ari/Hermes and Claude/Codex are the action layer.

## Useful improvements to apply

1. **Prompted capture, not memorized templates.** Already implemented with [[Telegram Quick Capture Workflow]]. Continue improving `cap` so Jayse only provides source + rough intent.
2. **Daily/rolling log as agent memory.** Existing `log.md` is useful but large; next improvement is a weekly/monthly archive or `00_System/Logs/` split to reduce large-page lint.
3. **Hooks/checklists before actions.** For trading/business changes, force safety gates before code or vault edits: source, intent, apply-to, sensitivity, evidence level.
4. **Parallel role agents, not task-specific personas.** Reuse [[Parallel Agent Research Board Workflow]] roles: researcher, risk-reviewer, verifier, synthesizer.
5. **Design/visual artifact agent for Business Context Brain.** Cap 1's design-agent idea maps to proof screenshots, before/after storyboards, and landing/demo assets.
6. **Terminal/agent-to-Obsidian workflow.** Cap 4 validates using the agent as the thing that routes messy inputs into the correct folder, not making the user do folder/admin work manually.

## Do not blindly adopt

- Do not install every Claude repo/plugin into Jayse's working environment without review.
- Treat repo claims about huge agent swarms, memory, or self-learning as marketing until tested.
- Prefer the Hermes skills already available over duplicating capabilities with unknown repos.

## Next implementation candidate

Create an **Inbox Processor** command/cron later:

```text
01_Inbox unprocessed note
  → classify type
  → create raw/source/project note
  → update dashboard/log
  → mark processed
```

For now, manual `cap` is the right lightweight version.

## Related

- [[Telegram Quick Capture Workflow]]
- [[Inbox Capture Template Guide]]
- [[AI Second Brain Dashboard]]
- [[Parallel Agent Research Board Workflow]]
