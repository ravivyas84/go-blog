import { Icon } from './Icon';

type PostNavigationLink = {
  href: string;
  title: string;
} | null;

type PostNavigationProps = {
  newer: PostNavigationLink;
  older: PostNavigationLink;
};

export function PostNavigation({ newer, older }: PostNavigationProps) {
  if (!newer && !older) {
    return null;
  }

  return (
    <nav className="post-navigation" aria-label="Post navigation">
      <div className="post-navigation__column">
        {newer && (
          <a className="post-navigation__link post-navigation__link--previous" href={newer.href}>
            <span className="post-navigation__label">
              <Icon name="arrow-right" className="post-navigation__arrow post-navigation__arrow--left" />
              Previous Post
            </span>
            <span className="post-navigation__title">{newer.title}</span>
          </a>
        )}
      </div>

      <div className="post-navigation__column post-navigation__column--right">
        {older && (
          <a className="post-navigation__link post-navigation__link--next" href={older.href}>
            <span className="post-navigation__label">
              Next Post
              <Icon name="arrow-right" className="post-navigation__arrow" />
            </span>
            <span className="post-navigation__title">{older.title}</span>
          </a>
        )}
      </div>
    </nav>
  );
}
