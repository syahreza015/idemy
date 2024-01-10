'use client';

import cn from '@/lib/utils/cn';
import { useClassMemberStore } from '@/lib/utils/store';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

const StudentButton = () => {
  const { setListVariant, setOpenList, listVariant } = useClassMemberStore();
  const openList = () => {
    setListVariant('STUDENT');
    setOpenList(true);
  };
  return (
    <button
      onClick={openList}
      className={cn(
        'flex items-center justify-start gap-4 px-4 py-2 rounded-md hover:bg-stone-100 border border-stone-300',
        listVariant === 'STUDENT' &&
          'bg-green-700 text-white opacity-95 hover:opacity-100'
      )}>
      <span className="text-sm font-semibold capitalize text-opacity-80">
        students
      </span>
      <MdOutlineKeyboardDoubleArrowRight
        size={18}
        color="green"
        className={cn(listVariant === 'STUDENT' && 'fill-white')}
      />
    </button>
  );
};

export default StudentButton;
