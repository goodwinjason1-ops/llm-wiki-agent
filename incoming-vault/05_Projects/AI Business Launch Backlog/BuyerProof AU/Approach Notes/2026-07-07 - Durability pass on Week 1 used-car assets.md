---
title: Durability pass on Week 1 used-car assets
created: 2026-07-07
type: approach-note
tags: [buyerproof-au, approach, learning]
---

# Durability pass on Week 1 used-car assets

## 1. Problem solved

The Week 1 assets (used-car kit, CLAUDE.md, project skills) existed but had unclosed loops: the kit's own safety review listed launch blockers nobody had actioned, the kit had no version/update mechanism, and the "skills" were flat markdown files that Claude Code cannot auto-discover. This pass closed the closable gaps and documented the rest.

## 2. Why it mattered

Durability is the whole point of frontier extraction: a future, cheaper model should be able to open this project and continue without re-deriving standards. Unversioned kits and undiscoverable skills silently rot — derived assets (printable HTML, landing page) drift from the source kit with no signal that they are stale.

## 3. Initial assumptions

- The kit was "done" because it passed its safety review.
- The `.claude/skills/*.md` files would function as Claude Code skills.

## 4. Trap / hidden difficulty

Two traps:

1. **The safety review was a pass-with-conditions, not a pass.** Its "Required before public launch" list (rego-check links, version/date, update process) was sitting unactioned. A reviewer artifact that produces TODOs nobody owns is a false sense of completion.
2. **Skill files that look right but aren't loaded.** Claude Code only auto-discovers `.claude/skills/<name>/SKILL.md` with `name:`/`description:` frontmatter. Flat `.md` files in that folder are inert — they only work if a model happens to read them via CLAUDE.md references.

## 5. Why the obvious approach was insufficient

The obvious move was "polish the kit's content" — add more checklist rows. But content was not the weakness; infrastructure was. More rows would deepen the drift problem (the printable HTML is already one version behind). The higher-leverage fixes were versioning rules, the update-policy block, and closing the safety review's open items.

## 6. Approach that actually worked

Treat the existing safety review and CLAUDE.md quality bar as the work queue: diff the kit against both lists, action every item that can be closed without external input (mechanic review, contact email), and convert everything else into explicit, located TODOs (in the kit itself, CLAUDE.md, and the changelog).

## 7. Step-by-step method

1. Read all Week 1 assets: kit, skills, safety review, changelog, CLAUDE.md.
2. Diff the kit against the CLAUDE.md product quality bar → found missing before-you-start checklist.
3. Diff the kit against its safety review's "Required before public launch" → found missing rego-check pointers and version/update block.
4. Scan for advice-boundary leaks → found the towbar row implying legal/insurance judgement; rewrote as a verify-locally handoff.
5. Add state/territory authority *names* only (no URLs), since inventing URLs risks stale/wrong links; each entry says to search the official site and verify locally.
6. Add version frontmatter + Section 13 (version, update policy, feedback placeholder).
7. Encode the fixes as rules in CLAUDE.md (kit versioning rule, changelog convention, skill-format note) so future kits inherit them.
8. Append a dated section to the existing changelog rather than creating a new file.

## 8. Checks that proved it worked

- Kit now satisfies every item in the CLAUDE.md product quality bar except external-input items (mechanic wording review, contact email), which are marked TODO in the kit and changelog.
- All three actionable "Required before public launch" items from the safety review are closed; the remaining two need the human (mechanic review, commercial terms).
- No new URLs were invented; the only URL in the kit remains the official PPSR address.
- No decision-making or advice language was added; new sections are preparation checklists and verify-locally pointers.

## 9. Reusable rule for next time

A safety review or quality bar with open items is a work queue, not a certificate. Before adding content to any kit, first close its reviewer's open items or convert them into located TODOs — and version the kit so derived assets can be detected as stale.

## 10. Prompt/instruction future models should use

> Open the kit's safety review and the CLAUDE.md quality bars. List every unchecked item. Close each one that needs no external input; for the rest, write a TODO in the kit or changelog naming who/what unblocks it. Bump the kit's `version` frontmatter, update Section 13, and list any derived assets (HTML, landing page, CSV) now stale. Never invent URLs — name official authorities and say "verify locally".

## 11. Files touched / artifacts created

- `Product Kits/Used-Car Buyer Inspection Kit Australia v1 - PDF Ready.md` (v1.0 → v1.1)
- `CLAUDE.md` (changelog convention, skill-format note, kit versioning rule)
- `Implementation Changelog - Claude Frontier Extraction Video - 2026-07-07.md` (appended dated section)
- `Approach Notes/2026-07-07 - Durability pass on Week 1 used-car assets.md` (this note)

## 12. Follow-up risks or open questions

- Writes under `.claude/` were blocked this session; the SKILL.md migration (`.claude/skills/<name>/SKILL.md` with name/description frontmatter) is still open — until then the skills are read-only manuals.
- `Used-Car Buyer Inspection Kit Australia v1 - Printable.html` is stale at v1.0; regenerate before printing.
- Section 13 feedback contact is a placeholder; must be filled before any paid sale.
- Mechanic/pre-purchase-inspector wording review still outstanding — the kit stays `draft-ready-for-feedback` until done.
