import { SectionTitle } from './SectionTitle';
import { WritingListItem } from './WritingListItem';
import { TopicBrowserSection } from './TopicBrowserSection';

type LatestWritingSectionProps = {
  items: Array<{
    date: string;
    href: string;
    id: string;
    tags: string[];
    title: string;
  }>;
};

export function LatestWritingSection({ items }: LatestWritingSectionProps) {
  return (
    <section className="latest-writing-section">
      <SectionTitle
        icon="writing"
        title="Latest Writing"
        actionHref="/posts/"
        actionLabel="View all posts"
      />
      <div className="latest-writing-section__list">
        {items.map((item) => (
          <WritingListItem
            key={item.id}
            date={item.date}
            href={item.href}
            tags={item.tags}
            title={item.title}
          />
        ))}
      </div>
      <TopicBrowserSection />
    </section>
  );
}
