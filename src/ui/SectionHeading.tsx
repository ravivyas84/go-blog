import { Button } from './Button';

type SectionHeadingProps = {
  actionHref?: string;
  actionLabel?: string;
  actionExternal?: boolean;
  eyebrow?: string;
  title: string;
};

export function SectionHeading({
  actionExternal = false,
  actionHref,
  actionLabel,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <div className="section-heading__eyebrow">{eyebrow}</div>}
        <h2 className="section-heading__title">{title}</h2>
      </div>
      {actionHref && actionLabel && (
        <Button
          href={actionHref}
          variant="ghost"
          external={actionExternal}
          iconRight="arrow-right"
          className="section-heading__action"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
