import './style.css';
import { Avatar } from '../avatar';
import { useState } from 'react';

const formatPublishedDate = date =>
  new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

function Collapsible({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="profile-posts-collapsible">
      <h2 className="page-heading-2">
        <button
          className="profile-posts-toggle"
          type="button"
          onClick={() => setIsOpen(open => !open)}
          aria-expanded={isOpen}
          aria-controls="pinned-post-content"
        >
          <span>{title}</span>
          <span className="profile-posts-chevron" aria-hidden="true" />
        </button>
      </h2>

      <div
        className="profile-posts-collapsible-content"
        id="pinned-post-content"
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
}

function PinnedPostCard({ post }) {
  return (
    <div className="content-card">
      <div className="post-author fade-in">
        <Avatar
          className="post-author-avatar fade-in"
          profile={post}
        />
        <div className="post-author-info fade-in">
          <p className="page-paragraph">
            {post.authorFirstName} {post.authorLastName}
          </p>
          <p className="page-micro">
            {post.jobTitle} @ {post.companyName}
          </p>
        </div>
      </div>
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
      {pinnedPosts.length > 0 ? (
        <Collapsible title="Pinned Posts">
          <div className="profile-post-results">
            {pinnedPosts.map((post, index) => (
              <PinnedPostCard
                key={`${post.authorFirstName}-${post.authorLastName}-${post.publishDate}-${index}`}
                post={post}
              />
            ))}
          </div>
        </Collapsible>
      ) : (
        <h2 className="page-heading-2">No Pinned Posts</h2>
      )}
    </section>
  );
};
