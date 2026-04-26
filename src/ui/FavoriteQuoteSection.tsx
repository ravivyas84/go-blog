import { favoriteQuotes } from '../lib/site-profile';
import type { FavoriteQuote } from '../lib/site-profile';

import { Button } from './Button';

type FavoriteQuoteSectionProps = {
  className?: string;
};

function getAttribution(quote: FavoriteQuote) {
  return quote.source ? `${quote.attribution} - ${quote.source}` : quote.attribution;
}

export function FavoriteQuoteSection({ className }: FavoriteQuoteSectionProps) {
  const quote = favoriteQuotes[0];
  const classes = ['favorite-quote-section', className].filter(Boolean).join(' ');

  return (
    <section className={classes} aria-labelledby="favorite-quote-title" data-favorite-quote-random>
      <div className="favorite-quote-section__body">
        <p className="favorite-quote-section__eyebrow" id="favorite-quote-title">
          Favorite quote
        </p>
        <blockquote className="favorite-quote-section__quote">
          &ldquo;<span data-favorite-quote-text>{quote.text}</span>&rdquo;
        </blockquote>
        <p className="favorite-quote-section__attribution">
          <span data-favorite-quote-attribution>{getAttribution(quote)}</span>
          <a
            className="favorite-quote-section__source-link"
            data-favorite-quote-link
            href={quote.href ?? '#'}
            hidden={!quote.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            Source
          </a>
        </p>
        <p className="favorite-quote-section__why" data-favorite-quote-why>
          {quote.why}
        </p>
      </div>
      <Button href="/quotes/" variant="secondary" iconRight="arrow-right">
        Read all fav quotes
      </Button>
      <script
        type="application/json"
        data-favorite-quotes
        dangerouslySetInnerHTML={{ __html: JSON.stringify(favoriteQuotes) }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(() => {
  document.querySelectorAll('[data-favorite-quote-random]:not([data-favorite-quote-ready])').forEach((section) => {
    section.setAttribute('data-favorite-quote-ready', 'true');
    const dataNode = section.querySelector('[data-favorite-quotes]');
    const quotes = dataNode ? JSON.parse(dataNode.textContent || '[]') : [];
    if (!quotes.length) return;
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const attribution = quote.source ? quote.attribution + ' - ' + quote.source : quote.attribution;
    section.querySelector('[data-favorite-quote-text]').textContent = quote.text;
    section.querySelector('[data-favorite-quote-attribution]').textContent = attribution;
    section.querySelector('[data-favorite-quote-why]').textContent = quote.why;
    const link = section.querySelector('[data-favorite-quote-link]');
    if (link && quote.href) {
      link.href = quote.href;
      link.hidden = false;
    }
  });
})();`,
        }}
      />
    </section>
  );
}
