'use client';

import Link from 'next/link';
import { BsPersonCircle } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import cn from '@/lib/utils/cn';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAlertStore } from '@/lib/utils/store';
import AlertComponent from '../alert';
import NProgress from "nprogress"

const signinSchema = z.object({
  username: z.string().min(1, {
    message: 'username is required !',
  }),
  password: z.string().min(8, {
    message: 'password minimum has 8 characters !',
  }),
});

type signinType = z.infer<typeof signinSchema>;

const SigninFormComponent = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<signinType>({
    resolver: zodResolver(signinSchema),
  });
  const { setAlertMessage, setAlertVariant, setOpenAlert } = useAlertStore();
  const formSubmit = async (data: signinType) => {
    setisLoading(true);
    const result = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    if (!result?.ok) {
      setOpenAlert(true);
      setAlertMessage('failed to signin');
      setAlertVariant('ERROR');
      reset();
      return setisLoading(false);
    }
    NProgress.start()
    router.push('/home');
  };
  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="flex flex-col items-stretch justify-start w-full max-w-2xl gap-2 p-4 border rounded-lg border-stone-300 shadow-md shadow-stone-200">
      <div className="flex items-center justify-center mb-2">
        <Link
          href={`/`}
          className="flex items-stretch justify-center rounded outline-none hover:opacity-85">
          <span className="text-xl font-semibold capitalize">i</span>
          <span className="text-xl font-semibold text-green-700 capitalize">
            demy
          </span>
        </Link>
      </div>
      <AlertComponent display="RELATIVE" />
      <div className="flex flex-col items-stretch justify-start gap-1">
        <div className="flex items-stretch justify-between">
          <label
            htmlFor="username-field"
            className="font-medium capitalize opacity-75">
            username
          </label>
          {errors.username?.message && (
            <span className="grid text-xs font-medium text-red-600 place-items-center">
              {errors.username.message}
            </span>
          )}
        </div>
        <input
          {...register('username')}
          id="username-field"
          type="text"
          placeholder="your username"
          className={cn(
            'px-5 py-2 font-medium border rounded placeholder:capitalize text-black/85 focus:bg-stone-50 border-stone-300',
            errors.username &&
              'focus:outline-red-600/75 outline-offset-0 focus:border-transparent'
          )}
        />
      </div>
      <div className="flex flex-col items-stretch justify-start gap-1">
        <div className="flex items-stretch justify-between">
          <label
            htmlFor="password-field"
            className="font-medium capitalize opacity-75">
            password
          </label>
          {errors.password?.message && (
            <span className="grid text-xs font-medium text-red-600 place-items-center">
              {errors.password.message}
            </span>
          )}
        </div>
        <input
          {...register('password')}
          id="password-field"
          type="password"
          placeholder="your password"
          className={cn(
            'px-5 py-2 font-medium border rounded placeholder:capitalize text-black/85 focus:bg-stone-50 border-stone-300',
            errors.password &&
              'focus:outline-red-600/75 outline-offset-0 focus:border-transparent'
          )}
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="grid py-2 mt-2 font-medium text-white capitalize bg-green-700 rounded-md disabled:opacity-80 place-items-center opacity-95 hover:opacity-100">
        {isLoading ? (
          <AiOutlineLoading3Quarters
            size={24}
            color="white"
            className="animate-spin"
          />
        ) : (
          <span>signin</span>
        )}
      </button>
      <div className="flex items-center justify-start mt-2">
        <Link
          href={`/register`}
          className="flex items-center justify-start gap-1 text-xs font-medium group">
          <span>don't have account ?</span>
          <span className="text-green-700 group-hover:underline">register</span>
        </Link>
      </div>
      <div className="flex flex-col items-stretch justify-start gap-2 py-2">
        <div className="flex items-center justify-center gap-4">
          <hr className="flex-grow h-[2px] rounded-full bg-black/30" />
          <span className="font-medium opacity-80">or</span>
          <hr className="flex-grow h-[2px] rounded-full bg-black/30" />
        </div>
        <button
          type="button"
          className="flex items-center justify-center gap-4 py-2 border rounded-md border-stone-300 hover:bg-stone-100">
          <BsPersonCircle
            size={18}
            color="black"
            className="opacity-85"
          />
          <span className="text-sm font-medium">signin as guest</span>
        </button>
      </div>
    </form>
  );
};

export default SigninFormComponent;
