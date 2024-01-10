'use client';

import cn from '@/lib/utils/cn';
import { useAlertStore, useProfileEditStore } from '@/lib/utils/store';
import { MdEdit } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { EnvProvider } from '@/components/wrapper/env';
import { useSession } from 'next-auth/react';
import { revalidateTagAction } from '@/app/(backend)/action/revalidate';

const profileEditSchema = z.object({
  username: z.string().min(1, {
    message: 'username is required !',
  }),
  fullname: z.string().min(1, {
    message: 'fullname is required !',
  }),
  email: z
    .string()
    .min(1, {
      message: 'email is required !',
    })
    .email({
      message: 'email is invalid !',
    }),
});

type profileEditType = z.infer<typeof profileEditSchema>;

const ProfileEditForm = ({ data }: { data: Omit<UserType, 'password'> }) => {
  const [isLoading, setisLoading] = useState(false);
  const { editProfile, setEditProfile } = useProfileEditStore();
  const [email, setEmail] = useState(data.email);
  const [fullname, setFullname] = useState(data.fullname);
  const [username, setUsername] = useState(data.username);
  const userId = data.id;
  const session = useSession();
  const { setAlertMessage, setAlertVariant, setOpenAlert } = useAlertStore();
  const env = useContext(EnvProvider);
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm<profileEditType>({
    resolver: zodResolver(profileEditSchema),
  });
  const formSubmit = async (data: profileEditType) => {
    setisLoading(true);
    const response = await fetch(`${env?.BASE_URL}/api/user/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        username: data.username,
        fullname: data.fullname,
        email: data.email,
      }),
      headers: {
        Authorization: `Bearer ${env?.ACCESS_TOKEN}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      setAlertMessage('Failed to update profile');
      setAlertVariant('ERROR');
      setOpenAlert(true);
      return setisLoading(false);
    }
    await session.update();
    setEditProfile(false);
    setAlertMessage('profile updated');
    setAlertVariant('OK');
    setOpenAlert(true);
    revalidateTagAction('profile');
    setisLoading(false);
  };
  const notChanged = useMemo(() => {
    return (
      email === data.email &&
      fullname === data.fullname &&
      username === data.username
    );
  }, [email, fullname, username, data]);
  useEffect(() => {
    setValue('email', data.email);
    setValue('fullname', data.fullname), setValue('username', data.username);
  }, [data]);
  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="flex flex-col items-stretch justify-start gap-1">
        <div className="flex items-stretch justify-between">
          <label
            htmlFor="fullname-field"
            className="font-semibold capitalize opacity-85">
            fullname
          </label>
          {errors.fullname?.message && (
            <span className="grid text-xs font-medium text-red-600 place-items-center">
              {errors.fullname.message}
            </span>
          )}
        </div>
        <div
          className={cn('flex  flex-col relative justify-start items-stretch')}>
          <input
            {...register('fullname')}
            defaultValue={data.fullname}
            disabled={!editProfile}
            onChange={(e) => {
              setFullname(e.currentTarget.value);
            }}
            readOnly={!editProfile}
            type="text"
            className="px-4 py-2 font-medium border rounded border-stone-300 disabled:opacity-60"
            placeholder="user full name"
          />
          {editProfile && (
            <MdEdit
              size={18}
              color="green"
              className="absolute translate-y-1/2 right-4 bottom-1/2"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col items-stretch justify-start gap-1">
        <div className="flex items-stretch justify-between">
          <label
            htmlFor="username-field"
            className="font-semibold capitalize opacity-85">
            username
          </label>
          {errors.username?.message && (
            <span className="grid text-xs font-medium text-red-600 place-items-center">
              {errors.username.message}
            </span>
          )}
        </div>
        <div
          className={cn('flex  flex-col relative justify-start items-stretch')}>
          <input
            {...register('username')}
            defaultValue={data.username}
            disabled={!editProfile}
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
            readOnly={!editProfile}
            type="text"
            className="px-4 py-2 font-medium border rounded border-stone-300 disabled:opacity-60"
          />
          {editProfile && (
            <MdEdit
              size={18}
              color="green"
              className="absolute translate-y-1/2 right-4 bottom-1/2"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col items-stretch justify-start gap-1">
        <div className="flex items-stretch justify-between">
          <label
            htmlFor="email-field"
            className="font-semibold capitalize opacity-85">
            email
          </label>
          {errors.email?.message && (
            <span className="grid text-xs font-medium text-red-600 place-items-center">
              {errors.email.message}
            </span>
          )}
        </div>
        <div
          className={cn('flex  flex-col relative justify-start items-stretch')}>
          <input
            {...register('email')}
            defaultValue={data.email}
            disabled={!editProfile}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
            readOnly={!editProfile}
            type="email"
            className="px-4 py-2 font-medium border rounded border-stone-300 disabled:opacity-60"
          />
          {editProfile && (
            <MdEdit
              size={18}
              color="green"
              className="absolute translate-y-1/2 right-4 bottom-1/2"
            />
          )}
        </div>
        {editProfile && (
          <button
            disabled={isLoading || notChanged}
            type="submit"
            className="grid py-2 my-2 text-sm font-medium text-white capitalize bg-green-700 rounded-md disabled:opacity-80 place-items-center opacity-95 hover:opacity-100">
            {isLoading ? (
              <AiOutlineLoading3Quarters
                size={20}
                color="white"
                className="animate-spin"
              />
            ) : (
              <span>save</span>
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileEditForm;
