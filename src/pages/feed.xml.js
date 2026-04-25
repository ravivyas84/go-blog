import rss from '@astrojs/rss';

import { getAllPosts, getPostPermalink } from '../lib/content';
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '../lib/site';

export async function GET(context) {
  const posts = await getAllPosts();

  return rss({
    title: SITE_NAME,
    description: SITE_TAGLINE,
    site: context.site ?? SITE_URL,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? post.data.title,
      link: getPostPermalink(post),
      pubDate: post.data.date,
    })),
  });
}
