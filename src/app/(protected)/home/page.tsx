import ClassCardComponent from '@/components/card/class';
import ClassSkeletonComponent from '@/components/skeleton/class';
import AuthOptions from '@/lib/utils/auth';
import validEnv from '@/lib/utils/env';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

const TeacherHome = async () => {
  const session = await getServerSession(AuthOptions);
  const response = await fetch(
    `${validEnv.BASE_URL}/api/class/creator/${session?.user.userid}`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${validEnv.ACCESS_TOKEN}`,
      },
    }
  );
  const result = await response.json();
  if (!response.ok) {
    return (
      <span className="mx-auto text-sm font-medium text-red-700 capitalize  col-span-full">
        failed to fetch data !
      </span>
    );
  }
  const data: ClassType[] = result.data;
  if (data.length === 0) {
    return (
      <span className="mx-auto text-sm font-medium capitalize  col-span-full">
        no data to show!
      </span>
    );
  }
  return data.map((data) => {
    return (
      <ClassCardComponent
        key={data.id}
        data={data}
      />
    );
  });
};

const StudentHome = async () => {
  const session = await getServerSession(AuthOptions);
  const response = await fetch(
    `${validEnv.BASE_URL}/api/user/${session?.user.userid}/enrolled`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${validEnv.ACCESS_TOKEN}`,
      },
    }
  );
  const result = await response.json();  
  if (!response.ok) {
    return (
      <span className="mx-auto text-sm font-medium text-red-700 capitalize  col-span-full">
        failed to fetch data !
      </span>
    );
  }
  const data: ClassType[] = result.data;
  if (data.length === 0) {
    return (
      <span className="mx-auto text-sm font-medium capitalize  col-span-full">
        no data to show!
      </span>
    );
  }  
  return data.map((data) => {
    return (
      <ClassCardComponent
        key={data.id}
        data={data}
      />
    );
  });
};

const HomePage = async () => {
  const session = await getServerSession(AuthOptions);
  return (
    <main className="grid flex-grow place-content-start grid-cols-1 gap-2 p-2 place-items-center sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
      <Suspense
        fallback={Array.from({ length: 20 }, (_, index) => index + 1).map(
          (item) => (
            <ClassSkeletonComponent key={item} />
          )
        )}>
        {session?.user.privilege === 'STUDENT' ? (
          <StudentHome />
        ) : (
          <TeacherHome />
        )}
      </Suspense>
    </main>
  );
};

export default HomePage;
