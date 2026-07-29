# CLAUDE.md — BuyerProof AU Operating Manual

## Project mission

BuyerProof AU creates practical Australian decision kits for expensive life-admin moments: buying used cars, buying property, moving out of rentals, and comparing renovation quotes.

The goal is not to provide professional advice. The goal is to help Australians prepare, organise checks, ask better questions, document red flags, and know when to hand off to qualified professionals.

## Product family

| Product | Role | Status |
|---|---|---|
| Used-Car Buyer Inspection Kit Australia | Fastest MVP and validation product | Week 1 active |
| Australian Property Due Diligence Kit | Highest strategic upside | Draft next |
| Rental Exit / Bond-Back Kit Australia | Companion moving/property product | Next after property |
| Renovation Quote Comparison Kit | High-ticket consumer + B2B contractor path | Next B2B angle |

## Core positioning

Brand: **BuyerProof AU**

Tagline: **Check before you commit.**

Promise: practical checklists, trackers, scripts, and red-flag guides for Australians making expensive decisions.

## Australian context rules

1. Use Australian spelling, terminology, and prices unless intentionally global.
2. Mention Australia-specific concepts where relevant: PPSR, VIN/rego checks, stamp duty/transfer, conveyancers, strata/body corporate, building and pest, bond, end-of-lease, state/territory variation.
3. If a claim depends on state/territory law, road rules, tenancy law, building contracts, finance, or property law, mark it as **verify locally/professionally**.
4. Prefer official sources for factual regulatory items: Australian Government, state/territory consumer affairs, transport/road authorities, PPSR, tenancy authorities.
5. Do not invent current legal/regulatory requirements.

## Safety boundaries

BuyerProof AU must never present itself as:

- legal advice,
- financial advice,
- investment advice,
- tenancy advice,
- mechanical advice,
- building advice,
- pest/building inspection advice,
- a substitute for a qualified professional.

Every kit must include:

1. plain-language disclaimer,
2. professional handoff list,
3. "verify locally/professionally" rule for regulated claims,
4. no guarantees of outcome.

Forbidden claims:

- "guarantee your bond back"
- "guarantee no defects"
- "guarantee a safe car/property"
- "this replaces a mechanic/conveyancer/building inspector"
- "this tells you whether to buy"
- "this is legal/financial/investment advice"

Allowed framing:

- educational preparation tool,
- checklist,
- tracker,
- red-flag guide,
- question script,
- professional handoff aid,
- decision-organisation tool.

## Writing style

Use:

- direct Australian English,
- short headings,
- practical checklists,
- plain-language warnings,
- calm tone,
- "slow down and verify" rather than fearmongering.

Avoid:

- hype,
- legal certainty,
- overpromising,
- generic AI/business language,
- American-specific terms unless quoted from source.

## Product quality bar — checkable criteria

A BuyerProof kit is not complete unless it includes all of these:

- [ ] title and target buyer
- [ ] purpose statement
- [ ] safety/professional disclaimer
- [ ] official/professional checks to consider
- [ ] before-you-start checklist
- [ ] main inspection/review checklist
- [ ] tracker table/spreadsheet fields
- [ ] question scripts/messages
- [ ] red flags section
- [ ] cost or risk scoring worksheet where relevant
- [ ] professional handoff questions
- [ ] final decision-support section that does **not** tell the user what decision to make
- [ ] distribution/pricing note if being built for launch
- [ ] verification pass for legal/safety claims

## Research quality bar — checkable criteria

Research is not complete unless:

- [ ] every current factual claim has a source or is marked TODO verify,
- [ ] official sources are preferred over blogs for regulatory/process claims,
- [ ] each source note says why it matters for BuyerProof AU,
- [ ] no source claim is copied blindly into advice language,
- [ ] output is atomized into reusable notes, not buried in one giant report.

## Launch asset quality bar — checkable criteria

A launch asset is publishable only if:

- [ ] headline states the practical outcome,
- [ ] CTA is clear,
- [ ] disclaimer is present for regulated/high-risk categories,
- [ ] offer includes what the buyer receives,
- [ ] pricing test or free lead magnet path is clear,
- [ ] no guarantees or professional-advice claims appear,
- [ ] next action is measurable: download, join waitlist, request feedback, buy, book call.

## Common mistakes and prevention rules

| Mistake weaker models make | Prevention rule |
|---|---|
| Giving legal/mechanical/property advice | Reframe as educational checklist and add professional handoff |
| Making state-specific claims without verifying | Mark as "verify in your state/territory" unless official source confirms |
| Creating vague product ideas | Produce actual checklist/tracker/scripts/landing copy |
| Overbuilding many kits before validation | Finish one MVP and run feedback before expanding |
| Writing one big report | Atomize research into linked notes |
| Treating content as the product | The product is the checklist/tracker decision aid; content is distribution |
| Forgetting B2B partners | Every kit must consider co-branded lead magnet uses |
| Hiding disclaimers at the end only | Put short disclaimer near the top and detailed disclaimer near the end |
| Saying "be thorough" | Convert standards into checklist items |

## File/folder conventions

Use this structure:

- `Product Kits/` — polished product markdown files
- `Spreadsheets/` — CSV/Sheets-ready trackers and calculators
- `Outreach/` — scripts, prospect schemas, feedback questions
- `Research Notes/` — atomized Obsidian-style notes
- `Approach Notes/` — field reports from extract-approach skill
- `.claude/skills/` — reusable Claude skills
- `CLAUDE.md` — project operating manual
- Changelogs live in the project root as `Implementation Changelog - <topic> - YYYY-MM-DD.md`. For follow-up passes on the same topic, append a dated section to the existing changelog instead of creating a near-duplicate file.

Naming:

- Use descriptive filenames.
- Include `v1`, `v2`, or date where useful.
- Use Australian product names, e.g. `Property Due Diligence Kit Australia v1.md`.

## Workflow: create a new BuyerProof kit

1. Define target buyer and expensive decision.
2. Identify anxiety/red flags/costly mistakes.
3. List official/professional checks.
4. Draft disclaimer and handoff list first.
5. Create checklist sections.
6. Create tracker/spreadsheet fields.
7. Create question scripts.
8. Create red flag and slow-down triggers.
9. Create final decision-support worksheet without making the decision for the user.
10. Create landing page copy and 5 launch posts.
11. Create B2B co-branded lead magnet angle.
12. Run legal/safety verification pass.
13. Save approach note.

## Workflow: update an existing kit

1. Read the current kit fully.
2. Identify missing quality-bar items.
3. Check regulated claims.
4. Add official/professional handoff if missing.
5. Improve structure before adding more content.
6. Update spreadsheet/tracker to match the kit.
7. Update landing page and launch assets if product changes.
8. Write changelog.
9. Run extract-approach skill if the update is non-trivial.

## Verification checklist before marking done

- [ ] Files saved in the correct BuyerProof folder.
- [ ] Main kit has disclaimer near top.
- [ ] No professional advice claims.
- [ ] Regulated claims marked verify locally/professionally.
- [ ] Professional handoff included.
- [ ] Tracker/spreadsheet exists or TODO noted.
- [ ] Scripts exist or TODO noted.
- [ ] Launch/distribution path exists or TODO noted.
- [ ] Changelog or approach note exists for non-trivial work.

## Learning law

After every non-trivial solve, run the extract-approach skill before moving on. A solution without its learning note is unfinished work.

## Three high-value project skills to maintain

1. `extract-approach-skill.md` — captures reasoning after non-trivial solves.
2. `create-buyerproof-kit-skill.md` — creates a new kit from idea to MVP.
3. `safety-review-buyerproof-kit-skill.md` — checks disclaimers, professional boundaries, and regulated claims.

Note: project skills are available in Claude Code's discoverable `.claude/skills/<name>/SKILL.md` format. The older flat `.md` files are retained as readable source/manual copies, but the `SKILL.md` files are the canonical Claude Code skill entrypoints.

## Kit versioning rule

Every product kit must carry `version` and `updated` in its frontmatter and a "Version, updates, and feedback" section at the end. Derived assets (printable HTML, landing page, CSVs) must state which kit version they were generated from; regenerate or mark them stale when the kit version changes.
