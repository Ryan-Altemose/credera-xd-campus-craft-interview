import { useEffect, useState } from 'react';
import './style.css';

const getInitials = profile => {
  const firstName = profile?.firstName ?? profile?.authorFirstName;
  const lastName = profile?.lastName ?? profile?.authorLastName;
  const nameParts = profile?.name?.trim().split(/\s+/).filter(Boolean) ?? [];
  const first = firstName || nameParts[0] || '';
  const last = lastName || (nameParts.length > 1 ? nameParts.at(-1) : '');
  const firstInitial = first.trim().charAt(0);
  const lastInitial = last.trim().charAt(0);

  return `${firstInitial}${lastInitial}`.toUpperCase();
};

export const Avatar = ({profile, src, className = '', }) => {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [src]);

  const initials = getInitials(profile ?? {});
  const showImage = src && !imageFailed;

  return (
    <div className={`avatar ${className}`} aria-hidden="true">
      {showImage ? (
        <img
          className="avatar__image"
          src={src}
          alt=""
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="avatar__initials">{initials}</span>
      )}
    </div>
  );
};
