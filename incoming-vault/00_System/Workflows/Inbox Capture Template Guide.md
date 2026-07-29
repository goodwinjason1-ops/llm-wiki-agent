---
title: Inbox Capture Template Guide
created: 2026-07-08
updated: 2026-07-08
type: workflow
tags: [second-brain, inbox, templates, capture, business-context-brain]
sources: [00_System/Workflows/Capture Workflow.md, 00_System/Workflows/YouTube Ingest Workflow.md]
confidence: high
---

# Inbox Capture Template Guide

## Purpose

Make it simple for Jayse — and eventually Business Context Brain clients — to add messy real-world information to an AI-readable Second Brain without creating a mystery pile.

The key rule:

```text
Capture enough context that Ari/Claude knows why the item matters and what to do with it.
```

## Where templates live

```text
00_System/Templates/
```

Obsidian's core Templates plugin is configured in:

```text
.obsidian/templates.json
```

with:

```json
{"folder":"00_System/Templates"}
```

## How to use in Obsidian

1. Create a new note in `01_Inbox/`.
2. Name it with date + source type + short title.
   - Example: `2026-07-08 - YouTube - AI sales agents.md`
3. Open Command Palette.
4. Run: **Templates: Insert template**.
5. Pick the matching `Inbox - ...` template.
6. Fill in the blanks quickly.
7. Save.

## Template picker

| If you have... | Use template |
|---|---|
| random thought / quick idea | [[Inbox - Quick Capture]] |
| general mixed item | [[Inbox - Universal Capture]] |
| YouTube video | [[Inbox - YouTube Video]] |
| article / web link | [[Inbox - Article or Web Link]] |
| X / social post / thread | [[Inbox - X Thread or Social Post]] |
| PDF / report / doc / spreadsheet | [[Inbox - Reference Document or PDF]] |
| business asset / customer note / sales idea | [[Inbox - Business Asset or Customer Research]] |
| quant / trading / crypto source | [[Inbox - Quant Trading Source]] |
| code repo / script / technical reference | [[Inbox - Code Reference or Repo]] |
| image / screenshot | [[Inbox - Image or Screenshot]] |
| rough idea to evaluate later | [[Inbox - Idea or Rough Thought]] |

## Best filenames

Use this pattern:

```text
YYYY-MM-DD - Type - Short descriptive title.md
```

Examples:

```text
01_Inbox/2026-07-08 - YouTube - multi-agent kanban.md
01_Inbox/2026-07-08 - Article - AI receptionist pricing.md
01_Inbox/2026-07-08 - Reference - ASIC crypto guidance.md
01_Inbox/2026-07-08 - Business Asset - used car buyer objection.md
01_Inbox/2026-07-08 - Quant Source - DEX wallet tracking idea.md
01_Inbox/2026-07-08 - Screenshot - competitor landing page.md
```

## The two mandatory fields

If you fill in nothing else, fill in these:

```markdown
## Why I saved it

## What I want Ari/Claude to do with it
```

Those two fields stop the Inbox from becoming a dumping ground.

## Processing expectations

Saving something to `01_Inbox/` means it is captured, not instantly actioned.

It gets processed when:

1. Jayse asks Ari directly to process Inbox items;
2. Ari runs a scheduled review and sees relevant unprocessed captures;
3. Claude Code runs a manual Second Brain loop;
4. a future dedicated Inbox-processing cron is added.

Until then:

```text
Inbox = safe holding area
Direct message to Ari = action request
```

## Telegram prompted capture

Use [[Telegram Quick Capture Workflow]] when capturing from Telegram and you do not want to remember every field.

The main pattern is:

```text
cap
```

Ari should then prompt a short menu for `yt`, `x`, `reddit`, `web`, `doc`, `biz`, `quant`, `idea`, or `image`.

If you already know the type, use:

```text
cap yt https://youtu.be/... | intent: improve AI workflow | apply: Second Brain | mode: review
```

Default mode is `review`, so Ari can advise whether the source fits before doing heavy ingest.

## Client/business version

For Business Context Brain clients, this becomes a simple operating habit:

```text
Drop messy inputs into Inbox using a template.
AI turns them into clean source notes, workflows, dashboards, and action maps.
```

Client-facing categories can be simplified to:

1. Link / article
2. Video
3. Document / PDF
4. Screenshot / image
5. Customer conversation
6. Business idea
7. Task / action request

## Related

- [[Capture Workflow]]
- [[YouTube Ingest Workflow]]
- [[AI Second Brain Dashboard]]
- [[Business Context Brain - Product Concept]]
