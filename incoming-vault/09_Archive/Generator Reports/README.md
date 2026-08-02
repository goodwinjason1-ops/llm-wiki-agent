---
title: Archived Generator Reports
created: 2026-08-02
updated: 2026-08-02
type: system
tags: [archive, vault-health, automation]
confidence: high
---

# Archived Generator Reports

43 files, archived 2026-08-02: 22 `Inbox Processor Report` and 21 `Vault Loop
Report`, covering 2026-07-08 to 2026-07-29.

Consecutive entries in each series were **100% identical**. That was not a
reporting bug in the ordinary sense — the reports were accurate. The inbox held
the same four notes for three weeks (three of them empty), so there was nothing
different to say, and neither script asked whether anything had changed before
writing a new dated file.

Three defects produced them, all now fixed in the scripts:

1. No change detection — both wrote unconditionally on every run.
2. The inbox report rendered rows in file-mtime order, so any sync reshuffled
   the table and made an unchanged report look changed.
3. `refresh_handoff` embedded the date in its own marker, so it never matched
   yesterday's line and the handoff grew by one line per day, reaching 154.

Underneath all three: `vault_loop_runner.py` calls `inbox_processor.py` without
`--apply`, and `--apply` only appends a comment block anyway. **The inbox could
not drain, because nothing in the loop was permitted to drain it.**

Archived rather than deleted. As a set they are the evidence for that finding,
and the vault does not destroy notes. Individually they carry no information.

## Links

- [[synthesis-debt]]
- [[Second Brain Self-Improvement Loop]]
- [[Decisions Needed - 2026-07-29]]
