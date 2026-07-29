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

Before editing durable files, read:

1. `SCHEMA.md`
2. `index.md`
3. latest entries in `log.md`
4. `HERMES.md`
5. `00_System/Workflows/Claude and Ari Second Brain Evolution Loop.md`

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

Before Second Brain review sessions, inspect [[Connection Illumination Dashboard]] or run `python3 00_System/Scripts/connection_illuminator.py` to surface missed connections.

## Weekly loop

For recurring improvement work, follow:

`00_System/Workflows/Claude and Ari Second Brain Evolution Loop.md`
