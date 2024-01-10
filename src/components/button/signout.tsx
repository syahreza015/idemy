'use client';

import cn from '@/lib/utils/cn';
import { useProfileStore } from '@/lib/utils/store';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';

const SignoutButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  const {setOpenProfile} = useProfileStore()
  return (
    <button
      onClick={async () => {
        NProgress.start();
        setOpenProfile(false)
        await signOut({
          redirect: false,
        });
        router.push('/');
      }}
      className={cn(
        'grid px-5 py-2 text-sm font-medium text-white capitalize bg-red-700 rounded-md place-items-center hover:opacity-95',
        className
      )}>
      signout
    </button>
  );
};

export default SignoutButton;
