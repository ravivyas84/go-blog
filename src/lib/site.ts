export const SITE_URL = 'https://ravivyas.com';
export const SITE_NAME = 'Ravi Vyas';
export const SITE_TAGLINE = 'Musings of a Learner';
export const DEFAULT_AUTHOR = 'Ravi Vyas';
export const FAVICON_PATH = '/favicon.ico';
export const UMAMI_SCRIPT_SRC = 'https://umami.ravivyas.com/script.js';
export const UMAMI_WEBSITE_ID = '50b4b12b-136c-43fd-9ce3-f363e870995b';
export const LATEST_POST_COUNT = 10;

function pad(value: number) {
  return value.toString().padStart(2, '0');
}

export function formatPostDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function formatDisplayDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function getPostPath(date: Date, slug: string) {
  return `/${date.getUTCFullYear()}/${pad(date.getUTCMonth() + 1)}/${pad(date.getUTCDate())}/${slug}/`;
}

export function getPagePath(slug: string) {
  if (slug === 'index') {
    return '/';
  }

  return `/${slug.replace(/^\/+|\/+$/g, '')}/`;
}

export function slugifyTag(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function toAbsoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return new URL(pathOrUrl, SITE_URL).toString();
}
