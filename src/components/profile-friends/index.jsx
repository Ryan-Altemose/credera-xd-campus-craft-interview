import './style.css';
import { Avatar } from '../avatar';
import { getFriendsListData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';

const REGULAR_FRIENDS_PREVIEW_COUNT = 3;

const getFriendLastName = friend => {
  if (friend.lastName) return friend.lastName;

  return friend.name?.trim().split(/\s+/).at(-1) ?? '';
};

const getFriendDisplayName = friend =>
  friend.firstName || friend.lastName
    ? [friend.firstName, friend.lastName].filter(Boolean).join(' ')
    : friend.name;

const sortFriends = friends =>
  [...friends].sort((a, b) => {
    if (a.topFriend !== b.topFriend) return a.topFriend ? -1 : 1;

    return getFriendLastName(a).localeCompare(getFriendLastName(b), undefined, {
      sensitivity: 'base',
    });
  });

const matchesSearch = (friend, searchQuery) => {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return true;

  const searchableFields = [
    getFriendDisplayName(friend),
    friend.jobTitle,
    friend.position,
    friend.companyName,
    friend.company,
  ];

  return searchableFields.some(field =>
    String(field ?? '').toLowerCase().includes(query),
  );
};

const FriendList = ({ friends }) => (
  <ul className="profile-friends-list">
    {friends.map(friend => (
      <li
        className={`profile-list-item fade-in${
          friend.topFriend ? ' profile-list-item--top-friend' : ''
        }`}
        key={friend.id ?? getFriendDisplayName(friend)}
      >
        <Avatar className="profile-list-item-avatar" profile={friend} />
        <div className="profile-list-item-info">
          {friend.topFriend && (
            <span className="top-friend-flag">Top friend</span>
          )}
          <p className="page-paragraph">{getFriendDisplayName(friend)}</p>
          <p className="page-micro">
            {friend.jobTitle} @ {friend.companyName}
          </p>
        </div>
      </li>
    ))}
  </ul>
);

export const ProfileFriends = () => {
  const dialogRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: getFriendsListData,
  });

  if (isLoading)
    return (
      <section id="profile-friends">
        <div className="content-card fade-in">
          <h2 className="page-heading-2">Friends</h2>
          <ul className="profile-friends-list">
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );

  const friends = sortFriends(data.friends);
  const topFriends = friends.filter(friend => friend.topFriend);
  const regularFriends = friends.filter(friend => !friend.topFriend);
  const previewFriends = [
    ...topFriends,
    ...regularFriends.slice(0, REGULAR_FRIENDS_PREVIEW_COUNT),
  ];
  const hasHiddenFriends = previewFriends.length < friends.length;
  const filteredFriends = friends.filter(friend =>
    matchesSearch(friend, searchQuery),
  );
  const openFriendsDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    setSearchQuery('');
    dialog.showModal();
    dialog.querySelector('h2')?.focus();
  };

  return (
    <section id="profile-friends">
      <div className="content-card fade-in">
        <h2 className="page-heading-2">Friends</h2>
        <FriendList friends={previewFriends} />
        {hasHiddenFriends && (
          <button
            className="profile-friends-view-all"
            type="button"
            onClick={openFriendsDialog}
          >
            View all {friends.length} friends
          </button>
        )}
      </div>

      <dialog
        className="profile-friends-dialog"
        ref={dialogRef}
        aria-labelledby="profile-friends-dialog-title"
      >
        <div className="profile-friends-dialog-header">
          <h2
            className="page-heading-2 profile-friends-dialog-title"
            id="profile-friends-dialog-title"
            tabIndex={-1}
          >
            All friends
          </h2>
          <button
            className="profile-friends-dialog-close"
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close friends dialog"
          >
            ×
          </button>
        </div>
        <div className="profile-friends-search">
          <label className="page-micro" htmlFor="profile-friends-search-input">
            Search by name, job title, or company
          </label>
          <input
            id="profile-friends-search-input"
            type="search"
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            placeholder="Search friends"
          />
        </div>
        <div className="profile-friends-dialog-list">
          {filteredFriends.length > 0 ? (
            <FriendList friends={filteredFriends} />
          ) : (
            <p className="profile-friends-empty page-micro" role="status">
              No friends match “{searchQuery}”.
            </p>
          )}
        </div>
      </dialog>
    </section>
  );
};
