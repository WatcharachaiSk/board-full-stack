'use client';
import React from 'react';
import { RiHome6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Routers } from '../routers/routers';

function Sidebar() {
  const router = useRouter();
  const navigateToPage = (page: string) => {
    router.push(page);
  };

  return (
    <aside className='hidden md:flex flex-col w-1/4 text-white p-6 space-y-6'>
      <nav>
        <ul className='space-y-4'>
          <li>
            <button
              onClick={() => {
                navigateToPage(Routers.Home);
              }}
              className='flex items-center space-x-2 text-black'
            >
              <span>
                <RiHome6Line className='text-gray-700' size={25} />
              </span>
              <span>Home</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigateToPage(Routers.OurBlog);
              }}
              className='flex items-center space-x-2 text-black'
            >
              <span>
                <FaEdit className='text-gray-700' size={25} />
              </span>
              <span>Our Blog</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
