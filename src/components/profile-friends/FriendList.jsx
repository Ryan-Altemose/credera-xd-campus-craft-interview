import { Avatar } from '../avatar';

const getFriendDisplayName = friend =>
  friend.firstName || friend.lastName
    ? [friend.firstName, friend.lastName].filter(Boolean).join(' ')
    : friend.name;

export const FriendList = ({ friends }) => (
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
