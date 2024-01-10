'use client';

import { useProfileStore } from '@/lib/utils/store';
import { useSession } from 'next-auth/react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import SignoutButton from '../button/signout';

const ProfileComponent = () => {
  const { openProfile, setOpenProfile } = useProfileStore();
  const session = useSession();
  return (
    openProfile &&
    createPortal(
      <FocusLock>
        <main
          className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/40"
          onClick={() => {
            setOpenProfile(false);
          }}>
          <aside
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex flex-col items-stretch justify-start gap-4 px-4 py-2 bg-white border-l border-stone-300">
            <div className="flex items-stretch justify-start gap-4">
              <div className="bg-green-700 rounded-full h-12 aspect-square"></div>
              <div className="flex flex-col items-start justify-center">
                <span className="text-lg font-bold text-green-700 capitalize">
                  {session.data?.user.name}
                </span>
                <span className="text-xs font-semibold capitalize">
                  {session.data?.user.fullname}
                </span>
              </div>
            </div>
            <div className="flex justify-start items-center gap-2 flex-wrap">
              <span className="text-xs font-medium lowercase bg-green-700 text-white rounded-full py-1 px-4">
                {session.data?.user.privilege}
              </span>
            </div>
            <SignoutButton className="mt-auto" />
          </aside>
        </main>
      </FocusLock>,
      document.body
    )
  );
};

export default ProfileComponent;
