---
title: Gmail Calendar Automation Guardrails - AOD Placement and Roles
created: 2026-07-10
updated: 2026-07-10
type: automation-guardrails
status: setup-pending
privacy: personal
tags: [gmail, google-calendar, aod, mental-health, placement, jobs, automation]
---

# Gmail Calendar Automation Guardrails - AOD Placement and Roles

## Connection status

- Google Workspace access is **not yet authenticated**.
- Required service scope: **Gmail + Google Calendar** only.
- Hermes Google Workspace setup check returned: `NOT_AUTHENTICATED`.

## Intended automation scope

Jayse approved this setup direction:

1. Email read access for placement/job-finder context.
2. Draft/send emails **with Jayse approval before every outbound send**.
3. Calendar create/update for follow-ups and deadlines.
4. Keep the **no auto-apply** rule active.
5. Ari updates the AOD Placement Dashboard after applications/enquiries.
6. Include both:
   - student placement enquiries; and
   - actual paid/part-time/casual AOD/MH role applications.

## Email rules

Ari may:

- search/read relevant Gmail threads about AOD/MH placement, jobs, interviews, follow-ups and application responses;
- draft placement enquiry emails;
- draft job application emails;
- draft follow-up emails;
- suggest labels/status updates;
- update Obsidian dashboards based on replies.

Ari must not:

- send an email without Jayse approving the exact recipient, subject and body;
- apply for a role automatically;
- attach documents without approval;
- disclose lived experience where it is not appropriate or not approved for that specific application;
- claim completed Diploma of Mental Health, Police Check, NDIS Screening, paid AOD casework, or placement hours unless confirmed.

## Calendar rules

Ari may create/update calendar events for:

- application deadlines;
- follow-up reminders;
- interviews;
- placement info sessions;
- document/check due dates.

Ari must confirm with Jayse before creating or changing calendar events unless Jayse has given a specific instruction such as “add this to my calendar”.

## Application streams

### Stream A — Student placement

Purpose: find 160-hour Chisholm Diploma of Mental Health placement that satisfies placement evidence requirements.

High-priority settings:

- AOD case management
- withdrawal/residential withdrawal
- residential rehabilitation
- dual diagnosis
- psychosocial recovery support
- community mental health with AOD complexity
- homelessness + AOD/MH
- justice/forensic AOD pathways

### Stream B — Paid roles

Purpose: find realistic paid part-time/casual roles Jayse can apply for now, including roles that might support placement if Chisholm approves.

Role families:

- Mental Health Support Worker
- Psychosocial Recovery Coach / Recovery Support Worker
- AOD Support Worker
- Residential Withdrawal Worker
- Residential Rehabilitation Support Worker
- AOD Case Worker / Care and Recovery Worker
- Dual Diagnosis Support Worker
- Harm Reduction / NSP / Outreach Worker
- Youth AOD Worker
- Homelessness + AOD/MH Support Worker
- Forensic/justice AOD support roles

## Setup needed

Google Workspace OAuth setup requires Jayse to create/download a Google Cloud OAuth Desktop client JSON, then provide Ari the local file path.

Requested service scopes when generating auth URL: `email,calendar`.
