# AI Second Brain Schema

## Domain
Personal AI second brain for NordleRaskal: Hermes + Codex + Obsidian as a compounding operating system for research, projects, workflows, skills, and self-improvement.

## Core rules
- `02_Raw/` is immutable source material. Do not edit raw files after ingest.
- `04_Wiki/` is agent-maintained synthesis: entities, concepts, comparisons, filed queries.
- Every substantial new source gets a raw file, source summary, index update, and log entry.
- Use wikilinks heavily: every durable wiki page should link to at least 2 related pages.
- Every durable page starts with YAML frontmatter.
- Keep pages under ~200 lines; split large topics.
- When a video says Claude, interpret it as Codex in this vault unless the context is specifically Claude-only.

## Frontmatter
```yaml
---
title: Page Title
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: entity | concept | comparison | query | source_summary | workflow | skill | project
tags: [ai-agent, obsidian]
sources: [02_Raw/...]
confidence: high | medium | low
---
```

## Tag taxonomy
- ai-agent, hermes, codex, obsidian, second-brain, llm-wiki, research, workflow, skill, automation, cron, mcp, memory, source, project, business, youtube

## Ingest operation
1. Save raw source under `02_Raw/` with URL, ingest date, and sha256.
2. Create a source summary under `03_Sources/`.
3. Update or create relevant wiki pages under `04_Wiki/`.
4. Update `index.md` and append to `log.md`.
5. If the source teaches a repeatable workflow, create or update a skill/workflow page.

## Query operation
1. Read `index.md` first.
2. Search the vault for key terms.
3. Read relevant pages.
4. Answer with wikilink citations.
5. File valuable answers under `04_Wiki/queries/`.

## Connection illumination operation
1. Run `python3 00_System/Scripts/connection_illuminator.py` from the vault root.
2. Read [[Connection Illumination Dashboard]] and the latest `04_Wiki/queries/Missed Connections Review - YYYY-MM-DD.md`.
3. Treat suggested links as hypotheses; read both pages before editing.
4. Add direct wikilinks only when the relationship is clear.
5. Create a synthesis/query page when the relationship needs explanation.
6. Append durable link/synthesis changes to `log.md`.

## Lint operation
Check for broken links, orphan wiki pages, missing frontmatter, missing index entries, low-confidence pages, stale pages, raw source hash drift, and pages over 200 lines.
