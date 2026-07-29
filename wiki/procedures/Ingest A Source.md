---
title: Ingest A Source
type: procedure
tier: procedural
status: active
confidence: 0.75
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
tags: [knowledge/operations, meta/vault]
aliases: [Ingest, Ingestion procedure]
---

# Ingest A Source

> Turn one raw file into edits across 10–15 pages. If it produced one page, it was
> filed, not ingested.

## Preconditions

- The file is in `sources/` and is readable as text. Convert PDFs first if the agent
  cannot read them directly.
- `python3 tools/lint_vault.py --json` has been run, so the current shape of the
  vault is known and duplicates can be avoided.

## Steps

1. **Read the whole thing.** Not the first page. The pattern in the final section is
   the one you will otherwise never connect.
2. **Write the literature page.** `wiki/literature/<Title>.md`, `tier: episodic`.
   Record what it says, what it is for, its argument, and its weaknesses. The
   weaknesses section is not optional — a literature page without one is a summary.
3. **Extract durable claims.** For each, check whether a concept or entity page
   already exists.
   - Exists → update it. Add the claim and the source, bump `updated`/`reviewed`. If
     the source corroborates an existing claim, raise `confidence` and consider
     promoting the tier.
   - Does not → create it, but only if it will be referenced from elsewhere. A
     concept page with one inbound link and no outbound links is noise.
4. **Add typed links in both directions.** A one-way edge is half an edge.
5. **Hunt for connections.** What does this touch that is not yet linked? Does
   anything here contradict something already believed? Is anything
   [[Cross-Domain Analogy|analogous]] to a cluster in an unrelated domain?
6. **Update the MOCs** the new pages belong to, and `wiki/index.md`.
7. **Lint and rebuild.** `python3 tools/lint_vault.py` then
   `python3 tools/build_graph.py`.

## Failure modes

| Symptom | What went wrong |
|---|---|
| One new page, nothing else touched | Summarised instead of integrating |
| New page duplicates an existing one | Skipped step 1's lint check |
| All claims at confidence 0.9 | Confidence used as enthusiasm, not evidence |
| No contradictions ever found | Not actually comparing against existing beliefs |
| Orphan count rising after each ingest | Step 4 being skipped |

## Definition of done

Lint is clean, every new claim carries a source or an inference marker, and you can
name at least one connection the human had not made.

## Links
- part-of:: [[Second Brain Operations]]
- uses:: [[Provenance Chain]]
- uses:: [[Typed Knowledge Graph]]
- supports:: [[Compounding Knowledge]]
