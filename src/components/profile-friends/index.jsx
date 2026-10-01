import './style.css';
import { getFriendsListData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';
import { FriendsDialog } from './FriendsDialog';
import { FriendList } from './FriendList';

const REGULAR_FRIENDS_PREVIEW_COUNT = 3;

const getFriendLastName = friend => {
  if (friend.lastName) return friend.lastName;

  return friend.name?.trim().split(/\s+/).at(-1) ?? '';
};

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
  const topFriends = friends.filter(friend => friend.topFriend);
  const regularFriends = friends.filter(friend => !friend.topFriend);
  const previewFriends = [
    ...topFriends,
    ...regularFriends.slice(0, REGULAR_FRIENDS_PREVIEW_COUNT),
  ];
  const hasHiddenFriends = previewFriends.length < friends.length;

  return (
    <section id="profile-friends">
      <div className="content-card fade-in">
        <h2 className="page-heading-2">Friends</h2>
        <FriendList friends={previewFriends} />
        <FriendsDialog
          friends={friends}
          hasHiddenFriends={hasHiddenFriends}
        />
      </div>
    </section>
  );
};
