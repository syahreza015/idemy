import validEnv from '@/lib/utils/env';
import ClassListClient from './client/class';

const ClassListComponent = async () => {
  const response = await fetch(`${validEnv.BASE_URL}/api/class`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${validEnv.ACCESS_TOKEN}`,
    },
    cache: "no-store",
    next: {
      tags: ['class'],
    },
  });
  const result = await response.json();
  if (!response.ok) {
    return (
      <div className="col-span-full grid place-items-center">
        <span className="font-medium text-sm capitalize text-red-700">
          failed to fetch data !
        </span>
      </div>
    );
  }
  const data: ClassType[] = result.data;
  if (data.length === 0) {
    return <span className='text-sm font-medium capitalize col-span-full'>no data to show</span>
  }
  return <ClassListClient initialData={data} />;
};

export default ClassListComponent;
