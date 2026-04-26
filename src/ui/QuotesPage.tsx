import { favoriteQuotes } from '../lib/site-profile';

import { SectionTitle } from './SectionTitle';

export function QuotesPage() {
  return (
    <div className="quotes-page">
      <header className="quotes-page__hero">
        <p className="quotes-page__eyebrow">Collected notes</p>
        <h1 className="quotes-page__title">Favorite Quotes</h1>
        <p className="quotes-page__copy">
          Lines I keep coming back to, who said them, and why they matter to me.
        </p>
      </header>

      <section className="quotes-page__section">
        <SectionTitle icon="book-open" title="All Favorite Quotes" />
        <div className="quotes-page__grid">
          {favoriteQuotes.map((quote) => (
            <article className="quote-card" key={quote.id}>
              <blockquote className="quote-card__text">&ldquo;{quote.text}&rdquo;</blockquote>
              <p className="quote-card__attribution">
                {quote.href ? (
                  <a href={quote.href} target="_blank" rel="noreferrer noopener">
                    {quote.attribution}
                  </a>
                ) : (
                  quote.attribution
                )}
                {quote.source && <span> - {quote.source}</span>}
              </p>
              <p className="quote-card__why">{quote.why}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
