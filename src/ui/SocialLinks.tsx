import { Icon } from './Icon';
import type { SocialLink } from '../lib/site-profile';

type SocialLinksProps = {
  links: SocialLink[];
};

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="social-links" aria-label="Social links">
      {links.map((link) => (
        <a
          className="social-links__link"
          href={link.href}
          key={`${link.label}-${link.href}`}
          aria-label={link.label}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
        >
          <Icon name={link.icon} className="social-links__icon" />
          <span className="sr-only">{link.label}</span>
        </a>
      ))}
    </div>
  );
}
