'use client';

import { useAlertStore } from '@/lib/utils/store';
import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { EnvProvider } from '../wrapper/env';
import { useRouter } from 'next/navigation';

const ClassDeleteButton = ({ id }: { id: string }) => {
  const session = useSession();
  const env = useContext(EnvProvider);
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter()
  const { setAlertMessage, setAlertVariant, setOpenAlert } = useAlertStore();
  const deleteClass = async () => {
    setisLoading(true);
    const response = await fetch(`${env?.BASE_URL}/api/class/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${env?.ACCESS_TOKEN}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      setAlertMessage('failed to delete class');
      setAlertVariant('ERROR');
      setOpenAlert(true);
      return setisLoading(false);
    }
    setAlertMessage('class deleted');
    setAlertVariant('OK');
    setOpenAlert(true);
    setisLoading(false);
    router.push("/class")
  };
  return (
    session.data?.user.privilege === 'TEACHER' && (
      <button
        disabled={isLoading}
        onClick={deleteClass}
        className="py-2 disabled:opacity-80 px-4 rounded-md bg-red-700 opacity-95 hover:opacity-100 text-white flex justify-center items-center gap-2 capitalize font-medium">
        <MdDelete
          size={14}
          color="white"
        />
        <span className="text-sm">delete</span>
      </button>
    )
  );
};

export default ClassDeleteButton;
