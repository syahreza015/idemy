'use client';

import { useDrawerStore } from '@/lib/utils/store';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';

const DrawerButton = () => {
  const { setOpenDrawer } = useDrawerStore();
  return (
    <button
      onClick={() => {
        setOpenDrawer(true);
      }}
      className="grid p-2 rounded-full md:hidden place-items-center aspect-square">
      <HiOutlineMenuAlt2
        size={25}
        strokeWidth={2.5}
        color="black"
      />
    </button>
  );
};

export default DrawerButton;
