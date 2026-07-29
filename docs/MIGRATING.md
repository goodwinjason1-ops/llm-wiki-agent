# Migrating an existing vault

You already have an Obsidian vault. This is how to bring it into this structure
without losing anything.

The short version: **nothing is destroyed, and nothing is moved without you seeing
the plan first.** `tools/migrate_vault.py` copies. Your original vault is untouched.

---

## Before you start

1. **Back up, or make sure your vault is in git.** This is cheap insurance.
2. **Commit this repo.** The migration tool refuses to write into a dirty working
   tree, so a bad result is one `git checkout` away from undone.

---

## Step 1 — See the plan

```bash
python3 tools/migrate_vault.py --from ~/path/to/YourVault
```

Nothing is written. You get a table of every note and where it would land:

```text
  wiki/procedures/  (1)
      Deploy Runbook              filename contains 'runbook' (over entity)

  wiki/inbox/  (1)
    ? thought                     only 4 words — too thin to classify
```

The classifier scores several signals and shows you which one won, plus any close
rival. Notes marked `?` are low-confidence guesses.

### How it decides

In rough order of strength:

| Signal | Example |
|---|---|
| Existing `type:` in frontmatter | Wins outright, always |
| Filename shape | `2026-07-01` → journal, `Deploy Runbook` → procedure, `Ideas MOC` → map, `Why does churn spike?` → question |
| Folder name | `People/` → entity, `Reading/` → literature, `Zettel/` → concept |
| Tags | `#reference` → literature |
| Content shape | `author:`/`url:` metadata → literature; numbered steps → procedure; many links and little prose → map |

A folder named `Unsorted/` or `Inbox/` is scored deliberately weakly — it means
"not filed yet", so any real signal should beat it.

**Anything it cannot classify goes to `wiki/inbox/`**, not into a guessed folder.
A wrong guess buried in `concepts/` is worse than an honest one in the inbox, because
you will never revisit it.

---

## Step 2 — Correct the plan

The classifier is a heuristic and it will be wrong sometimes. Two ways to fix it:

**Best — add `type:` to the frontmatter of the notes it got wrong**, in your original
vault. Explicit frontmatter always wins, and the fix survives a re-run:

```yaml
---
type: procedure
---
```

**Or** just let it land and move the file afterwards. Obsidian updates wikilinks when
you move a note within the vault, so this is safe — but do it in Obsidian, not in a
file manager.

Export the plan if you want to review it properly:

```bash
python3 tools/migrate_vault.py --from ~/YourVault --plan plan.json
```

---

## Step 3 — Apply

```bash
python3 tools/migrate_vault.py --from ~/YourVault --apply
```

This will:

- **Copy** each note into the right `wiki/` folder. Originals are not modified or deleted.
- **Add** the frontmatter fields `SCHEMA.md` requires, with sensible defaults per type.
- **Preserve** every frontmatter field you already had. Nothing is overwritten.
- **Copy attachments** (images, PDFs) into `wiki/_attachments/` so embeds keep resolving.

It refuses to run if two notes would collide on the same filename, or if this repo has
uncommitted changes. `--force` overrides both, but read the warning first.

---

## Step 4 — Let the agent do the real work

The migration only puts files in the right places. It does not add typed links,
sources, or confidence — that is judgment work.

```bash
python3 tools/lint_vault.py
```

You will see a lot of warnings on a freshly migrated vault. That is expected and it is
the point: the linter is showing you what was always missing, not what migration broke.

Then hand it to your agent:

```text
Read SCHEMA.md and AGENTS.md.

Then work through the vault in passes:

1. Everything in wiki/inbox/ — file it into the right folder, or tell me why
   it should be discarded.
2. Add typed links per SCHEMA.md §6. Start with the notes the linter flags as
   orphans and dead ends.
3. Add source references and honest confidence values. Where you can't determine
   a source, mark the claim as inference rather than inventing one.
4. Build MOCs for any cluster past ~7 notes.

Report what you changed, what contradictions you found, and what connections you
made that I hadn't.
```

Do it in passes, not one pass. On a vault of any size, ask the agent to work through
one folder at a time and report between passes — you want to catch a systematic
misunderstanding after 20 notes, not after 2,000.

---

## Step 5 — Look at it

```bash
python3 tools/build_graph.py --open
python3 tools/suggest_links.py
```

The first galaxy render of a migrated vault is usually unflattering, and it is the
most useful diagnostic you will get:

| What you see | What it means |
|---|---|
| A cloud of scattered dust | Most notes are orphans. Nothing is linked. |
| A few bright hubs, everything else dim | Your MOCs are doing all the work; the leaves are not connected to each other. |
| One dense undifferentiated blob | Everything links to everything. No structure. |
| Separate islands | Real topic clusters with no bridges between them — run `suggest_links.py --only bridge`. |
| Connected constellations | Healthy. |

---

## Bringing your raw sources across

`sources/` is for **raw material** — the PDFs, transcripts and exports your notes were
made from. If you still have them, copy them in. They are what makes future ingests
able to check claims rather than trust them.

If you do not have them, that is fine. Existing notes become the starting corpus, and
new material goes through `sources/` from here on.

**If any of it is private**, keep the repo private or keep `sources/` local and commit
only `wiki/`. `.gitignore` already excludes `sources/private/`.

---

## Common situations

**"My vault uses PARA / Johnny Decimal."** The folder names map reasonably well —
Projects and Areas mostly become entities, Resources mostly become literature or
concepts. Expect to correct maybe 10–20% by hand.

**"My vault is one giant folder."** Then folder signals do nothing, and classification
falls back to filenames and content. Expect more notes in `inbox/`. Consider adding
`type:` frontmatter in bulk first — even a rough pass beats guessing.

**"I use Dataview queries everywhere."** They keep working. Typed links use Dataview's
own inline-field syntax specifically so it stays queryable.

**"I have thousands of notes."** Migrate a representative subfolder first with
`--from ~/YourVault/SomeFolder`, check the results, then do the rest. Also read
`SCHEMA.md` §8 on MOCs — at that size, navigation is your real problem.
