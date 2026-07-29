---
title: Telegram Task and Note Capture Facility
created: 2026-07-13
updated: 2026-07-13
type: workflow
status: active
privacy: personal
---

# Telegram task/note capture

## Task syntax

```text
task: call Paddy back about X | due: 2026-07-14 15:00 | priority: high
```

Natural language is also accepted:

```text
Remind me Thursday afternoon to call Paddy back about X.
```

Ari normalises the message into `00_System/task_inbox.json` using timezone `Australia/Melbourne`.

## Note syntax

```text
note: Paddy prefers email follow-up; apply: Business Context Brain
```

or:

```text
cap note Paddy prefers email follow-up | apply: Business Context Brain
```

## Status values

- `open`
- `done`
- `cancelled`
- `snoozed`

## Reminder rule

A script-only watchdog runs every 15 minutes. It sends a Telegram reminder when an open task is approximately two hours from due, then records the reminder so it does not repeat. If a due time is missing or ambiguous, Ari asks for it rather than inventing one.

## Briefing behaviour

### Morning

- carries forward open tasks from yesterday;
- shows tasks due today or soon;
- shows the top five ongoing priorities;
- separates Jayse-owned actions from Ari-owned actions.

### Evening close

- summarises completed work from the daily log and task ledger;
- shows unfinished tasks from today;
- shows the top five outstanding priorities;
- identifies what needs Jayse input next.

## Safety

- No task is marked complete without evidence or Jayse confirmation.
- Reminders are informational; they do not send emails, create appointments or contact third parties.
- External messages remain approval-gated.
