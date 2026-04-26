import { SITE_NAME } from '../lib/site';

export function BrandMark() {
  return (
    <a className="brand-mark" href="/" aria-label={SITE_NAME}>
      <span className="brand-mark__text">{SITE_NAME.toUpperCase()}</span>
    </a>
  );
}
