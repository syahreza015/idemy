'use client';

import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { MdClose } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { EnvProvider } from '@/components/wrapper/env';
import { useAlertStore } from '@/lib/utils/store';
import { revalidateTagAction } from '@/app/(backend)/action/revalidate';
import { useParams } from 'next/navigation';

const editClassSchema = z.object({
  name: z.string().min(1, {
    message: 'class name is required !',
  }),
  description: z.string().min(1, {
    message: 'class description is required !',
  }),
});

type editClassType = z.infer<typeof editClassSchema>;

const EditClassForm = ({ closeForm }: { closeForm: () => void }) => {
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const params = useParams();
  const classId = params.id as string | undefined;
  const env = useContext(EnvProvider);
  const [isFetching, setisFetching] = useState(false);
  const { setAlertMessage, setAlertVariant, setOpenAlert } = useAlertStore();
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<editClassType>({
    resolver: zodResolver(editClassSchema),
  });
  const fetchData = async () => {
    setisFetching(true);
    if (!classId) {
      setisFetching(false);
      return setisError(true);
    }
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 1500);
    });
    const response = await fetch(`${env?.BASE_URL}/api/class/${classId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${env?.ACCESS_TOKEN}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      setisFetching(false);
      return setisError(true);
    }
    const data: ClassType = result.data;
    setValue('description', data.description);
    setValue('name', data.name);
    setisFetching(false);
  };
  const formSubmit = async (data: editClassType) => {
    setisLoading(true);
    const response = await fetch(`${env?.BASE_URL}/api/class/${classId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        description: data.description,
      }),
      headers: {
        Authorization: `Bearer ${env?.ACCESS_TOKEN}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      setAlertMessage('failed to edit class');
      setAlertVariant('ERROR');
      setOpenAlert(true);
      return setisLoading(false);
    }
    setAlertMessage('class edited');
    setAlertVariant('OK');
    setOpenAlert(true);
    revalidateTagAction('one-class');
    setisLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return createPortal(
    <FocusLock>
      <main className="fixed inset-0 z-50 grid bg-black/40 place-items-center">
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="w-[95%] max-w-2xl relative rounded-lg bg-white border border-stone-300 shadow-sm shadow-stone-200 p-4 flex flex-col justify-start items-stretch gap-2">
          <div className="grid place-items-center">
            <span className="text-lg font-bold text-green-700 capitalize">
              edit class
            </span>
          </div>
          <div className="flex flex-col items-stretch justify-start gap-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="class-name-field"
                className="font-medium capitalize text-opacity-85">
                name
              </label>
              {errors.name?.message && (
                <span className="grid text-xs font-medium text-red-600 place-items-center">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="relative flex flex-col items-stretch justify-start">
              {isFetching && (
                <div className="absolute inset-0 grid p-2 place-items-center">
                  <span className="w-full h-4 rounded-full bg-stone-400 animate-pulse"></span>
                </div>
              )}
              <input
                disabled={isFetching}
                readOnly={isFetching}
                {...register('name')}
                id="class-name-field"
                type="text"
                className="px-4 py-2 font-medium border rounded focus:bg-stone-50 text-opacity-85 border-stone-300"
              />
            </div>
          </div>
          <div className="flex flex-col items-stretch justify-start gap-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="class-description-field"
                className="font-medium capitalize text-opacity-85">
                description
              </label>
              {errors.description?.message && (
                <span className="grid text-xs font-medium text-red-600 place-items-center">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="relative flex flex-col items-stretch justify-start">
              {isFetching && (
                <div className="absolute inset-0 z-20 flex flex-col items-stretch justify-start gap-2 p-2">
                  <span className="h-4 rounded-full bg-stone-400 animate-pulse"></span>
                  <span className="h-4 rounded-full bg-stone-400 animate-pulse"></span>
                  <span className="h-4 rounded-full bg-stone-400 animate-pulse"></span>
                </div>
              )}
              <textarea
                disabled={isFetching}
                readOnly={isFetching}
                {...register('description')}
                id="class-description-field"
                className="h-32 px-4 py-2 font-medium border rounded focus:bg-stone-50 text-opacity-85 border-stone-300"
              />
            </div>
          </div>
          <button
            disabled={isLoading || isFetching}
            type="submit"
            className="grid py-2 font-medium text-white capitalize bg-green-700 rounded-md disabled:opacity-80 place-items-center opacity-95 hover:opacity-100">
            {isLoading ? (
              <AiOutlineLoading3Quarters
                size={24}
                color="white"
                className="animate-spin"
              />
            ) : (
              <span>edit class</span>
            )}
          </button>
          <button
            onClick={closeForm}
            type="button"
            className="absolute top-0 right-0 grid p-2 rounded-full aspect-square group place-items-center hover:bg-stone-100">
            <MdClose
              size={14}
              color="black"
              className="opacity-85 group-hover:opacity-100"
            />
          </button>
        </form>
      </main>
    </FocusLock>,
    document.body
  );
};

export default EditClassForm;
