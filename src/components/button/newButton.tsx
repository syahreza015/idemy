'use client';

import { useFormStore } from '@/lib/utils/store';
import { useSession } from 'next-auth/react';
import { IoMdAdd } from 'react-icons/io';

const NewButton = () => {
  const session = useSession();
  const { setOpenForm, setFormVariant } = useFormStore();
  return (
    <button
      onClick={() => {
        setOpenForm(true);
        session.data?.user.privilege === 'STUDENT'
          ? setFormVariant('ENROLL_CLASS')
          : setFormVariant('NEW_CLASS');
      }}
      className="grid place-items-center hover:bg-stone-100 rounded-full aspect-square h-8 my-auto">
      <IoMdAdd
        size={18}
        strokeWidth={10}
        color="black"
        className="opacity-80 group-hover:opacity-100"
      />
    </button>
  );
};

export default NewButton;
