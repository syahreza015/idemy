import ClassListComponent from '@/components/list/class';
import ClassSkeletonComponent from '@/components/skeleton/class';
import { Suspense } from 'react';

const Classpage = () => {
  const placeholder = Array.from(
    {
      length: 20,
    },
    (_, index) => index + 1
  );
  return (
    <main className="grid flex-grow place-content-start grid-cols-1 gap-2 p-2 place-items-center sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
      <Suspense
        fallback={placeholder.map((item) => {
          return <ClassSkeletonComponent key={item} />;
        })}>
        <ClassListComponent />
      </Suspense>
    </main>
  );
};

export default Classpage;
