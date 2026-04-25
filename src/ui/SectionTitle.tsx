import { Icon } from './Icon';
import type { IconName } from '../lib/site-profile';

type SectionTitleProps = {
  actionHref?: string;
  actionLabel?: string;
  icon: IconName;
  title: string;
};

export function SectionTitle({ actionHref, actionLabel, icon, title }: SectionTitleProps) {
  return (
    <div className="section-title">
      <div className="section-title__main">
        <Icon name={icon} className="section-title__icon" />
        <h2 className="section-title__text">{title}</h2>
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
