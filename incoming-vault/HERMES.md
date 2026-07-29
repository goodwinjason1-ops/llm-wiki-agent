# Hermes/Codex Instructions for This Vault

This directory is NordleRaskal's AI Second Brain Obsidian vault.

Before working here:
1. Read `AGENTS.md` — the shared operating manual for every agent in this vault.
2. Read `SCHEMA.md`.
3. Read `index.md`.
4. Read the end of `log.md`.

Rules:
- Treat mentions of Claude in source videos as Codex for implementation unless a distinction matters.
- Preserve `02_Raw/` as immutable sources.
- Update `index.md` and `log.md` for any durable change.
- Use wikilinks and YAML frontmatter.
- Workflows belong in `00_System/Workflows/`
- Durable synthesis belongs in `04_Wiki/`.
- User-facing tasks/projects belong in `05_Projects/`, `06_Areas/`, or `07_Resources/`.
- Claude Code should read `CLAUDE.md` and [[Claude and Ari Second Brain Evolution Loop]] when working in this vault.
- Ari/Hermes owns scheduled reviews and Telegram follow-up; Claude Code owns local deep edits and implementation sessions.
- Ari/Hermes owns the **daily** automated run:
  `python3 00_System/Scripts/vault_health.py --record` then
  `python3 00_System/Scripts/connection_illuminator.py --write`.
  Surface one line: the synthesis ratio, which gates failed, and the top connection candidate.
- `vault_health.py` exits non-zero when gates fail — alert on that. A failing
  synthesis ratio should interrupt, the way a failing build does.
- Full loop and gate definitions: [[Second Brain Self-Improvement Loop]].
