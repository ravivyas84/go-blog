import { Button } from './Button';

type NewsletterCardProps = {
  compact?: boolean;
  description: string;
  href: string;
  title: string;
};

export function NewsletterCard({
  compact = false,
  description,
  href,
  title,
}: NewsletterCardProps) {
  return (
    <aside className={`newsletter-card${compact ? ' newsletter-card--compact' : ''}`}>
      <div className="newsletter-card__badge">Newsletter</div>
      <h3 className="newsletter-card__title">{title}</h3>
      <p className="newsletter-card__description">{description}</p>
      <form
        className="newsletter-card__form"
        action={href}
        method="get"
        target="_blank"
        rel="noreferrer noopener"
      >
        <input
          className="newsletter-card__input"
          type="email"
          name="email"
          placeholder="Enter your email"
          aria-label="Email address"
        />
        <Button type="submit" variant="secondary" iconRight="arrow-right">
          Subscribe
        </Button>
      </form>
      <p className="newsletter-card__fine-print">Opens the Substack subscription page.</p>
    </aside>
  );
}
