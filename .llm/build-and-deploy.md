# Build & Deploy

> **Auto-maintained**: Update this file when build steps or CI/CD changes. See [conventions.md](conventions.md) for update instructions.

## Prerequisites

- Node.js 20+ installed
- npm available locally

## Local Build

```bash
# From the project root:

# 1. Install dependencies
npm install

# 2. Build the static site into build/
npm run build

# Optional: build Storybook into storybook-static/
npm run build-storybook
```

The build will:
1. Sync Astro content collections from `posts/` and `pages/`
2. Validate front matter with the collection schemas
3. Render individual post pages → `build/YYYY/MM/DD/slug/index.html`
4. Render static pages from `pages/` → `build/{slug}/index.html` (or `build/index.html` for the homepage)
5. Render the all-posts listing → `build/posts/index.html`
6. Render the all-tags listing → `build/tag/index.html`
7. Render per-tag listing pages → `build/tag/{tag}/index.html`
8. Render dedicated app/static routes such as `/quotes/` and `/projects-and-tools/`
9. Generate RSS feed → `build/feed.xml`
10. Generate sitemap → `build/sitemap.xml`
11. Copy `public/` into `build/`

## Storybook

```bash
# Run Storybook locally
npm run storybook

# Build the static Storybook site
npm run build-storybook
```

Storybook outputs to `storybook-static/` and documents the shared React UI components used by Astro pages.

## Output Structure

```
build/
├── index.html                        # Homepage
├── posts/index.html                  # All posts listing
├── quotes/index.html                 # Favorite quotes page
├── tag/index.html                    # All tags listing
├── tag/{tag}/index.html              # Per-tag post listings
├── feed.xml                          # RSS feed
├── sitemap.xml                       # Sitemap
├── YYYY/MM/DD/slug/index.html        # Individual blog posts
├── videos/index.html                 # Static pages
├── dailynotes/index.html
├── capabilitymap/index.html
├── odiocast/index.html
├── puremetrics/index.html
├── styles/                           # Copied from public/
├── scripts/                          # Copied from public/
├── assets/                           # Copied from public/
└── favicon.ico                       # Copied from public/
```

## CI/CD Pipeline

**File**: `.github/workflows/go.yml`

**Triggers**:
- Push to `main` → production deployment
- Push to `preview` → preview deployment
- PR against `main` → build only (no deploy step runs)

**Steps**:
1. `actions/checkout@v4` — checkout code
2. `actions/setup-node@v4` — install Node 20 and enable npm cache
3. `npm ci` — install exact dependencies from `package-lock.json`
4. `npm run build` — generate static site with Astro
5. Deploy step (branch-conditional):
   - `main` branch: `cd build && npx vercel --prod --token $TOKEN` (production)
   - `preview` branch: `cd build && npx vercel --token $TOKEN` (Vercel preview environment)

**Secrets required**:
- `VERCEN_TOKEN` — Vercel deployment token (note: variable name has a typo, kept for compatibility)

## Local Preview

After running `npm run build`, serve the `build/` directory with any static file server:

```bash
# Example using Python
python3 -m http.server -d build 8000
```

Then open `http://localhost:8000`.

## Artifacts (git-ignored)

- `build/` — generated output directory
- `node_modules/` — installed dependencies
- `.astro/` — Astro cache/output metadata
- `storybook-static/` — generated Storybook site
