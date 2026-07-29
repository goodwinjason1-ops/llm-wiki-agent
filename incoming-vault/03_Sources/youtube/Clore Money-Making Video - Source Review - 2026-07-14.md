---
title: Clore Claude Code Money-Making - Source Review - 2026-07-14
created: 2026-07-14
updated: 2026-07-14
type: source-review
status: ingested-reviewed
source_url: https://youtu.be/iTY8Q449YNQ
platform: YouTube
raw: 02_Raw/youtube/Clore Money-Making - 2026-07-14.txt
tags: [claude-code, ai-agents, business-automation, verification-loops, subagents, context-management]
---

# Ingestion

Full transcript extracted: ~39,000 chars from ~20-25 minute video. Creator claims to have made "3x more money in past 30 days" using four upgrades to Claude Code.

# Summary: The Four Upgrades

## Upgrade 1: Roast Skill (Anti-Sycoant)

**Problem:** Claude agrees with everything you say (sycoant behavior). Studies show AI fails to push back 88% of the time vs 60% for humans. Gets worse with personalization/memory.

**Solution:** `/roast` skill that spins up a "council" of personas to stress-test ideas:
- **Contrarian:** Find fatal flaws
- **Expansionist:** Identify biggest upside
- **First Principles:** Pure logic, no outside context
- **Deep Researcher:** Market data, competitor pricing
- **Buyer:** Role-plays as customer, decides if they'd buy
- **Judge:** Synthesizes all findings → Green light / Reshape / Kill verdict

**Also includes:** Cheapest 48-hour test to validate before building

**Example in video:** $9/month YouTube-to-LinkedIn-posts tool → Council verdict: RESHAPE. "Kill the $9 product, it's a commodity. Keep the engine, aim at narrow paying niche with voice matching and scheduled posting."

## Upgrade 2: Verification Loops (Check Your Own Work)

**Problem:** Claude hands you "finished" work that doesn't actually work. NYU study: 40% of GitHub Copilot code had security vulnerabilities.

**Two-part fix:**

### Part A: Build-time verification
Before Claude hands you output, it checks itself:
- Start local server
- Use Playwright to screenshot each section
- Review screenshots at desktop + mobile viewports
- Iterate until zero visible errors
- Then report back

**Example:** Landing page built with verification loop → Playwright took 11 desktop + 11 mobile screenshots → found and fixed issues → delivered working page

### Part B: Stress testing
After delivery, actively break it:
- Submit forms with malformed data
- Test edge cases (spaces in emails, invalid phone numbers)
- Use headed browser to watch behavior

**Example:** 22 form submissions (8 valid, 14 malformed) → found edge cases like duplicate email acceptance, lenient validation

### Key insight
"AI gets you 65% on first shot. Your job is review and add taste. But with verification loops, AI gets you 90% first, then you iterate."

## Upgrade 3: Context Management (Fight Context Rot)

**Problem:** Studies show every AI model performs worse as conversation gets longer. "Context rot" starts well before hitting token limits.

**Solution:** Proactive context hygiene:

### Monitor usage
- `/sl context` shows what's eating tokens
- Watch for MCP servers, skills, memory files, system prompts
- Don't let context pass ~250K tokens (for 1M window)

### Handoff before clearing
Custom `/session handoff` skill that summarizes:
- What we're working on
- Key files produced
- Open decisions
- Where to pick back up

**Workflow:**
1. Run `/session handoff`
2. Copy the summary
3. `/clear` context
4. Paste summary back in
5. Continue in clean window with full context

**Why not `/compact`?** Takes too long, loses important details. Handoff is faster and more complete.

## Upgrade 4: Subagents + `/goal` (Stop Being Bottleneck)

**Problem:** You can only point Claude one direction at a time. You are the bottleneck.

**Solution:**

### Subagents
- Separate Claude instances, each with own task + clean context
- Work in parallel, report back to main session
- Anthropic research: team setup outperforms single agent by 90%+

**Example uses:**
- Research topic A + Research topic B + Analyze comments (3 parallel)
- Each produces independent files that don't overwrite
- Synthesize results at the end

### `/goal` command
- Set finish condition (objective criteria)
- Claude works turn-after-turn until condition met
- Separate evaluator model checks each turn (worker ≠ judge)
- Prevents Claude from declaring itself done prematurely

**Example in video:**
Goal: "Build complete go-to-market kit, 6 files: positioning, market research (6+ competitors), personalized drafts (25+ drafts), 14-day launch plan, outreach templates, content calendar. Verify each file meets bar before declaring done."

**Result:** 8 minutes, 6 subagents working in parallel, all files verified and complete.

## Capstone: All Four Upgrades Combined

**Workflow:**
1. `/roast` the idea → Council validates and reshapes
2. Build with verification loops → Screenshots, stress tests
3. `/session handoff` → Clean context for next phase
4. Subagents + `/goal` → Parallel work on 6 deliverables
5. All verified, complete in under 1 hour total

**Claim:** "If you put in a week of focused work with these strategies, you could leverage Claude to do what a team of 10 would take much longer to do."

# Positives

1. **Sycoant problem is real and well-documented.** The Elephant study (88% AI agreement rate) is accurate. This is a genuine issue.

2. **Council/multi-persona approach is genuinely useful.** Getting different perspectives (contrarian, buyer, researcher) produces better decisions than single-model agreement.

3. **Verification loops are essential for code/automation.** The 40% vulnerability stat from Copilot is accurate. Checking work before delivery prevents costly bugs.

4. **Context rot is a real phenomenon.** Models do degrade with longer conversations. Proactive management is the right approach.

5. **Subagents for parallel work is smart.** Anthropic's own research shows team setups outperform single agents.

6. **`/goal` with separate evaluator is clever.** Prevents self-delusion by having different model/role check completion.

7. **Concrete examples throughout.** Not just theory — shows actual landing pages, form testing, file outputs.

8. **Session handoff pattern is practical.** Preserving context while clearing window solves real workflow problem.

9. **Emphasizes "you are the bottleneck" mindset shift.** Moving from builder to reviewer/judge is the right frame for leveraging AI.

10. **Free community/resources.** Not paywalling behind expensive course.

# Negatives and Risks

1. **"3x more money" claim is unverified.** No specific numbers, no before/after comparison, no time period for baseline.

2. **Council verdicts can be overconfident.** Example: "Kill this product" recommendation might be wrong. The contrarian gave 2/10, expansionist gave 8/10 — huge disagreement, but judge picked majority without nuance.

3. **Verification loops add significant token cost.** Screenshots, Playwright, multiple passes = 5-10x more tokens than single-shot generation. Creator doesn't discuss cost.

4. **Subagents multiply costs.** 6 parallel subagents = 6x token usage. "Under an hour" of work might cost $50-100+ in API calls depending on model.

5. **`/goal` can run away.** If completion criteria are vague, it could loop endlessly burning tokens. Creator shows 8-minute success but doesn't discuss failures.

6. **Context management is manual and tedious.** Running handoff every 250K tokens means frequent interruptions. Not seamless.

7. **No discussion of failure modes.** What if council always says "kill"? What if verification finds infinite bugs? What if subagent output conflicts?

8. **Stress testing is superficial.** 22 form submissions is basic. Real QA would include load testing, security testing, integration testing.

9. **Example product (YouTube-to-LinkedIn) is low-value commodity.** Council correctly identified this, but the whole video builds around a weak example.

10. **No mention of actual revenue from these techniques.** "Make 3x more money" but no proof. Are there students who made money? Case studies?

11. **Claude Code specific.** Most techniques don't transfer to other AI tools or workflows.

12. **Overpromises on parallelization.** 6 subagents working in parallel sounds great, but if they produce conflicting outputs, you're back to manual reconciliation.

# Alpha Extraction

## Applicable to Source-to-System Studio

### 1. **Multi-persona idea validation (HIGH VALUE)**

**Alpha:** Before committing to pilot scope or website changes, run through different perspectives:
- **Contrarian:** Why will this fail? What's the fatal flaw?
- **Buyer:** Would the actual business owner care about this?
- **Researcher:** What do competitors offer? What's the market rate?
- **Judge:** Synthesize into go/no-go decision

**Implementation:**
- Before each pilot, write brief and run through this lens
- Could be manual (you think through perspectives) or AI-assisted
- Forces you to confront weaknesses before investing time

**Example:** "We're going to build a Business Context Brain for a financial advisor."
- Contrarian: "They already have a CRM, why would they pay you?"
- Buyer: "I'd only care if it saves me 5+ hours/week"
- Researcher: "Competitors charge $2K-5K for similar work"
- Judge: "Proceed only if we can demonstrate 10-hour/week time saving"

### 2. **Verification loops before delivery (MEDIUM VALUE)**

**Alpha:** Don't hand over website or system until you've stress-tested it yourself.

**Implementation:**
- After building website sections, screenshot and review
- Test contact form with edge cases
- Verify all links work
- Check mobile + desktop
- Then deliver to client

**Current practice:** You already do some of this ad hoc. Formalize it.

### 3. **Session handoff for long projects (MEDIUM VALUE)**

**Alpha:** Our sessions get long and lose context. Before starting new session, summarize state.

**Implementation:**
- When session passes ~200K tokens, write summary of:
  - What we're working on
  - Key files created
  - Open decisions
  - Next steps
- Start fresh session with summary
- Maintains momentum without context rot

**Current practice:** You already do this informally. Make it explicit.

### 4. **`/goal` for autonomous completion (LOW VALUE)**

**Alpha:** Set objective completion criteria and let AI work until done.

**Implementation:**
- Could use for bulk tasks (e.g., "Create case study templates for all 5 verticals")
- But most of our work requires judgment, not just output
- Limited applicability

## NOT Applicable

- **Subagents for parallel work** — Our work is sequential and interconnected. Parallel outputs would conflict.
- **Claude Code specific features** — We use Hermes Agent, not Claude Code CLI
- **3x money claims** — No evidence, likely exaggerated

# Implementation Recommendations for Source-to-System Studio

## Priority 1: Multi-persona pilot validation (HIGH)

Before committing to each pilot, run through perspectives:

**Create template:**
```
Pilot: [Business type]
Contrarian: Why might this fail?
Buyer: Would they actually care?
Researcher: What's the market rate?
Judge: Go / Reshape / Kill?
Cheapest test: What's the minimum viable pilot?
```

**Apply to current pilots:**
- Financial advisor
- Wholesale doors/windows

**Benefit:** Prevents over-investing in weak pilot opportunities.

## Priority 2: Formalize verification before delivery (MEDIUM)

Create checklist for website/system delivery:

- [ ] All pages screenshot (desktop + mobile)
- [ ] Contact form tested with 10 edge cases
- [ ] All links verified
- [ ] Loading speed checked
- [ ] Accessibility basics (alt text, keyboard navigation)
- [ ] Client can access and edit content

**Benefit:** Catches bugs before client sees them.

## Priority 3: Session handoff protocol (LOW)

When sessions get long (>200K tokens):

1. Write summary of current state
2. List key files created
3. Note open decisions
4. Specify next steps
5. Start fresh session with summary

**Benefit:** Prevents context rot on long projects.

## NOT Implementing

- Subagents for our work (too interconnected)
- `/goal` command (most work needs judgment)
- Claiming 3x efficiency gains without proof

# Decision

**Process insights only.** Multi-persona validation and verification loops are worth adopting. Subagents and `/goal` are less applicable. No direct business model alpha.

**File as:** Operational workflow reference. Implement multi-persona validation before next pilot commitment.
