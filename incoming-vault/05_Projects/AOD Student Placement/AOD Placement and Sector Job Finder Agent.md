---
title: AOD Placement and Sector Job Finder Agent
created: 2026-07-10
updated: 2026-07-10
type: agent-workflow
status: active
tags: [aod, mental-health, student-placement, job-hunter, career-agent, melbourne]
sources:
  - [[AI Job Hunter Workflow - Personal Career Agent]]
  - [[AOD Student Placement Checks and Melbourne Contacts - 2026-07-10]]
  - [[Chisholm Diploma of Mental Health Placement Requirements - Extracted]]
  - [[Role Categories to Capture for AOD MH Placement Finder]]
  - [[Gmail Calendar Automation Guardrails - AOD Placement and Roles]]
  - [[Application Intake and Tracking System]]
  - [[ChatGPT Project Source - Application Review and Job Search - 2026-07-10]]
confidence: high
---

# AOD Placement and Sector Job Finder Agent

## Mission

Find and triage opportunities that help Jayse secure:

1. **student placement** in AOD / withdrawal / residential rehab / case management / dual diagnosis;
2. **paid part-time roles** that may meet or support student-placement subject requirements;
3. **entry-path AOD / mental health roles** worth applying for even if not a formal placement.

## Guardrails

- No automatic applications.
- No fabricated qualifications, experience, checks, references, licences, or availability.
- Draft application material only; Jayse reviews before sending.
- Prefer roles that are realistic for a student/entry-path candidate.
- Flag hard blockers clearly: required registration, degree, AHPRA, full licence, lived-experience-only requirement, minimum years of experience, mandatory checks.
- For placement roles, always identify whether the application must go through Jayse's university/TAFE placement coordinator.
- For NDIS-related roles, do not tell Jayse to apply for NDIS Worker Screening until the host provides Employer ID / Provider ID.
- Prioritise opportunities that can satisfy Chisholm Diploma of Mental Health placement evidence: 160 hours, direct work with people with mental illness, recovery planning/goals, care-network collaboration, complexity issues, and WHS/risk assessment tasks.
- Email/calendar automation is allowed only under [[Gmail Calendar Automation Guardrails - AOD Placement and Roles]]: read/search relevant Gmail threads, draft emails, and create/update follow-up calendar items only with Jayse approval; never auto-apply or auto-send.
- Every role, placement enquiry, PD, cover letter, ChatGPT draft, resume variant, application confirmation, or employer reply should be captured through [[Application Intake and Tracking System]] and linked to an Application Package.
- Pre-application contact emails, clarification emails, manual sent emails, and replies should be captured as Contact Touch notes under `Contact Touches/` using `00_System/Templates/AOD Contact Touch Email Log.md`, then linked back to the relevant Application Package.
- ChatGPT share/project sources should be treated as draft/research inputs. Verify live job listings, deadlines and factual claims before submitting any application.

## Search scope

### Placement-first queries

- `AOD student placement Melbourne`
- `alcohol and other drugs student placement Melbourne`
- `counselling student placement AOD Melbourne`
- `social work student placement AOD Melbourne`
- `dual diagnosis student placement Melbourne`
- `withdrawal rehabilitation student placement Victoria AOD`
- `site:odyssey.org.au student placement AOD`
- `site:turningpoint.org.au internship AOD student`
- `site:sharc.org.au student placement AOD`
- `site:cohealth.org.au student placements AOD`
- `site:each.com.au students AOD placement`

### Paid part-time / entry-path queries

- `AOD support worker part time Melbourne`
- `AOD peer worker part time Melbourne`
- `AOD residential withdrawal support worker part time Melbourne`
- `mental health support worker AOD part time Melbourne`
- `dual diagnosis support worker part time Melbourne`
- `case worker AOD part time Melbourne`
- `youth AOD worker part time Melbourne`
- `lived experience mental health AOD worker Melbourne`
- `community support worker alcohol drug Melbourne part time`
- `psychosocial recovery coach part time Melbourne`
- `psychosocial recovery support worker Melbourne`
- `mental health support worker casual Melbourne diploma mental health`
- `care and recovery worker AOD Melbourne`
- `residential withdrawal worker AOD Melbourne`
- `dual diagnosis support worker Melbourne`
- `forensic AOD worker entry level Melbourne`
- `homelessness AOD mental health support worker Melbourne`
- `needle syringe program worker Melbourne`

### Boards/sites to monitor

- EthicalJobs
- SEEK
- Indeed
- LinkedIn Jobs if available/searchable
- organisation career pages: Odyssey, Turning Point/Eastern Health, SHARC, cohealth, EACH, Uniting/ReGen, Windana, YSAS, First Step, Better Health Network, Monash Health/SECADA, Eastern Health, St Vincent's/Nexus, VAADA

## Fit scoring

| Score | Meaning |
|---:|---|
| 5 | Strong match: AOD/mental health placement or entry role; realistic checks; clear application path |
| 4 | Good match: AOD/mental health role with minor gaps or requires coordinator contact |
| 3 | Possible: adjacent role, needs qualification/check clarification |
| 2 | Low fit: too senior, full-time only, wrong location, unclear placement relevance |
| 1 | Reject: credential mismatch, unsafe/scammy, impossible commute, auto-apply trap |

## Candidate fields

Each candidate should be captured with:

- title
- organisation
- link
- location/suburb
- role type: placement / paid part-time / casual / volunteer / internship / adjacent
- sector: AOD / mental health / dual diagnosis / youth / disability / community health
- fit score
- why it fits
- blockers / checks
- application route
- deadline if found
- next action
- tailoring notes for resume/cover letter

## Resume and cover-letter workflow

Resume status: received and extracted into `Application Materials/Jayse Resume - Source.md`; original DOCX copied to `Application Materials/Jason_Goodwin_Resume_AOD_Harm_Reduction.docx`; master profile created at `Application Materials/AOD MH Master Profile.md`. Cover-letter status: received/extracted into `Application Materials/Jayse Cover Letter - Source - cohealth Harm Reduction Worker.md`. Placement requirements status: extracted into `Chisholm Diploma of Mental Health Placement Requirements - Extracted.md`.

Jayse may provide additional resumes, cover letters, position descriptions, ChatGPT-tailored drafts, application confirmations, or employer replies. Once provided:

1. Extract text from DOCX/PDF/images/screenshots before summarising.
2. Preserve originals under `Application Materials/` or the relevant `Application Packages/` folder.
3. Create/update an Application Package using `00_System/Templates/AOD Application Package.md`.
4. If a PD/job ad is included, create/update a PD extraction using `00_System/Templates/AOD PD Extraction.md`.
5. Track whether the opportunity is a placement stream item or paid-role stream item.
6. For each role, draft:
   - 3–5 tailored resume bullet suggestions,
   - a short cover-letter angle,
   - key selection criteria notes if listed,
   - missing evidence/questions for Jayse.
7. Never claim experience/checks not present in the source resume/cover letter or confirmed by Jayse.
8. Move any outbound email/application to `awaiting-jayse-approval` before sending/submitting.

## Daily output format

```markdown
## AOD / Mental Health Finder — YYYY-MM-DD

### Top matches
| Rank | Role | Org | Type | Suburb | Fit | Action |
|---:|---|---|---|---|---:|---|

### Placement leads
...

### Paid/part-time leads
...

### Drafting queue
- [ ] Role — what resume/cover-letter tailoring is needed

### Application package updates
- [ ] Package — status / next action / follow-up date

### Jayse decisions needed
- [ ] Provide resume/cover letter
- [ ] Confirm course/provider and placement rules
- [ ] Confirm suburbs/commute and availability
```

## Related

- [[Job Hunter Dashboard]]
- [[AOD Student Placement Checks and Melbourne Contacts - 2026-07-10]]
- [[AOD Placement Job Finder Dashboard]]
