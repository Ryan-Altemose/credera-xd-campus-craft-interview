import './style.css';
import { Avatar } from '../avatar';
import { useId, useState } from 'react';

const formatPublishedDate = date =>
  new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

function PinnedPostCard({ post }) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsId = useId();

  return (
    <div className="content-card">
      <button
        className="profile-post-toggle"
        type="button"
        onClick={() => setIsOpen(open => !open)}
        aria-expanded={isOpen}
        aria-controls={detailsId}
      >
        <Avatar
          className="post-author-avatar fade-in"
          profile={post}
        />
        <span className="post-author-info fade-in">
          <span className="page-paragraph">
            {post.authorFirstName} {post.authorLastName}
          </span>
          <span className="page-micro">
            {post.jobTitle} @ {post.companyName}
          </span>
        </span>
        <span className="profile-posts-chevron" aria-hidden="true" />
      </button>
      <div className="profile-post-details" id={detailsId} hidden={!isOpen}>
        <p className="page-body post-content fade-in">{post.post}</p>
        <div className="post-meta page-micro fade-in">
          <time dateTime={post.publishDate}>
            {formatPublishedDate(post.publishDate)}
          </time>
          <span aria-hidden="true">{'·'}</span>
          <span>
            {post.city}, {post.state}
          </span>
        </div>
      </div>
    </div>
  );
}

export const ProfilePosts = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <section id="profile-posts">
        <h2 className="page-heading-2">Pinned Posts</h2>
        <div className="profile-post-results">
          <div className="content-card fade-in">
            <div className="post-author">
              <div className="post-author-avatar loading"></div>
              <div className="post-author-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block skeleton-block--quarter loading"></div>
              </div>
            </div>
            <div className="post-content skeleton-block loading"></div>
          </div>
        </div>
      </section>
    );
  }

  const pinnedPosts = data?.pinnedPosts ?? [];

  return (
    <section id="profile-posts">
      <h2 className="page-heading-2">
        {pinnedPosts.length > 0 ? 'Pinned Posts' : 'No Pinned Posts'}
      </h2>
      {pinnedPosts.length > 0 ? (
        <div className="profile-post-results">
          {pinnedPosts.map((post, index) => (
            <PinnedPostCard
              key={`${post.authorFirstName}-${post.authorLastName}-${post.publishDate}-${index}`}
              post={post}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};
