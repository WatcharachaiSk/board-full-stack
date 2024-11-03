'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Routers } from '../routers/routers';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === Routers.Login;

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (isLoginPage && token) {
      // ถ้าอยู่ที่หน้า login และมี token ให้นำไปที่หน้า home
      router.push(Routers.Home);
    }
  }, [isLoginPage, router]);

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
