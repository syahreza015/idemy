import ProfileDataComponent from '@/components/list/profile';
import ProfileSkeleton from '@/components/skeleton/profile';
import { Suspense } from 'react';

const ProfilePage = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex-grow flex flex-col justify-start items-stretch p-2">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileDataComponent id={params.id} />
      </Suspense>
    </main>
  );
};

export default ProfilePage;
