import { explorationItems } from '../lib/site-profile';
import { Icon } from './Icon';
import { SectionTitle } from './SectionTitle';

export function CurrentlyExploringCard() {
  return (
    <section className="currently-exploring">
      <SectionTitle icon="flask" title="Currently Exploring" />
      <div className="currently-exploring__card">
        <ul className="currently-exploring__list">
          {explorationItems.map((item) => (
            <li className="currently-exploring__item" key={item.text}>
              <Icon name={item.icon} className="currently-exploring__item-icon" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
        <div className="currently-exploring__footer">Work in progress</div>
      </div>
    </section>
  );
}
