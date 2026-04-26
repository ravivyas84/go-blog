import { NEWSLETTER_SUBSCRIBE_ACTION } from '../lib/site';
import { Icon } from './Icon';

export function PostSubscribeCard() {
  return (
    <section className="post-sidebar-card post-subscribe-card" aria-labelledby="post-subscribe-title">
      <div className="post-subscribe-card__header">
        <span className="post-subscribe-card__icon-wrap" aria-hidden="true">
          <Icon name="mail" className="post-subscribe-card__icon" />
        </span>
        <h2 className="post-subscribe-card__title" id="post-subscribe-title">
          Get new posts in your inbox
        </h2>
      </div>
      <p className="post-subscribe-card__copy">No spam. Only new essays and experiments.</p>
      <form
        className="post-subscribe-card__form"
        action={NEWSLETTER_SUBSCRIBE_ACTION}
        method="post"
        target="_blank"
      >
        <label className="sr-only" htmlFor="post-subscribe-email">
          Email address
        </label>
        <input
          className="post-subscribe-card__input"
          id="post-subscribe-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <button className="post-subscribe-card__button" type="submit">
          Subscribe
        </button>
      </form>
      <a className="post-subscribe-card__rss" href="/feed.xml">
        <Icon name="rss" className="post-subscribe-card__rss-icon" />
        <span>RSS Feed</span>
        <Icon name="arrow-right" className="post-subscribe-card__rss-arrow" />
      </a>
    </section>
  );
}
