import { heroDescription, heroTraits } from '../lib/site-profile';

import { Button } from './Button';
import { HeroProfileCard } from './HeroProfileCard';
import { TagPill } from './TagPill';

export function HeroCanvas() {
  return (
    <section className="hero-canvas">
      <div className="hero-canvas__copy">
        <div className="hero-canvas__traits">
          <TagPill label={heroTraits.join(' · ')} />
        </div>
        <h1 className="hero-canvas__title">
          I build, learn and write
          <br />
          with the help of <span>AI.</span>
        </h1>
        <p className="hero-canvas__description">{heroDescription}</p>
        <div className="hero-canvas__actions">
          <Button href="/posts/" iconLeft="writing">
            Browse latest posts
          </Button>
          <Button href="/#projects" iconLeft="box" variant="secondary">
            Explore projects
          </Button>
        </div>
      </div>

      <div className="hero-canvas__art" aria-hidden="true">
        <div className="hero-canvas__pattern" />
        <div className="hero-canvas__scribble hero-canvas__scribble--top">↶</div>
        <div className="hero-canvas__scribble hero-canvas__scribble--note">
          Always curious.
          <br />
          Always building.
        </div>
      </div>

      <HeroProfileCard />
    </section>
  );
}
