---
name: extract-approach
description: Capture how a non-trivial BuyerProof AU problem was solved as a reusable field report in Approach Notes/. Use after hard product choices, material kit changes, roadmap-changing research, or workflow fixes.
---

# extract-approach-skill

Use this skill after every non-trivial BuyerProof AU solve, product decision, research synthesis, or workflow improvement.

## Trigger

Run when:

- a hard product choice is made,
- a kit is created or materially changed,
- a research insight changes the roadmap,
- a workflow is debugged,
- a model/agent solves a problem future models should learn from.

## Purpose

Capture how the problem was solved, not just what changed. The output should read like a field report that a future, cheaper model can reuse.

## Output location

Save notes under:

`Approach Notes/YYYY-MM-DD - short descriptive title.md`

## Required output format

```markdown
---
title: [Approach note title]
created: YYYY-MM-DD
type: approach-note
tags: [buyerproof-au, approach, learning]
---

# [Approach note title]

## 1. Problem solved

What was solved or decided?

## 2. Why it mattered

Why did this affect the business/product/workflow?

## 3. Initial assumptions

What did we believe at the start?

## 4. Trap / hidden difficulty

What made the problem non-obvious?

## 5. Why the obvious approach was insufficient

What tempting approach would have been weaker/wrong?

## 6. Approach that actually worked

What method resolved the problem?

## 7. Step-by-step method

1. Step one.
2. Step two.
3. Step three.

## 8. Checks that proved it worked

What evidence, file output, user reaction, or verification showed it worked?

## 9. Reusable rule for next time

State the repeatable rule in one or two lines.

## 10. Prompt/instruction future models should use

Paste a reusable prompt or instruction.

## 11. Files touched / artifacts created

- file/path
- file/path

## 12. Follow-up risks or open questions

- Risk/TODO
```

## Quality bar

A good approach note:

- names the hidden trap,
- explains why the obvious answer was not enough,
- gives a repeatable rule,
- lists concrete files/artifacts,
- includes checks/proof,
- avoids generic summaries.

## Learning law

A solution without its learning note is unfinished work.
