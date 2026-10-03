# ShinMaster

Public client preview of the ShinMaster tire and wheel website.

The `docs/` directory contains the complete GitHub Pages site: 80 pages, responsive dark theme, mounted-wheel illustrations, filters, favorites, comparison and fitting calculator.

## Build

Use Node.js 22.13 or newer and pnpm 11.25:

```sh
pnpm install --frozen-lockfile
pnpm build
```

Publish `main /docs` in GitHub Pages settings. The project base path is `/shinmaster/`.

## Data and administration

This is a static client demonstration. Initial data is a snapshot of the original Site at source commit `47b3bc6e4b952c9c6bec865c53ce85742f53f180`, database revision 1. Catalog and contact edits in the separately hosted protected administrator require a new snapshot and publication here.

This repository contains no administrator UI, API routes, database, personal submissions or credentials. Booking forms validate demonstration input without sending or saving personal data. Sample prices and inventory remain marked as demonstration data.
