import validEnv from '@/lib/utils/env';
import StudentButton from '../button/student';
import TeacherButton from '../button/teacher';
import { getServerSession } from 'next-auth';
import AuthOptions from '@/lib/utils/auth';
import { Session } from 'next-auth';
import UnEnrollButton from '../button/unenroll';
import EnrollButton from '../button/enroll';
import ClassEditButton from '../button/classEdit';
import ClassDeleteButton from '../button/classDeleteButton';

const EnrollOrUnenroll = async ({
  id,
  session,
}: {
  id: string;
  session: Session | null;
}) => {
  if (session?.user.privilege !== 'STUDENT') {
    return null;
  }
  const response = await fetch(
    `${validEnv.BASE_URL}/api/class/${id}/student/${session?.user.userid}`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${validEnv.ACCESS_TOKEN}`,
      },
      next: {
        tags: ['enroll-unenroll'],
      },
    }
  );
  const result = await response.json();
  if (!response.ok) {
    return (
      <span className="text-sm font-me capitalize text-red-700">
        failed to fetch data !
      </span>
    );
  }
  if (!result.data) {
    return <EnrollButton id={id} />;
  }
  return <UnEnrollButton id={id} />;
};

const OneClassList = async ({ id }: { id: string }) => {
  const session = await getServerSession(AuthOptions);
  const response = await fetch(`${validEnv.BASE_URL}/api/class/${id}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${validEnv.ACCESS_TOKEN}`,
    },
    next: {
      tags: ['one-class'],
    },
  });
  const result = await response.json();
  if (!response.ok) {
    return (
      <span className="font-medium mx-auto capitalize text-red-700 text-sm">
        failed to fetch data !
      </span>
    );
  }
  const data: { creator: UserType } & ClassType = result.data;
  return (
    <div className="flex relative flex-col md:flex-row justify-start flex-grow gap-4 p-2">
      <div className="w-full md:w-1/2 rounded-md h-min aspect-video bg-stone-300"></div>
      {session?.user.privilege === 'TEACHER' &&
        data.creator.id === session?.user.userid && (
          <div className="flex absolute z-20 top-2 right-2 gap-2 justify-start items-center">
            <ClassEditButton />
            <ClassDeleteButton id={data.id} />
          </div>
        )}
      <div className="flex w-full md:w-1/2 flex-col items-stretch justify-start gap-2">
        <span className="text-xl font-bold text-green-700 capitalize">
          {data.name}
        </span>
        <span className="text-sm font-medium text-opacity-75">
          {data.description}
        </span>
        <div className="flex justify-start items-center gap-4">
          <EnrollOrUnenroll
            id={id}
            session={session}
          />
        </div>
        <div className="flex flex-wrap items-stretch justify-start gap-2 ">
          <StudentButton />
          <TeacherButton />
        </div>
      </div>
    </div>
  );
};

export default OneClassList;
