'use client';

import { useDrawerStore } from '@/lib/utils/store';
import { createPortal } from 'react-dom';
import { Sidebarmenu, sidebarMenus } from '../global/sidebar';
import FocusLock from 'react-focus-lock';

const DrawerComponent = () => {
  const { openDrawer, setOpenDrawer } = useDrawerStore();
  return (
    openDrawer &&
    createPortal(
      <FocusLock>
        <main
          className="fixed inset-0 z-50 flex items-stretch justify-start bg-black/40 md:hidden"
          onClick={() => {
            setOpenDrawer(false);
          }}>
          <aside
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex items-stretch justify-start gap-2 py-2 px-4 flex-col bg-white border-r border-stone-300">
            {sidebarMenus.map((menu) => {
              return (
                <Sidebarmenu
                  key={menu.address}
                  menu={menu}
                  className="px-6"
                />
              );
            })}
          </aside>
        </main>
      </FocusLock>,
      document.body
    )
  );
};

export default DrawerComponent;
