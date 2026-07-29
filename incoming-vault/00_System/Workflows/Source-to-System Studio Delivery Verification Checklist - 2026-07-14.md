---
title: Source-to-System Studio Delivery Verification Checklist - 2026-07-14
created: 2026-07-14
updated: 2026-07-14
type: checklist
status: active
owner: Source-to-System Studio
inspiration: Clore verification loops
related: [[Clore Money-Making Video - Source Reviews - 2026-07-14]]
tags: [quality-assurance, delivery, verification, checklist]
---

# Purpose

Before delivering any website, system, or workflow to client, complete this checklist. Catches bugs and usability issues before client sees them.

# When to Use

## Mandatory
- Website launch (any page going live)
- System handover (Context Brain, quote intelligence, etc.)
- Workflow automation (anything client will use independently)
- Documentation delivery (guides, SOPs, training materials)

## Optional (adapt as needed)
- Internal tool updates (lower stakes)
- Draft deliverables (verification-lite version)

# Pre-Delivery Verification

## 1. Functionality (does it work?)

### Websites
- [ ] All pages load without errors
- [ ] All internal links work
- [ ] External links validated (not broken)
- [ ] Forms submit correctly (test 5 submissions with varied data)
- [ ] Forms handle edge cases (long text, special characters)
- [ ] Contact form routes to correct email
- [ ] Search functionality works (if present)
- [ ] Mobile menu opens/closes properly

### Systems / Workflows
- [ ] Core workflow completes end-to-end (test 3 scenarios)
- [ ] Edge cases handled (empty data, malformed input)
- [ ] Error messages are clear and actionable
- [ ] Data saves correctly (test create, edit, delete)
- [ ] Permissions work (if multi-user)
- [ ] Notifications trigger correctly (if applicable)

## 2. Visual / UX (does it look right?)

### Screenshots required
- [ ] Homepage at desktop (1920x1080)
- [ ] Homepage at mobile (375x667)
- [ ] Key pages at both viewports
- [ ] All forms visible and properly styled

### Review screenshots for:
- [ ] No text overflow or cutoff
- [ ] Images load and display correctly
- [ ] Color contrast sufficient (text readable)
- [ ] Spacing consistent (no cramped sections)
- [ ] Typography hierarchy clear (headings distinct from body)
- [ ] Brand colors consistent with style guide

### Mobile-specific
- [ ] Touch targets large enough (min 44px)
- [ ] No horizontal scroll required
- [ ] Font size readable without zooming
- [ ] Forms usable on mobile (inputs not too small)

## 3. Performance (is it fast?)

### Load testing
- [ ] Page loads in <3 seconds on desktop
- [ ] Page loads in <4 seconds on mobile (3G)
- [ ] Images optimized (no single image >500KB except hero)
- [ ] No render-blocking resources

### Tools to run
- [ ] Google PageSpeed Insights: >70 mobile, >85 desktop
- [ ] No console errors in browser dev tools
- [ ] Network tab: no failed requests

## 4. Accessibility (can everyone use it?)

### Keyboard navigation
- [ ] All interactive elements focusable with Tab
- [ ] Focus states visible (outline or highlight)
- [ ] Can reach all content without mouse
- [ ] Forms submittable with Enter key

### Screen reader basics
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Heading hierarchy logical (H1 → H2 → H3)
- [ ] Error messages announced (if dynamic)

### Content
- [ ] Language is clear (avoid jargon where possible)
- [ ] Sufficient color contrast (WCAG AA)
- [ ] No content conveyed by color alone

## 5. Content Quality (is it professional?)

### Copy review
- [ ] No spelling errors
- [ ] No grammatical errors
- [ ] Tone consistent (professional, friendly)
- [ ] No placeholder text (Lorem ipsum)
- [ ] All CTAs are clear and actionable

### Client-specific
- [ ] Client name spelled correctly
- [ ] Business description accurate
- [ ] Services/offers match reality
- [ ] Contact information correct (phone, email, address)
- [ ] Testimonials approved by client (if used)

## 6. Compliance and Legal (is it safe?)

### Privacy
- [ ] Privacy policy present (if collecting data)
- [ ] Cookie consent (if EU traffic expected)
- [ ] Data collection minimal (only what's needed)

### Copyright
- [ ] All images licensed or original
- [ ] No unlicensed fonts
- [ ] Client owns all content (verify in agreement)

### Claims
- [ ] No guaranteed results (ROI, traffic, rankings)
- [ ] Case studies factual and approved
- [ ] Testimonials are real (not fabricated)

## 7. Handover Preparation (can they use it?)

### Documentation
- [ ] User guide created (if complex system)
- [ ] Admin instructions clear (if they'll update content)
- [ ] Troubleshooting section (common issues)
- [ ] Contact information for support

### Training (if system)
- [ ] Brief walkthrough video created (<10 min)
- [ ] Key tasks demonstrated
- [ ] Common workflows covered

### Access
- [ ] Client has login credentials
- [ ] Client has admin access (or clear permission levels)
- [ ] Backup/restore process documented
- [ ] Client owns hosting/domain (verify in agreement)

# Delivery Process

## Step 1: Self-verification
Complete this checklist yourself. Fix any issues found.

## Step 2: Screenshot evidence
Take screenshots of:
- Homepage (desktop + mobile)
- Key pages (desktop + mobile)
- Forms (filled and empty states)
- Any dynamic content (dashboards, workflows)

Save to project folder as `verification/verification-evidence-YYYY-MM-DD/`

## Step 3: Client preview
Send to client with note:
```
Here's [deliverable] for your review.

Key changes:
- [List 3-5 main things you built/changed]

To test, please:
1. [Specific action 1]
2. [Specific action 2]
3. [Specific action 3]

Screencast walkthrough: [video link]

Let me know if anything isn't working as expected or if you'd like changes.
```

## Step 4: Feedback incorporation
- Log all feedback in project tracker
- Prioritize bugs over enhancements
- Fix critical issues within 24 hours
- Schedule enhancements for next sprint

## Step 5: Final sign-off
Client confirms deliverable is accepted. Document in project log.

# Common Issues and Fixes

## Forms not submitting
- Check action attribute
- Verify server endpoint (if custom backend)
- Test with browser dev tools (Network tab)

## Images not loading
- Check file paths
- Verify image format (JPG/PNG/WebP)
- Test on multiple browsers

## Mobile layout broken
- Test viewport meta tag present
- Check CSS media queries
- Use browser dev tools device mode

## Slow loading
- Optimize images (compress)
- Enable browser caching
- Minify CSS/JS
- Consider CDN

## Accessibility issues
- Use Lighthouse accessibility audit
- Test with keyboard only
- Check color contrast with tools

# Quality Gates

## Before delivery
All sections marked complete in this checklist. Any incomplete items documented with plan to fix.

## During delivery
Client receives:
- Working deliverable
- Screenshot evidence
- Instructions for testing
- Support contact information

## After delivery
Client confirms within 7 days that deliverable is accepted. If issues found, fix within 48 hours (critical) or next sprint (enhancements).

# Anti-patterns

## "It works on my machine"
Test on:
- Chrome, Firefox, Safari (latest versions)
- Desktop and mobile
- Slow network (throttle to 3G in dev tools)

## "They'll figure it out"
Assume client has minimal technical skill. Provide clear, simple instructions.

## "We'll fix it later"
Fix before delivery unless:
- Truly trivial (cosmetic only)
- Client explicitly says "ship now, fix later"
- Documented as "known issue" with timeline

# Success Metrics

**Verification quality:**
- Client reports <3 bugs in first week after delivery
- Zero critical bugs (system broken, data lost)
- Support tickets decrease over time (client becomes self-sufficient)

**Client satisfaction:**
- Client uses what we built (not just "looks nice, sits unused")
- Client provides testimonial or referral
- Client asks for phase 2 (expansion)

# NOT Doing
- Automated testing suite (overkill for our scale)
- Third-party QA service (we verify ourselves)
- Perfect on first try (iterate based on feedback)

# Decision

Use this checklist for all client deliveries starting with website launch. Complete before sending to client. Track bugs reported post-delivery to verify checklist effectiveness.

**Next step:** Run through checklist for Source-to-System Studio website before showing to first pilot client.
