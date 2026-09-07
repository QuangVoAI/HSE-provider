# Pre-launch QA — 2026-09-07

## Follow-up fixes

- QA-02: Fixed HTML pattern escaping and country-code spacing. Browser regression on both forms rejects abc/0123 and accepts domestic, +84 and 0084 formats.
- QA-04: API now rejects invalid field types, null/array bodies, impossible dates and invalid HH:mm times with 400. Calendar comparison uses Vietnam timezone. Regression cases passed; a valid leap date/time passed validation and stopped at missing MongoDB configuration (503).
- QA-05 autoplay: paused while lightbox is open in shared TrainingExperience and Health. Opening hint no longer bubbles to next-slide action. Modal focus improvements remain outside this change.
- QA-06: User explicitly accepts retaining placeholder footer controls; no longer a release blocker for the agreed scope.

Original findings below retained as audit history; the follow-up statuses above supersede them where indicated.

## Decision: NOT READY for production sign-off

Checked the current iCloud checkout and localhost:3000. Production build passes. Browser checks used the Codex in-app browser at desktop 1280px and mobile 390px; these do not constitute testing on physical iOS/Android or Chrome, Edge, Firefox and Safari separately. No business data was written: MongoDB is unconfigured; test API requests stopped at validation/configuration errors. Application source was not changed during this audit.

## Coverage and results

- 14 routes: /, /csms, /customers, /contact, /training-management, /risk-management, /safety-observation, /health-management, /equipment-management, /environmental-management, /contractor-management, /safety-culture, /legal-compliance, /chemical-management.
- All 14 returned HTTP 200 for English URLs. Vietnamese routes rendered at 1280px and 390px, with one h1 each and no document horizontal overflow or viewport clipping in checked headings/inputs/textareas. English routes also rendered at 390px. This is a geometry smoke test, not an exhaustive visual review of every section and carousel state.
- 94 unique /assets/ paths collected from English rendered HTML exist locally. No completed broken images detected in initial route snapshots. Lazy/background assets and every slide were not exhaustively verified.
- robots.txt and sitemap.xml return 200; nonexistent route returns 404.
- Training lightbox opens; next button changes image; Escape closes. Mobile screenshot visually checked. Autoplay defect below reproduced.
- Shared mobile menu opens/closes on Chemical page. Contact page scroll-to-top returns scrollY to zero and hides button.
- Contact mobile form/map screenshot checked. Both forms accept invalid telephone values at browser constraint-validation level: defect below.
- npm run build: passed including TypeScript and 19 generated routes/pages.
- npm run lint: no result after more than five minutes; terminated only audit-started processes. Status inconclusive.

## Defects / release blockers

### QA-01 — P1: Lead submission unavailable in current environment

Valid domestic and international telephone requests return 503 BACKEND_NOT_CONFIGURED. MONGODB_URI, SMTP_USER, SMTP_PASS, GOOGLE_SHEET_ID and GOOGLE_SERVICE_ACCOUNT_JSON are empty. Must configure deployment secrets and verify a designated test lead through database insertion, both email deliveries, Sheets append and integration-status update before signing off the lead workflow. Local results do not establish production configuration.

### QA-02 — P1: Frontend telephone pattern is invalid

Source: lib/lead-validation.ts:1. The HTML pattern contains `[ .-]`; compiling under the modern HTML pattern `v` flag throws Invalid character in character class. In both CSMS and Contact forms, filling `abc` gives validity.valid=true. Empty telephone remains invalid via required. Backend correctly returns 400 for abc, but form displays a generic send failure instead of a field error.

Escape the hyphen for HTML pattern syntax, then verify actual browser validity. Also align formatting with backend: advertised `+84 917 267 397` and `0084 917 267 397` contain a space after country code, which current pattern does not allow even once compiled. Regex validates formatting, not ownership or whether a number is allocated.

### QA-03 — P1 for SEO: Canonical points all pages to homepage

All 14 Vietnamese route snapshots contained canonical http://localhost:3000/. Source: app/layout.tsx:14. Set route-appropriate canonical/language alternates and production site URL. Current sitemap/robots also advertise localhost. Do not submit this sitemap to Google.

### QA-04 — P2: Invalid API field types/date/time pass validation

POST /api/leads with otherwise valid name/email/phone/message:

| Payload variation | Actual | Expected |
| --- | --- | --- |
| phone empty | 400 | 400 |
| phone abc | 400 | 400 |
| phone 0917267397 | 503 configuration error | Pass validation; integration pending |
| phone +84 917 267 397 | 503 configuration error | Pass validation; integration pending |
| preferredDate 2027-02-31 | 503 configuration error | 400 invalid calendar date |
| preferredTime 99:99 | 503 configuration error | 400 invalid time |
| name object {x:1} | 503 configuration error | 400 invalid field type |
| body null | 500 | 400 invalid body |

JavaScript Date normalizes impossible dates. Validate calendar components and types explicitly; time is currently unchecked. Date comparison also uses runtime timezone and requires a consistent business timezone.

### QA-05 — P2: Lightbox changes image while user is reading

On /training-management?lang=vi, open full-size preview and leave untouched: image changes from course-matrix/course-list to results-report. Source: app/training-management/training-experience.tsx:18-24 interval continues every four seconds regardless of modal state. Pause autoplay while open. Shared component consumers inherit this behavior. Keyboard focus stays on underlying opener immediately after opening: modal focus handling also requires verification/fix.

### QA-06 — P2: Footer destinations are placeholders

Social links point to #top; Blog & News points to homepage/#top. Terms and Privacy are plain text, not destinations. Supply approved pages/links or remove misleading clickable items before handoff. Do not infer that these pages exist.

### QA-07 — P2: English metadata/content requires completion

Static metadata does not vary by language. Initial HTML for English pages retains html lang=vi, later changed by client script. Health initially renders Vietnamese heading on English URL before client locale initialization. Shared preview labels and scroll-to-top accessible label remain Vietnamese in English context. Verify server-rendered localized metadata and completed UI language before SEO/accessibility sign-off.

## Additional checks

Rate-limit test: same test IP, six invalid submissions => 400,400,400,400,400,429. This confirms only current single-process behavior. Source uses in-memory Map and forwarded-IP headers; distributed/restart behavior not proven.

## Still pending before final sign-off

- Live MongoDB/SMTP/Sheets success, duplicate matching across 0/+84 formats, integration failures/retry behavior, and clean-up of designated test data.
- Production DNS/HTTPS, redirects, real domain sitemap, Analytics events and Search Console verification. GA/Search Console identifiers currently empty.
- Separate Chrome, Edge, Firefox, Safari and physical Android/iOS tests; keyboard-only and focus-trap regression across all dialogs; every slider image and menu transition.
- Production performance/Core Web Vitals and accessibility audit; no Lighthouse score is claimed from this local run.
- Rerun lint to completion and retest fixes. Build success alone does not close these findings.

Suggested order: fix QA-02/04/05, configure QA-01/03, finish agreed footer/language content, then repeat production end-to-end and browser checks. This report records findings, not a go-live approval.
