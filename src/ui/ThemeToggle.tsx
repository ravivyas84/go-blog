import { Icon } from './Icon';

export function ThemeToggle() {
  return (
    <button className="theme-toggle" type="button" data-theme-toggle aria-label="Toggle theme">
      <span className="theme-toggle__icon theme-toggle__icon--sun" data-theme-icon="light">
        <Icon name="sun" />
      </span>
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
      </span>
      <span className="theme-toggle__icon theme-toggle__icon--moon" data-theme-icon="dark">
        <Icon name="moon" />
      </span>
    </button>
  );
}
