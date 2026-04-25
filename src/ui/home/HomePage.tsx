import { AboutBanner } from '../AboutBanner';
import { CurrentlyExploringCard } from '../CurrentlyExploringCard';
import { HeroCanvas } from '../HeroCanvas';
import { LatestWritingSection } from '../LatestWritingSection';
import { ProjectsSection } from '../ProjectsSection';
import { TopicBrowserSection } from '../TopicBrowserSection';

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
      <TopicBrowserSection />
      <AboutBanner />
    </div>
  );
}
