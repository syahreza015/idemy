'use client';

import cn from '@/lib/utils/cn';
import { useAlertStore } from '@/lib/utils/store';
import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const AlertComponent = ({
  className,
  position,
  display
}: {
  className?: string;
  position?: 'TOP' | 'BOTTOM';
  display: "FIXED" | "RELATIVE"
}) => {
  const {
    alertMessage,
    alertVariant,
    openAlert,
    setAlertMessage,
    setAlertVariant,
    setOpenAlert,
  } = useAlertStore();
  const closeAlert = () => {
    setOpenAlert(false);
    setAlertVariant(undefined);
    setAlertMessage(undefined);
  };
  const render = openAlert && alertVariant && alertMessage;
  useEffect(() => {
    if (render) {
      setTimeout(() => {
        closeAlert();
      }, 2500);
    }
  }, [render]);
  return (
    render && (
      <div
        className={cn(
          'fixed z-50 flex justify-center items-center gap-2 py-2 pl-6 pr-12 rounded-md capitalize text-sm',
          display === "FIXED" && position === 'TOP' && 'top-2 right-1/2 translate-x-1/2',
          display === "FIXED" &&position === 'BOTTOM' && 'bottom-4 right-4',
          display === "RELATIVE" && "relative",
          alertVariant === 'ERROR' && 'bg-red-600/80',
          alertVariant === 'OK' && 'bg-green-600/80',
          alertVariant === 'NEUTRAL' && 'bg-stone-100 border border-stone-300',
          className
        )}>
        <button
          onClick={closeAlert}
          className="absolute grid p-2 translate-y-1/2 rounded-full place-items-center aspect-square group right-2 bottom-1/2">
          <IoClose
            size={14}
            color="white"
            className="opacity-90 group-hover:opacity-100"
          />
        </button>
        <span
          className={cn(
            'text-white/90 font-medium',
            alertVariant === 'NEUTRAL' && 'text-black/85'
          )}>
          {alertMessage}
        </span>
      </div>
    )
  );
};

export default AlertComponent;
