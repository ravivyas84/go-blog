import type { TopicChipItem } from '../lib/site-profile';

type TopicChipProps = TopicChipItem;

export function TopicChip({ color, href, label }: TopicChipProps) {
  return (
    <a className={`topic-chip topic-chip--${color}`} href={href}>
      {label}
    </a>
  );
}
