# AGENTS.md — Operating manual for any agent working in this vault

This is the **universal entry point**. Most coding agents look for `AGENTS.md`
(Codex, Cursor, OpenCode, Aider, Amp, Hermes). Claude Code also reads
[`CLAUDE.md`](CLAUDE.md); Hermes/Ari also reads [`HERMES.md`](HERMES.md). Both of
those defer to this file for *what to do* and add only their own role notes.

Read before editing anything durable:

1. **This file**
2. [`SCHEMA.md`](SCHEMA.md) — the rules a note must satisfy
3. [`index.md`](index.md) — what exists
4. the tail of [`log.md`](log.md) — what changed recently

---

## What this vault is

An implementation of Karpathy's **LLM Wiki** pattern. Three layers:

```
02_Raw       immutable source material     — READ ONLY, never edit
03_Sources   one summary per source        — what a source said
04_Wiki      synthesis                     — what is true, abstracted across sources
```

Plus the working layers: `01_Inbox` (transient), `00_System` (scripts, workflows,
dashboards, templates), `05_Projects` / `06_Areas` / `07_Resources` / `08_Skills`
(delivery work), `09_Archive`.

**The wiki is the product.** `02_Raw` and `03_Sources` exist to feed it. A vault
where the raw layer grows and `04_Wiki` doesn't is failing, however tidy it looks.

---

## The prime directive

> Capture is fast and feels productive. Synthesis is slow and feels optional.
> Your job is the second one.
>
> This vault has already failed this way once: 190 raw notes and 80 source
> summaries had produced 5 concept pages. See [[synthesis-debt]] for the full
> post-mortem — it is the single most useful page here for understanding what
> not to let happen again.

A session that ends with more captured material and no new synthesis has moved
the vault backwards.

---

## The five operations

### 1. `ingest` — a source becomes knowledge

1. Save the raw file under `02_Raw/` with URL, ingest date and sha256. Never edit it again.
2. Write a summary in `03_Sources/`. Record what the source **actually said**,
   and mark what it did **not** say. Where a paywall or extract cuts off, write
   `unknown / not stated in source` rather than reconstructing.
3. **Update or create concept pages in `04_Wiki/concepts/`.** This is the step
   that gets skipped, and skipping it is the whole failure mode. Ask: *does this
   change, confirm, or contradict something I already believe?*
4. Link **both directions**: the summary links to the concepts it fed, each
   concept cites the summaries it came from. A one-way link is half a link.
5. Update `index.md` and append to `log.md`.

A substantive source should touch several existing pages, not just add one.

### 2. `query` — answer, then file the answer

Search `04_Wiki` first — that is what it is for. Fall back to `03_Sources`, then
`02_Raw`. Cite with wikilinks. **If answering produced a durable claim that isn't
already a note, write it** — an answer that exists only in chat is knowledge you
will pay to derive twice. File substantial answers under `04_Wiki/queries/`.

### 3. `connect` — find what should be linked and isn't

```bash
python3 00_System/Scripts/connection_illuminator.py           # dry run
python3 00_System/Scripts/connection_illuminator.py --write   # file it, remember it
```

Four categories, in priority order:

| Category | Action |
|---|---|
| **Merge candidates** | One source filed twice. Merge, don't link. |
| **Stalled generators** | A dated series producing identical output. Fix the generator or stop it. |
| **Cross-folder** | Highest value — connections you were unlikely to make, because you search within a topic. |
| **Same-folder** | Related notes never linked. |

Suggestions are **hypotheses**. Read both notes before editing. If the
relationship needs explaining, write a concept page rather than just a link.

### 4. `lint` — check health

```bash
python3 00_System/Scripts/vault_health.py --record
python3 00_System/Scripts/vault_repair.py            # dry run; --apply to fix
```

`vault_health.py` is the scoreboard. It exits non-zero when gates fail, so it can
drive a cron job. **The synthesis ratio is the number that matters** — concept
pages per source summary. Below 0.10 means capture is outrunning understanding.

### 5. `consolidate` — promote and prune

- Drain `01_Inbox` completely. Every item filed or explicitly discarded.
- Where the same claim appears in two or more independent sources, raise its
  confidence and abstract it into a concept page.
- Re-verify or downgrade stale high-confidence claims.
- Build a dashboard or index note when a cluster passes ~7 notes.

---

## Hard rules

- **Never modify `02_Raw/`.** It is the evidence.
- **Never delete a note.** Archive to `09_Archive/` instead. Superseded material
  is how you audit a change of mind.
- **Every substantive claim carries a source** — `` — source: `03_Sources/file.md` `` —
  or is explicitly marked as your own inference. An unsourced claim is
  indistinguishable from a hallucination six months later.
- **Never fabricate provenance.** A wrong source reference is worse than none: it
  launders a guess into a fact that every future read inherits. If you don't know
  a note's creation date, leave the field out.
- **Never resolve a contradiction by picking a side** without new evidence.
  Record both, and open a question.
- **Every durable page** gets YAML frontmatter and at least two wikilinks.
- **No secrets.** Never read, print or store API keys or credentials.
- **Trading, crypto and live execution stay paper/sandbox/dry-run** unless Jayse
  explicitly approves a specific, scoped live action with saved evidence.
- **Mental health / AOD / Jungian material is educational and training context**,
  not clinical advice.

---

## Reporting

After any session that writes, say:

1. Which sources you read
2. Which pages you created or updated, as wikilinks
3. **What connections you made that weren't obvious** — this is the deliverable
4. Contradictions found, stated precisely and left unresolved
5. What you'd ingest next, and the gap you noticed

"Updated the vault" is not a report.

---

## Quick reference

```bash
python3 00_System/Scripts/vault_health.py --record          # scoreboard + trend
python3 00_System/Scripts/connection_illuminator.py --write # what to link
python3 00_System/Scripts/vault_repair.py --apply           # fix mechanical damage
```

Related: [[Second Brain Self-Improvement Loop]] · [[synthesis-debt]] ·
[[connection-illumination]] · [[karpathy-llm-wiki]]
