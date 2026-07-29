---
title: AI Job Hunter Workflow - Personal Career Agent
created: 2026-07-09
updated: 2026-07-09
type: workflow
status: proposed
priority: medium
sources:
  - 03_Sources/x/AI Edge Personal Agent Ideas - X 2068159407645671640.md
tags: [personal, job-hunter, career, agent, workflow]
confidence: medium
---

# AI Job Hunter Workflow - Personal Career Agent

## Verdict

Useful for Jayse's personal workflow if kept as an **assistive career operating system**, not a spammy auto-apply bot.

## What it should do

```text
capture opportunity → match against Jayse profile → tailor resume/cover note → track application → prep interview → follow up
```

## Why it fits current workflow

- Uses the same AI Second Brain capture/classify/dashboard pattern.
- Can reuse templates, source summaries, and project dashboards.
- Helps with real-life admin without adding trading risk.

## Initial implementation scope

Create a career-agent area with:

- opportunity intake template;
- role-fit scorecard;
- application tracker;
- resume/cover-letter evidence pack;
- interview preparation checklist;
- follow-up cadence.

## Guardrails

- No automatic applications without Jayse review.
- No invented work history, credentials, references, or qualifications.
- Keep personal/contact details private.
- Save tailored documents as drafts for approval.

## Role fit scorecard

| Axis | Question |
|---|---|
| Fit | Does the role match Jayse's skills, constraints, and goals? |
| Leverage | Does it strengthen AI/business/trading/system-building direction? |
| Effort | How much tailoring is required? |
| Risk | Is it spammy, exploitative, or credential-mismatched? |
| Next action | apply / ask contact / save / reject |

## Next implementation

- Create `06_Areas/Career/Job Hunter Dashboard.md`.
- Create `00_System/Templates/Job Opportunity Capture.md`.
- Add a script later only after we know the job boards/sources.

## Related

- [[Unigram Share-to-Ari Capture Workflow]]
- [[Agent Skill Candidate Template]]
