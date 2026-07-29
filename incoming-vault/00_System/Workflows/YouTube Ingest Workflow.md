---
title: YouTube Ingest Workflow
created: 2026-07-02
updated: 2026-07-02
type: workflow
tags: [workflow, self-improvement]
sources: [SCHEMA.md]
confidence: high
---

# YouTube Ingest Workflow

1. Extract transcript with the Hermes `youtube-content` workflow.
2. Save immutable transcript under `02_Raw/youtube/transcripts/<video_id>.md` with sha256.
3. Create source summary under `03_Sources/youtube/`.
4. Update relevant concept/workflow/skill pages.
5. Add links to `index.md` and append `log.md`.

For this user's setup: replace video mentions of Claude with Codex in implementation notes.

Related: [[self-improvement-loop]], [[karpathy-llm-wiki]], [[ai-second-brain]].
