import { useRef, useState } from 'react';
import { FriendList } from './FriendList';
import './friends-dialog.css';

const matchesSearch = (friend, searchQuery) => {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return true;

  const fullName = friend.firstName || friend.lastName
    ? [friend.firstName, friend.lastName].filter(Boolean).join(' ')
    : friend.name;
  const searchableFields = [
    fullName,
    friend.jobTitle,
    friend.position,
    friend.companyName,
    friend.company,
  ];

  return searchableFields.some(field =>
    String(field ?? '').toLowerCase().includes(query),
  );
};

export const FriendsDialog = ({ friends, hasHiddenFriends }) => {
  const dialogRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!hasHiddenFriends) return null;

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
    <>
      <button
        className="profile-friends-view-all"
        type="button"
        onClick={openFriendsDialog}
      >
        View all {friends.length} friends
      </button>

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
            Ã—
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
              No friends match â€œ{searchQuery}â€.
            </p>
          )}
        </div>
      </dialog>
    </>
  );
};
