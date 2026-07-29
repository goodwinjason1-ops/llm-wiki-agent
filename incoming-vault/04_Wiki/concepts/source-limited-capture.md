---
title: Source-Limited Capture
created: 2026-07-29
updated: 2026-07-29
type: concept
tags: [second-brain, evidence, provenance, capture, source-limited]
sources: [03_Sources/reddit/Reddit AI Trading 10 Percent in 9 Days - Source-Limited Review.md, 03_Sources/x/MoonDev X Video Realism Review - 2071013205590331667.md, 03_Sources/Indexes/Source-Limited X Capture Index.md]
confidence: high
---

# Source-Limited Capture

When a source cannot be retrieved, record **what you could not get** rather than reconstructing what it probably said. Mark the note `status: source-limited`, set `confidence: low`, and state the required next step.

## Summary

This is already a convention in this vault — it just was never named, so it could not be reasoned about or enforced. Roughly a dozen notes carry `status: source-limited`, meaning the X post, Reddit thread or video was blocked and the summary is a placeholder built from metadata and a handoff description.

The discipline is valuable precisely because the alternative is so tempting. A blocked source plus a plausible-sounding title is enough for an LLM to write a confident summary of a document it never read. That summary is indistinguishable from a real one six months later.

## What a source-limited note must contain

From the pattern the existing notes already follow:

1. **Source status** — exactly what was and was not retrievable (URL resolved, title, author, body blocked)
2. **An explicit provisional verdict** — "this is a provisional review, not a full assessment"
3. **Only what the accessible fragment supports** — no inference dressed as summary
4. **The required next step** — which backend or method would unblock it

## Key claims

- A blocked source is recorded as a placeholder with `confidence: low`, not reconstructed — source: `03_Sources/x/MoonDev X Video Realism Review - 2071013205590331667.md`
- The note states plainly that it is "a placeholder based only on Jayse's handoff description" and names the required next step — source: `03_Sources/x/MoonDev X Video Realism Review - 2071013205590331667.md`
- Where only metadata resolved, the note lists precisely which fields were available and marks the review provisional — source: `03_Sources/reddit/Reddit AI Trading 10 Percent in 9 Days - Source-Limited Review.md`
- A source-limited note is still useful: it can extract a reusable question set even when the body is unavailable — source: `03_Sources/reddit/Reddit AI Trading 10 Percent in 9 Days - Source-Limited Review.md`

## The failure mode it prevents

Silent reconstruction. An agent given a title and a URL will produce a fluent summary whether or not it read anything. Without a `source-limited` marker there is no signal in the file distinguishing that from real work, and the vault's confidence values become decorative.

This is the same discipline the [[Robot James Method Library - Caps 1 to 9]] applies to paywalled articles — marking rules `unknown/paywalled` instead of inferring them from chart images.

## Debt this creates

Source-limited notes are **debt**, not completed work. They should be periodically re-attempted through a working backend, and either upgraded to a real summary or archived. A vault where source-limited notes accumulate permanently has a broken ingestion path, not a documentation convention.

## Links

- Instance of: [[independent-reproduction]] — same principle applied at capture time rather than at reproduction time
- Feeds: [[claim-intake]]
- Related: [[synthesis-debt]]
- Index: [[Source-Limited X Capture Index]]

## Open questions

- How many source-limited notes are currently outstanding, and how old is the oldest? Worth a gate in `vault_health.py` if the count is rising.
- Which backend actually unblocks X and Reddit reliably? Several notes name this as the required next step and none record it being solved.
