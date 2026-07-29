---
title: Claude and Ari Second Brain Evolution Loop
created: 2026-07-08
updated: 2026-07-08
type: workflow
tags: [second-brain, obsidian, claude, hermes, ari, loop, self-improvement]
sources: [03_Sources/articles/fable-obsidian-second-brain-loop.md]
confidence: medium
---

# Claude and Ari Second Brain Evolution Loop

Purpose: make Jayse's Obsidian vault self-improving by pairing **Claude Code** for local deep work with **Ari/Hermes** for scheduled review, Telegram follow-up, and durable workflow extraction.

## Operating model

| Layer | Tool | Responsibility |
|---|---|---|
| Vault | Obsidian | Human-readable graph, notes, dashboards, project memory |
| Local implementation | Claude Code | Edit notes/code, inspect project folders, create/refactor workflow artifacts |
| Always-on loop | Ari / Hermes | Scheduled weekly review, Telegram summary, cron jobs, cross-session memory, skill updates |
| Safety rails | SCHEMA.md, HERMES.md, CLAUDE.md | Rules for source provenance, index/log updates, no secrets, no unsafe live execution |

## Claude Code setup prompt

Use this in Claude Code from the vault root:

```text
I want you to connect to my Obsidian second-brain vault at:
C:/Users/Kidsg/Documents/AI Second Brain

Before editing anything, read SCHEMA.md, index.md, log.md, HERMES.md, and CLAUDE.md if present.

Your role is to help this vault evolve over time with Jayse and Ari/Hermes. Each session should:
1. preserve 02_Raw/ as immutable source material,
2. update index.md and log.md for durable changes,
3. create or improve workflows/templates/dashboards when patterns repeat,
4. keep project-specific safety rules intact,
5. avoid reading, printing, or storing secrets,
6. treat trading/crypto/live execution as paper/sandbox/dry-run unless Jayse explicitly approves a scoped live action,
7. produce small, implementation-ready improvements rather than vague summaries.
```

## Claude Code weekly loop prompt

Paste this when you want Claude to run a manual deep loop:

```text
/loop Weekly Second Brain Evolution Review

Scan my Obsidian vault at C:/Users/Kidsg/Documents/AI Second Brain.
Read SCHEMA.md, index.md, HERMES.md, CLAUDE.md, the latest log.md entries, START HERE, and key dashboards.

Return a practical weekly review with:
1. What changed this week.
2. Repeated themes/patterns across projects, notes, and workflows.
3. Stalled or neglected projects that need a next action.
4. Notes/workflows/templates/dashboards that should be created or improved.
5. Broken links, missing frontmatter, or obvious vault hygiene issues.
6. Suggestions for Claude-specific deep work.
7. Suggestions for Ari/Hermes scheduled follow-up.
8. The top 3 recommended actions for Jayse this week.

Do not expose secrets. Do not modify raw sources. Do not propose live trading or financial execution without explicit approval and saved evidence.
If you make durable edits, update index.md and log.md.
```

## Ari / Hermes scheduled loop

Ari runs the lightweight always-on version weekly. The scheduled review should:

1. read `SCHEMA.md`, `index.md`, `HERMES.md`, project dashboards, and recent `log.md`;
2. check for new source summaries, project updates, and recurring friction;
3. summarize patterns in Telegram;
4. suggest a short next-action list;
5. recommend when Claude Code should be opened for deeper local implementation;
6. avoid large rewrites unless Jayse asks.

## Weekly review output format

```markdown
## Weekly Second Brain Evolution Review

### 1. New/changed knowledge
- ...

### 2. Patterns Ari/Claude should learn from
- ...

### 3. Suggested workflow/template/dashboard improvements
- ...

### 4. Stalled projects / next actions
- ...

### 5. Claude handoff candidates
- ...

### 6. Ari/Hermes follow-up candidates
- ...

### 7. Top 3 actions this week
1. ...
2. ...
3. ...
```

## Boundaries

- No secrets or API keys in notes.
- `02_Raw/` is immutable.
- Live trading, wallet actions, payments, medical/clinical claims, and external publishing require explicit Jayse approval.
- Prefer small durable artifacts over chat-only insights.

## Related

- [[fable-obsidian-second-brain-loop]]
- [[Capture Workflow]]
- [[Skill Improvement Workflow]]
- [[Weekly Lint Workflow]]
- [[AI Second Brain Dashboard]]
- [[AI Second Brain Project Registry]]
- [[AI Quant Trading Floor Dashboard]]
- [[AI Quant Trading Floor Workflow]]
- [[Alternative Paper Ops Lab 05 - Intraday Outcome Resolver and Obsidian Dashboard]]
- [[AI Quant Morning Brief - Latest]]
- [[AOD Weekly Approval and Follow-up Surface - 2026-07-13]]
- [[BCB Demo and Outreach Action Pack - 2026-07-13]]
