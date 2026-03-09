# Conventions & Patterns

> **Auto-maintained**: Update this file when conventions change. See the "Keeping Context Files Updated" section below.

## Front Matter Schema

Every Markdown file in `posts/` and `pages/` starts with YAML front matter delimited by `---`:

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
slug: "url-slug-without-date"
tags:
  - Tag1
  - Tag2
description: "Meta description for SEO and Open Graph"
author: "Author Name"
---
```

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Displayed as H1, used in `<title>` and OG tags |
| `date` | Yes | Format: `YYYY-MM-DD`. Determines URL path and sort order |
| `slug` | Yes | URL segment after date. Final URL: `YYYY/MM/DD/{slug}` |
| `tags` | No | Array of strings. Aggregated on `/tag/` page |
| `description` | No | Used in meta description and OG description |
| `author` | No | Defaults to "Ravi Vyas" if empty |

## URL Structure

- Blog posts: `https://ravivyas.com/YYYY/MM/DD/slug-name`
- Static pages: `https://ravivyas.com/page-slug/`
- Posts listing: `https://ravivyas.com/posts/`
- Tags listing: `https://ravivyas.com/tag/`
- RSS: `https://ravivyas.com/feed.xml`

## Adding a New Blog Post

1. Create a new `.md` file in `posts/`
2. Add YAML front matter with at least `title`, `date`, and `slug`
3. Write content in Markdown below the front matter
4. Use H2 (`##`) headings — they become TOC entries automatically
5. Images: place in `public/assets/` and reference as `/assets/filename.ext`
6. Run the build: `go build -v main.go && ./main`
7. **Update `.llm/content.md`** with the new post entry

## Adding a New Static Page

1. Create a new `.md` file in `pages/`
2. Add YAML front matter (same schema, `slug` determines URL path)
3. Raw HTML is allowed in pages (Goldmark renders with `WithUnsafe()`)
4. If it should appear in nav, update `header.tmpl`
5. **Update `.llm/content.md`** with the new page entry

## Hardcoded Configuration

These values are hardcoded in `main.go` and templates — there is no config file:

| Value | Location | Current |
|---|---|---|
| Site URL | `main.go:305` | `https://ravivyas.com` |
| Default author | `main.go:306` | `Ravi Vyas` |
| Favicon URL | `main.go:307` | `https://ravivyas.com/favicon.ico` |
| Umami script | `base.tmpl:14` | `https://umami.ravivyas.com/script.js` |
| Umami website ID | `base.tmpl:14` | `50b4b12b-136c-43fd-9ce3-f363e870995b` |
| Canonical URL base | `base.tmpl:13` | `https://ravivyas.com/` |
| Blog title | `header.tmpl:5` | `Ravi Vyas` |
| Blog tagline | `header.tmpl:7` | `Musings of a Learner` |
| Homepage latest count | `main.go:619` | 10 posts |
| Reader defaults (size/spacing/width/typeface) | `public/styles/globals.css`, `public/scripts/font-size.js` | `18` / `1.4` / `800` / `charter` |
| RSS title/link | `main.go:139-140` | Placeholder values (not customized) |
| Vercel token secret | `go.yml:32` | `VERCEN_TOKEN` |

## Template Conventions

- All templates use Go's `html/template` syntax
- Named blocks: `{{define "header"}}`, `{{define "content"}}`, `{{define "footer"}}`
- Base templates call: `{{template "header" .}}`, `{{template "content" .}}`, `{{template "footer" .}}`
- Data passed to templates: `Document` struct (posts), `LatestPosts` struct (pages), anonymous structs (listings)
- Header nav separators are CSS-generated (`.nav-item + .nav-item::before`) in `public/styles/globals.css`; `header.tmpl` does not contain literal `|` separators.
- Global color tokens are defined in `public/styles/globals.css` (`--color-accent`, `--color-accent-soft`, `--color-text-strong`) and used by nav/link/TOC highlight states.
- Reader preference controls are rendered in `base.tmpl`, `base_2.tmpl`, and `base_tags.tmpl`; selected values are persisted in `localStorage` with `reader-*` keys.

## Code Style

- Standard Go formatting (`gofmt`)
- No tests currently in the project
- Single `main.go` file contains all build logic
- Helper packages (`frontmatter/`, `utilities/`) are minimal single-file packages
- Error handling: `log.Fatalf` for fatal errors, `log.Printf` + `continue` for per-file errors

## Keeping Context Files Updated

**These `.llm/` context files must be kept in sync with the project.**

### When to Update

| Change | Files to Update |
|---|---|
| Add/remove/rename a blog post | `content.md` |
| Add/remove/rename a static page | `content.md`, `structure.md` |
| Change directory structure | `structure.md` |
| Add/change Go dependencies | `tech-stack.md` |
| Change build steps or CI/CD | `build-and-deploy.md` |
| Change front matter schema | `conventions.md` |
| Change templates or hardcoded config | `conventions.md`, `structure.md` |
| Add new `.llm/` context files | All files' cross-references |

### Build-Time Reminder

When running the build, verify that `.llm/` files are up to date. The recommended workflow:

1. Make your content or code changes
2. Run the build: `go build -v main.go && ./main`
3. Review if any `.llm/` files need updating based on the table above
4. Commit the `.llm/` updates alongside your changes

### Automated Validation (Recommended Future Enhancement)

Consider adding a build step or pre-commit hook that:
- Counts `.md` files in `posts/` and compares to entries in `.llm/content.md`
- Warns if counts don't match
- This can be a simple shell script or Go function added to `main.go`
