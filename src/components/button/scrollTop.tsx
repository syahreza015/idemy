'use client';

import { useEffect, useState } from 'react';
import { MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';
import NProgress from 'nprogress';
import { usePathname } from 'next/navigation';

const ScrollTopButton = () => {
  const currentpath = usePathname();
  const [currentWindowYPosition, setCurrentWindowYPosition] = useState(
    window.scrollY
  );
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setCurrentWindowYPosition(window.scrollY);
    });
    return window.removeEventListener('scroll', () => {
      setCurrentWindowYPosition(window.scrollY);
    });
  }, []);
  useEffect(() => {
    NProgress.done();
  }, [currentpath]);
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    });
    return window.removeEventListener('beforeunload', () => {
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    });
  }, []);
  const condition = currentWindowYPosition > 200;
  return (
    condition && (
      <button
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
        className="grid p-2 rounded-full fixed bottom-8 right-4 place-items-center bg-green-700/95 hover:opacity-100">
        <MdOutlineKeyboardDoubleArrowUp
          color="white"
          size={24}
        />
      </button>
    )
  );
};

export default ScrollTopButton;
