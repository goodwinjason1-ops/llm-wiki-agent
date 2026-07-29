---
title: Business Context Brain Client Intake Guide
created: 2026-07-08
updated: 2026-07-08
type: workflow
tags: [business-context-brain, client-intake, templates, onboarding, capture]
sources: [00_System/Workflows/Inbox Capture Template Guide.md, 05_Projects/AI Business Launch Backlog/Business Context Brain - Product Concept.md]
confidence: medium
---

# Business Context Brain Client Intake Guide

## Client promise

You do not need to perfectly organize your business information before giving it to us. Use a small set of intake templates so the AI/context operator knows what each item is, why it matters, and what outcome you want.

## Simple client categories

| Client has... | Ask them to create... | Internal template |
|---|---|---|
| link/article | `Article - short title` | [[Inbox - Article or Web Link]] |
| YouTube/Loom/video | `Video - short title` | [[Inbox - YouTube Video]] |
| PDF/report/spreadsheet | `Reference - short title` | [[Inbox - Reference Document or PDF]] |
| screenshot/photo | `Screenshot - short title` | [[Inbox - Image or Screenshot]] |
| customer conversation | `Customer Note - short title` | [[Inbox - Business Asset or Customer Research]] |
| rough business idea | `Idea - short title` | [[Inbox - Idea or Rough Thought]] |
| code/technical repo | `Code Reference - short title` | [[Inbox - Code Reference or Repo]] |
| anything unclear | `Quick Capture - short title` | [[Inbox - Quick Capture]] |

## Telegram-style guided intake

For a chat-first client workflow, use the same idea as [[Telegram Quick Capture Workflow]] but with simpler language:

```text
cap
```

Then ask:

1. What kind of thing is it? Link, video, document, screenshot, customer note, idea, task?
2. Paste the source or note.
3. Why does it matter?
4. What should we extract or do with it?

This lets clients submit useful context without learning folder structures or template names.

## Minimum viable capture

If a client is overwhelmed, ask for only three fields:

```markdown
## Source
Where did this come from?

## Why I saved it
Why might this matter?

## What I want done
What should the brain/operator extract, decide, or build from this?
```

## Example client note — customer call

```markdown
# Customer Note - renovation quote confusion

## Source
Phone call with prospect on 2026-07-08.

## Why I saved it
They said they struggle comparing renovation quotes because every builder describes scope differently.

## What I want done
Extract objection language, landing page copy, and checklist ideas.
```

## Example client note — PDF

```markdown
# Reference - supplier price list July

## Source
Uploaded PDF: Supplier Price List July.pdf

## Why I saved it
We quote these materials often and prices change.

## What I want done
Summarize price categories, flag changes, and update quote workflow assumptions.
```

## Example client note — screenshot

```markdown
# Screenshot - competitor guarantee section

## Source
Screenshot from competitor landing page.

## Why I saved it
Their guarantee wording is clearer than ours.

## What I want done
Extract the copy structure and suggest a version for our offer.
```

## Delivery workflow integration

During a Context Map Sprint:

1. Client drops files/notes into Inbox using templates.
2. Operator moves raw files into `02_Raw/` or client raw-source folder.
3. AI creates source summaries and wiki/process pages.
4. Operator links outputs into dashboard/funnel/workflow maps.
5. Client is taught the same capture habit for Monthly Brain Maintenance.

## Why this is commercially useful

The templates make the service easier to sell because the client does not need to learn Obsidian deeply. They only need to know:

```text
New thing worth remembering → pick a simple template → say why it matters → save.
```

That turns messy business knowledge into an intake pipeline rather than a one-time cleanup project.

## Related

- [[Inbox Capture Template Guide]]
- [[Business Context Brain - Product Concept]]
- [[Business Launch Asset Navigation Dashboard]]
- [[Client Intake Checklist - Business Context Brain]]
