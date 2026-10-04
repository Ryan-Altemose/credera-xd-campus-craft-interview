import './style.css';

const activityClassNames = {
  active: 'profile-group-results-card--active',
  moderate: 'profile-group-results-card--moderate',
  low: 'profile-group-results-card--low',
  inactive: 'profile-group-results-card--inactive',
};

const sortGroups = groups =>
  [...groups].sort((a, b) => {
    if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;

  return a.name.localeCompare(b.name, undefined, {
      sensitivity: 'base',
    });
  });

export const ProfileGroups = ({ data, isLoading }) => {
  if (isLoading)
    return (
      <section id="profile-groups">
        <h2 className="page-heading-2">Groups</h2>
        <ul className="profile-group-results fade-in">
          <li className="profile-group-results-item">
            <div className="profile-group-results-card content-card skeleton-card">
              <div className="skeleton-img loading"></div>
              <div className="skeleton-block loading"></div>
            </div>
          </li>
          <li className="profile-group-results-item">
            <div className="profile-group-results-card content-card skeleton-card">
              <div className="skeleton-img loading"></div>
              <div className="skeleton-block loading"></div>
            </div>
          </li>
          <li className="profile-group-results-item">
            <div className="profile-group-results-card content-card skeleton-card">
              <div className="skeleton-img loading"></div>
              <div className="skeleton-block loading"></div>
            </div>
          </li>
          <li className="profile-group-results-item">
            <div className="profile-group-results-card content-card skeleton-card">
              <div className="skeleton-img loading"></div>
              <div className="skeleton-block loading"></div>
            </div>
          </li>
        </ul>
      </section>
    );

  const groups = sortGroups(data.groups);
  
  return (
    <section id="profile-groups">
      <h2 className="page-heading-2">Groups</h2>
      <ul className="profile-group-results fade-in">
        {groups.map(group => (
          <li className="profile-group-results-item" key={group.id}>
            <a
              className={`profile-group-results-card content-card fade-in ${
                activityClassNames[group.activity] ?? ''
              }`}
              href={group.href}
            >
              <div className="profile-group-avatar">
                <img src={group.image} alt="" />
                {group.favorite && (
                  <span
                    className="profile-group-favorite-badge"
                    role="img"
                    aria-label="Favorite group"
                    title="Favorite group"
                  >
                    ★
                  </span>
                )}
              </div>
              <div className="profile-group-content">
                <p className="page-paragraph">{group.name}</p>
              </div>
            </a>
            {/* <pre>{JSON.stringify(group, null, 2)}</pre> */}
          </li>
        ))}
      </ul>
    </section>
  );
};
