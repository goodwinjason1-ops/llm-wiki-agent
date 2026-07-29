# LLM Wiki Agent — a second brain your agent maintains

An Obsidian vault built on the **LLM Wiki v2** pattern: raw sources in, a linked and
typed knowledge graph out, maintained by an agent that does the bookkeeping you would
otherwise abandon. Plus a **3D galaxy view** that renders the whole thing as an
interactive cosmos.

```text
sources/  ──ingest──▶  wiki/  ──▶  typed graph  ──▶  galaxy
 raw material          synthesis      connections      seeing it
```

Built on [Andrej Karpathy's LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
and the [LLM Wiki v2](https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2)
extension that adds agent-memory mechanics.

---

## The three files that matter

| File | Role |
|---|---|
| **[`SCHEMA.md`](SCHEMA.md)** | The constitution. Frontmatter, memory tiers, the typed-edge vocabulary, confidence rules. v2's claim is that this is the most important file in the system, and it is. |
| **[`AGENTS.md`](AGENTS.md)** | The operating manual — the six operations an agent runs against the vault. |
| **`wiki/index.md`** | The root Map of Content. |

---

## Quick start

```bash
git clone <your-repo-url> && cd llm-wiki-agent
bash scripts/install.sh          # Windows: powershell -ExecutionPolicy Bypass -File scripts/install.ps1
```

1. **Open the repo folder as an Obsidian vault.** `.obsidian/` is committed, so the
   graph colours, theme and folder conventions come with it.
2. **Drop raw material into `sources/`** — PDFs, notes, transcripts, articles, exports.
3. **Open the folder in your coding agent** and say:

   ```text
   Read SCHEMA.md and AGENTS.md. Ingest all files in sources/ and update wiki/.
   ```

4. **Look at what you built:**

   ```bash
   python3 tools/build_graph.py --open
   ```

No dependencies. The tools are stock Python 3.9+; the galaxy is a single
self-contained HTML file with no CDN, no server and no network access.

---

## The six operations

Say these to your agent. Each is specified in [`AGENTS.md`](AGENTS.md).

| Say | It does |
|---|---|
| `ingest sources` | Each source becomes a literature page plus edits to 10–15 existing pages |
| *(any question)* | Answers from `wiki/` first, then files the answer back as knowledge |
| `lint wiki` | Mechanical health check, then the judgment calls |
| `consolidate` | Promotes knowledge up the memory tiers, empties the inbox, decays stale claims |
| `what am I missing` | Surfaces connections you have not made |
| `rebuild graph` | Regenerates the galaxy |

---

## Vault structure

Folders are organised by **epistemic kind** — what sort of claim a note makes — rather
than by project. An agent can reliably answer "is this a claim about the world, about
a thing, or about how to act?"; it cannot reliably answer "is this Project or Area?".

```text
wiki/
  index.md        root Map of Content
  inbox/          working memory — emptied every consolidation
  journal/        dated working notes
  literature/     one page per source          (episodic)
  concepts/       ideas and models             (semantic)
  entities/       people, orgs, tools          (semantic)
  procedures/     tested methods               (procedural)
  questions/      open questions
  maps/           Maps of Content
  _templates/     Obsidian note templates
```

### Memory tiers

Knowledge is promoted as evidence accumulates, getting more compressed and more
trusted at each step. Promotion never deletes the tier below — that citation chain is
what lets you later ask *why do I believe this?*

```text
working  ──▶  episodic  ──▶  semantic  ──▶  procedural
7d half-life  90d           365d           365d
```

### Typed links

Plain wikilinks say two notes are related. They do not say *how*, and "how" is where
the useful inferences are. Edges use Dataview inline-field syntax, so they are
readable prose, queryable in Obsidian, and parseable by the tools — one
representation, three consumers.

```md
## Links
- depends-on:: [[Markdown As Substrate]]
- contradicts:: [[Chunk-Based RAG]] — disagrees on where synthesis happens
- analogous-to:: [[Library Card Catalogues]] — same index-collapse failure
```

The vocabulary is closed (11 types, `SCHEMA.md` §6). An open vocabulary degrades into
synonyms within a month and the graph stops meaning anything.

---

## The galaxy view

```bash
python3 tools/build_graph.py           # → tools/galaxy/galaxy.html
python3 tools/build_graph.py --open    # build and open it
python3 tools/build_graph.py --json    # also emit graph.json
```

A 3D force-directed cosmos: Barnes-Hut repulsion, typed springs whose rest length
varies by edge type, and family cohesion that pulls the three epistemic families into
separate constellations rather than one hairball.

- **drag** rotate · **shift-drag** pan · **scroll** zoom · **click** focus · **/** search · **Esc** clear
- Click any legend row to filter a note type or link type in or out.
- **Galaxy disc** flattens the cloud into a galactic plane.

**Read it as a diagnostic, not decoration.** Scattered dust means orphans. One dense
blob means insufficient differentiation. Healthy looks like connected constellations.

### How things are encoded

| Channel | Meaning |
|---|---|
| Hue | epistemic family — blue evidence, aqua understanding, orange navigation |
| Lightness within a hue | the specific note type |
| Node size | degree (how connected the note is) |
| Node opacity | confidence |
| Edge colour & dash | link type |

The three base hues are validated for colour-vision deficiency against the deep-space
surface (worst pair ΔE 9.4 deutan, 20.9 normal vision). Type is never colour-alone —
the legend, filters, hover labels and detail panel all name it in text.

---

## Tooling

All zero-dependency Python. A tool you need to install things to run is a tool that
does not get run.

```bash
python3 tools/lint_vault.py            # health check against SCHEMA.md
python3 tools/lint_vault.py --json     # for an agent to act on
python3 tools/lint_vault.py --strict   # exit 1 on errors — usable in CI

python3 tools/suggest_links.py         # connections you have not made
python3 tools/suggest_links.py --only analogy
```

### What the linter catches

Missing or malformed frontmatter · `type`/folder mismatches · broken wikilinks ·
invalid edge types · unmirrored symmetric edges · orphans and dead ends ·
disconnected islands · notes past their tier half-life · unsourced claims ·
superseded notes with no forwarding address · near-duplicate titles ·
oversized pages · source files never ingested · clusters with no Map of Content.

### What the connection finder looks for

| Detector | Finds |
|---|---|
| `analogy` | High term overlap across **disjoint** tag domains — the cross-domain link a human rarely finds, because people search within a domain |
| `bridge` | A note that would join an isolated island to the main body |
| `triadic` | Many shared neighbours but no direct edge (Adamic-Adar closure) |
| `similar` | High similarity within a domain, never linked |
| `co-source` | Same source cited, never cross-referenced |
| `cluster` | Orphans converging on one topic — a missing concept page |

These are candidates, not conclusions. Write accepted edges at `confidence: 0.4`
until confirmed.

---

## Obsidian setup

`.obsidian/` is committed, so everything travels with the repo.

- **Graph colour groups** match the galaxy view exactly.
- **`.obsidian/snippets/galaxy.css`** supplies the deep-space theme. If it does not
  appear, enable it under Settings → Appearance → CSS snippets.
- **New notes** default into `wiki/inbox/`, which consolidation empties.
- **Templates** live in `wiki/_templates/` (Settings → Templates).

Optional but recommended: the **Dataview** community plugin, which makes
`depends-on:: [[X]]` queryable in-app. The tools parse typed edges without it.

---

## Working rules

```text
sources/   raw material — read-only, never modified by the agent
wiki/      generated pages — the agent owns these
SCHEMA.md  the law — you own this
```

Two rules worth internalising:

- **Contradictions are assets.** Two sources that disagree mark a precisely located
  gap in your understanding. Never average them into a mushy middle — record both,
  type the edge, open a question.
- **Nothing is deleted.** Superseded notes keep their file and their inbound links and
  gain a forwarding address. The record of what you used to think is what makes a
  change of mind auditable.

### If your sources are private

Keep the repo private, or keep `sources/` local and commit only `wiki/`. Do not push
client files, private PDFs or personal transcripts to a public repo.

---

## Docs

- [`SCHEMA.md`](SCHEMA.md) — the vault constitution
- [`AGENTS.md`](AGENTS.md) — the agent operating manual
- [`docs/GITHUB_SETUP.md`](docs/GITHUB_SETUP.md) — GitHub setup
- [`docs/MIGRATING.md`](docs/MIGRATING.md) — bringing an existing vault into this structure

## PDFs

Some agents read PDFs directly, some do not. If yours struggles, convert to `.md` or
`.txt` first and put the converted file in `sources/`.
