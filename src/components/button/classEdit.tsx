'use client';

import { useFormStore } from '@/lib/utils/store';
import { useSession } from 'next-auth/react';
import { MdEdit } from 'react-icons/md';

const ClassEditButton = () => {
  const session = useSession();
  const { setFormVariant, setOpenForm } = useFormStore();
  return (
    session.data?.user.privilege === 'TEACHER' && (
      <button
        onClick={() => {
          setOpenForm(true);
          setFormVariant('CLASS_EDIT');
        }}
        className="py-2 px-4 rounded-md bg-blue-700 opacity-95 hover:opacity-100 text-white flex justify-center items-center gap-2 capitalize font-medium">
        <MdEdit
          size={14}
          color="white"
        />
        <span className="text-sm">edit</span>
      </button>
    )
  );
};

export default ClassEditButton;
