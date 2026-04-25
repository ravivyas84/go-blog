import { Icon } from './Icon';
import type { ExpertiseItem } from '../lib/site-profile';

type FeatureCardProps = ExpertiseItem;

export function FeatureCard({ description, icon, title }: FeatureCardProps) {
  return (
    <article className="feature-card">
      <div className="feature-card__icon-wrap">
        <Icon name={icon} className="feature-card__icon" />
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__description">{description}</p>
    </article>
  );
}
