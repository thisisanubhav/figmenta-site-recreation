# Figmenta regression evidence

This evidence was captured on 29 September 2026 from the public Figmenta site (before) and the independent local recreation in this repository (after). The repository was created from public browser references because the original production repository and deployment are not available.

## Video walkthrough

[Download the MP4 comparison](./figmenta-before-after.mp4)

![Animated comparison of the three corrected flows](./figmenta-before-after.gif)

## 1. Italian locale propagation

![Before and after comparison of Italian division navigation](./screenshots/locale-comparison.png)

Observed public behavior:

- `https://figmenta.com/it` renders division links such as `https://studio.figmenta.com/` without a locale.
- Following the Studio link resolves to `https://studio.figmenta.com/en`.

Corrected behavior:

- Shared `siteHref` link generation includes the active locale.
- `/it` links to `/studio/it`, `/live/it`, `/productions/it`, and `/media/it`.
- `/en` continues to link to each division's `/en` route.

## 2. Regional contact email targets

![Before and after comparison of regional contact cards](./screenshots/email-comparison.png)

The public page displayed the correct regional addresses, but DOM inspection found these targets:

| Office | Visible address | Public target | Corrected target |
| --- | --- | --- | --- |
| Milan | `info@figmenta.it` | `mailto:info@figmenta.com` | `mailto:info@figmenta.it` |
| London | `info@figmenta.co.uk` | `mailto:info@figmenta.com` | `mailto:info@figmenta.co.uk` |
| San José | `contact@figmenta.co.uk` | `mailto:info@figmenta.com` | `mailto:contact@figmenta.co.uk` |

The recreation defines each office once in `src/site.ts`. The visible text and `mailto:` target are generated from that same email value.

## 3. Careers vacancy context

![Before and after comparison of the expanded vacancy](./screenshots/careers-comparison.png)

Observed public behavior:

- Expanding `Senior Art Director- Latin America` showed the job description but no vacancy-specific Apply action.
- The only HR link was `mailto:hr@figmenta.com`, with no role subject, ID, or body context.

Corrected behavior:

- Each vacancy exposes its own `Apply for this role` action.
- The generated email contains the selected title in the subject and both the title and stable local role reference in the body.
- The general `Apply to Figmenta` action remains independent for open applications.

No public job ID, ATS URL, or vacancy-specific external application system was exposed, so the recreation retains the observed email-based architecture.

