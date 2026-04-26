import { CurrentlyExploringCard } from '../CurrentlyExploringCard';
import { FavoriteQuoteSection } from '../FavoriteQuoteSection';
import { HeroCanvas } from '../HeroCanvas';
import { LatestWritingSection } from '../LatestWritingSection';
import { ProjectsSection } from '../ProjectsSection';

type HomePageProps = {
  latestPosts: Array<{
    date: string;
    href: string;
    id: string;
    tags: string[];
    title: string;
  }>;
};

export function HomePage({ latestPosts }: HomePageProps) {
  return (
    <div className="home-page-concept">
      <HeroCanvas />

      <section className="home-page-concept__writing">
        <LatestWritingSection items={latestPosts} />
        <CurrentlyExploringCard />
      </section>
      <ProjectsSection />
      <FavoriteQuoteSection />
    </div>
  );
}
