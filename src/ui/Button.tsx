import type { ReactNode } from 'react';

import { Icon } from './Icon';
import type { IconName } from '../lib/site-profile';

type ButtonProps = {
  children: ReactNode;
  className?: string;
  external?: boolean;
  href?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  type?: 'button' | 'submit';
  variant?: 'ghost' | 'primary' | 'secondary';
};

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

export function Button({
  children,
  className,
  external = false,
  href,
  iconLeft,
  iconRight,
  type = 'button',
  variant = 'primary',
}: ButtonProps) {
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} className="button__icon" />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} className="button__icon" />}
    </>
  );

  const classes = joinClasses('button', `button--${variant}`, className);

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type={type}>
      {content}
    </button>
  );
}
