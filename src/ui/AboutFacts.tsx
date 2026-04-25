import { Icon } from './Icon';
import type { AboutFact } from '../lib/site-profile';

type AboutFactsProps = {
  items: AboutFact[];
};

export function AboutFacts({ items }: AboutFactsProps) {
  return (
    <ul className="about-facts">
      {items.map((item) => (
        <li className="about-facts__item" key={item.label}>
          <span className="about-facts__icon-wrap" aria-hidden="true">
            <Icon name={item.icon} className="about-facts__icon" />
          </span>
          <div>
            <div className="about-facts__label">{item.label}</div>
            <div className="about-facts__value">{item.value}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
