'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const enrollClassSchema = z.object({
  code: z.string().min(1, {
    message: 'class code is required !',
  }),
});

type enrollClassType = z.infer<typeof enrollClassSchema>;

const EnrollClassForm = ({ closeForm }: { closeForm: () => void }) => {
  const [isLoading, setisLoading] = useState(false);
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<enrollClassType>({
    resolver: zodResolver(enrollClassSchema),
  });
  const formSubmit = async (data: enrollClassType) => {
    setisLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 500);
    });
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
              enroll class
            </span>
          </div>
          <div className="flex flex-col items-stretch justify-start gap-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="class-code-field"
                className="font-medium capitalize text-opacity-85">
                code
              </label>
              {errors.code?.message && (
                <span className="grid text-xs font-medium text-red-600 place-items-center">
                  {errors.code.message}
                </span>
              )}
            </div>
            <input
              {...register('code')}
              id="class-code-field"
              type="text"
              className="px-4 py-2 font-medium border rounded focus:bg-stone-50 text-opacity-85 placeholder:capitalize border-stone-300"
              placeholder="class code"
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
              <span>enroll class</span>
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

export default EnrollClassForm;
