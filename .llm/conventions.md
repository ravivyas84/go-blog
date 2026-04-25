# Conventions & Patterns

> **Auto-maintained**: Update this file when conventions change. See the "Keeping Context Files Updated" section below.

## Front Matter Schema

Markdown in `posts/` and `pages/` is loaded by Astro content collections. Front matter must start at the first line of the file and be delimited by exact `---` lines.

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

| Field | Posts | Pages | Notes |
|---|---|---|---|
| `title` | Required | Required | Displayed as H1 and used in `<title>` / OG tags |
| `date` | Required | Optional | Format: `YYYY-MM-DD`; required for posts, optional for pages |
| `slug` | Required | Optional | Posts use it in dated permalinks; pages may omit it only for `pages/index.md` |
| `tags` | Optional | Optional | Arrays of strings; posts drive tag pages |
| `description` | Optional | Optional | Used in meta description and OG description |
| `author` | Optional | Optional | Defaults to "Ravi Vyas" if empty |
| `layout` | Optional legacy | Optional legacy | Accepted for backward compatibility but ignored by Astro routing |

Legacy fields such as `discuss`, `hnlink`, and `twitter` may exist in older posts. They are tolerated but not used by the current site.

## URL Structure

- Blog posts: `https://ravivyas.com/YYYY/MM/DD/slug-name`
- Static pages: `https://ravivyas.com/page-slug/`
- Posts listing: `https://ravivyas.com/posts/`
- Tags listing: `https://ravivyas.com/tag/`
- Tag detail pages: `https://ravivyas.com/tag/tag-name/`
- RSS: `https://ravivyas.com/feed.xml`
- Sitemap: `https://ravivyas.com/sitemap.xml`

## Adding a New Blog Post

1. Create a new `.md` file in `posts/`
2. Add YAML front matter with at least `title`, `date`, and `slug`
3. Write content in Markdown below the front matter
4. Use H2 (`##`) headings — they become TOC entries automatically
5. Images: place in `public/assets/` and reference as `/assets/filename.ext`
6. Run the build: `npm run build`
7. **Update `.llm/content.md`** with the new post entry

## Adding a New Static Page

1. Create a new `.md` file in `pages/`
2. Add YAML front matter (same schema, `slug` determines URL path)
3. Raw HTML is allowed in pages
4. If it should appear in nav, update `src/lib/site-profile.ts`
5. **Update `.llm/content.md`** with the new page entry

## Hardcoded Configuration

These values are hardcoded in Astro config, helper modules, and layout/components:

| Value | Location | Current |
|---|---|---|
| Site URL | `astro.config.mjs`, `src/lib/site.ts` | `https://ravivyas.com` |
| Default author | `src/lib/site.ts` | `Ravi Vyas` |
| Favicon path | `src/lib/site.ts` | `/favicon.ico` |
| Umami script | `src/lib/site.ts` | `https://umami.ravivyas.com/script.js` |
| Umami website ID | `src/lib/site.ts` | `50b4b12b-136c-43fd-9ce3-f363e870995b` |
| Canonical URL base | `astro.config.mjs`, `src/layouts/BaseLayout.astro` | `https://ravivyas.com/` |
| Blog title | `src/lib/site.ts`, `src/ui/SiteHeader.tsx` | `Ravi Vyas` |
| Blog tagline | `src/lib/site.ts`, `src/ui/SiteHeader.tsx` | `Musings of a Learner` |
| Homepage latest count | `src/lib/site.ts` | 10 posts |
| Homepage/profile/nav/footer/topic/project data | `src/lib/site-profile.ts` | hardcoded structured site data for the concept homepage |
| Theme toggle script | `public/scripts/theme-toggle.js` | explicit light/dark toggle |
| Vercel token secret | `.github/workflows/go.yml` | `VERCEN_TOKEN` |

## Astro Conventions

- Shared document chrome lives in `src/layouts/BaseLayout.astro`
- Astro-only fragments live in `src/components/`
- Shared design-system components live in `src/ui/`
- Route files in `src/pages/` are static at build time; dynamic routes use `getStaticPaths()`
- Content queries and sorting should live in `src/lib/content.ts`
- Site-wide constants should live in `src/lib/site.ts`
- Site/profile/homepage data should live in `src/lib/site-profile.ts`
- Shared UI intended for Storybook should be written as React components in `src/ui/`, then imported into Astro pages/layouts

## Storybook Conventions

- Storybook config lives in `.storybook/`
- Stories should live next to or near the components they document using `*.stories.tsx`
- Storybook only loads stories from `src/ui/**/*.stories.tsx`
- Storybook uses the same global stylesheet from `public/styles/globals.css`
- Prefer stories for shared primitives, shell components, content cards, homepage sections, and the full homepage composition rather than one-off route files

## Homepage UI Conventions

- The homepage is assembled from reusable React components in `src/ui/` and composed in `src/ui/home/HomePage.tsx`
- `BrandMark` is the composed wordmark lockup; the green dot is a purely visual separator/accent, not a status indicator
- The homepage search field is currently presentational only; it does not execute real search queries
- The theme toggle remains functional and is wired by `public/scripts/theme-toggle.js`

## Code Style

- Use standard Astro and TypeScript formatting
- Keep route files thin; prefer helpers in `src/lib/`
- No automated tests currently in the project
- Legacy Go files remain but are not the active implementation path

## Keeping Context Files Updated

**These `.llm/` context files must be kept in sync with the project.**

### When to Update

| Change | Files to Update |
|---|---|
| Add/remove/rename a blog post | `content.md` |
| Add/remove/rename a static page | `content.md`, `structure.md` |
| Change directory structure | `structure.md` |
| Add/change app dependencies or runtime/tooling | `tech-stack.md` |
| Change build steps or CI/CD | `build-and-deploy.md` |
| Change front matter schema or routing conventions | `conventions.md` |
| Change shared layouts/components or hardcoded config | `conventions.md`, `structure.md` |
| Add new `.llm/` context files | All files' cross-references |

### Build-Time Reminder

When running the build, verify that `.llm/` files are up to date. The recommended workflow:

1. Make your content or code changes
2. Run the build: `npm run build`
3. Review if any `.llm/` files need updating based on the table above
4. Commit the `.llm/` updates alongside your changes

### Automated Validation (Recommended Future Enhancement)

Consider adding a build step or pre-commit hook that:
- Counts `.md` files in `posts/` and compares to entries in `.llm/content.md`
- Warns if counts don't match
- This can be a simple shell script or Go function added to `main.go`
