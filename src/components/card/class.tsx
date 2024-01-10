import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';
import Link from 'next/link';

const ClassCardComponent = ({ data }: { data: ClassType }) => {
  return (
    <div className="flex flex-col items-stretch justify-start w-full gap-2 p-2 bg-white border rounded-lg shadow-sm border-stone-300 shadow-stone-200">
      <div className="relative flex-grow rounded-md bg-stone-300 aspect-square"></div>
      <div className="flex flex-col items-stretch justify-start gap-1">
        <span className="font-semibold text-green-700 capitalize top-2 left-2">
          {data.name}
        </span>
        <span className="text-sm font-medium opacity-75 line-clamp-3">
          {data.description}
        </span>
        <Link
          href={`/class/${data.id}`}
          className="grid py-1 mt-2 transition-all border rounded-md bg-stone-50 border-stone-300 hover:bg-green-600 group place-items-center">
          <MdOutlineKeyboardDoubleArrowDown
            size={20}
            color="green"
            className="group-hover:fill-white"
          />
        </Link>
      </div>
    </div>
  );
};

export default ClassCardComponent;
