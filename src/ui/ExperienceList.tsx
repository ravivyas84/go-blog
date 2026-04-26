import { Icon } from './Icon';
import type { ExperienceItem } from '../lib/site-profile';

type ExperienceListProps = {
  items: ExperienceItem[];
};

export function ExperienceList({ items }: ExperienceListProps) {
  return (
    <ul className="experience-list">
      {items.map((item) => (
        <li className="experience-list__item" key={`${item.role}-${item.company}`}>
          <span className="experience-list__icon-wrap" aria-hidden="true">
            <Icon name="briefcase" className="experience-list__icon" />
          </span>
          <div>
            <div className="experience-list__role">{item.role}</div>
            <div className="experience-list__company">{item.company}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
