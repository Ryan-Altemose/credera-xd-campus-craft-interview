import './style.css';
import { Avatar } from '../avatar';
import { getProfileData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';
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

export const ProfilePosts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
  });

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

  const { pinnedPost } = data;

  return (
    <section id="profile-posts">
      <Collapsible title="Pinned Posts">
        <div className="profile-post-results">
          <div className="content-card">
            <div className="post-author fade-in">
              <Avatar
                className="post-author-avatar fade-in"
                profile={pinnedPost}
              />
              <div className="post-author-info fade-in">
                <p className="page-paragraph">
                  {pinnedPost.authorFirstName} {pinnedPost.authorLastName}
                </p>
                <p className="page-micro">
                  {pinnedPost.jobTitle} @ {pinnedPost.companyName}
                </p>
              </div>
            </div>
            <p className="page-body post-content fade-in">{pinnedPost.post}</p>
            <div className="post-meta page-micro fade-in">
              <time dateTime={pinnedPost.publishDate}>
                {formatPublishedDate(pinnedPost.publishDate)}
              </time>
              <span aria-hidden="true">{'·'}</span>
              <span>
                {pinnedPost.city}, {pinnedPost.state}
              </span>
            </div>
          </div>
        </div>
      </Collapsible>
    </section>
  );
};
