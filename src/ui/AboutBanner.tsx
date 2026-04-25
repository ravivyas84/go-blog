import { aboutBanner } from '../lib/site-profile';
import { Icon } from './Icon';

export function AboutBanner() {
  return (
    <section className="about-banner" id="about">
      <img className="about-banner__avatar" src="/assets/ravivyas.avif" alt="Ravi Vyas portrait" loading="lazy" />
      <div className="about-banner__body">
        <h2 className="about-banner__title">{aboutBanner.title}</h2>
        <p className="about-banner__summary">{aboutBanner.summary}</p>
        <a className="about-banner__link" href={aboutBanner.href}>
          <span>{aboutBanner.cta}</span>
          <Icon name="arrow-right" className="about-banner__link-icon" />
        </a>
      </div>
      <blockquote className="about-banner__quote">“ {aboutBanner.quote} ”</blockquote>
    </section>
  );
}
