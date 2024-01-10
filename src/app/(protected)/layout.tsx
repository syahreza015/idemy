import AlertComponent from '@/components/client/alert';
import NavbarComponent from '@/components/global/navbar';
import SidebarComponent from '@/components/global/sidebar';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import FormComponent from '@/components/client/form/form';

const ProfileComponent = dynamic(() => import('@/components/client/profile'), {
  ssr: false,
});

const Protectedlayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="min-h-screen flex flex-col justify-start items-stretch">
      <NavbarComponent />
      <div className="flex-grow flex justify-start items-stretch">
        <SidebarComponent />
        {children}
      </div>
      <AlertComponent
        position="BOTTOM"
        display="FIXED"
      />
      <ProfileComponent />
      <FormComponent />
    </section>
  );
};

export default Protectedlayout;
