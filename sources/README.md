# sources/ — raw material

Put PDFs, transcripts, notes, articles, exports and markdown files here.

**This folder is read-only to the agent.** It is never modified or deleted during
normal operation — see `SCHEMA.md` §10.

Everything in `wiki/` is derived from what is here, and every claim in a wiki page
should be traceable back to a file in this folder or be explicitly marked as an
inference. That traceability is the whole reason this folder exists.

## Tips

- If your agent cannot read PDFs, convert to `.md` or `.txt` first and put the
  converted file here.
- Keep original filenames. They are the citation key used throughout the wiki.
- Private material: put it in `sources/private/`, which is gitignored, or keep the
  whole repo private.

## After adding files

```text
Read SCHEMA.md and AGENTS.md. Ingest all files in sources/ and update wiki/.
```
