# Source-to-System Studio Website Implementation Plan

> **For agentic workers:** implement this plan task-by-task with a fresh verification after each task.

**Goal:** Build a polished, accessible, multi-page static prototype for Source-to-System Studio that explains the approved offers and captures qualified enquiries without external integrations.

**Architecture:** Plain HTML, CSS and vanilla JavaScript served as a static site. Shared navigation/footer styles live in one stylesheet; each page owns its semantic content. The contact form is intentionally non-submitting until a real business email/form endpoint is approved.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Python `http.server` for local verification.

## Global Constraints

- Public brand: `Source-to-System Studio`.
- `Source2Systems` may be a URL/handle only.
- No client claims for the financial planner or doors/windows supplier.
- No ranking, traffic, revenue or automation guarantees.
- No secrets, credentials or third-party integrations.
- Mobile-first and WCAG-oriented.

---

### Task 1: Static shell and shared styling

**Files:**
- Create: `C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/Source-to-System Studio Website/site/index.html`
- Create: `C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/Source-to-System Studio Website/site/styles.css`
- Create: `C:/Users/Kidsg/Documents/AI Second Brain/05_Projects/Source-to-System Studio Website/site/script.js`

- [ ] Create semantic header/nav, skip link, main and footer.
- [ ] Add responsive layout and approved graphite/off-white/teal visual tokens.
- [ ] Add mobile navigation toggle with keyboard-accessible button.
- [ ] Verify no horizontal overflow at 320px.

### Task 2: Core pages

**Files:**
- Create: `site/offers.html`
- Create: `site/how-it-works.html`
- Create: `site/proof.html`
- Create: `site/contact.html`

- [ ] Reuse the shared shell and navigation.
- [ ] Add real approved offer copy, pilot-safe proof examples and privacy/access boundaries.
- [ ] Add contact form with labels, required fields and non-submitting prototype behaviour.

### Task 3: Verification

- [ ] Run `python -m http.server 4173 --directory site`.
- [ ] Load each page and check HTTP 200.
- [ ] Check internal links and page titles with a Python script.
- [ ] Check JavaScript syntax with `node --check site/script.js` when Node is available.
- [ ] Inspect the prototype in a browser at desktop and mobile widths.

### Task 4: Pilot notes

**Files:**
- Create: `PILOT-CANDIDATES.md`

- [ ] Record the independent financial planner and wholesale doors/windows business as private pilot candidates.
- [ ] Define what evidence each pilot could generate.
- [ ] Explicitly mark both as unconfirmed and not public proof.
