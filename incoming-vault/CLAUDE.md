---
title: Claude Code Instructions for Jayse's AI Second Brain
created: 2026-07-08
updated: 2026-07-08
type: system
tags: [claude, second-brain, obsidian, hermes]
sources: [00_System/Workflows/Claude and Ari Second Brain Evolution Loop.md]
confidence: medium
---

# Claude Code Instructions for Jayse's AI Second Brain

This directory is Jayse/NordleRaskal's Obsidian AI Second Brain vault.

## Orientation before edits

**Read [`AGENTS.md`](AGENTS.md) first — it is the operating manual and it applies
to every agent working here.** This file adds only Claude-specific role notes.

Then:

1. `SCHEMA.md` — the rules a note must satisfy
2. `index.md` — what exists
3. latest entries in `log.md` — what changed
4. `00_System/Workflows/Second Brain Self-Improvement Loop.md` — the loop and its gates

## Role split

- **Claude Code**: deep local editing, implementation, refactors, scripts, markdown maintenance, project-folder reasoning.
- **Ari / Hermes**: Telegram companion, scheduled loops, cron jobs, cross-session continuity, quick capture, and weekly summaries.

## Rules

- Preserve `02_Raw/` as immutable source material.
- Update `index.md` and `log.md` for durable changes.
- Use wikilinks and YAML frontmatter for vault notes.
- Prefer workflows/templates/dashboards for repeated patterns.
- Do not read, print, or store secrets/API keys.
- Trading/crypto/live execution defaults to paper/sandbox/dry-run unless Jayse explicitly approves a specific live action.
- Mental health/AOD/Jungian/role-play content is educational/training context, not clinical advice.
- Keep outputs implementation-ready: next actions, file paths, prompts, commands, or saved artifacts.

## Claude slash commands

Project commands are available under `.claude/commands/`:

- `/connect-second-brain` — orient Claude to the vault and confirm rules before work.
- `/second-brain-loop` — run the Claude-side weekly deep review. Add a focus after the command if useful.

## Tooling

```bash
python3 00_System/Scripts/vault_health.py --record          # scoreboard; exits non-zero on failing gates
python3 00_System/Scripts/connection_illuminator.py --write # merge candidates, stalled series, missed links
python3 00_System/Scripts/vault_repair.py --apply           # index joins, type vocabulary drift
```

Run `vault_health.py` at the **start** of a session, not the end. It tells you
which gate is failing, and that should set the session's priority.

## The one thing not to skip

This vault stalled once: 190 raw notes and 80 source summaries produced 5 concept
pages, because ingest kept running and step 3 — updating `04_Wiki` — kept getting
skipped. The post-mortem is [[synthesis-debt]].

If a session ends with more captured material and no new synthesis, say so
explicitly rather than reporting success.

## Weekly loop

`00_System/Workflows/Second Brain Self-Improvement Loop.md`

(Supersedes `Claude and Ari Second Brain Evolution Loop.md`, which is retained
for history.)
