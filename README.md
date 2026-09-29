# Figmenta site recreation

This is a new, independent implementation of the Figmenta corporate landing page and four division landing pages. It was created from public browser references because the original source repository and deployment are unavailable. It covers the core navigation and contact flows, not the original site's complete page inventory, content management, animations, or production integrations.

## Run locally

```sh
npm install
npm run dev
```

Open `http://localhost:5173/en` or `http://localhost:5173/it`. The four division previews live at `/studio/en`, `/live/en`, `/productions/en`, and `/media/en`, with matching `/it` routes.

The recreated Careers page lives at `/en/careers` and `/it/careers`. Each vacancy has its own email application action whose subject and body include the role title and a local role reference. The general `Apply to Figmenta` email link remains separate. The public site did not expose job IDs, an ATS link, or a vacancy application URL, so this recreation keeps the observed email-based flow.

## Deploying on the Figmenta domains

The same build can serve `figmenta.com` and the `studio`, `live`, `productions`, and `media` subdomains. It reads the hostname to select the site and uses `/{locale}` paths on each domain. On localhost or a preview hostname it uses `/{division}/{locale}` so all five pages can be reviewed on one origin. Connect the domains and configure DNS in the hosting account before using this as a replacement. A deployment of this repository alone does not change the current production sites.

## Validation

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

The office email addresses are defined once in `src/site.ts`; `src/App.tsx` derives each `mailto:` target from the same `email` value shown to visitors. `siteHref` generates the division URLs from the active locale for both desktop and mobile navigation.
