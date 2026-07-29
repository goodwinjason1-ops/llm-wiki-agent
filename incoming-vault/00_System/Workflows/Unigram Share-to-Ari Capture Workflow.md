---
title: Unigram Share-to-Ari Capture Workflow
created: 2026-07-09
updated: 2026-07-09
type: workflow
status: active
sources:
  - 03_Sources/x/AI Edge Personal Agent Ideas - X 2068159407645671640.md
tags: [telegram, unigram, capture, x, second-brain, ari]
confidence: medium
---

# Unigram Share-to-Ari Capture Workflow

## Purpose

Use Windows/phone share sheets to send links, text, and notes into Ari via Telegram/Unigram, then turn them into Obsidian capture artifacts.

## Can this work with X?

Yes, if X exposes a normal share link on your device. Best path:

```text
X post → Share → Copy link OR Share via Telegram/Unigram → Ari chat → cap ingest
```

For X bookmarks where Ari cannot see the underlying URL, this is currently the most reliable method.

## Recommended message format

```text
cap x
Link: https://x.com/<user>/status/<id>
Intent: review and extract alpha/usefulness
Category: quant / second-brain / business / personal
Notes: why I saved it
```

For multiple items:

```text
cap batch
1. https://x.com/... — quant / Antoine, review alpha
2. https://x.com/... — job hunter, useful for personal workflow?
3. https://x.com/... — health coach, maybe build later
```

## If using Unigram share directly

1. In X, click **Share**.
2. Choose **Share via...** if available.
3. Pick **Unigram** / Telegram.
4. Select Ari/Hermes chat.
5. Add one line of intent before sending if possible.

If the share only sends the title without a URL, use **Copy link** instead.

## Ari processing rule

Ari should treat Unigram-shared items as capture inputs, not as automatic install/action approval. First response should classify:

| Field | Meaning |
|---|---|
| Fit | current workflow relevance |
| Destination | vault folder/project |
| Action | ingest / review / implement / park |
| Missing | URL, full text, screenshots, repo, etc. |

## Safety

- Do not share secrets, wallet seed phrases, API keys, personal IDs, or private client documents through casual capture.
- Trading/DeFi captures stay read-only/research/paper until explicit live approval.
- Job/health/personal data can be sensitive; use private notes and avoid over-sharing.

## Related

- [[Inbox Capture Template Guide]]
- [[Fable Style Self-Evolving Obsidian Loop]]
- [[Jayse AI Second Brain - 15 Minute Onboarding Demo Runbook]]
