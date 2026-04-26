import { Button } from './Button';
import type { ProjectItem } from '../lib/site-profile';

type ProjectCardProps = ProjectItem;

export function ProjectCard({ description, href, label, note, title }: ProjectCardProps) {
  const external = href.startsWith('http');

  return (
    <article className="project-card">
      <div className="project-card__monogram" aria-hidden="true">
        {title
          .split(' ')
          .slice(0, 2)
          .map((part) => part.charAt(0))
          .join('')}
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>
        <p className="project-card__note">{note}</p>
        <Button href={href} variant="ghost" external={external} iconRight="arrow-right">
          {label}
        </Button>
      </div>
    </article>
  );
}
