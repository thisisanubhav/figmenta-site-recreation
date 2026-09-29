# Figmenta site recreation

This is a new, independent implementation of the Figmenta corporate landing page and four division landing pages. It was created from public browser references because the original source repository and deployment are unavailable. It covers the core navigation and contact flows, not the original site's complete page inventory, content management, animations, or production integrations.

## Run locally

```sh
npm install
npm run dev
```

Open `http://localhost:5173/en` or `http://localhost:5173/it`. The four division previews live at `/studio/en`, `/live/en`, `/productions/en`, and `/media/en`, with matching `/it` routes.

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
