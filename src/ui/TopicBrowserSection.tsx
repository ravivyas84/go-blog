import { topicChips } from '../lib/site-profile';

import { SectionTitle } from './SectionTitle';
import { TopicChip } from './TopicChip';

export function TopicBrowserSection() {
  return (
    <section className="topic-browser-section">
      <SectionTitle icon="link" title="Browse by Topic" />
      <div className="topic-browser-section__chips">
        {topicChips.map((item) => (
          <TopicChip key={item.label} {...item} />
        ))}
      </div>
    </section>
  );
}
