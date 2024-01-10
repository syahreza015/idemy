'use client';

import cn from '@/lib/utils/cn';
import { useProfileEditStore } from '@/lib/utils/store';
import { MdClose, MdEdit, MdSave } from 'react-icons/md';

const ProfileEditButton = () => {
  const { editProfile, setEditProfile } =
    useProfileEditStore();
  return (
    <button
      onClick={() => {
        setEditProfile(!editProfile);
      }}
      className={cn(
        'px-6 text-sm disabled:opacity-75 font-medium text-white capitalize bg-blue-700 rounded-full opacity-95 hover:opacity-100 flex justify-center items-center gap-4',
        editProfile && "bg-red-700"
      )}>
      {editProfile ? (
        <>
          <MdClose
            size={18}
            color="white"
          />
          <span>cancel</span>
        </>
      ) : (
        <>
          <MdEdit
            size={18}
            color="white"
          />
          <span>edit</span>
        </>
      )}
    </button>
  );
};

export default ProfileEditButton;
