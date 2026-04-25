import {
  aboutPageEducation,
  aboutPageExperience,
  aboutPageNote,
  aboutPageOtherActivities,
  aboutPageProfile,
  aboutPageQuote,
  aboutPageSiteLinks,
  aboutPageWritingContributions,
} from '../lib/site-profile';

import { Icon } from './Icon';
import { PostSubscribeCard } from './PostSubscribeCard';
import { PostTableOfContentsCard } from './PostTableOfContentsCard';

function AboutSiteLinksCard() {
  return (
    <section className="post-sidebar-card about-page__site-links" aria-labelledby="about-site-links-title">
      <h2 className="post-sidebar-card__eyebrow" id="about-site-links-title">
        On this site
      </h2>
      <div className="about-page__site-links-list">
        {aboutPageSiteLinks.map((item) => (
          <a
            className="about-page__site-link"
            href={item.href}
            key={item.title}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noreferrer noopener' : undefined}
          >
            <span className="about-page__site-link-icon">
              <Icon name={item.icon} />
            </span>
            <span className="about-page__site-link-body">
              <span className="about-page__site-link-title">{item.title}</span>
              <span className="about-page__site-link-copy">{item.copy}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function AboutNoteCard() {
  return (
    <aside className="post-sidebar-card post-note-card" aria-hidden="true">
      {aboutPageNote.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </aside>
  );
}

const tocItems = [
  { id: 'who-i-am', text: 'Who I Am' },
  { id: 'experience', text: 'Experience' },
  { id: 'other-stuff', text: 'Other Stuff' },
  { id: 'education', text: 'Education' },
];

export function AboutPage() {
  return (
    <div className="about-page">
      <article className="about-page__main">
        <header className="about-page__hero">
          <h1 className="about-page__title">About Ravi Vyas</h1>
          <div className="about-page__doodles" aria-hidden="true">
            <p className="about-page__doodle-note">
              Learning
              <br />
              building
              <br />
              sharing
            </p>
            <span className="about-page__doodle-mark">↷</span>
          </div>
        </header>

        <section className="about-page__profile-card" id="who-i-am">
          <img
            className="about-page__profile-avatar"
            src="/assets/ravivyas.avif"
            alt="Ravi Vyas portrait"
            loading="eager"
          />
          <div className="about-page__profile-body">
            <h2 className="about-page__profile-title">{aboutPageProfile.title}</h2>
            <p>{aboutPageProfile.intro}</p>
            <p>{aboutPageProfile.current}</p>
            <div className="about-page__traits">
              {aboutPageProfile.traits.map((trait) => (
                <span className="about-page__trait" key={trait}>
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="about-page__section" id="experience">
          <div className="about-page__section-title">
            <Icon name="projects" className="about-page__section-icon" />
            <h2>Professional Experience</h2>
          </div>
          <ul className="about-page__experience-list">
            {aboutPageExperience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="about-page__section-note">Work in progress, always.</p>
        </section>

        <section className="about-page__details-grid" id="other-stuff">
          <article className="about-page__detail-card">
            <div className="about-page__section-title">
              <Icon name="spark" className="about-page__section-icon" />
              <h2>Other Activities</h2>
            </div>
            <p>{aboutPageOtherActivities}</p>
          </article>

          <article className="about-page__detail-card">
            <div className="about-page__section-title">
              <Icon name="writing" className="about-page__section-icon" />
              <h2>Writing Contributions</h2>
            </div>
            <ul className="about-page__contributions-list">
              {aboutPageWritingContributions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="about-page__detail-card" id="education">
            <div className="about-page__section-title">
              <Icon name="book-open" className="about-page__section-icon" />
              <h2>Education</h2>
            </div>
            <p>{aboutPageEducation}</p>
          </article>
        </section>

        <blockquote className="about-page__quote">{aboutPageQuote}</blockquote>
      </article>

      <aside className="about-page__sidebar">
        <PostTableOfContentsCard items={tocItems} title="About this page" />
        <AboutSiteLinksCard />
        <AboutNoteCard />
        <PostSubscribeCard />
      </aside>
    </div>
  );
}
