'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Routers } from '../routers/routers';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === Routers.Login;
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') {
      // ใช้การแปลงประเภทแบบ explicit
      (window as Window).location.reload();
      return;
    }

    const token = localStorage.getItem('access_token');
    setUsername(localStorage.getItem('username') || 'User');
    if (isLoginPage && token) {
      router.push(Routers.Home);
    }
  }, [isLoginPage, router]);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <>
      {username != '' ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default ClientWrapper;
