import { Icon } from './Icon';

export function SearchField() {
  return (
    <div className="search-field" role="search" aria-label="Search">
      <Icon name="search" className="search-field__icon" />
      <input
        className="search-field__input"
        type="search"
        placeholder="Search..."
        aria-label="Search"
        readOnly
      />
      <span className="search-field__shortcut" aria-hidden="true">
        /
      </span>
    </div>
  );
}
