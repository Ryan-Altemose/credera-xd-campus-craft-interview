import './style.css';
import { Avatar } from '../avatar';
import { getFriendsListData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';

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

export const ProfileFriends = () => {
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

  return (
    <section id="profile-friends">
      <div className="content-card fade-in">
        <h2 className="page-heading-2">Friends</h2>
        <ul className="profile-friends-list">
          {friends.map(friend => (
            <li
              className={`profile-list-item fade-in${
                friend.topFriend ? ' profile-list-item--top-friend' : ''
              }`}
              key={friend.id ?? getFriendDisplayName(friend)}
            >
              <Avatar
                className="profile-list-item-avatar"
                profile={friend}
              />
              <div className="profile-list-item-info">
                {friend.topFriend && (
                  <span className="top-friend-flag">Top friend</span>
                )}
                <p className="page-paragraph">{getFriendDisplayName(friend)}</p>
                <p className="page-micro">
                  {friend.jobTitle} @ {friend.companyName}
                </p>
                {/* <pre>{JSON.stringify(friend)}</pre> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
