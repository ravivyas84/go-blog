import { siteNav } from '../lib/site-profile';
import type { NavItem as NavItemData } from '../lib/site-profile';

import { BrandMark } from './BrandMark';
import { Icon } from './Icon';
import { NavItem } from './NavItem';
import { SearchField } from './SearchField';
import { ThemeToggle } from './ThemeToggle';

type SiteHeaderProps = {
  currentPath: string;
  items?: NavItemData[];
};

function isActive(currentPath: string, match: string) {
  if (match === '/posts/') {
    return currentPath === '/posts/' || currentPath.startsWith('/tag/') || /^\/\d{4}\//.test(currentPath);
  }

  if (match === '/') {
    return currentPath === '/';
  }

  return currentPath.startsWith(match);
}

export function SiteHeader({ currentPath, items = siteNav }: SiteHeaderProps) {
  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <BrandMark />

          <nav className="site-header__nav" aria-label="Primary">
            {items.map((item) => (
              <NavItem
                key={item.label}
                active={isActive(currentPath, item.match)}
                href={item.href}
                icon={item.icon}
                label={item.label}
                match={item.match}
              />
            ))}
          </nav>

          <div className="site-header__controls">
            <ThemeToggle />
            <div className="site-header__search-desktop">
              <SearchField />
            </div>
            <button
              className="site-header__icon-button site-header__icon-button--menu"
              type="button"
              aria-label="Open menu"
              aria-controls="site-header-drawer"
              aria-expanded="false"
              data-site-menu-toggle
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <div className="site-header__drawer-backdrop" data-site-menu-close />

      <div className="site-header__drawer" id="site-header-drawer" aria-label="Mobile navigation">
        <div className="site-header__drawer-header">
          <span className="site-header__drawer-title">Menu</span>
          <button
            className="site-header__icon-button"
            type="button"
            aria-label="Close menu"
            data-site-menu-toggle
          >
            <Icon name="menu" />
          </button>
        </div>

        <div className="site-header__drawer-search">
          <SearchField />
        </div>

        <nav className="site-header__drawer-nav" aria-label="Mobile primary">
          {items.map((item) => (
            <NavItem
              key={`drawer-${item.label}`}
              active={isActive(currentPath, item.match)}
              href={item.href}
              icon={item.icon}
              label={item.label}
              match={item.match}
            />
          ))}
        </nav>
      </div>
    </>
  );
}
