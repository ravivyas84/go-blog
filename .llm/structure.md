# Project Structure

> **Auto-maintained**: This file should be updated whenever the project structure changes. See [conventions.md](conventions.md) for update instructions.

## Overview

Astro static site that renders Markdown blog posts and static pages into a `build/` directory for deployment on Vercel. The active site architecture now uses Astro content collections and route generation, while the previous Go generator remains in the repo as legacy migration context.

## Directory Tree

```
markdown-html/
├── package.json / package-lock.json   # Node package manifest + lockfile
├── astro.config.mjs                   # Astro site/build/markdown configuration
├── tsconfig.json                      # TypeScript config for Astro
│
├── src/
│   ├── content.config.ts              # Astro content collections loading from root posts/ + pages/
│   ├── components/                    # Astro-only UI fragments
│   │   ├── ReaderPreferences.astro
│   │   └── Toc.astro
│   ├── layouts/
│   │   └── BaseLayout.astro           # Shared HTML document shell + SEO + scripts
│   ├── lib/                           # Site constants, content helpers, metadata helpers
│   │   ├── content.ts
│   │   ├── post-meta.ts
│   │   ├── rehype-lazy-images.mjs
│   │   ├── site-profile.ts            # Concept homepage/profile/navigation/footer data
│   │   └── site.ts
│   ├── ui/                            # React UI components used by Astro + Storybook
│   │   ├── home/HomePage.tsx          # Concept homepage composition
│   │   ├── SiteHeader.tsx / SiteFooter.tsx
│   │   ├── BrandMark.tsx / Icon.tsx / Button.tsx
│   │   ├── ThemeToggle.tsx / SearchField.tsx / NavItem.tsx / SectionTitle.tsx
│   │   ├── TagPill.tsx / StatusPill.tsx / TopicChip.tsx
│   │   ├── HeroCanvas.tsx / HeroProfileCard.tsx
│   │   ├── LatestWritingSection.tsx / WritingListItem.tsx / CurrentlyExploringCard.tsx
│   │   ├── ProjectsSection.tsx / ProjectCardConcept.tsx
│   │   ├── AboutPage.tsx / TopicBrowserSection.tsx / AboutBanner.tsx / InboxSubscribeCard.tsx
│   │   ├── PostTableOfContentsCard.tsx / PostShareCard.tsx / PostRelatedPostsCard.tsx
│   │   ├── PostSubscribeCard.tsx / PostNoteCard.tsx / PostNavigation.tsx
│   │   ├── storybook-fixtures.ts
│   │   └── *.stories.tsx              # Storybook stories loaded from src/ui/**
│   └── pages/                         # Astro routes
│       ├── index.astro                # Concept homepage with latest posts + page metadata
│       ├── about/index.astro          # Dedicated About page
│       ├── feed.xml.js                # RSS feed generator
│       ├── sitemap.xml.js             # Sitemap generator
│       ├── projects-and-tools/index.astro # Dedicated projects/tools catalog page
│       ├── posts/index.astro          # All-posts listing
│       ├── tag/index.astro            # All-tags listing
│       ├── tag/[tag]/index.astro      # Per-tag post listing
│       ├── [slug]/index.astro         # Static pages from pages/
│       └── [year]/[month]/[day]/[slug]/index.astro  # Blog post permalinks
│
├── posts/                             # Blog post Markdown files (59 posts)
├── pages/                             # Static page Markdown files (6 pages)
├── public/                            # Static assets copied as-is to build/
│   ├── assets/
│   ├── scripts/                       # toc.js, font-size.js, theme-toggle.js, site-chrome.js
│   ├── styles/
│   ├── favicon.ico
│   └── .well-known/webfinger
│
├── .storybook/                        # Storybook config for the React design system
│   ├── main.ts
│   └── preview.ts
│
├── .github/workflows/
│   └── go.yml                         # CI/CD: npm ci → astro build → deploy build/ to Vercel
│
├── .llm/                              # LLM context files
├── build/                             # Generated static output (git-ignored)
│
├── main.go                            # Legacy Go generator kept during migration
├── go.mod / go.sum                    # Legacy Go module metadata
├── frontmatter/frontmatter.go         # Legacy Go helper
├── utilities/utilities.go             # Legacy Go helper
└── *.tmpl                             # Legacy Go templates retained during migration
```

## Build Pipeline

```
Markdown files (posts/, pages/)
        │
        ▼
  Astro content collections
  ├── validate front matter with Zod
  ├── expose typed entries to routes
  └── keep source files in place (no content move)
        │
        ▼
  Astro Markdown rendering
  ├── generate heading metadata for TOC
  ├── preserve raw HTML in markdown
  ├── add loading="lazy" to images via rehype
  └── render static pages and post bodies
        │
        ▼
  React UI layer inside Astro
  ├── renders the concept homepage redesign
  ├── renders the shared site header/footer
  ├── renders the redesigned post-page sidebar cards/navigation
  └── supplies the same components to Storybook
        │
        ▼
  Static route generation:
  ├── Homepage                  → build/index.html
  ├── Individual posts          → build/YYYY/MM/DD/slug/index.html
  ├── Static pages              → build/{slug}/index.html
  ├── All posts listing         → build/posts/index.html
  ├── Tag listing               → build/tag/index.html
  ├── Per-tag pages             → build/tag/{tag}/index.html
  ├── RSS feed                  → build/feed.xml
  └── Sitemap                   → build/sitemap.xml
        │
        ▼
  Copy public/ → build/
        │
        ▼
  Deploy build/ to Vercel
```

## Key Astro Modules

| File | Purpose |
|---|---|
| `src/content.config.ts` | Defines typed `posts` and `pages` collections loaded from the existing root folders |
| `src/lib/content.ts` | Sorts posts, resolves page slugs, builds latest-post/tag data, and assembles the primary header nav |
| `src/lib/post-meta.ts` | Builds JSON-LD and post image metadata |
| `src/lib/site-profile.ts` | Stores concept-homepage navigation, hero, footer, projects, topics, and about-banner data |
| `src/layouts/BaseLayout.astro` | Shared HTML shell, SEO tags, analytics, scripts, and React-backed site chrome |
| `src/pages/index.astro` | Renders the concept homepage using `src/ui/home/HomePage.tsx` and latest-post data |
| `src/pages/about/index.astro` | Renders the dedicated About page |
| `src/pages/projects-and-tools/index.astro` | Renders the dedicated projects/tools catalog page |
| `src/pages/[year]/[month]/[day]/[slug]/index.astro` | Renders redesigned post pages with hero metadata, sidebar cards, and adjacent navigation |
| `src/pages/posts/index.astro` | All-posts listing page |
| `src/pages/tag/index.astro` / `src/pages/tag/[tag]/index.astro` | Tag index and per-tag pages |
| `src/pages/feed.xml.js` | Generates the RSS feed |
| `.storybook/main.ts` / `.storybook/preview.ts` | Storybook entrypoints for the shared component system |

## Astro Layout Hierarchy

```
BaseLayout.astro
  ├── SiteHeader.tsx
  ├── route content (`index.astro`, post page, list pages, etc.)
  ├── SiteFooter.tsx
  └── ReaderPreferences.astro
```
