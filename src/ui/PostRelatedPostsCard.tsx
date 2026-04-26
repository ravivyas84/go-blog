type PostRelatedPostsCardProps = {
  items: Array<{
    date: string;
    href: string;
    title: string;
  }>;
};

export function PostRelatedPostsCard({ items }: PostRelatedPostsCardProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="post-sidebar-card post-related-card" aria-labelledby="post-related-title">
      <h2 className="post-sidebar-card__eyebrow" id="post-related-title">
        Related posts
      </h2>
      <div className="post-related-card__list">
        {items.map((item) => (
          <a className="post-related-card__item" href={item.href} key={item.href}>
            <div className="post-related-card__body">
              <h3 className="post-related-card__title">{item.title}</h3>
              <p className="post-related-card__date">{item.date}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
