import { Icon } from './Icon';
import type { IconName } from '../lib/site-profile';

type SectionTitleProps = {
  actionHref?: string;
  actionLabel?: string;
  headingLevel?: 1 | 2;
  icon: IconName;
  title: string;
};

export function SectionTitle({ actionHref, actionLabel, headingLevel = 2, icon, title }: SectionTitleProps) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <div className="section-title">
      <div className="section-title__main">
        <Icon name={icon} className="section-title__icon" />
        <Heading className="section-title__text">{title}</Heading>
      </div>
      {actionHref && actionLabel && (
        <a className="section-title__action" href={actionHref}>
          <span>{actionLabel}</span>
          <Icon name="arrow-right" className="section-title__action-icon" />
        </a>
      )}
    </div>
  );
}
