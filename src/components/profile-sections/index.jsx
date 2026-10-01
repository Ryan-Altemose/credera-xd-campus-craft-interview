import { useQuery } from '@tanstack/react-query';
import { getProfileData } from '../../services/profile';
import { QueryError } from '../query-error';
import { ProfileHeader } from '../profile-header';
import { ProfilePosts } from '../profile-posts';
import { ProfileGroups } from '../profile-groups';

export const ProfileSections = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
  });

  if (isError) {
    return (
      <QueryError
        message="We couldn't load the profile. Please try again."
        onRetry={refetch}
      />
    );
  }

  return (
    <>
      <ProfileHeader data={data} isLoading={isLoading} />
      <ProfilePosts data={data} isLoading={isLoading} />
      <ProfileGroups data={data} isLoading={isLoading} />
    </>
  );
};
