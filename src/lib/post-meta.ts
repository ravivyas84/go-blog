import type { CollectionEntry } from 'astro:content';

import { DEFAULT_AUTHOR, FAVICON_PATH, SITE_NAME, toAbsoluteUrl } from './site';
import { getPostPermalink } from './content';

const HTML_IMAGE_REGEX = /<img[^>]+src=["']([^"']+)["']/i;
const MARKDOWN_IMAGE_REGEX = /!\[[^\]]*]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/i;

function extractFirstImageSource(body: string) {
  const htmlMatch = body.match(HTML_IMAGE_REGEX);
  if (htmlMatch?.[1]) {
    return htmlMatch[1];
  }

  const markdownMatch = body.match(MARKDOWN_IMAGE_REGEX);
  return markdownMatch?.[1];
}

export function getPostImageSource(post: CollectionEntry<'posts'>) {
  return extractFirstImageSource(post.body) ?? null;
}

export function getPostImageUrl(post: CollectionEntry<'posts'>) {
  const firstImage = getPostImageSource(post);
  if (!firstImage) {
    return toAbsoluteUrl(FAVICON_PATH);
  }

  return toAbsoluteUrl(firstImage);
}

export function buildPostJsonLd(post: CollectionEntry<'posts'>) {
  const postUrl = toAbsoluteUrl(getPostPermalink(post));

  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': postUrl,
      },
      headline: post.data.title,
      description: post.data.description,
      image: getPostImageUrl(post),
      datePublished: post.data.date.toISOString().slice(0, 10),
      dateModified: post.data.date.toISOString().slice(0, 10),
      url: postUrl,
      author: {
        '@type': 'Person',
        name: post.data.author || DEFAULT_AUTHOR,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: toAbsoluteUrl(FAVICON_PATH),
        },
      },
    },
    null,
    2,
  );
}
