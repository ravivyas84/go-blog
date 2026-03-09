# Project Structure

> **Auto-maintained**: This file should be updated whenever the project structure changes. See [conventions.md](conventions.md) for update instructions.

## Overview

Custom static blog generator written in Go. Converts Markdown blog posts (with YAML front matter) into a static HTML website. Uses SQLite as an intermediate store during build, then outputs plain HTML to a `build/` directory deployed on Vercel.

## Directory Tree

```
go-blog/
├── main.go                    # Core build engine (~793 lines). Orchestrates entire pipeline.
├── go.mod / go.sum            # Go module (module name: "blog", Go 1.22.2)
│
├── frontmatter/
│   └── frontmatter.go         # FrontMatter struct & YAML parsing
│
├── utilities/
│   └── utilities.go           # CopyFile / CopyDir helpers
│
├── posts/                     # Blog post Markdown files (58 posts)
│   └── *.md                   # Each file: YAML front matter + Markdown body
│
├── pages/                     # Static page Markdown files (6 pages)
│   ├── index.md               # Homepage (shows latest 10 posts)
│   ├── capabilitymap.md
│   ├── dailynotes.md
│   ├── odiocast.md
│   ├── puremetrics.md
│   └── videos.md
│
├── *.tmpl                     # Go html/template files
│   ├── base.tmpl              # Base layout for individual posts
│   ├── base_2.tmpl            # Base layout for posts listing page
│   ├── base_tags.tmpl         # Base layout for tags page
│   ├── header.tmpl            # Shared header (nav bar; separators styled in CSS)
│   ├── footer.tmpl            # Shared footer
│   ├── content.tmpl           # Post article body + TOC
│   ├── pages.tmpl             # Static page body + latest posts
│   ├── posts.tmpl             # All-posts listing body
│   └── tags.tmpl              # All-tags listing body
│
├── public/                    # Static assets (copied as-is to build/)
│   ├── assets/                # Images (130+ files: PNG, JPG, AVIF)
│   ├── styles/
│   │   ├── globals.css        # Main stylesheet
│   │   ├── Home.module.css    # Page-specific styles
│   │   └── utils.module.css   # Utility classes
│   ├── scripts/
│   │   └── toc.js             # Interactive table of contents (IntersectionObserver)
│   ├── sitemap.xml            # SEO sitemap
│   ├── favicon.ico
│   └── .well-known/webfinger  # Mastodon federation
│
├── .github/workflows/
│   └── go.yml                 # CI/CD: build Go → run main → deploy to Vercel
│
├── .llm/                      # LLM context files (this directory)
│
├── build/                     # Generated output (git-ignored)
└── posts.db                   # Transient SQLite DB used during build (git-ignored)
```

## Build Pipeline

```
Markdown files (posts/, pages/)
        │
        ▼
   Parse YAML front matter
        │
        ▼
   Convert Markdown → HTML (Goldmark)
        │
        ▼
   Post-process HTML:
   ├── Extract H2 headings for TOC
   ├── Add id="" attributes to headings
   └── Add loading="lazy" to images
        │
        ▼
   Store in SQLite (posts.db)
        │
        ▼
   Generate HTML pages from DB + templates:
   ├── Individual post pages     → build/YYYY/MM/DD/slug/index.html
   ├── Static pages              → build/{slug}/index.html
   ├── Homepage (index.md)       → build/index.html
   ├── All posts listing         → build/posts/index.html
   ├── All tags listing          → build/tag/index.html
   └── RSS feed                  → build/feed.xml
        │
        ▼
   Copy public/ → build/
        │
        ▼
   Deploy build/ to Vercel
```

## Key Functions in main.go

| Function | Purpose |
|---|---|
| `main()` | Orchestrates build: clean → init DB → process posts → generate pages → RSS → copy assets |
| `generatePagesFromDB()` | Renders each post to HTML using `base.tmpl` + `content.tmpl` |
| `buildPages()` | Renders static pages from `pages/` using `base.tmpl` + `pages.tmpl` |
| `listAllPosts()` | Generates the all-posts listing page |
| `listAllTags()` | Aggregates tags with counts, generates tags page |
| `fetchLatestPosts()` | Queries DB for 10 most recent posts (used on homepage) |
| `extractHeadings()` | Parses HTML to find all H2 text |
| `addHeadingIDs()` | Injects `id` attributes on H2 tags for anchor linking |
| `addLazyLoading()` | Adds `loading="lazy"` to all `<img>` tags |
| `extractFirstImage()` | Gets first image src for Open Graph / JSON-LD |
| `generateTOCItems()` | Builds TOC data (text + slugified ID) from headings |
| `generateSlug()` | Creates URL path: `YYYY/MM/DD/slug` |
| `initDB()` | Creates fresh SQLite DB with posts table |

## Template Hierarchy

```
base.tmpl (posts)          base_2.tmpl (post list)    base_tags.tmpl (tags)
  ├── header.tmpl            ├── header.tmpl            ├── header.tmpl
  ├── content.tmpl           ├── posts.tmpl             ├── tags.tmpl
  └── footer.tmpl            └── footer.tmpl            └── footer.tmpl
```

Each `base*.tmpl` is a full HTML document. The inner templates define a `{{define "content"}}` block and a `{{define "header"}}` / `{{define "footer"}}` block.
