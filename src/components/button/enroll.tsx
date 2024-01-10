'use client';

import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import { EnvProvider } from '../wrapper/env';
import { useAlertStore } from '@/lib/utils/store';
import { revalidateTagAction } from '@/app/(backend)/action/revalidate';

const EnrollButton = ({ id }: { id: string }) => {
  const session = useSession();
  const env = useContext(EnvProvider);
  const [isLoading, setisLoading] = useState(false);
  const { setAlertMessage, setAlertVariant, setOpenAlert } = useAlertStore();
  const enrollUser = async () => {
    setisLoading(true);
    const response = await fetch(`${env?.BASE_URL}/api/class/${id}/student`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env?.ACCESS_TOKEN}`,
      },
    });
    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      setAlertMessage('Failed to enroll class');
      setAlertVariant('ERROR');
      setOpenAlert(true);
      return setisLoading(false);
    }
    revalidateTagAction('enroll-unenroll');
    setAlertMessage('User enrolled');
    setAlertVariant('OK');
    setOpenAlert(true);
    setisLoading(false);
  };
  return (
    session.data?.user.privilege === 'STUDENT' && (
      <button
        onClick={enrollUser}
        disabled={isLoading}
        className="rounded-full disabled:opacity-80 bg-green-700 opacity-95 hover:opacity-100 text-white text-sm font-medium capitalize py-1 grid place-items-center gap-2 px-4">
        <span> enroll</span>
      </button>
    )
  );
};

export default EnrollButton;
