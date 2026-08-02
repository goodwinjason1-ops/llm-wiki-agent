---
title: Vault Improvement Plan
created: 2026-08-02
updated: 2026-08-02
type: dashboard
tags: [second-brain, vault-health, plan]
confidence: high
---

# Vault Improvement Plan

Every remaining task, as an individual step with its own command. Ordered by how
much each moves the vault per hour spent. Do them in order or don't — they are
independent.

**Run this first, every time.** It tells you which step matters today.

```powershell
cd "C:\Users\Kidsg\Documents\AI Second Brain"
python 00_System\Scripts\vault_health.py --record
```

---

## Step 1 — Archive the 42 identical generator reports ✅ DONE

43 files moved to `09_Archive/Generator Reports/` on 2026-08-02. The scripts that
produced them are fixed; see [[synthesis-debt]].

---

## Step 2 — Work the unlinked notes

**The highest-value step, and the only one that moves two gates at once.**
273 notes have a proposed home. Do not try to do them all.

```powershell
python 00_System\Scripts\apply_links.py --folder 05_Projects
```

It shows one note at a time with a preview and up to three proposed links, each
with the shared vocabulary behind it. Press `1`, `2`, `3` to accept, `s` to skip,
`q` to save and quit. Nothing is written until you press a number.

Work in themed batches rather than by folder when you can — a cluster you
understand goes four times faster than a random queue:

```powershell
python 00_System\Scripts\apply_links.py --match "Source-to-System"
python 00_System\Scripts\apply_links.py --match "Business Context Brain"
python 00_System\Scripts\apply_links.py --match "Basketball Coach"
python 00_System\Scripts\apply_links.py --match "Polymarket"
python 00_System\Scripts\apply_links.py --match "AOD"
```

Every session writes an undo manifest, so a batch you regret costs one command to
reverse. **Twenty notes in a sitting is a good session.** Stop when your judgement
gets tired — a wrong link is worse than a missing one, and this is exactly the
task where fatigue produces wrong links.

---

## Step 3 — Open the one isolated document

`00_System/Workflows/Source-to-System Studio Delivery Verification Checklist - 2026-07-14.md`

1,341 words, nothing links to it, and it shares no vocabulary with anything else
in the vault. That combination is rare enough to be worth five minutes. Either it
uses terminology nothing else does, or it is the start of something that was
never continued.

---

## Step 4 — Decide the three empty inbox notes

`01_Inbox/2026-07-03.md`, `01_Inbox/2026-07-13.md` and
`01_Inbox/Hedge Fund Method Markov Regime System.md` are **0 bytes**. They have
sat there since 8 July because the loop was never permitted to drain the inbox.

Write what they were meant to hold, or delete them. The third one has a real title
and is probably worth ten minutes of recall.

---

## Step 5 — Frontmatter, in three passes not one

44 notes have no frontmatter and are invisible to Dataview. **Do not blanket-fill
them** — most are project scaffolding, and a fabricated `created:` date is worse
than a missing one.

```powershell
python 00_System\Scripts\vault_repair.py        # lists them, writes nothing
```

**5a. Skip the scaffolding.** `README.md`, `CLAUDE.md`, generated reports and
email drafts are project files that happen to be markdown. They do not need
frontmatter and never will. Expect this to remove roughly half the list.

**5b. Fill the ones you would want to query.** For anything in `04_Wiki`,
`03_Sources` or a project's research folder, add the four fields that matter:

```yaml
---
title: <the H1 you already have>
created: <only if you actually know it>
type: <one of the types in SCHEMA.md>
confidence: <low | medium | high>
---
```

**5c. Leave `created:` blank where you do not know it.** A note with three of four
fields is queryable. A note with a wrong date is a lie the vault will repeat back
to you in a year.

---

## Step 6 — The 25 links to notes that were never written

Each is a promise the vault keeps making and breaking. Work them in this order —
it is roughly worst-consequence-first.

```powershell
python 00_System\Scripts\vault_repair.py --fix-links   # lists them
```

**6a. Write `Trading Bot Safety and Control Rules`.** Do this one first. Several
notes link to it, everything in the quant work is meant to stay paper-only, and
the rules are currently implicit — which means they exist only in your head and in
scattered instructions to agents. This is the one missing note with real
consequences attached.

**6b. Write `QTF Strategy Promotion Gates`.** Your backtests already report
`do_not_promote` against thresholds. Those thresholds are the note. Writing them
down turns a habit into a rule.

**6c. Decide `BuyerProof AU` and `Dami-DeFi Module`.** Both look like projects that
were named and then set down. Write a stub saying what it was and that it is
parked, or remove the links.

**6d. Sweep the remainder.** For each, the question is one line: *do I intend to
write this?* If no, delete the link. Deleting a link you will never honour is
progress, not loss.

**6e. Fix the two 0xJeff date typos.** `- 2026-07-13` should be `- 2026-07-14`;
only the 07-14 file was ever written. The repair tool refuses these because a
digit differs, which is correct behaviour — it just needs your confirmation.

---

## Step 7 — Redefine the cron jobs, then restart them

Paused by Jayse pending this work. Before restarting, each job needs a written
answer to three questions, because the last set failed on the third:

1. **What decision does its output inform?** A report nobody acts on is noise.
2. **What does it do when nothing has changed?** The correct answer is *write
   nothing*. Both previous jobs wrote a file anyway; that is how 43 identical
   notes happened.
3. **What is it permitted to change?** `vault_loop_runner.py` called the inbox
   processor without `--apply` and the processor only ever appended a comment —
   so the inbox could not drain. **A job that reports on a problem it is not
   allowed to fix will report it forever.**

Write the answers into [[Second Brain Self-Improvement Loop]] before re-enabling
anything.

---

## Where this ends up

| Gate | Now | After steps 2, 5, 6 |
|---|---|---|
| synthesis ratio | PASS | PASS |
| sources reach wiki | PASS | PASS |
| concepts are sourced | PASS | PASS |
| inbox drained | PASS | PASS |
| orphans | FAIL 19% | step 2 |
| dead ends | FAIL 45% | step 2 |
| stalled generators | step 1 done | PASS |
| broken links | FAIL 45 | step 6 |

Step 2 is most of the remaining distance.

## Links

- [[Decisions Needed - 2026-07-29]]
- [[Unlinked Notes Review - 2026-08-02]]
- [[Galaxy View]]
- [[Second Brain Self-Improvement Loop]]
- [[synthesis-debt]]
