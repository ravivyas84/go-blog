import { getCollection, type CollectionEntry } from 'astro:content';

import { LATEST_POST_COUNT, getPagePath, getPostPath, slugifyTag } from './site';

export type PostEntry = CollectionEntry<'posts'>;
export type PageEntry = CollectionEntry<'pages'>;

function sortPostsByDateDesc(a: PostEntry, b: PostEntry) {
  return b.data.date.getTime() - a.data.date.getTime();
}

export async function getAllPosts() {
  const posts = await getCollection('posts');
  return posts.sort(sortPostsByDateDesc);
}

export async function getLatestPosts(limit = LATEST_POST_COUNT) {
  return (await getAllPosts()).slice(0, limit);
}

export async function getHomePage() {
  const pages = await getCollection('pages');
  return pages.find((page) => (page.data.slug ?? page.id) === 'index');
}

export async function getStaticPages() {
  const pages = await getCollection('pages');
  return pages
    .filter((page) => (page.data.slug ?? page.id) !== 'index')
    .sort((a, b) => (a.data.slug ?? a.id).localeCompare(b.data.slug ?? b.id));
}

export function getResolvedPageSlug(page: PageEntry) {
  return page.data.slug ?? page.id;
}

export function getResolvedPagePath(page: PageEntry) {
  return getPagePath(getResolvedPageSlug(page));
}

export type TagSummary = {
  count: number;
  name: string;
  slug: string;
};

export async function getTagSummaries() {
  const counts = new Map<string, TagSummary>();

  for (const post of await getAllPosts()) {
    for (const tag of post.data.tags) {
      const slug = slugifyTag(tag);
      const existing = counts.get(slug);

      if (existing) {
        existing.count += 1;
        continue;
      }

      counts.set(slug, { name: tag, slug, count: 1 });
    }
  }

  return Array.from(counts.values()).sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }

    return a.name.localeCompare(b.name);
  });
}

export async function getTagSummaryBySlug(tagSlug: string) {
  return (await getTagSummaries()).find((tag) => tag.slug === tagSlug);
}

export async function getPostsByTagSlug(tagSlug: string) {
  return (await getAllPosts()).filter((post) =>
    post.data.tags.some((tag) => slugifyTag(tag) === tagSlug),
  );
}

export function getPostPermalink(post: PostEntry) {
  return getPostPath(post.data.date, post.data.slug);
}
