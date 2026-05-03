import { Icon } from './Icon';

export function SearchField() {
  return (
    <form className="search-field" role="search" aria-label="Search" action="/search/" method="get">
      <Icon name="search" className="search-field__icon" />
      <input
        className="search-field__input"
        type="search"
        name="q"
        placeholder="Search..."
        aria-label="Search"
        data-search-input
      />
      <span className="search-field__shortcut" aria-hidden="true">
        /
      </span>
    </form>
  );
}
