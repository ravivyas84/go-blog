import type { ProjectItem } from '../lib/site-profile';

import { Icon } from './Icon';
import { StatusPill } from './StatusPill';

type ProjectCardConceptProps = ProjectItem;

export function ProjectCardConcept({ description, href, icon, label, status, title }: ProjectCardConceptProps) {
  return (
    <article className="project-card-concept">
      <div className="project-card-concept__top">
        <span className="project-card-concept__icon-wrap">
          <Icon name={icon} className="project-card-concept__icon" />
        </span>
        <StatusPill status={status} />
      </div>
      <h3 className="project-card-concept__title">{title}</h3>
      <p className="project-card-concept__description">{description}</p>
      <a className="project-card-concept__link" href={href}>
        {label} →
      </a>
    </article>
  );
}
