---
title: Property kit v1.1 upgrade pass
created: 2026-07-07
type: approach-note
tags: [buyerproof-au, approach, learning, property]
---

# Property kit v1.1 upgrade pass

## 1. Problem solved

Upgraded the Australian Property Due Diligence Kit from a v1.0 skeleton (tables with headers but little guidance) to a v1.1 draft that a first-home buyer could actually run, plus the full derived-asset set: printable HTML, regenerated tracker CSV, landing page, 5 launch posts, safety review, and a dual-path (DTC + B2B) validation note — all in one capped pass.

## 2. Why it mattered

Property is the highest-upside BuyerProof product. v1.0 was structurally complete but functionally empty: it listed checks without telling the buyer how to sequence them, how to read a Green/Yellow/Red result, or what "done" looks like before an offer. Nothing derived from it existed, so it had no launch path.

## 3. Initial assumptions

- v1.0 mainly needed more checklist rows.
- The used-car assets could be lightly reskinned for property.
- Versioning was a formality (bump a number).

## 4. Trap / hidden difficulty

Property has a **time-pressure shape the used-car kit doesn't**: the buyer must orchestrate 5+ professionals inside a vendor-controlled window (offer deadline/auction). The failure mode isn't a failed check — it's a check that silently never happens. A longer checklist doesn't fix that; sequencing and status-tracking do. Also, property wording sits much closer to regulated territory (cooling-off, auctions, duty, strata law) — every useful sentence wants to become a state-specific legal claim.

## 5. Why the obvious approach was insufficient

"Add more rows to the tables" would have made the kit longer but not more usable, and would have multiplied unhedged state-specific claims. Copying used-car sections 1:1 would have imported the wrong mental model (one seller, one inspection, one decision) into a multi-professional, deadline-driven process.

## 6. Approach that actually worked

Reframe the kit around **status visibility under time pressure**: (a) a before-you-start section so professionals are lined up *before* emotional attachment; (b) "Unknown is a status, not a pass" as the tracker's core rule; (c) a risk-score *reading guide* (what Red/Unknown in core categories means procedurally — "not finished", never "don't buy"); (d) every regulated touchpoint converted into a "verify with [named professional]" prompt instead of a rule statement. Derived assets were generated in the same pass from the finished v1.1 so version stamps are honest.

## 7. Step-by-step method

1. Read CLAUDE.md quality bars, all three skills, v1.0 kit, tracker CSV, research notes, and the used-car v1.1 assets (style/versioning reference).
2. Rewrite the kit: keep v1.0's good bones, add sequencing (section 0), unit/strata checks, per-professional handoff questions, true-cost worksheet, offer-readiness with walk-away examples, version section.
3. Regenerate the tracker CSV from the new tracker table; stamp source version in a meta row.
4. Build printable HTML by reusing the used-car print stylesheet verbatim — zero new design.
5. Write landing page + 5 posts, all CTAs pointing at one free asset (inspection-day checklist).
6. Run safety-review skill; fix findings immediately (landing subheadline overclaim) and record the fix in the review.
7. Write dual-path validation note with a one-asset-two-wrappers rule and a day-14 decision rule.
8. Write changelog and this note.

## 8. Checks that proved it worked

- Kit now hits every CLAUDE.md product quality-bar item, including the previously missing before-you-start checklist, cost worksheet guidance, distribution note, and version section.
- Safety review completed against the skill checklist: draft-share pass, one risky phrase found and fixed same-pass ("nothing gets skipped" → "see what's been checked, and what hasn't").
- Grep-level claim audit: no state/territory rule stated anywhere without a verify-locally hedge; no guarantee language.
- Every derived asset carries `generated_from_kit_version: 1.1` or an in-file version stamp.

## 9. Reusable rule for next time

For time-pressured multi-professional decisions, upgrade kits by adding *sequencing and status semantics* ("Unknown is not a pass"), not more checklist rows — and generate all derived assets in the same pass so version stamps are true on day one.

## 10. Prompt/instruction future models should use

> Upgrade this BuyerProof kit by asking: what does the buyer's *timeline* look like, and which checks silently never happen under that pressure? Add a before-you-start section, a status rule where Unknown ≠ pass, and a reading guide for the risk score that outputs next-professional-to-call, never buy/don't-buy. Convert every regulated statement into "verify with [named professional]". Then regenerate tracker/printable/landing/posts from the finished version in the same pass and stamp each with the kit version. Run safety-review before done; fix findings in-pass and log the fix inside the review file.

## 11. Files touched / artifacts created

- Product Kits/Australian Property Due Diligence Kit v1.md (v1.0 → v1.1)
- Spreadsheets/Australian Property Due Diligence Tracker.csv (regenerated)
- Product Kits/Australian Property Due Diligence Kit v1.1 - Printable.html (new)
- Landing Page Copy - BuyerProof AU Property Due Diligence Kit.md (new)
- 5 Launch Posts - Property Due Diligence Kit.md (new)
- Product Kits/Safety Review - Australian Property Due Diligence Kit v1.1.md (new)
- Outreach/Dual-Path Validation - Property Kit - DTC and B2B.md (new)
- Implementation Changelog - Property Due Diligence Kit v1.1 - 2026-07-07.md (new)

## 12. Follow-up risks or open questions

- The free one-page inspection-day checklist (lead magnet) is referenced by the landing page and posts but not yet extracted as its own file — build before publishing either.
- Professional wording review (conveyancer + building inspector) still gates public sale.
- Consumer-body names table in the kit will drift; re-verify at publish time.
- Untested assumption: A$29–A$49 price band — validate, don't extend the kit further before signal.
