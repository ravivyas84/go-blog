import { getPostPermalink, getResolvedPagePath, getStaticPages, getTagSummaries, getAllPosts } from '../lib/content';
import { SITE_URL } from '../lib/site';

function urlEntry(path) {
  return `<url><loc>${new URL(path, SITE_URL).toString()}</loc><changefreq>hourly</changefreq></url>`;
}

export async function GET() {
  const posts = await getAllPosts();
  const pages = await getStaticPages();
  const tags = await getTagSummaries();

  const urls = [
    '/',
    '/posts/',
    '/tag/',
    ...pages.map((page) => getResolvedPagePath(page)),
    ...posts.map((post) => getPostPermalink(post)),
    ...tags.map((tag) => `/tag/${tag.slug}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  ${urlEntry(url)}`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
