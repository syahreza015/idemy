'use client';

import cn from '@/lib/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { IoPersonCircle, IoPersonCircleOutline } from 'react-icons/io5';
import { PiSquaresFour, PiSquaresFourFill } from 'react-icons/pi';

export interface ISidebarMenu {
  name: string;
  address: string;
  PrimaryIcon: IconType;
  SecondaryIcon: IconType;
}

export const sidebarMenus: ISidebarMenu[] = [
  {
    name: 'home',
    address: '/home',
    PrimaryIcon: AiFillHome,
    SecondaryIcon: AiOutlineHome,
  },
  {
    name: 'class',
    address: '/class',
    PrimaryIcon: PiSquaresFourFill,
    SecondaryIcon: PiSquaresFour,
  },
  {
    name: 'profile',
    address: '/profile',
    PrimaryIcon: IoPersonCircle,
    SecondaryIcon: IoPersonCircleOutline,
  },
];

export const Sidebarmenu = ({
  menu,
  className,
}: {
  menu: ISidebarMenu;
  className?: string;
}) => {
  const currentPath = usePathname();
  return (
    <Link
      href={menu.address}
      className={cn(
        'rounded-md py-2 px-4 flex justify-start items-center gap-4',
        currentPath.startsWith(menu.address) && 'bg-stone-100',
        !currentPath.startsWith(menu.address) && 'hover:bg-stone-100',
        className
      )}>
      {currentPath.startsWith(menu.address) ? (
        <menu.PrimaryIcon
          size={22}
          color="green"
        />
      ) : (
        <menu.SecondaryIcon
          size={22}
          color="black"
          className="opacity-90"
        />
      )}
      <span
        className={cn(
          'font-medium capitalize text-opacity-90',
          !currentPath.startsWith(menu.address) && 'opacity-90'
        )}>
        {menu.name}
      </span>
    </Link>
  );
};

const SidebarComponent = () => {
  return (
    <div>
      <aside className="hidden md:flex flex-col items-stretch justify-start gap-2 px-4 py-2 sticky top-14">
        {sidebarMenus.map((menu) => {
          return (
            <Sidebarmenu
              key={menu.address}
              menu={menu}
            />
          );
        })}
      </aside>
    </div>
  );
};

export default SidebarComponent;
