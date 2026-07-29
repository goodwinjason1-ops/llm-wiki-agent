---
title: Obsidian
type: entity
tier: semantic
status: active
confidence: 0.85
created: 2026-07-29
updated: 2026-07-29
reviewed: 2026-07-29
tags: [tools/knowledge, tools/markdown]
aliases: [Obsidian.md, Obsidian vault]
---

# Obsidian

> The markdown editor this vault is read in — chosen because it adds structure
> without taking custody of the files.

## Summary

Obsidian reads a plain folder of markdown files. That property is what makes it
compatible with the [[LLM Wiki]] pattern: the same files an agent writes with
ordinary file tools are the files the human browses, and neither side needs an
export step or an API.

## Key claims

- Operates directly on a folder of plain markdown files with no proprietary database in the read path ^conf:0.9 — first-hand
- Wikilink syntax `[[Note]]` is resolved by filename, which is why SCHEMA.md requires title and filename to match ^conf:0.9 — first-hand
- YAML frontmatter is surfaced natively as note properties ^conf:0.85 — first-hand
- Dataview inline fields (`key:: value`) are readable as prose, queryable in-app, and parseable externally, which is why they were chosen to carry typed edges ^conf:0.8 — first-hand; the in-app query half requires the community Dataview plugin

## Configuration in this vault

`.obsidian/` is committed, so the graph colour groups, the galaxy CSS snippet and
the folder conventions travel with the repo instead of living on one machine.

- Graph colour groups match `tools/galaxy/template.html` exactly.
- `.obsidian/snippets/galaxy.css` supplies the deep-space theme.
- New notes default into `wiki/inbox/`, which the consolidation pass empties.

## Links
- uses:: [[Typed Knowledge Graph]]
- part-of:: [[Second Brain Operations]]

## Open questions
- Should Dataview be listed as a hard dependency? Typed edges parse externally without it, but are not queryable in-app without it.
