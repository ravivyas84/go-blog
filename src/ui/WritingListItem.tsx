import { Icon } from './Icon';
import { TagPill } from './TagPill';

type WritingListItemProps = {
  date: string;
  href: string;
  tags: string[];
  title: string;
};

export function WritingListItem({ date, href, tags, title }: WritingListItemProps) {
  return (
    <a className="writing-list-item" href={href}>
      <time className="writing-list-item__date">{date}</time>
      <div className="writing-list-item__body">
        <h3 className="writing-list-item__title">{title}</h3>
        <div className="writing-list-item__tags">
          {tags.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>
      </div>
      <span className="writing-list-item__arrow" aria-hidden="true">
        <Icon name="arrow-right" />
      </span>
    </a>
  );
}
