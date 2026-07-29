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
| `QTF-024 Contradiction Detection Research` | `[[0xJeff Hermes Workflows - Source Review - 2026-07-13]]` | `… - 2026-07-14` |
| `QTF Alpha Digest Pipeline Contract` | `[[0xJeff Hermes Workflows - Source Review - 2026-07-13]]` | `… - 2026-07-14` |
| `qtf_v07_costed_20260718_comparison` | `[[QTF-V07 Costed Function-Based Pairs Backtest - 2026-07-15]]` | `QTF-**V05** …` |

The first two are probably just date typos. **The third is the dangerous one** —
V05 and V07 are different strategies, and it may mean the V07 note was never
written.

```powershell
python 00_System\Scripts\vault_repair.py --fix-links   # re-lists these
```

---

## 5. Forty-four notes have no frontmatter

They are invisible to Dataview and to most of the tooling. **Not auto-filled on
purpose** — inventing a `created:` date would fabricate provenance across 5% of the
vault, which is worse than leaving it blank.

**Decide:** either accept them as-is, or fill dates from file mtime where you are
confident that reflects reality. Most are in `05_Projects`.

---

## 6. Twenty-five links point at notes that were never written

Not typos — genuinely missing pages: `[[Dami-DeFi Module]]`,
`[[QTF Strategy Promotion Gates]]`, `[[BuyerProof AU]]`,
`[[Trading Bot Safety and Control Rules]]`, and others.

**Decide, per link:** write the note, or remove the link. A link to a note you
never intend to write is a promise the vault keeps making and breaking.

`[[Trading Bot Safety and Control Rules]]` is the one worth writing first, given
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
| stalled generators | FAIL | item 1 above |
| broken links | FAIL | 44 — items 4 and 6 above |

Items 1 and 6 are most of the remaining gate failures. Clearing those two moves
four gates.

## Links

- [[synthesis-debt]] — why this backlog existed
- [[Second Brain Self-Improvement Loop]] — the cadence that prevents it recurring
- [[connection-illumination]]
