import { heroProfile } from '../lib/site-profile';
import { Icon } from './Icon';

export function HeroProfileCard() {
  return (
    <aside className="hero-profile-card">
      <div className="hero-profile-card__head">
        <img
          className="hero-profile-card__avatar"
          src="/assets/ravivyas.avif"
          alt="Ravi Vyas portrait"
          loading="lazy"
        />
        <div className="hero-profile-card__doodles" aria-hidden="true">
          <span className="hero-profile-card__doodle hero-profile-card__doodle--smile">◡̈</span>
          <span className="hero-profile-card__doodle hero-profile-card__doodle--star">✳</span>
        </div>
      </div>
      <h2 className="hero-profile-card__title">{heroProfile.title}</h2>
      <p className="hero-profile-card__copy">{heroProfile.intro}</p>
      <p className="hero-profile-card__copy">{heroProfile.current}</p>
      <a className="hero-profile-card__link" href={heroProfile.href}>
        <span>{heroProfile.cta}</span>
        <Icon name="arrow-right" className="hero-profile-card__link-icon" />
      </a>
    </aside>
  );
}
