import { Icon } from './Icon';

type PostShareCardProps = {
  postTitle: string;
  postUrl: string;
};

export function PostShareCard({ postTitle, postUrl }: PostShareCardProps) {
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  return (
    <section className="post-sidebar-card post-share-card" aria-labelledby="post-share-title">
      <h2 className="post-sidebar-card__eyebrow" id="post-share-title">
        Share this post
      </h2>
      <div className="post-share-card__actions">
        <a
          className="post-share-card__action"
          href={twitterUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Share on Twitter"
        >
          <Icon name="twitter" />
        </a>
        <a
          className="post-share-card__action"
          href={linkedInUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Share on LinkedIn"
        >
          <Icon name="linkedin" />
        </a>
        <button
          className="post-share-card__action"
          type="button"
          aria-label="Copy link"
          data-copy-link={postUrl}
        >
          <Icon name="link" />
        </button>
      </div>
    </section>
  );
}
