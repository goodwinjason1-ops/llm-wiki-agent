---
title: Claude Frontier Extraction Runbook
created: 2026-07-07
type: implementation-runbook
tags: [claude-code, ai-workflow, frontier-model-extraction, buyerproof-au, second-brain, skills]
source_video: https://youtu.be/9JBZzZSO3hA
video_title: Do This Before Fable 5 Goes API Only (Extract Its Intelligence to Opus 4.8)
---

# Claude Frontier Extraction Runbook

## Purpose

This runbook turns the video into concrete instructions Jayse can run in Claude tonight.

The video’s main principle:

> Do not spend frontier-model time on disposable outputs. Spend it on durable operating assets that weaker/cheaper models can reuse later.

The key test:

> Can a cheaper model redo this tomorrow?

If yes, skip it. If no, use the frontier model to create a durable artifact.

## Recommended order tonight

The video says if short on time, do this order:

1. **Move 5 first** — install the learning recorder skill.
2. **Move 4 second** — launch 1–3 capped unattended goals.
3. **Move 1 third** — rewrite project instructions / CLAUDE.md as checkable standards.
4. **Move 2 fourth** — consultant audit and roadmap.
5. **Move 3 fifth** — deep research into an atomized Obsidian vault.

For Jayse, recommended target project tonight:

> BuyerProof AU / Australian high-stakes decision kits.

Project folder:

`C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/AI Business Launch Backlog/BuyerProof AU/`

Existing related notes:

- `Property Car Rental Renovation Kits - 30 Day Scope - 2026-07-07.md`
- `Wider Creative Opportunity Rework - 2026-07-07.md`
- `30-Day AI Business Opportunity Reset - 2026-07-07.md`

---

# 0. Setup before opening Claude

## Files/context to give Claude

Open Claude Code or Claude project with these files/folders attached or accessible:

1. `BuyerProof AU/`
2. `Property Car Rental Renovation Kits - 30 Day Scope - 2026-07-07.md`
3. `Wider Creative Opportunity Rework - 2026-07-07.md`
4. `30-Day AI Business Opportunity Reset - 2026-07-07.md`
5. Any notes about Jayse’s AI Second Brain / Obsidian vault if Claude does not know it.

## What to tell Claude up front

Paste this first:

```text
You are working on Jayse's BuyerProof AU project.

BuyerProof AU is a planned Australian digital-product/business system for practical checklists and decision kits around expensive life-admin moments: buying used cars, buying property, moving rentals, and comparing renovation quotes.

Your job tonight is not to create disposable outputs. Your job is to create durable operating assets that future, cheaper models can use: project instructions, checkable standards, reusable skills, research notes, validation plans, and capped execution goals.

Use Australian context. Do not provide legal, financial, investment, tenancy, mechanical, or building advice. Frame products as educational preparation tools and always include professional handoff points.

Work in this order:
1. Create an extract-approach skill / learning recorder.
2. Create capped unattended goals with proof requirements.
3. Rewrite the project CLAUDE.md / operating manual as checkable standards.
4. Run a consultant audit and create a ranked roadmap.
5. Create atomized Obsidian research tasks/notes.
```

---

# 1. Move 5 — Install the learning recorder first

## Goal

Create a reusable skill that records how hard problems were solved, not just the final answer.

This prevents the model’s reasoning from evaporating after the session.

## Claude prompt

Paste this:

```text
Create a reusable skill called `extract-approach-skill.md` for this project.

Purpose: after every non-trivial solve, this skill captures how the problem was actually solved so future cheaper models can reuse the reasoning.

Create it under a sensible skills or docs folder in this project. If no skills folder exists, create:

.claude/skills/extract-approach-skill.md

The skill must produce a field-report style note, not a generic summary.

The output format must include:

1. Problem solved
2. Why it mattered
3. Initial assumptions
4. Trap / hidden difficulty
5. Why the obvious approach was insufficient or wrong
6. Approach that actually worked
7. Step-by-step method
8. Checks that proved it worked
9. Reusable rule for next time
10. Prompt or instruction future models should use
11. Files touched / artifacts created
12. Follow-up risks or open questions

Also update or create the project CLAUDE.md with this learning law:

"After every non-trivial solve, run the extract-approach skill before moving on. A solution without its learning note is unfinished work."

Before finishing, paste the created skill content and the exact CLAUDE.md line you added.
```

## Acceptance criteria

Claude is not done until:

- `.claude/skills/extract-approach-skill.md` exists or equivalent path is created.
- `CLAUDE.md` contains the learning law.
- Claude pastes the created skill content.
- Claude explains when to trigger it.

## Immediate use prompt after creating it

```text
Now run the extract-approach skill on the work we have done so far for BuyerProof AU: how we moved from broad AI business ideas to Australian high-stakes decision kits, why Used-Car Buyer Kit became the Week 1 MVP, and what rules future models should follow when expanding the product line.

Save the output as:

BuyerProof AU/Approach Notes/2026-07-07 - BuyerProof AU opportunity selection.md
```

---

# 2. Move 4 — Fire off capped unattended goals

## Goal

Use Claude Code’s goal-style workflow, if available, to execute valuable backlog tasks while you are away.

If `/goal` is not available in Jayse’s Claude setup, paste the same text as a normal task and explicitly require progress updates and stopping conditions.

## Safety rules from the video

Every goal must include:

1. pasted proof,
2. hard cap by turns or time,
3. clear stop condition,
4. no vague “trust me it passed” claims.

## Goal A — Polish Used-Car Kit to publishable v1

Paste as `/goal` if supported:

```text
/goal Polish the BuyerProof AU Used-Car Buyer Inspection Kit into a publishable v1.

Definition of done:
1. The main markdown kit is improved for clarity, Australian context, and safety disclaimers.
2. A clean PDF-ready markdown version exists.
3. The spreadsheet/CSV fields are organized into sections suitable for Google Sheets or Excel.
4. The landing page copy aligns with the kit.
5. A short changelog documents every file changed.
6. Paste the final file list and key excerpts in the chat as proof.

Constraints:
- Do not give mechanical, legal, financial, or professional advice.
- Keep it as an educational preparation checklist.
- Include reminders for PPSR, state/territory rego checks, insurance quote, and independent mechanic inspection.
- Stop after 20 turns or 90 minutes and paste failures/blockers if not complete.
```

If `/goal` is not supported, paste:

```text
Act as if this is a capped goal. Work until the definition of done is met or until 20 turns/90 minutes. At the end, paste proof: file list, changed files, key excerpts, and unresolved blockers.

[Then paste Goal A above without /goal]
```

## Goal B — Draft Australian Property Due Diligence Kit v1

```text
/goal Create the BuyerProof AU Australian Property Due Diligence Kit v1.

Definition of done:
1. Create a new markdown product MVP for Australian property buyers.
2. Include: inspection-day checklist, due diligence tracker, offer-readiness checklist, agent question scripts, risk scoring sheet, and professional handoff list.
3. Include strong disclaimers: educational only, not legal/financial/investment/building advice.
4. Mention professional handoffs: conveyancer/solicitor, broker, building inspector, pest inspector, insurer, strata/body corporate specialist where relevant.
5. Create a spreadsheet/CSV tracker for the due diligence items.
6. Create 5 launch posts for the property kit.
7. Paste file list and excerpts as proof.

Constraints:
- Australian context.
- Avoid state-specific legal claims unless clearly marked as "verify locally".
- Stop after 25 turns or 120 minutes and paste blockers if not complete.
```

## Goal C — Create validation/outreach list framework

```text
/goal Build the BuyerProof AU validation and outreach framework.

Definition of done:
1. Create outreach scripts for mechanics/detailers/pre-purchase car inspectors.
2. Create outreach scripts for buyer's agents/conveyancers/brokers/building inspectors.
3. Create outreach scripts for cleaners/removalists/property managers.
4. Create a CSV schema for tracking prospects and feedback.
5. Create a feedback interview script for each product category.
6. Paste the files created and sample scripts as proof.

Constraints:
- Do not scrape private data.
- Do not invent actual leads unless you mark them as examples.
- Stop after 20 turns or 90 minutes and paste blockers if not complete.
```

## Recommended tonight

If time is limited, run only:

1. Goal A — polish Used-Car Kit.
2. Goal B — draft Property Kit.

Do not run 10 goals. The video specifically warns against uncapped loops.

---

# 3. Move 1 — Rewrite CLAUDE.md / project instructions as checkable standards

## Goal

Create a project operating manual that makes future models work at a higher standard.

## Claude prompt

```text
Read the entire BuyerProof AU project and the related planning notes.

Rewrite or create CLAUDE.md as the operating manual a less capable model would need to work here at my level.

Include:

1. Project mission
2. Product family and product ladder
3. Australian context rules
4. Legal/safety boundaries
5. Writing style and tone
6. Product quality bars as checkable criteria, not adjectives
7. Research quality bars as checkable criteria
8. Launch asset quality bars as checkable criteria
9. Common mistakes weaker models will make, each with a rule that prevents it
10. File/folder conventions
11. Workflow for creating a new BuyerProof kit
12. Workflow for updating an existing kit
13. Verification checklist before any deliverable is marked done
14. The learning law: after every non-trivial solve, run extract-approach skill
15. Three new skills that would save the most hours, written out in full or scaffolded as files

Important: Do not write vague advice like "be thorough". Convert every quality standard into observable checks.

At the end, paste:
- the full CLAUDE.md,
- the three recommended skills,
- a short explanation of how a weaker model should use them.
```

## Quality bar examples to demand

Tell Claude the standards must look like this:

```text
Bad: "Make the kit useful and accurate."
Good: "Every kit must include: purpose, target buyer, disclaimer, checklist, tracker, scripts, professional handoff, pricing hypothesis, distribution path, and final verification checklist."
```

```text
Bad: "Be careful with legal advice."
Good: "If a claim depends on state law, tenancy law, property law, finance, mechanical safety, or building compliance, mark it as 'verify locally/professionally' and do not present it as advice."
```

---

# 4. Move 2 — Consultant audit and ranked roadmap

## Goal

Use the frontier model for judgment: what to do, what to stop doing, what has highest ROI.

## Claude prompt

```text
Act as the consultant I cannot afford.

Audit BuyerProof AU as a 30-day business experiment. Use the existing files and plans as context.

Evaluate:
1. Offer clarity
2. Product sequence
3. Pricing
4. Distribution strategy
5. B2B partner angle
6. Direct-to-consumer angle
7. Legal/safety risk
8. Fastest path to first revenue
9. What is likely a distraction
10. What a weaker model can execute after you leave instructions

Deliver a ranked roadmap with the highest-return actions first.

For every recommended move, include:
- why it matters,
- exact steps,
- what done looks like,
- what proof is required,
- what a weaker model needs told to execute it,
- likely failure mode,
- stop/pivot condition.

Also name the three things we should stop doing or defer, with reasoning spelled out.

Do not be polite if the plan is weak. Be useful.
```

## Expected outputs

Ask Claude to save:

`BuyerProof AU/Consultant Audit - BuyerProof AU - 2026-07-07.md`

and paste a ranked top 10 action list in chat.

---

# 5. Move 3 — Deep research into atomized Obsidian notes

## Goal

Do not create one giant report. Create many small linked notes that can be reused.

## Claude prompt

```text
Create an atomized research plan for BuyerProof AU. Do not write one giant report.

Create one-note-per-insight research notes for the following areas:

1. Australian used-car buyer checks and PPSR workflow
2. Australian property buyer due diligence workflow
3. Rental exit / bond-back cleaning workflow
4. Renovation quote comparison and high-ticket renovation categories
5. B2B partner distribution opportunities
6. Direct-to-consumer SEO/content opportunities
7. Legal/safety disclaimers and professional handoff rules

For each note:
- one insight per note,
- include source URL if used,
- include why it matters for BuyerProof AU,
- include linked related notes using Obsidian [[wikilinks]],
- include product implication,
- include outreach/content implication.

Create an index note:

BuyerProof AU/Research Index - BuyerProof AU.md

Do not bury this as a 40-page report. Atomize it.
```

## If Claude has web/deep research access

Add:

```text
Use web/deep research only for current factual claims. For every source-backed claim, include the source URL. Do not invent Australian legal or regulatory claims.
```

## If Claude does not have web access

Add:

```text
Use the existing project notes only. Create the note structure and mark source gaps as TODO: verify with official/current source.
```

---

# 6. Extract the model operating manual and transplant it to Opus/cheaper model

The video includes a general-purpose extraction/transplant prompt. Use this to create a portable reasoning manual.

## Extraction prompt

```text
You are the most capable model on my account and access to you narrows tomorrow.

Write the operating manual your replacement will run on. Assume the replacement is strong but a step below you.

Write it as a senior operator handing their craft to a sharp junior.

Do not describe your thinking in vague terms. Write procedures the replacement can actually run.

Include:
1. How to read the user's true intent
2. How to identify hidden constraints
3. How to separate durable assets from disposable throughput
4. How to verify factual claims
5. How to verify calculations by re-deriving them
6. How to attack your own conclusion before handing it over
7. How to handle missing context without guessing
8. How to create checkable quality bars
9. How to decide when to use tools
10. How to document reusable learnings
11. How to turn a messy goal into an executable roadmap
12. How to avoid overbuilding before validation

For every principle, include:
- procedure,
- example,
- failure mode,
- verification check.

Then create a short "Project Instructions" version suitable for pasting into Claude project instructions.
```

## Transplant test prompt

After pasting the manual into a cheaper model/project instructions, test with this:

```text
A report says revenue grew from $4.0m to $4.2m and calls it a 20% gain. Review the sentence and decide whether it can be shipped.
```

Expected behavior:

- It should recalculate: `(4.2 - 4.0) / 4.0 = 0.2 / 4.0 = 5%`.
- It should reject the 20% claim.
- If it waves it through, the verification section is too vague.

## Fix prompt if test fails

```text
The transplant test failed. The model did not independently rederive the percentage error.

Rewrite the verification section so it is procedural, not motivational.

For any percentage, require:
1. Identify starting value.
2. Identify ending value.
3. Compute absolute change.
4. Divide change by starting value.
5. Convert to percentage.
6. Compare with the written claim.
7. If mismatch, refuse to ship and state corrected value.

Apply this level of procedural specificity to all verification rules.
```

---

# 7. Weekly workflow interview prompt

Use this for any workflow Jayse does repeatedly.

```text
Interview me about this workflow one question at a time until you understand it cold.

Then write it up as a complete reusable skill that future assistants can follow.

The skill must include:
- when to use it,
- prerequisites,
- exact steps,
- tool/file conventions,
- quality bar,
- common pitfalls,
- verification steps,
- example prompts,
- output templates.

Ask only one question at a time. Do not write the skill until you have enough detail.

Workflow to capture: [describe workflow]
```

Recommended workflows to capture for Jayse:

1. Creating a new BuyerProof AU kit.
2. Turning a YouTube/business idea into a validated launch plan.
3. Saving research into the AI Second Brain / Obsidian vault.
4. Turning strategy videos into executable Claude/Codex instructions.
5. Building quant trading research/backtesting workflows safely.

---

# 8. Tonight’s shortest possible version

If Jayse only has 60–90 minutes, do this:

## Step 1 — Recorder skill

Run Move 5 prompt.

## Step 2 — One capped goal

Run Goal A: polish Used-Car Kit to publishable v1.

## Step 3 — Project operating manual

Run Move 1 prompt to create CLAUDE.md.

## Step 4 — Consultant audit if time remains

Run Move 2 prompt.

Skip deep research until tomorrow unless there is time.

---

# 9. What not to do tonight

Do **not** spend frontier time on:

- generic landing pages,
- random social posts,
- demo apps,
- one-off summaries,
- broad brainstorming without saved artifacts,
- huge reports that are not atomized into reusable notes,
- uncapped agent loops.

Use frontier time for:

- standards,
- project instructions,
- skills,
- roadmaps,
- research structures,
- validation protocols,
- capped high-value execution goals.

---

# 10. Final checklist before ending the Claude session

Before closing Claude tonight, make sure these exist:

- [ ] `CLAUDE.md` or project instructions for BuyerProof AU.
- [ ] `.claude/skills/extract-approach-skill.md` or equivalent.
- [ ] At least one approach note generated by the recorder skill.
- [ ] At least one capped goal completed or stopped with blockers pasted.
- [ ] Used-Car Kit v1 polished or clear next blockers written.
- [ ] Consultant audit or roadmap if time allowed.
- [ ] No uncapped autonomous loops left running.
- [ ] All outputs saved into the project folder, not trapped in chat only.

The core rule:

> If the output will still be useful in a month, save it as a file. If it only lives in chat, you have not extracted it.
