import Link from 'next/link';

const PersonCardComponent = ({ data }: { data: UserType }) => {
  return (
    <Link
      href={`/profile/${data.id}`}
      className="py-2 px-4 rounded-lg border border-stone-300 flex justify-start items-stretch gap-4">
      <div className="flex justify-start items-stretch gap-4 flex-grow">
        <div className="h-full aspect-square rounded-full bg-green-600 "></div>
        <div className="flex flex-col justify-start items-stretch gap-1 flex-grow">
          <span className="font-bold text-sm capitalize text-green-700">
            {data.username}
          </span>
          <span className="capitalize font-medium text-xs line-clamp-1">
            {data.fullname}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PersonCardComponent;
