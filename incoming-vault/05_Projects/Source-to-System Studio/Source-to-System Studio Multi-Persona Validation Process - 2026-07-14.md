---
title: Source-to-System Studio Multi-Persona Validation Process - 2026-07-14
created: 2026-07-14
updated: 2026-07-14
type: implementation-contract
status: queued-for-implementation
owner: Source-to-System Studio
inspiration: Clore Claude Code Roast skill
related: [[Clore Money-Making Video - Source Review - 2026-07-14]]
tags: [decision-framework, pilot-validation, multi-persona, risk-mitigation]
---

# Objective

Before committing to pilot scope, website changes, or major deliverables, run through multiple perspectives to prevent over-investing in weak opportunities or building the wrong thing.

# Inspiration

From Clore's "Roast" skill: instead of one perspective (which tends toward agreement), use a council of personas to stress-test ideas:
- Contrarian: Find fatal flaws
- Buyer: Would they actually care?
- Researcher: What's the market context?
- Judge: Synthesize → Go / Reshape / Kill

# When to Use

## Mandatory validation
- New pilot commitment (before signing agreement)
- Major website changes (new offers, pricing, positioning)
- First deliverable to client (scope validation)
- Process changes that affect all future work

## Optional validation
- Content strategy shifts (test small first)
- Internal tool improvements (low risk)
- Documentation updates (reversible)

# The Four Personas

## 1. Contrarian
**Question:** Why will this fail or not matter?

Prompts to ask:
- What's the fatal flaw we're ignoring?
- Why might the client not care?
- What assumptions are we making that could be wrong?
- What's the cheapest way this could go wrong?
- If we had to argue against this, what would we say?

**Example for pilot:**
- "They already have a CRM, why would they adopt our system?"
- "They said they'd provide testimonials, but what if they ghost?"
- "We're assuming they'll use it, but what if it sits unused?"

## 2. Buyer (Client Persona)
**Question:** Would the actual client care about this?

Prompts to ask:
- What specific pain point does this solve for them?
- How much time/money does this actually save?
- What's their alternative (what do they do instead)?
- What would make them say "I need this yesterday"?
- What objections would they have?

**Example for pilot:**
- "Saves them 5 hours/week = $500/week value"
- "They currently spend 3 hours making quotes manually"
- "Their objection: 'We've done it this way for 20 years'"

## 3. Researcher (Market Context)
**Question:** What's the market context and competitive landscape?

Prompts to ask:
- What do competitors offer and at what price?
- How many similar solutions exist?
- What's the typical customer acquisition cost?
- What's the market size for this specific problem?
- Are there timing issues (regulatory, economic)?

**Example for pilot:**
- "Similar services charge $2K-5K for context mapping"
- "Market size: ~500 financial advisors in Melbourne area"
- "No direct competitors doing AI-assisted knowledge mapping"

## 4. Judge (Synthesis)
**Question:** Given the above, should we proceed, reshape, or kill?

Synthesize perspectives:
- **Green light:** Strong value prop, reasonable risk, good fit
- **Reshape:** Good idea but needs adjustment (specify what)
- **Kill:** Fatal flaws, weak value prop, or wrong fit

**Example decision:**
"Proceed only if we can demonstrate 10+ hour/week time saving. Reshape: focus on quote automation, not full context brain. Add success metric: client must self-report time savings."

# Process

## Step 1: Write the brief
Document what you're considering:
```
DECISION: [What we're considering]
CONTEXT: [Background, constraints, timeline]
OPTIONS: [What we could do instead]
```

## Step 2: Run through personas
Answer each persona's questions (can be manual or AI-assisted):

```
CONTRARIAN'S CONCERNS:
- [List 3-5 fatal flaws or reasons not to proceed]

BUYER'S PERSPECTIVE:
- [List 3-5 reasons they would/wouldn't care]

RESEARCH FINDINGS:
- [List 3-5 market facts or competitive context]
```

## Step 3: Judge synthesizes
```
VERDICT: [Go / Reshape / Kill]
CONFIDENCE: [High / Medium / Low]
REASONING: [1-2 sentences]
CHEAPEST TEST: [What's the minimum viable commitment?]
```

## Step 4: Document decision
Save to project notes with timestamp. If decision changes, document why.

# Example: Financial Advisor Pilot

```
DECISION: Build Business Context Brain for financial advisor pilot
CONTEXT: They agreed to provide testimonials, no charge, logistics TBD
OPTIONS: Do nothing, wait for doors/windows business, find different pilot

CONTRARIAN'S CONCERNS:
- They have a CRM (AdviserLogic) - will they adopt our system?
- Logistics not confirmed - could drag on for months
- "Testimonials" might be generic praise, not usable
- We're assuming they'll actively use it, could sit unused
- They might lose interest after initial enthusiasm

BUYER'S PERSPECTIVE:
- Pain: spends 3 hours/week on repetitive client questions
- Value: saving 10+ hours/week = $1K+/week at their rate
- Alternative: keep answering manually (status quo bias)
- Need: "I need to stop answering the same questions"
- Objection: "I've built my own FAQ over 15 years"

RESEARCH FINDINGS:
- Financial advisors typically pay $2-5K for knowledge management
- ~500 independent advisors in Melbourne area
- No direct competitors doing AI-assisted knowledge mapping
- Pilot client has 80+ active clients, 15 years experience
- Timing: post-pandemic, advisors overwhelmed with client questions

JUDGE VERDICT: RESHAPE
CONFIDENCE: Medium
REASONING: Good value prop but risky on adoption. Reshape to focus narrowly on FAQ automation, not full context brain. Success metric: client must self-report using it 3+ times/week.

CHEAPEST TEST: Build FAQ prototype (1 week), show to client, see if they use it for 2 weeks. If usage <3x/week, kill. If usage high, expand to full context brain.
```

# Validation Checklist

Before committing to pilot or major deliverable:

- [ ] Contrarian concerns documented
- [ ] Buyer perspective articulated
- [ ] Research context established
- [ ] Judge verdict with confidence level
- [ ] Cheapest test defined
- [ ] Success metrics specified
- [ ] Kill criteria defined (when do we stop?)

# Anti-patterns to avoid

## Skipping validation because "we're sure"
Even obvious opportunities need perspective-check. Confirmation bias is real.

## Treating personas as rubber stamps
If all four personas say "go," you're not being critical enough. The contrarian should find real flaws.

## Ignoring the judge's verdict
If judge says "kill" but you proceed anyway, document why you overrode the decision.

## Validation paralysis
Validation is fast (30 minutes). Don't let it become a week-long analysis process.

# When NOT to validate

- **Reversible decisions:** Try something small, see what happens
- **Low-stakes experiments:** Content posting, internal tool tweaks
- **Urgent execution:** Once validated, move fast

# Integration with pilot process

Before each pilot commitment:
1. Run multi-persona validation
2. Document verdict in pilot log
3. Define success metrics and kill criteria
4. Agree with Jayse before proceeding

After pilot completion:
1. Compare actual results to predicted concerns
2. Update validation accuracy (were contrarian concerns valid?)
3. Refine persona prompts based on what we learned

# Success Metrics

**Validation process quality:**
- 50%+ of "kill" decisions prove correct (opportunity wasn't worth it)
- 70%+ of "go" decisions result in successful pilots
- Time spent validating <1 hour per decision

**Better decisions:**
- Fewer abandoned pilots (currently 0, goal: stay low)
- Higher client satisfaction (they use what we build)
- Clearer success metrics (we know what "good" looks like)

# NOT Implementing
- AI council (too complex for now, manual works fine)
- Voting system (judge synthesizes, doesn't tally votes)
- Blocking all decisions until validated (proportional to stakes)

# Decision

Implement immediately for next pilot commitment. Use manual 4-persona process (30 minutes per decision). Track validation accuracy over time to refine prompts.

**Next step:** Run validation on doors/windows business pilot before logistics confirmation.
