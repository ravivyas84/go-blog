# Tech Stack

> **Auto-maintained**: Update this file when dependencies or tooling changes. See [conventions.md](conventions.md) for update instructions.

## Language & Runtime

- **Go 1.22.2** — the build engine (`main.go`) is a single Go binary
- Module name: `blog` (see `go.mod`)

## Go Dependencies

| Package | Version | Purpose |
|---|---|---|
| `github.com/yuin/goldmark` | v1.7.1 | Markdown → HTML conversion |
| `gopkg.in/yaml.v2` | v2.3.0 | YAML front matter parsing |
| `github.com/mattn/go-sqlite3` | v1.14.22 | SQLite driver (intermediate build store) |
| `golang.org/x/net` | v0.25.0 | HTML parsing (`golang.org/x/net/html`) for heading extraction, image extraction |

## Frontend

- **No framework** — vanilla HTML, CSS, JavaScript
- **CSS**: 3 stylesheets in `public/styles/` (`globals.css`, `Home.module.css`, `utils.module.css`)
- **JavaScript**:
  - `public/scripts/toc.js` — interactive table of contents (uses `IntersectionObserver`)
  - `public/scripts/font-size.js` — reader preference controls (font size, line height, content width, and typeface) with `localStorage` persistence
- **No bundler** — CSS/JS served as-is

## Analytics

- **Umami** (self-hosted) at `https://umami.ravivyas.com/script.js`
- Website ID: `50b4b12b-136c-43fd-9ce3-f363e870995b`

## Hosting & Deployment

- **Vercel** — static site hosting with global CDN
- **GitHub Actions** — CI/CD pipeline (`.github/workflows/go.yml`)
- Trigger: push or PR to `main` branch
- Deployment uses `npx vercel --prod --token $TOKEN`

## Data Store

- **SQLite** (`posts.db`) — transient database created fresh on each build
- Used as intermediate storage between markdown parsing and HTML generation
- Git-ignored; not part of the deployed site

## SEO & Standards

- JSON-LD structured data (`schema.org/BlogPosting`) on each post
- Open Graph meta tags
- Canonical URLs
- `sitemap.xml` (static, in `public/`)
- RSS feed (`feed.xml`, generated at build time)
- Mastodon WebFinger (`.well-known/webfinger`)
