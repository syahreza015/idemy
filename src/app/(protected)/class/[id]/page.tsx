import OneClassList from '@/components/list/oneClass';
import OneClassSkeleton from '@/components/skeleton/oneClass';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ClassMemberList = dynamic(
  () => import('@/components/list/client/classMember'),
  {
    ssr: false,
  }
);

const OneClassPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex flex-col items-stretch justify-start flex-grow gap-4 p-2">
      <Suspense fallback={<OneClassSkeleton />}>
        <OneClassList id={params.id} />
      </Suspense>
      <ClassMemberList />
    </main>
  );
};

export default OneClassPage;
