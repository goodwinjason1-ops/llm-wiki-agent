---
title: Telegram Quick Capture Workflow
created: 2026-07-08
updated: 2026-07-08
type: workflow
tags: [telegram, capture, inbox, second-brain, business-context-brain]
sources: [00_System/Workflows/Inbox Capture Template Guide.md, 00_System/Workflows/Capture Workflow.md]
confidence: high
---

# Telegram Quick Capture Workflow

## Purpose

Capture YouTube, X, Reddit, web links, docs, business notes, quant sources, ideas, and images through Telegram without Jayse memorising template fields.

Core rule:

```text
Do not make Jayse remember the form. Ari prompts the form.
```

## Important Telegram note

`/cap` is not currently a registered Hermes/Telegram slash command. Telegram/Hermes may respond `unknown command` if the message starts with `/cap`.

Until a real Hermes gateway command is implemented, use the plain-text trigger:

```text
cap
```

or:

```text
capture
```

## Default interaction

Jayse sends:

```text
cap
```

Ari replies:

```text
What are we capturing?
1. yt — YouTube/video
2. x — X/Twitter/social thread
3. reddit — Reddit/forum thread
4. web — article/blog/page
5. doc — PDF/report/reference file
6. biz — customer/business asset
7. quant — trading/alpha/risk source
8. idea — rough idea
9. image — screenshot/image

Reply with number/type + link/note.
Example: yt https://youtu.be/...
```

Jayse can skip the menu:

```text
cap yt https://youtu.be/...
cap x https://x.com/...
cap reddit https://reddit.com/...
```

If mode is missing, default to `review`.

| Mode | Meaning |
|---|---|
| save | Save Inbox note only. |
| review | Check fit and suggest action. |
| process | Ingest/process now if enough context exists. |

## Universal prompt

When detail is missing, Ari asks:

```text
Quick capture — send what you have:
Type: yt / x / reddit / web / doc / biz / quant / idea / image / unknown
Link/file/note:
Intent: what do you want me to look for?
Apply to: project/brain area if known?
Mode: save / review / process
Priority: low / medium / high
```

Only `Link/file/note` and `Intent` are essential.

## Prompt card table

| Type | Trigger | Ari asks for | Template / destination |
|---|---|---|---|
| YouTube/video | `cap yt` | URL, intent, apply-to, mode, priority, timestamps | [[Inbox - YouTube Video]], `02_Raw/youtube/`, `03_Sources/youtube/` |
| X/social | `cap x` | URL, intent, apply-to, what caught your eye | [[Inbox - X Thread or Social Post]] |
| Reddit/forum | `cap reddit` | URL, customer pain/research signal/trading sentiment, apply-to | social/web Inbox note |
| Web/article | `cap web` | URL, intent, apply-to, notes | [[Inbox - Article or Web Link]] |
| Document/PDF | `cap doc` | file/URL, doc type, intent, sensitivity | [[Inbox - Reference Document or PDF]], `02_Raw/documents/` |
| Business/customer | `cap biz` | source, raw note/link, pain/objection/offer/proof intent | [[Inbox - Business Asset or Customer Research]] |
| Quant/trading | `cap quant` | source, hypothesis/risk/data intent, market/venue, safety | [[Inbox - Quant Trading Source]] |
| Idea | `cap idea` | raw idea, why it matters, apply-to | [[Inbox - Idea or Rough Thought]] |
| Image/screenshot | `cap image` | image/path, what it shows, extraction intent, sensitivity | [[Inbox - Image or Screenshot]], `02_Raw/images/` |

## Mini prompts

```text
YouTube: URL / Intent / Apply to / Mode / Priority / Timestamps
X/social: URL / Intent / Apply to / What caught your eye
Reddit: URL / Intent / Apply to / What should I pay attention to
Web: URL / Intent / Apply to / Notes
Doc: File or URL / Document type / Intent / Sensitivity
Business: Source / Raw note or link / Intent / Apply to
Quant: Source / Hypothesis or risk idea / Market or venue / Safety
Idea: Raw idea / Why it matters / Apply to
Image: Image or path / What it shows / Intent / Sensitivity
```

## Ari response format

After receiving a capture, Ari replies briefly:

```text
Captured / ready to capture.
Fit: Strong / Medium / Weak
Why: ...
Suggested action: Save / Review / Process
Destination: ...
Missing: ...
```

## Guardrails

- X/Reddit/social claims are unverified until checked.
- Quant/trading captures are research/paper-only unless Jayse explicitly approves a scoped live action.
- Sensitive docs/images must redact secrets as `[REDACTED]`.
- Save-only captures go to `01_Inbox/`; durable processing may create `02_Raw/`, `03_Sources/`, workflow, project, dashboard, index, and log updates.

## Fast examples

```text
cap yt https://youtu.be/... | intent: improve multi-agent workflow | apply: Second Brain | mode: review
cap x https://x.com/... | intent: on-chain risk idea | apply: Antoine desk | priority: high
cap reddit https://reddit.com/... | intent: customer pain language | apply: Business Context Brain
cap web https://example.com | intent: landing page positioning | apply: BuyerProof | mode: save
```

## Business Context Brain adaptation

For clients, simplify to:

```text
New item:
Source:
Why it matters:
What you want done:
```

Ari/operator translates that into the same capture system.

## Related

- [[Inbox Capture Template Guide]]
- [[Capture Workflow]]
- [[Business Context Brain Client Intake Guide]]
- [[AI Second Brain Dashboard]]
