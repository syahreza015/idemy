'use client';

import { useProfileStore } from '@/lib/utils/store';

const ProfileButton = () => {
  const { setOpenProfile } = useProfileStore();
  return (
    <button
      onClick={() => {
        setOpenProfile(true);
      }}
      className="h-10 bg-green-700 rounded-full aspect-square"></button>
  );
};

export default ProfileButton;
