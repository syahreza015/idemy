'use client';

import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { MdClose } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { EnvProvider } from '@/components/wrapper/env';
import { useAlertStore } from '@/lib/utils/store';
import { revalidateTagAction } from '@/app/(backend)/action/revalidate';

const newClassSchema = z.object({
  name: z.string().min(1, {
    message: 'class name is required !',
  }),
  description: z.string().min(1, {
    message: 'class description is required !',
  }),
});

type newClassType = z.infer<typeof newClassSchema>;

const NewClassForm = ({ closeForm }: { closeForm: () => void }) => {
  const [isLoading, setisLoading] = useState(false);
  const env = useContext(EnvProvider);
  const { setAlertMessage, setAlertVariant, setOpenAlert } = useAlertStore();
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<newClassType>({
    resolver: zodResolver(newClassSchema),
  });
  const formSubmit = async (data: newClassType) => {
    setisLoading(true);
    const response = await fetch(`${env?.BASE_URL}/api/class`, {
      method: 'POST',
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
      setAlertMessage('failed to create class');
      setAlertVariant('ERROR');
      setOpenAlert(true);
      return setisLoading(false);
    }
    setAlertMessage('class created');
    setAlertVariant('OK');
    setOpenAlert(true);
    reset();
    revalidateTagAction("class")
    setisLoading(false);
  };
  return createPortal(
    <FocusLock>
      <main className="fixed inset-0 z-50 grid bg-black/40 place-items-center">
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="w-[95%] max-w-2xl relative rounded-lg bg-white border border-stone-300 shadow-sm shadow-stone-200 p-4 flex flex-col justify-start items-stretch gap-2">
          <div className="grid place-items-center">
            <span className="text-lg font-bold text-green-700 capitalize">
              new class
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
            <input
              {...register('name')}
              id="class-name-field"
              type="text"
              className="px-4 py-2 font-medium border rounded focus:bg-stone-50 text-opacity-85 placeholder:capitalize border-stone-300"
              placeholder="class name"
            />
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
            <textarea
              {...register('description')}
              id="class-description-field"
              className="h-32 px-4 py-2 font-medium border rounded focus:bg-stone-50 text-opacity-85 placeholder:capitalize border-stone-300"
              placeholder="class description"
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="py-2 disabled:opacity-85 font-medium grid place-items-center text-white capitalize bg-green-700 rounded-md opacity-95 hover:opacity-100">
            {isLoading ? (
              <AiOutlineLoading3Quarters
                size={24}
                color="white"
                className="animate-spin"
              />
            ) : (
              <span>create class</span>
            )}
          </button>
          <button
            onClick={closeForm}
            type="button"
            className="absolute grid rounded-full aspect-square p-2 group top-0 right-0 place-items-center hover:bg-stone-100">
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

export default NewClassForm;
