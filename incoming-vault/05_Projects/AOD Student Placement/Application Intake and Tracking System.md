---
title: Application Intake and Tracking System
created: 2026-07-10
updated: 2026-07-10
type: workflow
status: active
privacy: personal
tags: [aod, mental-health, applications, placement, jobs, intake, tracking]
---

# Application Intake and Tracking System

## Purpose

A single workflow for ingesting and tracking all application material Jayse sends through Ari/Hermes, ChatGPT, email, screenshots, PDFs, DOCX files, and job ads.

This covers **two streams**:

1. **Placement applications/enquiries** — Chisholm Diploma of Mental Health 160-hour placement.
2. **Paid/part-time/casual role applications** — AOD/MH sector roles Jayse can apply for now.

## Folder structure

```text
05_Projects/AOD Student Placement/
├─ Application Materials/          # master resume/cover-letter/profile/source docs
├─ Application Packages/           # one folder/note per specific role or placement enquiry
├─ Position Descriptions/          # extracted PDs/job ads
├─ Tailored Applications/          # tailored resume/cover-letter drafts
├─ Contact Touches/                # pre-application and follow-up email/call logs
├─ Finder Runs/                    # daily/weekly finder outputs
└─ Follow Ups/                     # follow-up reminders and email/calendar notes
```

## Intake rule

Whenever Jayse sends any of these:

- resume
- cover letter
- ChatGPT-drafted cover letter
- position description
- job ad screenshot
- job ad link
- selection criteria
- employer reply email
- placement coordinator reply
- application confirmation
- ChatGPT shared project / shared chat link
- pre-application email Jayse sends manually
- introduction email to a listed contact
- role clarification question / reply

Ari should create or update an **Application Package** note.

If the material is an email/call around an application rather than the formal application itself, Ari should also create or update a **Contact Touch** note using `00_System/Templates/AOD Contact Touch Email Log.md`.

## Application package naming

Use this format:

```text
Application Packages/YYYY-MM-DD - Organisation - Role or Placement.md
```

Examples:

```text
Application Packages/2026-07-10 - cohealth - Harm Reduction Worker.md
Application Packages/2026-07-10 - Odyssey Victoria - Student Placement Enquiry.md
Application Packages/2026-07-10 - EACH - AOD Trainee.md
```

## Package status values

Use one of:

- `lead-found`
- `materials-received`
- `needs-pd`
- `needs-tailoring`
- `draft-ready`
- `awaiting-jayse-approval`
- `sent`
- `applied`
- `follow-up-due`
- `interview`
- `awaiting-response`
- `closed-unsuccessful`
- `closed-withdrawn`
- `closed-not-fit`
- `placement-secured`

## Required fields per package

Each application package should capture:

- stream: `placement` or `paid-role`
- organisation
- role/enquiry title
- suburb/location/remote
- link/source
- deadline
- contact person/email/phone if known
- role type
- fit score
- placement relevance
- Chisholm fit-test
- blockers/checks
- documents received
- documents drafted
- Jayse approval status
- sent/applied date
- follow-up date
- dashboard status
- next action

## Ingestion workflow

1. **Extract source text**
   - DOCX/PDF → extract text before summarising.
   - Screenshot/photo → OCR/vision extract visible text.
   - Job link → capture URL, role title, employer, deadline and criteria.

2. **Preserve source**
   - Put uploaded originals in `Application Materials/` or the relevant package folder.
   - Do not overwrite source material.

3. **Create package note**
   - Use `00_System/Templates/AOD Application Package.md`.

4. **Run fit-test**
   - Placement stream: test against Chisholm 160-hour requirements.
   - Paid-role stream: test role realism, checks, qualification blockers, commute and availability.

5. **Tailor material**
   - Use source facts only from:
     - [[AOD MH Master Profile]]
     - [[Jayse Resume - Source]]
     - [[Jayse Cover Letter - Source - cohealth Harm Reduction Worker]]
     - role/PD text.
   - Do not invent casework, clinical placement hours, completed diploma, or checks.

6. **Approval gate**
   - Move to `awaiting-jayse-approval` before any send/apply action.
   - Jayse must approve exact recipient, subject, body and attachments.

7. **After sent/applied**
   - Update package note.
   - Update [[AOD Placement Job Finder Dashboard]].
   - Add calendar follow-up once Google Calendar is connected and Jayse approves.

8. **External source ingestion**
   - For ChatGPT share/project links, save a source note with the URL, access result, extracted role/placement leads, document references, and any limitations.
   - Treat ChatGPT-generated material as draft source until verified against live listings and Jayse's confirmed profile.

## Follow-up defaults

- Placement enquiry: follow up after **5 business days** if no reply.
- Paid role application: follow up after **7 calendar days**, unless ad says no contact.
- Interview/info session: create calendar event immediately after Jayse approves.
- Closing date: reminder **3 days before** and **morning of due date**, if not yet submitted.

## Contact-touch workflow

Use this when Jayse sends, receives, drafts, screenshots, or forwards an email related to a role or placement enquiry.

Examples:

- Jayse emails a named contact before applying.
- Jayse asks about roster, outreach/in-house split, checks, placement suitability, supervision, or role expectations.
- A hiring manager/placement coordinator replies.
- Jayse wants a record that the organisation has seen his name before the formal application.

Steps:

1. Identify the linked Application Package or create one if it does not exist.
2. Create a Contact Touch note under `Contact Touches/` using `AOD Contact Touch Email Log.md`.
3. Paste/extract the exact outbound email or reply where available.
4. Capture questions asked, attachments sent, reply/outcome, and follow-up date.
5. Update the Application Package and [[Application Register]].
6. If Gmail/Calendar is connected, Ari may read the thread or create a follow-up reminder only under the active approval guardrails.

## No-auto-apply rule

Ari may prepare everything, but Jayse approves before:

- sending any email;
- submitting any application;
- attaching resume/cover letter;
- disclosing lived experience;
- creating/changing calendar items, unless Jayse explicitly asks “add this to calendar”.

## ChatGPT collaboration rule

If Jayse provides ChatGPT-generated drafts:

1. Treat them as **draft source**, not final truth.
2. Extract usable phrasing and role-specific angles.
3. Check every factual claim against Jayse's confirmed profile/resume.
4. Keep a record of what came from ChatGPT vs what Ari verified.
5. Do not preserve hallucinated claims.

## Related

- [[AOD Placement and Sector Job Finder Agent]]
- [[AOD Placement Job Finder Dashboard]]
- [[AOD MH Master Profile]]
- [[Gmail Calendar Automation Guardrails - AOD Placement and Roles]]
- [[ChatGPT Project Source - Application Review and Job Search - 2026-07-10]]
