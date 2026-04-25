import { siteNav } from '../lib/site-profile';

import { BrandMark } from './BrandMark';
import { NavItem } from './NavItem';
import { SearchField } from './SearchField';
import { ThemeToggle } from './ThemeToggle';

type SiteHeaderProps = {
  currentPath: string;
};

function isActive(currentPath: string, match: string) {
  if (match === '/') {
    return currentPath === '/';
  }

  if (match.startsWith('/#')) {
    return false;
  }

  return currentPath.startsWith(match);
}

export function SiteHeader({ currentPath }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <BrandMark />

        <nav className="site-header__nav" aria-label="Primary">
          {siteNav.map((item) => (
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
          <SearchField />
        </div>
      </div>
    </header>
  );
}
