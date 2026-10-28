# LootVault

A lightweight, dependency-free prototype for a gaming codes and guides hub.

## Run locally

Requires Node.js 18 or newer. No package installation is needed.

```sh
npm start
```

Open [http://localhost:4173](http://localhost:4173). Set the `PORT` environment variable to use another port.

## Deploy to Vercel

The root `vercel.json` explicitly selects Vercel's static "Other" setup, disables automatic build-command detection, publishes the project root as static output, and rewrites SPA routes to `index.html`. This prevents the browser-side `app.js` from being invoked as a serverless function.

## Included

- Responsive homepage with live game/article search (starts at two characters)
- Atmospheric, original CSS game-cover artwork and a sample-code feed in the hero
- Directory of 20 games with client-side filtering
- Compact four-column code tables with responsive mobile rows, copy buttons, sample/status badges, redemption instructions, and related guides
- Local, per-device code feedback and a `My Vault` favorites dashboard
- A saved-games count and shortcut in the shared navigation, linking back to the homepage vault
- Cross-game recommendation cards with affiliate CTAs shown only when partner links are configured
- Blog index with category filters and 10 sample articles (5 beginner guides and 5 tier-list explainers)
- About, contact, privacy, and affiliate-disclosure pages
- Client-side affiliate-click counting when a real partner URL is configured on a game
- History-based navigation and direct-route fallback from the included Node server

## Before production

This is a prototype, not a live rewards database. All code and reward entries are clearly marked as sample data; they are not current promotions and have not been verified. Replace them with source-checked listings and implement a reliable update/expiry process before publishing.

The 10 article entries are editorial drafts and do **not** yet meet the brief's 1,200-word minimum. Expand and fact-check each article before using the site for an affiliate-program application. No LootVault partner URLs, contact delivery, analytics, community vote aggregation, or live verification service are configured. Favorites and votes remain in the visitor's browser and are not shared across visitors. Recommendation cards therefore link to game pages rather than claiming unconfigured affiliate offers. The contact form intentionally does not send or store messages.

For production SEO, consider generating prerendered HTML and per-route metadata from the content data. The current app updates titles and descriptions in the browser, but serves a shared client-rendered shell for every route.
