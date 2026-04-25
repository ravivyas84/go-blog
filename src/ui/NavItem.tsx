import type { NavItem as NavItemData } from '../lib/site-profile';

import { Icon } from './Icon';

type NavItemProps = NavItemData & {
  active: boolean;
};

export function NavItem({ active, href, icon, label }: NavItemProps) {
  return (
    <a className={`nav-item${active ? ' nav-item--active' : ''}`} href={href} aria-current={active ? 'page' : undefined}>
      <Icon name={icon} className="nav-item__icon" />
      <span>{label}</span>
    </a>
  );
}
