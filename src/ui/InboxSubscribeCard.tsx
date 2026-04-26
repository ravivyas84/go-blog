import { inboxSubscribe } from '../lib/site-profile';
import { Icon } from './Icon';

export function InboxSubscribeCard() {
  return (
    <aside className="inbox-subscribe-card">
      <div className="inbox-subscribe-card__title-row">
        <span>{inboxSubscribe.title}</span>
        <Icon name="rss" className="inbox-subscribe-card__icon" />
      </div>
      <a
        className="inbox-subscribe-card__link"
        href={inboxSubscribe.href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {inboxSubscribe.cta} →
      </a>
    </aside>
  );
}
