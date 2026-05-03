import type { APIRoute } from 'astro';

import {
  getAllPosts,
  getPostPermalink,
  getResolvedPagePath,
  getStaticPages,
  normalizeWords,
} from '../lib/content';
import { formatDisplayDate } from '../lib/site';

export const GET: APIRoute = async () => {
  const [posts, pages] = await Promise.all([getAllPosts(), getStaticPages()]);

  const postEntries = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description ?? '',
    tags: post.data.tags,
    href: getPostPermalink(post),
    date: formatDisplayDate(post.data.date),
    content: normalizeWords(post.body ?? ''),
  }));

  const pageEntries = pages.map((page) => ({
    title: page.data.title,
    description: page.data.description ?? '',
    tags: [] as string[],
    href: getResolvedPagePath(page),
    date: page.data.date ? formatDisplayDate(page.data.date) : '',
    content: normalizeWords(page.body ?? ''),
  }));

  return new Response(JSON.stringify([...postEntries, ...pageEntries]), {
    headers: { 'Content-Type': 'application/json' },
  });
};
