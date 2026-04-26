import { Button } from './Button';

type PostPreviewCardProps = {
  date: string;
  description?: string;
  href: string;
  title: string;
};

export function PostPreviewCard({ date, description, href, title }: PostPreviewCardProps) {
  return (
    <article className="post-card">
      <p className="post-card__date">{date}</p>
      <h3 className="post-card__title">
        <a href={href}>{title}</a>
      </h3>
      {description && <p className="post-card__description">{description}</p>}
      <Button href={href} variant="ghost" iconRight="arrow-right" className="post-card__cta">
        Read more
      </Button>
    </article>
  );
}
