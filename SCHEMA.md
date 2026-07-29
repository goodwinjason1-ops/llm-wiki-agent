# SCHEMA — The Vault Constitution

> This is the most important file in the repository.
>
> `AGENTS.md` tells an agent *what operations to run*. This file tells it *what a
> correct vault looks like*. When the two disagree, this file wins. When a human
> and this file disagree, the human wins — and then this file gets updated, because
> an undocumented rule is a rule that will be broken next session.

---

## 1. The three layers

```text
sources/     immutable raw material      — the agent READS, never writes
wiki/        synthesized knowledge       — the agent OWNS and maintains
SCHEMA.md    the law                     — the human owns, the agent obeys
```

The wiki is not a summary of the sources. It is a **re-indexing of the sources into
the shape of your thinking**. A source is organised the way its author wanted. A
wiki page is organised the way *you* will need to retrieve it later.

If a wiki page could be replaced by "go read the source", it is a bad page.

---

## 2. Folder taxonomy

Every note lives in exactly one folder. The folder declares its `type`.

| Folder | `type` | Contains | Lifespan |
|---|---|---|---|
| `wiki/inbox/` | `capture` | Raw, unprocessed captures. Nothing stays here. | Days |
| `wiki/journal/` | `journal` | Dated working notes, session logs, thinking-out-loud. | Weeks |
| `wiki/literature/` | `source` | One page per source document. What it said, what it's for. | Permanent |
| `wiki/concepts/` | `concept` | Ideas, models, patterns, arguments. The load-bearing layer. | Permanent |
| `wiki/entities/` | `entity` | People, orgs, products, tools, places, projects. | Permanent |
| `wiki/procedures/` | `procedure` | How to do a thing. Distilled, repeatable, tested. | Permanent |
| `wiki/questions/` | `question` | Open questions. Each one is a research task with a home. | Until answered |
| `wiki/maps/` | `map` | Maps of Content (MOCs) — curated entry points into a cluster. | Permanent |

`wiki/index.md` is the root MOC and the only file at the top of `wiki/`.

### Why this taxonomy and not PARA / Zettelkasten / Johnny-Decimal

Those systems organise by **project** or by **arbitrary ID**. This one organises by
**epistemic kind** — what sort of claim the note makes. That matters here because an
agent has to decide, mechanically, where a new fact belongs. "Is this a claim about
the world, a claim about a thing, or a claim about how to act?" is a question an
agent can answer reliably. "Is this Project or Area?" is not.

---

## 3. Frontmatter schema

Every note in `wiki/` **must** open with YAML frontmatter. No exceptions — the
tooling in `tools/` treats a missing block as a lint error, not as a default.

```yaml
---
title: Retrieval Augmented Generation
type: concept              # capture | journal | source | concept | entity | procedure | question | map
tier: semantic             # working | episodic | semantic | procedural
status: active             # active | draft | superseded | archived
confidence: 0.8            # 0.0–1.0 — see §5
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29       # last time a human or agent verified the claims
sources:                   # relative paths into sources/, or URLs
  - sources/karpathy-llm-wiki.md
tags: [ai/retrieval, architecture]
aliases: [RAG]
supersedes: []             # note titles this replaces
superseded_by: null        # set when status: superseded
---
```

### Field rules

- **`title`** — must match the filename (minus `.md`). The filename is the wikilink target.
- **`type`** — must match the folder. A `concept` in `entities/` is a lint error.
- **`tier`** — see §4. Governs compression and trust, not location.
- **`status`** — `superseded` notes are **never deleted**. They keep their file and
  their inbound links, and gain `superseded_by`. Deleting knowledge destroys the
  audit trail that makes the vault trustworthy.
- **`confidence`** — see §5.
- **`reviewed`** — drives staleness decay. A note untouched for its tier's half-life
  gets flagged by the linter, not silently trusted.
- **`tags`** — hierarchical, slash-separated, lowercase. `ai/retrieval`, not `#AI` or
  `#Retrieval`. Hierarchy is what makes the galaxy graph cluster meaningfully.
- **`aliases`** — every name you might later search for. This is the single highest-
  leverage field for future-you; unaliased notes are notes you will fail to find.

---

## 4. Memory tiers

Knowledge is not uniform. It gets **promoted** as evidence accumulates, and each
promotion costs compression — you keep less text and more certainty.

```text
working  ──▶  episodic  ──▶  semantic  ──▶  procedural
(raw)         (what happened)  (what is true)   (what to do)
```

| Tier | Meaning | Typical home | Half-life | Promotion trigger |
|---|---|---|---|---|
| `working` | Unprocessed. Still in the agent's hands. | `inbox/` | 7 days | Anything durable → episodic |
| `episodic` | A specific thing that happened / was said, tied to one source or date. | `literature/`, `journal/` | 90 days | Same claim appears in ≥2 independent sources |
| `semantic` | A general truth abstracted from episodes. Source-independent. | `concepts/`, `entities/` | 365 days | Claim becomes actionable and repeatable |
| `procedural` | A distilled, tested method. The most compressed form. | `procedures/` | 365 days | — (terminal tier) |

**The rule that makes this work:** promotion *never* deletes the lower tier. A
`semantic` concept page cites the `episodic` literature pages it was abstracted from.
That citation chain is what lets you later ask "why do I believe this?" and get a
real answer instead of a vibe.

**Half-life** is not expiry. When `today - reviewed > half-life`, the linter flags the
note and `confidence` is treated as decayed for ranking purposes. The note keeps
working; it just stops being trusted silently.

---

## 5. Confidence

A number from 0.0 to 1.0. It is not a mood — it maps to evidence:

| Range | Meaning | Required backing |
|---|---|---|
| `0.9–1.0` | Verified. Directly observed, or stated by ≥2 independent primary sources. | 2+ sources, or first-hand |
| `0.7–0.9` | Confident. One good primary source, nothing contradicting. | 1 primary source |
| `0.4–0.7` | Provisional. Inferred, secondary-sourced, or partially tested. | Inference chain stated |
| `0.1–0.4` | Speculative. A hypothesis worth keeping, clearly marked as such. | Reasoning stated |
| `0.0` | Known false, retained only to record that it was disproved. | `superseded_by` set |

**Confidence is a property of a claim, not just a page.** A page with one shaky claim
among nine solid ones should not be discounted wholesale — mark the individual claim:

```md
- The model was trained on 15T tokens ^conf:0.4 — inferred from parameter count, unconfirmed — source: `sources/blog-post.md`
```

Page-level `confidence` is the **minimum** confidence of its load-bearing claims.

---

## 6. Typed links — the knowledge graph layer

Plain `[[wikilinks]]` say two notes are related. They do not say *how*, and "how" is
where the useful inferences live. Every meaningful connection is typed.

Typed links use **Dataview inline-field syntax**, so they are simultaneously readable
prose, queryable by Obsidian's Dataview plugin, and parseable by `tools/build_graph.py`:

```md
## Links
- supports:: [[Compounding Knowledge]] — each ingest raises the floor for the next
- contradicts:: [[Chunk-Based RAG]] — disagrees on where synthesis should happen
- depends-on:: [[Markdown As Substrate]]
- instance-of:: [[Knowledge Management Pattern]]
```

### The edge vocabulary

Closed set. Adding a type requires editing this file — an open vocabulary degrades
into synonyms within a month and the graph stops meaning anything.

| Edge | Direction | Use when |
|---|---|---|
| `instance-of` | specific → general | This is a kind of that. |
| `part-of` | part → whole | Structural containment. |
| `depends-on` | dependent → prerequisite | That must hold for this to work. |
| `uses` | user → used | Practical, non-essential use. |
| `supports` | evidence → claim | This raises confidence in that. |
| `contradicts` | ↔ symmetric | Cannot both be true. **Never resolve silently.** |
| `supersedes` | new → old | This replaces that. Sets `superseded_by` on the target. |
| `caused` | cause → effect | Causal, with a stated mechanism. |
| `analogous-to` | ↔ symmetric | Different domains, same structure. **The highest-value edge.** |
| `authored-by` | work → entity | Attribution. |
| `mentioned-in` | concept → source | Weak provenance. Auto-generated; don't hand-write. |

**On `analogous-to`:** this is the edge that earns the vault its keep. `depends-on`
encodes what you already knew when you wrote the note. `analogous-to` links two
clusters that grew independently — it is where a second brain tells you something you
did not already know. Agents should propose these aggressively and mark them
`confidence: 0.4` until a human confirms.

**On `contradicts`:** a contradiction is an asset, not a defect. It is a precisely
located gap in your understanding. Never average two conflicting sources into a
mushy middle. Record both, type the edge, and open a `question` note.

---

## 7. Page anatomy

```md
---
(frontmatter per §3)
---

# Title

> One-sentence definition. If you cannot write this, you do not yet understand the
> note's subject well enough to file it.

## Summary
Two to five sentences. Written for a reader who has never seen the sources.

## Key claims
- Claim, stated as a complete sentence ^conf:0.9 — source: `sources/file.md`
- Another claim ^conf:0.6 — source: `sources/other.md`

## Links
- depends-on:: [[Prerequisite]]
- contradicts:: [[Rival Idea]] — they disagree about X

## Open questions
- [[Q — Does this hold at scale?]]

## Provenance
- `sources/file.md` — ingested 2026-07-29
```

### Hard rules

1. **Atomic.** One note, one idea. If the title needs "and", split it.
2. **Claims are sentences.** `- Cost: high` is not a claim. `- Inference cost scales
   superlinearly with context length` is.
3. **Every claim carries a source or is marked as your own inference.** Unsourced,
   unmarked claims are how a vault quietly fills with hallucination.
4. **Titles are stable.** Renaming breaks every inbound wikilink. Prefer an `alias`.
5. **Length ceiling ~400 lines.** Beyond that, split and leave a MOC behind.
6. **A note with no outbound typed links is an orphan.** Orphans are invisible to
   graph traversal — which means, functionally, they are not in your second brain.

---

## 8. Maps of Content (MOCs)

A MOC is a curated index. It is **not** an auto-generated file listing — Obsidian's
search already does that, and a MOC that just lists everything adds no information.

A MOC earns its place by imposing an **argument**: an order, a grouping, a narrative.

```md
## The core loop
1. [[Ingest]] — sources become episodic pages
2. [[Consolidate]] — episodes become semantic concepts
3. [[Lint]] — the graph is checked for rot

## Where this breaks down
- [[Index Collapse Beyond 200 Notes]]
- [[Orphan Accumulation]]
```

Create a MOC when a cluster passes ~7 notes. Below that it is overhead.

---

## 9. Contradiction and supersession protocol

**Contradiction** — two claims that cannot both be true, both currently believed:

1. Keep both notes. Do not edit either into agreement.
2. Add `contradicts::` edges in both directions.
3. Create a `question` note stating the conflict precisely and what evidence would
   resolve it.
4. Lower `confidence` on both to at most 0.5.

**Supersession** — new information replaces old:

1. Old note: `status: superseded`, `superseded_by: [[New Note]]`. **Content stays.**
2. New note: add old title to `supersedes:`, add a `supersedes::` link.
3. Inbound links to the old note are left alone. It still resolves; it now carries a
   forwarding address.

The difference: contradiction is "I don't know which". Supersession is "I know, and
here's what I used to think". Both are worth keeping. Only one needs research.

---

## 10. What the agent must never do

- Modify anything in `sources/`.
- Delete a note. (`status: archived` is the strongest available action.)
- Resolve a contradiction by picking a side without new evidence.
- Write a claim without a source or an explicit inference marker.
- Rename a note without updating inbound links.
- Invent an edge type outside §6.
- Fabricate a `sources:` entry. A wrong provenance is worse than none — it launders
  a guess into a fact, and every future read of that note inherits the error.

---

## 11. Extending this schema

When a rule here stops fitting reality, change it here first, then re-run
`python3 tools/lint_vault.py` to see what the change broke. A schema you edit is
alive. A schema you route around is decoration.
