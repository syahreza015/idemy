import validEnv from '@/lib/utils/env';
import ProfileEditButton from '../button/profileEdit';
import ProfileEditForm from '../client/form/profileEdit';

const ProfileDataComponent = async ({id}: {id:string}) => {
  const response = await fetch(
    `${validEnv.BASE_URL}/api/user/${id}`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer: ${validEnv.ACCESS_TOKEN}`,
      },
      next:{
        tags: ["profile"]
      }
    }
  );
  const result = await response.json();
  if (!response.ok) {
    return (
        <span className="text-sm font-medium text-red-700 capitalize mx-auto">
          failed to fetch data !
        </span>
    );
  }
  const data: Omit<UserType, 'password'> = result.data;
  return (
    <div className="flex flex-col items-stretch justify-start gap-4 p-2 xl:flex-row">
      <div className="w-full rounded-lg xl:w-1/2 h-min aspect-video bg-stone-300"></div>
      <div className="flex flex-col flex-grow gap-2">
        <div className="flex items-stretch justify-start">
          <span className="text-lg font-bold text-green-700 capitalize">
            {data.username}
          </span>
          <div className="flex items-stretch justify-end gap-2 ml-auto">
            <ProfileEditButton />
          </div>
        </div>
        <div className="flex items-stretch justify-start gap-2">
          <div className="text-sm font-medium text-white lowercase rounded-full py-1 px-6 grid place-items-center bg-green-700 opacity-95 hover:opacity-100">
            {data.privilege}
          </div>
        </div>
        <ProfileEditForm data={data} />
        <div className="flex items-stretch justify-start mt-auto">
          <span className="ml-auto text-xs font-medium">
            registered at {data.register_date.toString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDataComponent;
