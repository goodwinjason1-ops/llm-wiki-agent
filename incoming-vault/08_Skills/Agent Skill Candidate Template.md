---
title: Agent Skill Candidate Template
created: 2026-07-09
updated: 2026-07-09
type: template
status: active
tags: [agent-skills, template, hermes, claude, codex]
---

# Agent Skill Candidate Template

Use this when a repeated workflow may deserve a real Hermes/Claude/Codex skill.

## Candidate summary

- **Skill candidate name:**
- **Trigger / Use when:**
- **Problem it solves:**
- **Who uses it:** Ari / Claude Code / Codex / shared
- **Projects affected:**
- **Source sessions / notes:**

## Evidence that it is worth a skill

- [ ] This happened more than once, or is likely to recur.
- [ ] The workflow took 5+ meaningful steps/tool calls.
- [ ] There was a non-obvious pitfall or fix.
- [ ] The desired behavior is not generic common sense.
- [ ] Future Ari/Claude/Codex would be better if this loaded automatically.

## Proposed skill body outline

```markdown
---
name: short-lowercase-name
description: Use when <trigger>. <what the skill does>.
---

# Skill Title

## When to Use

## Steps

## Pitfalls

## Verification
```

## Safety / privacy

- [ ] No secrets embedded.
- [ ] No one-off task state embedded.
- [ ] No stale IDs/URLs unless they are stable references.
- [ ] Trading/DeFi permissions are explicit and conservative.

## Promotion decision

- [ ] Promote to skill now.
- [ ] Keep as workflow note.
- [ ] Merge into existing skill:
- [ ] Archive / no action.
