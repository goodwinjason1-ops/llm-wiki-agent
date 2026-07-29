---
title: Second Brain Self-Improvement Loop
created: 2026-07-29
updated: 2026-07-29
type: workflow
tags: [second-brain, llm-wiki, loop, automation, vault-health]
sources: [03_Sources/articles/karpathy-ai-second-brain-connection-layer.md, 03_Sources/articles/fable-obsidian-second-brain-loop.md]
confidence: high
---

# Second Brain Self-Improvement Loop

> The compounding loop from Karpathy's LLM Wiki pattern, made measurable so it
> cannot silently stall the way it did between 8 and 29 July 2026.

## Why this replaces "run the loop weekly"

The vault already had a weekly loop. It ran. It produced reports. And over 22 days
the synthesis layer grew by zero pages, because **nothing in the loop measured
whether synthesis was happening**. The loop reported activity, not progress.

The fix is a scoreboard with pass/fail gates, and a rule that the loop is not
allowed to report "clean" while the synthesis gate is failing. See
[[synthesis-debt]].

## The loop

### Daily — automated, 2 minutes

```bash
cd "C:/Users/Kidsg/Documents/AI Second Brain"
python 00_System/Scripts/vault_health.py --record
python 00_System/Scripts/connection_illuminator.py --write
```

`vault_health.py` exits **non-zero when gates fail**, so a scheduler can alert on
it. That is the whole point: a failing synthesis ratio should interrupt you, the
way a failing build does.

Ari/Hermes owns this. It should surface one line to Telegram: the synthesis ratio,
which gates failed, and the single highest-value connection candidate.

### Weekly — human or Claude Code, 30–60 minutes

Run `/second-brain-loop`, then work in this order. The order matters: it goes
from cheapest-to-fix to most valuable.

1. **Drain `01_Inbox`.** Every item filed or explicitly discarded. Ends at zero.
2. **Act on merge candidates.** Duplicates fragment the graph and split confidence
   between two copies of the same idea.
3. **Fix or stop stalled generators.** A dated series producing identical output
   is a broken job, not a record.
4. **Take one cross-folder connection** and actually make it — read both notes,
   link both directions, and write the concept page if the relationship needs
   explaining.
5. **Write one concept page.** Pick the cluster of source summaries with the most
   unlinked members. This is the step that repays [[synthesis-debt]], and it is
   the only step that must not be skipped.
6. **Update `index.md` and `log.md`.**

### Monthly — review the trend

Read `00_System/Reports/vault-health.md`. You are looking for direction, not
absolute values:

- Synthesis ratio flat or falling while note count rises → capture is outrunning
  understanding again
- Orphan and dead-end percentages not falling → linking isn't happening
- Component count not falling → clusters aren't being bridged

## The gates

From `vault_health.py`. These are the definition of a healthy vault here.

| Gate | Target | Why |
|---|---|---|
| **synthesis_ratio** | ≥ 0.10 concepts per source | The headline. Below this, capture is outrunning understanding. |
| sources reach wiki | ≥ 60% of summaries link into `04_Wiki` | A summary that links nowhere is a dead end. |
| concepts are sourced | ≥ 90% of concepts cite a source | Provenance. Unsourced synthesis is indistinguishable from invention. |
| orphans | ≤ 15% | Nothing links here — functionally not in the vault. |
| dead ends | ≤ 40% | No outbound links — invisible to traversal. |
| inbox drained | ≤ 5 notes | An inbox with residents is a second, worse vault. |
| stalled generators | 0 | Identical output run after run means a broken job. |
| broken links | ≤ 10 | Unresolved wikilinks. |

**A ratio above ~0.60 is also a warning** — roughly one concept per source means
you are renaming summaries, not abstracting across them.

## Scheduling it

**Windows Task Scheduler** — daily at 07:00:

```powershell
$vault = "C:\Users\Kidsg\Documents\AI Second Brain"
$action = New-ScheduledTaskAction -Execute "python" `
  -Argument "00_System\Scripts\vault_health.py --record" -WorkingDirectory $vault
$trigger = New-ScheduledTaskTrigger -Daily -At 7am
Register-ScheduledTask -TaskName "Vault Health" -Action $action -Trigger $trigger
```

**Hermes/Ari cron** — whatever scheduler Ari already uses for the morning brief.
Chain both scripts and report the exit code.

**Claude Code `/loop`** — for the weekly deep pass, if you want it agent-driven
rather than manual.

## Role split

| Agent | Owns |
|---|---|
| **Ari / Hermes** | Daily automated run, Telegram surfacing, cron, cross-session continuity, quick capture |
| **Claude Code** | Weekly deep pass, writing concept pages, refactors, script maintenance |
| **Any other LLM** | Reads [`AGENTS.md`](../../AGENTS.md) and follows the same five operations |

## What "self-improving" actually means here

Not that the vault edits itself. It means:

1. The vault **measures** whether it is getting smarter (`vault_health.py`)
2. It **notices** structure it should have but doesn't (`connection_illuminator.py`)
3. It **fails loudly** when synthesis stalls, instead of quietly accumulating
4. Each pass makes the next pass cheaper, because the concept layer is where
   future questions get answered

The loop that ran before did none of these. It reported that it had run.

## Links

- [[synthesis-debt]] — the failure this loop exists to prevent
- [[connection-illumination]] — the scan that feeds step 4
- [[karpathy-llm-wiki]] · [[ai-second-brain]] · [[self-improvement-loop]]
- [[Claude and Ari Second Brain Evolution Loop]] — the previous version
- [[Karpathy Connection Illumination Workflow]]
