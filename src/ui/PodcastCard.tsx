import { Button } from './Button';

type PodcastCardProps = {
  blurb: string;
  href: string;
  title: string;
};

export function PodcastCard({ blurb, href, title }: PodcastCardProps) {
  return (
    <article className="podcast-card">
      <div className="podcast-card__cover" aria-hidden="true">
        <span>MUSINGS</span>
        <span>OF A</span>
        <span>LEARNER</span>
      </div>
      <div className="podcast-card__content">
        <h3 className="podcast-card__title">{title}</h3>
        <p className="podcast-card__description">{blurb}</p>
        <Button href={href} variant="secondary" external iconRight="arrow-right">
          Listen now
        </Button>
      </div>
    </article>
  );
}
