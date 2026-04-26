import { getCollection, type CollectionEntry } from 'astro:content';

import type { IconName, NavItem } from './site-profile';
import { LATEST_POST_COUNT, getPagePath, getPostPath, slugifyTag } from './site';

export type PostEntry = CollectionEntry<'posts'>;
export type PageEntry = CollectionEntry<'pages'>;
const WORDS_PER_MINUTE = 200;

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

export function getPostIdentifier(post: PostEntry) {
  return post.data.slug || post.id;
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

const PAGE_NAV_ORDER = ['videos', 'nextstep'];

const PAGE_NAV_ICONS: Record<string, IconName> = {
  capabilitymap: 'projects',
  dailynotes: 'notes',
  nextstep: 'link',
  odiocast: 'podcast',
  puremetrics: 'box',
  videos: 'book-open',
};

function getPageNavRank(slug: string) {
  const rank = PAGE_NAV_ORDER.indexOf(slug);
  return rank === -1 ? PAGE_NAV_ORDER.length : rank;
}

export async function getSiteNavItems(currentPath: string): Promise<NavItem[]> {
  const pages = await getStaticPages();
  const pageItems = pages
    .filter((page) => {
      const slug = getResolvedPageSlug(page);
      return PAGE_NAV_ORDER.includes(slug);
    })
    .map((page) => {
      const slug = getResolvedPageSlug(page);
      const href = getResolvedPagePath(page);

      return {
        href,
        icon: PAGE_NAV_ICONS[slug] ?? 'link',
        label: page.data.title.replace(/^Ravi Vyas\s*-\s*/i, ''),
        match: href,
        slug,
      };
    })
    .sort((a, b) => {
      const rankDifference = getPageNavRank(a.slug) - getPageNavRank(b.slug);
      if (rankDifference !== 0) {
        return rankDifference;
      }

      return a.label.localeCompare(b.label);
    })
    .map(({ slug: _slug, ...item }) => item satisfies NavItem);

  return [
    { href: '/posts/', icon: 'writing', label: 'Writing', match: '/posts/' },
    {
      href: currentPath === '/' ? '/#projects' : '/projects-and-tools/',
      icon: 'projects',
      label: 'Projects and Tools',
      match: '/projects-and-tools/',
    },
    { href: '/about/', icon: 'about', label: 'About', match: '/about/' },
    ...pageItems,
  ];
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

function normalizeWords(body: string) {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\(([^)]+)\)/g, ' ')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, ' $1 ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[\^.+?\]:.+/g, ' ')
    .replace(/[#>*_~=-]+/g, ' ')
    .replace(/[^\p{L}\p{N}'’]+/gu, ' ')
    .trim();
}

export function getPostWordCount(post: PostEntry) {
  const normalized = normalizeWords(post.body);
  if (!normalized) {
    return 0;
  }

  return normalized.split(/\s+/).length;
}

export function getPostReadTimeMinutes(post: PostEntry) {
  return Math.max(1, Math.ceil(getPostWordCount(post) / WORDS_PER_MINUTE));
}

export async function getAdjacentPosts(post: PostEntry) {
  const posts = await getAllPosts();
  const index = posts.findIndex((candidate) => candidate.id === post.id);

  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export async function getRelatedPosts(post: PostEntry) {
  const relatedIds = post.data.relatedPosts ?? [];
  if (relatedIds.length === 0) {
    return [];
  }

  const posts = await getAllPosts();
  const lookup = new Map<string, PostEntry>();

  for (const candidate of posts) {
    lookup.set(candidate.id, candidate);
    lookup.set(getPostIdentifier(candidate), candidate);
  }

  return relatedIds
    .map((relatedId) => lookup.get(relatedId))
    .filter((candidate): candidate is PostEntry => Boolean(candidate) && candidate.id !== post.id);
}
