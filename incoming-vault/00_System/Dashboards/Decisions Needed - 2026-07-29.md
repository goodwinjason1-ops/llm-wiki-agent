---
title: Decisions Needed - 2026-07-29
created: 2026-07-29
updated: 2026-07-29
type: dashboard
tags: [second-brain, vault-health, decisions]
confidence: high
---

# Decisions Needed — 2026-07-29

Everything mechanical has been done. What is left needs a human, because each item
is a judgement about **your** material that an agent guessing would get wrong.

Six items. Roughly an hour if you do them all. They are independent — do them in
any order, or none.

---

## 1. Two cron jobs are writing identical files daily

**Status:** cron paused by Jayse, pending review.

`inbox processor report` and `vault loop report` — **21 notes each, 100% identical
between consecutive days**. Three weeks of files carrying no information.

**Decide:** is the job broken, or does it genuinely have nothing to report?

- *Broken* → fix it, delete the 42 identical notes, restart cron.
- *Nothing to report* → make it write only on change, and delete the 42.

Either way the 42 existing notes should go — they are inflating the note count and
dragging the orphan and dead-end percentages.

```powershell
python 00_System\Scripts\connection_illuminator.py   # shows both series
```

---

## 2. `RbksoyPfQZY` — merge held back

Two copies exist. The one that would be dropped contains headings the keeper does
not:

- `Handsome Finance transcript - Lighter Could 17X If This One Thing Happens`
- `Transcript text`

The merge tool refused rather than silently dropping that content. **Correct
behaviour, but it needs you.**

**Decide:** copy the missing transcript sections into the keeper, then re-run:

```powershell
python 00_System\Scripts\merge_notes.py --apply
```

---

## 3. Four DeFi Protocol Review re-runs

`pendle-APYUSD-Ethereum` has been reviewed **four times**, distinguished only by a
hex suffix, at 73–98% content overlap. Same for `accountable-USDC-Monad`,
`apyx-protocol-APXUSD-Ethereum` and `mainstreet-MSUSD-Ethereum`.

**Decide:** do later runs *supersede* earlier ones, or is each a distinct
point-in-time review?

- *Supersede* → keep the newest, archive the rest:
  `python 00_System\Scripts\merge_notes.py --group pendle --min-sim 0.70 --apply`
- *Point-in-time* → rename them with dates instead of hashes so they read as a
  series, and they will stop being flagged.

---

## 4. Three wikilinks the repair tool refused to fix

It found close matches but declined to rewrite them, because each differs by a
**digit** — and a confident wrong rewrite corrupts provenance silently.

| In | Link | Closest match |
|---|---|---|
| `QTF-024 Contradiction Detection Research` | `0xJeff Hermes Workflows - Source Review - 2026-07-13` | `… - 2026-07-14` |
| `QTF Alpha Digest Pipeline Contract` | `0xJeff Hermes Workflows - Source Review - 2026-07-13` | `… - 2026-07-14` |
| ~~`qtf_v07_costed_20260718_comparison`~~ | ~~`QTF-V07 Costed Function-Based Pairs Backtest - 2026-07-15`~~ | **RESOLVED** |

The first two are probably just date typos — only the `07-14` file exists, and
no `07-13` was ever written.

**The third — RESOLVED 2026-07-29.** A search of the whole vault found exactly
one file: `QTF-V05 Costed Function-Based Pairs Backtest - 2026-07-15.md`. There
is no V07 note. Jayse confirmed **V07 was abandoned and the write-up was never
written**, so the link was a promise the vault could not keep.

The reference in `qtf_v07_costed_20260718_comparison.md` has been replaced with a
plain line recording that V07 was abandoned and no write-up exists, rather than
deleted outright. The absence of a write-up is itself a fact about V07, and a
comparison report that quietly loses its lineage is worse than one that says
where the lineage stops.

The comparison's own conclusion is unaffected — `do_not_promote`, 15.4% jitter
survival against a 60% gate, on its own evidence. Removing a dead link changes
no finding.

Note the targets above are deliberately written as code, not as wikilinks. An
earlier version of this dashboard used `[[…]]`, which made the dashboard itself
generate three of the broken links it was reporting.

```powershell
python 00_System\Scripts\vault_repair.py --fix-links   # re-lists these
```

---

## 5. 136 notes have no frontmatter

Measured against the live vault, not the imported copy — the earlier figure of 44
was from the subset that reached git. The real number is **136**, about 18% of
the vault.

They are invisible to Dataview and to most of the tooling. **Not auto-filled on
purpose** — inventing a `created:` date would fabricate provenance across a fifth
of the vault, which is worse than leaving it blank.

Most are in `05_Projects`, and a large share are not really notes at all:
`README.md`, `CLAUDE.md`, generated reports, email sequence drafts. Those are
project files that happen to be markdown.

**Decide:** either accept them, or split the difference — add frontmatter to the
ones that are genuinely knowledge, and leave project scaffolding alone. The
second is the better trade; blanket-filling 136 files would mostly add ceremony
to files no one queries.

---

## 6. Twenty-five links point at notes that were never written

Not typos — genuinely missing pages: `Dami-DeFi Module`,
`QTF Strategy Promotion Gates`, `BuyerProof AU`,
`Trading Bot Safety and Control Rules`, and others. Written as code here, for the
same reason as item 4: listing them as wikilinks would make this dashboard
manufacture the very problem it reports.

**Decide, per link:** write the note, or remove the link. A link to a note you
never intend to write is a promise the vault keeps making and breaking.

`Trading Bot Safety and Control Rules` is the one worth writing first, given
everything else stays paper-only.

---

## Where the vault stands

| Gate | Status | |
|---|---|---|
| synthesis ratio | **PASS** | 0.25 — was 0.06 |
| sources reach wiki | **PASS** | 83% — was 20% |
| inbox drained | **PASS** | 4 notes |
| concepts are sourced | FAIL | 14/19 — the 5 original concepts predate the convention |
| orphans | FAIL | 16%, want ≤15% |
| dead ends | FAIL | 57%, want ≤40% |
| stalled generators | FAIL | item 1 above — **confirmed**, 21 + 21 identical notes |
| broken links | FAIL | 33 on the live vault — 3 real referrals (item 4) + 30 unwritten (item 6) |

Items 1 and 6 are most of the remaining gate failures. Clearing those two moves
four gates.

## Links

- [[synthesis-debt]] — why this backlog existed
- [[Second Brain Self-Improvement Loop]] — the cadence that prevents it recurring
- [[connection-illumination]]
