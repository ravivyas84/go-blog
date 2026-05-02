import { useEffect, useRef, useState } from 'react';

import { Icon } from './Icon';
import { WritingListItem } from './WritingListItem';

type SearchEntry = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  date: string;
  content: string;
};

function formatTag(tag: string) {
  return tag.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function filterEntries(entries: SearchEntry[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return entries.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.tags.some((t) => t.toLowerCase().includes(q)) ||
      e.content.toLowerCase().includes(q),
  );
}

export function SearchResults() {
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialised = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') ?? '';
    setQuery(q);

    fetch('/search.json')
      .then((r) => r.json())
      .then((data: SearchEntry[]) => {
        setEntries(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!initialised.current) {
      initialised.current = true;
      return;
    }
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    const newUrl = `${window.location.pathname}${query ? `?${params}` : ''}`;
    history.replaceState(null, '', newUrl);
  }, [query]);

  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  const results = filterEntries(entries, query);
  const hasQuery = query.trim().length > 0;

  return (
    <section className="search-results-section">
      <div className="search-results-section__field">
        <Icon name="search" className="search-results-section__icon" />
        <input
          ref={inputRef}
          className="search-results-section__input"
          type="search"
          placeholder="Search posts, pages, topics…"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p className="search-results-section__status">Loading…</p>}

      {!loading && hasQuery && results.length === 0 && (
        <p className="search-results-section__status">
          No results for <strong>{query}</strong>.
        </p>
      )}

      {!loading && !hasQuery && (
        <p className="search-results-section__status">Type to search all posts and pages.</p>
      )}

      {results.length > 0 && (
        <div className="latest-writing-section__list">
          {results.map((entry) => (
            <WritingListItem
              key={entry.href}
              date={entry.date}
              href={entry.href}
              tags={entry.tags.map(formatTag)}
              title={entry.title}
            />
          ))}
        </div>
      )}
    </section>
  );
}
