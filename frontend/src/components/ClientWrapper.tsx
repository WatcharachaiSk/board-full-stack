'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Routers } from '../routers/routers';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === Routers.Login;

  return (
    <>
      {!isLoginPage ? (
        <>
          <Navbar />
          <div className='flex flex-1 w-full h-full flex-row min-h-screen'>
            <Sidebar />
            {children}
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ClientWrapper;
