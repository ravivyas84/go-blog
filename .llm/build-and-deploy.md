# Build & Deploy

> **Auto-maintained**: Update this file when build steps or CI/CD changes. See [conventions.md](conventions.md) for update instructions.

## Prerequisites

- Go 1.22+ installed
- GCC/CGO enabled (required by `go-sqlite3`)

## Local Build

```bash
# From the project root:

# 1. Compile the build binary
go build -v main.go

# 2. Run the build (generates static site in build/)
./main
```

The build will:
1. Delete and recreate `build/` directory
2. Delete and recreate `posts.db` SQLite database
3. Read all `posts/*.md` files, parse front matter, convert markdown, store in DB
4. Generate individual post pages → `build/YYYY/MM/DD/slug/index.html`
5. Generate static pages from `pages/` → `build/{slug}/index.html` (or `build/index.html` for homepage)
6. Generate all-posts listing → `build/posts/index.html`
7. Generate all-tags listing → `build/tag/index.html`
8. Generate RSS feed → `build/feed.xml`
9. Copy `public/` → `build/` (assets, styles, scripts, sitemap, favicon, etc.)

## Output Structure

```
build/
├── index.html                        # Homepage
├── posts/index.html                  # All posts listing
├── tag/index.html                    # All tags listing
├── feed.xml                          # RSS feed
├── YYYY/MM/DD/slug/index.html        # Individual blog posts
├── videos/index.html                 # Static pages
├── dailynotes/index.html
├── capabilitymap/index.html
├── odiocast/index.html
├── puremetrics/index.html
├── styles/                           # Copied from public/
├── scripts/                          # Copied from public/
├── assets/                           # Copied from public/
├── sitemap.xml                       # Copied from public/
└── favicon.ico                       # Copied from public/
```

## CI/CD Pipeline

**File**: `.github/workflows/go.yml`

**Trigger**: Push to `main` or PR against `main`

**Steps**:
1. `actions/checkout@v4` — checkout code
2. `actions/setup-go@v4` — install Go 1.22
3. `go build -v main.go` — compile
4. `./main` — generate static site
5. `cd build && npx vercel --prod --token $TOKEN` — deploy to Vercel

**Secrets required**:
- `VERCEN_TOKEN` — Vercel deployment token (note: variable name has a typo, kept for compatibility)

## Local Preview

After running `./main`, serve the `build/` directory with any static file server:

```bash
# Example using Python
python3 -m http.server -d build 8000

# Example using Go
go run golang.org/x/tools/cmd/present@latest  # or any static server
```

Then open `http://localhost:8000`.

## Artifacts (git-ignored)

- `build/` — generated output directory
- `posts.db` — transient SQLite database
- `main` — compiled Go binary
