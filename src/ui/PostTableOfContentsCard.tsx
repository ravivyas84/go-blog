type PostTableOfContentsCardProps = {
  items: Array<{
    id: string;
    text: string;
  }>;
  title?: string;
};

export function PostTableOfContentsCard({ items, title = 'On this page' }: PostTableOfContentsCardProps) {
  return (
    <section className="post-sidebar-card post-toc-card" aria-labelledby="post-toc-title">
      <h2 className="post-sidebar-card__eyebrow" id="post-toc-title">
        {title}
      </h2>
      <ul className="post-toc-card__list">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              className={`post-toc-link${index === 0 ? ' post-toc-link--active' : ''}`}
              href={`#${item.id}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
