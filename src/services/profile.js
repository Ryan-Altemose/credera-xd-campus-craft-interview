export const getProfileData = () => fetchData('profile');

export const getFriendsListData = () =>
  fetchData('friends/s9df8ske-23n23490s8-12nkk123o');

const fetchData = async endpoint => {
  const dataPromise = fetch(`http://localhost:3000/${endpoint}`).then(
    response => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return response.json();
    },
  );
  const minimumLoadingTime = new Promise(resolve =>
    setTimeout(resolve, 3000),
  );

  const [data] = await Promise.all([dataPromise, minimumLoadingTime]);
  return data;
};
