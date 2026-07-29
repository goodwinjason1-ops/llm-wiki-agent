---
title: AI Health Fitness Coach Workflow
created: 2026-07-09
updated: 2026-07-09
type: workflow
status: proposed
priority: medium
sources:
  - 03_Sources/x/AI Edge Personal Agent Ideas - X 2068159407645671640.md
tags: [personal, health, fitness, coach, habit-tracking]
confidence: medium
---

# AI Health Fitness Coach Workflow

## Verdict

Useful for Jayse if implemented as a **habit, reflection, and planning assistant**. It should not act like a doctor, diagnose conditions, or override medical advice.

## What it should do

```text
log training / sleep / food / mood → summarize patterns → suggest small habit experiments → review weekly
```

## Why it fits current workflow

- Uses Obsidian daily notes and dashboards well.
- Can improve energy, focus, and consistency for business/trading work.
- Low technical risk if kept as tracking + coaching, not medical advice.

## Initial implementation scope

- Daily health/fitness check-in template.
- Weekly review dashboard.
- Habit experiment ledger.
- Simple metrics: sleep, training, steps, soreness, mood, energy, weight if Jayse wants.

## Guardrails

- No diagnosis or medical treatment advice.
- Escalate concerning symptoms to qualified professionals.
- Avoid shame/guilt language.
- Use small experiments and weekly review, not extreme plans.
- Keep private health data local in the vault.

## Weekly review questions

- What improved energy/focus this week?
- What reduced energy/focus?
- Which habit had the highest ROI?
- What is the smallest next experiment?
- Any warning signs that need professional support?

## Next implementation

- Create `06_Areas/Health/Fitness Coach Dashboard.md`.
- Create `00_System/Templates/Daily Health Fitness Check-in.md`.
- Later: optional Telegram prompted check-in cron if Jayse wants it.

## Related

- [[Unigram Share-to-Ari Capture Workflow]]
- [[Fable Style Self-Evolving Obsidian Loop]]
