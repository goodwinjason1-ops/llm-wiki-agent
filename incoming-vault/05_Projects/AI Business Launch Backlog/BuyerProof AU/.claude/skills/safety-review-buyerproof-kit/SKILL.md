---
name: safety-review-buyerproof-kit
description: Review a BuyerProof AU kit before publishing — catch professional-advice risk, overclaims, missing disclaimers/handoffs, and unverified state/territory claims. Outputs a pass/needs-changes verdict with required fixes.
---

# safety-review-buyerproof-kit-skill

Use this skill before publishing or sharing any BuyerProof AU kit.

## Purpose

Catch professional-advice risk, overclaims, missing disclaimers, and state/territory-specific claims that need verification.

## Review checklist

- [ ] Does the kit say it is educational only?
- [ ] Does it avoid legal, financial, investment, tenancy, mechanical, building, pest, or compliance advice?
- [ ] Does it include professional handoffs?
- [ ] Does it avoid guarantees?
- [ ] Are state/territory claims marked as verify locally unless sourced?
- [ ] Are official sources listed where appropriate?
- [ ] Does the final decision section support the user without telling them what to do?
- [ ] Are urgent/safety concerns framed as "slow down/get professional help"?
- [ ] Are affiliate/referral/commercial relationships avoided or disclosed if present?

## Output format

```markdown
# Safety Review — [Kit Name]

## Verdict

Pass / Needs changes / Do not publish

## Required changes

- ...

## Risky wording found

| Wording | Risk | Safer replacement |
|---|---|---|

## Missing professional handoffs

- ...

## Final approval checklist

- [ ] ...
```
