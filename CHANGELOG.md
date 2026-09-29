# Change log

This document describes the complete implementation currently on `main`. The project is an independent recreation built from public browser references; it is not the original Figmenta production repository.

## 1. Project foundation

- Created a React 19, TypeScript, and Vite application.
- Added ESLint, Vitest, Testing Library, and jsdom configuration.
- Added a Vercel rewrite configuration so locale and division routes resolve through the single-page application.
- Added local preview routing for Corporate, Studio, Live, Productions, Media, and Careers.
- Added English and Italian document-language and title handling.
- Added responsive desktop and mobile layouts.

## 2. Shared site and locale architecture

- Added `Division` and `Locale` types.
- Added a shared list of supported sites and divisions.
- Added `pageContext` to resolve the active site and locale from the hostname and pathname.
- Added `siteHref` as the single source of truth for corporate and division URLs.
- Added production-style hostname support:
  - `figmenta.com/{locale}`
  - `studio.figmenta.com/{locale}`
  - `live.figmenta.com/{locale}`
  - `productions.figmenta.com/{locale}`
  - `media.figmenta.com/{locale}`
- Added local preview equivalents such as `/studio/en` and `/studio/it`.
- Connected desktop navigation, mobile navigation, division menus, locale switches, division rows, and back-to-group links to the same URL generator.

## 3. Fixed Italian locale propagation

### Previous public behavior

The Italian corporate site linked to locale-free division roots:

```text
figmenta.com/it → studio.figmenta.com/ → studio.figmenta.com/en
figmenta.com/it → live.figmenta.com/ → live.figmenta.com/en
figmenta.com/it → productions.figmenta.com/ → productions.figmenta.com/en
figmenta.com/it → media.figmenta.com/ → media.figmenta.com/en
```

### New behavior

- `/it` now opens `/it` on Studio, Live, Productions, and Media.
- `/en` continues to open `/en` on all four divisions.
- The same behavior is used in desktop and mobile menus.
- Browser back and forward navigation retains the URL-based locale state.
- Locale-free routes still default to English.

## 4. Fixed regional contact email destinations

### Previous public behavior

| Visible email | Previous target |
| --- | --- |
| `info@figmenta.it` | `mailto:info@figmenta.com` |
| `info@figmenta.co.uk` | `mailto:info@figmenta.com` |
| `contact@figmenta.co.uk` | `mailto:info@figmenta.com` |

### New behavior

| Office | Visible email and target |
| --- | --- |
| Milan | `mailto:info@figmenta.it` |
| London | `mailto:info@figmenta.co.uk` |
| San José | `mailto:contact@figmenta.co.uk` |

Implementation changes:

- Added one shared `officeContacts` data source in `src/site.ts`.
- Each office entry contains its city, country, email, and public image.
- The displayed email and its `mailto:` destination are generated from the same value.
- Corporate and all four divisions use the same contact component.
- English and Italian routes share the corrected office data.
- Added the public Milan, London, and San José photography.
- Rebuilt the overlay to follow the public two-column desktop card layout and single-column mobile layout.
- Preserved the public phone and WhatsApp actions.
- Added keyboard Escape closing and background scroll locking.

## 5. Added the project enquiry experience

- Recreated the `NEW PROJECT?` section and form hierarchy.
- Added required full-name, email, and project-description fields.
- Added localized English and Italian labels.
- Added the response-time, NDA, and industry-specialist supporting copy.
- Added a direct-conversation email action.
- Because the production form API is unavailable, submitting the recreated form opens a populated email instead of pretending to call the production backend.

## 6. Fixed Careers vacancy context

### Previous public behavior

- A vacancy could be expanded to read its description.
- The expanded vacancy did not include a role-specific Apply action.
- The only application action was the general `mailto:hr@figmenta.com` link.
- The selected title, location, job ID, and role context were not carried forward.

### Investigation result

- Public data exposed vacancy titles and descriptions.
- No public job ID was exposed.
- No vacancy-specific ATS or application URL was exposed.
- No verified `application.figmenta.com` relationship was found.
- The recreated flow therefore keeps email as the application mechanism.

### New behavior

- Added a stable local slug to every vacancy.
- Added a role-specific Apply action inside every expanded vacancy.
- Generated the email subject from the selected vacancy title.
- Generated the email body from the selected title and stable role reference.
- Added localized English and Italian subject/body copy.
- Kept the general `Apply to Figmenta` action independent for open applications.
- Tied open accordion state to a vacancy slug so one vacancy cannot inherit another vacancy's context.
- Preserved expected open, close, repeated-selection, and back/forward behavior.

## 7. Recreated the Careers UI

- Recreated the fixed corporate header and navigation.
- Added public Figmenta branding and navigation labels.
- Recreated the Careers hero, opening list, and general-application card.
- Added six public vacancies and their descriptions.
- Added the `Why work at Figmenta` benefit sections with public imagery.
- Added the values dialog and localized values copy.
- Added the closing imagination section and footer.
- Added responsive layouts for desktop, tablet, and mobile.

## 8. Recreated the corporate landing page

- Added the `Figmenta means Imaginary things` hero and Italian equivalent.
- Added the corporate introduction copy.
- Added four feature stories: Different, Classy, Sophisticated, and Brave.
- Added publicly accessible case videos.
- Added locale-aware rows linking to all four divisions.
- Added the `Why Figmenta` reasons section.
- Added the closing imagination CTA and shared footer.

## 9. Recreated four division landing pages

Added shared, data-driven pages for:

- Figmenta Studio
- Figmenta Live
- Figmenta Productions
- Figmenta Media

Each page includes:

- Public division logo and header behavior.
- Localized English and Italian hero copy.
- Division-specific service navigation.
- Two primary service cards using public imagery.
- Localized overview content.
- Capabilities or tools where applicable.
- Public case-study imagery and case titles.
- Division navigation and locale switching.
- Contact overlay, closing CTA, and shared footer.

## 10. Shared visual system

- Added Poppins, DM Sans, and Manrope typography support.
- Added fixed transparent headers and responsive mobile menus.
- Added public corporate and division logos.
- Added shared division and service dropdowns.
- Added feature-image hover treatments, case grids, capabilities, and tool pills.
- Added accessible labels for navigation, office links, images, dialogs, and controls.
- Added responsive breakpoints for desktop, tablet, and mobile.
- Added CSS glow animation as an approximation of the inaccessible production WebGL fluid renderer.

## 11. Automated regression coverage

The repository currently contains 39 passing tests covering:

- Regional email text and matching `mailto:` targets.
- Correct office imagery.
- All five sites in both supported locales.
- All four division destinations from `/en` and `/it`.
- Desktop and mobile locale-aware navigation.
- Hostname and local-preview route resolution.
- English default behavior for locale-free routes.
- Division hero copy, service images, and locale switches.
- Contact dialog open, close, Escape handling, and route preservation.
- Vacancy-specific application actions.
- Distinct context for different vacancies.
- Role title and stable reference encoding.
- Independent general/open applications.
- English and Italian Careers consistency.

## 12. QA evidence

- Added public broken-flow recording.
- Added corrected local-flow recording.
- Added side-by-side MP4 comparison.
- Added animated GIF preview for GitHub.
- Added annotated locale, contact, and Careers screenshots.
- Added raw browser captures for traceability.
- Added detailed browser-observed destinations and reproduction notes under `docs/evidence`.
- Embedded the videos and screenshots directly in the main README.

## 13. Commands verified

```text
npm run lint                         PASS
npm run typecheck                    PASS
npm test -- --reporter=dot           PASS — 39 tests
npm run build                        PASS
git diff --check                     PASS
```

## 14. Known limits

- This is not the original Figmenta source repository.
- The exact production WebGL background renderer is unavailable and is approximated in CSS.
- The production CMS, contact API, analytics, cookie-consent configuration, and tracking integrations are not included.
- Expertise, Portfolio, About, and Updates remain linked to the public site because they were outside the selected core-page scope.
- Public Figmenta and Sanity assets are referenced remotely rather than copied into the repository.
- Deployment requires a hosting project, DNS access, and authorization for the Figmenta domains.

