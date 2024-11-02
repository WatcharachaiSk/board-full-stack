'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiHome6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { Routers } from '../routers/routers';
function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateToPage = (page: string) => {
    router.push(page);
  };

  return (
    <nav style={{ background: '#243831' }} className='text-white p-2 w-full'>
      <div className='flex justify-between items-center'>
        {/* Logo Section */}
        <div className='text-lg font-serif italic'>a Board</div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center space-x-4'>
          <button
            onClick={() => {
              navigateToPage(Routers.Login);
            }}
            style={{ background: '#49A569' }}
            className='px-8 py-2 hover:bg-green-700 rounded-lg'
          >
            Sign In
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className='flex md:hidden items-center'>
          <button
            onClick={toggleMenu}
            className='text-white focus:outline-none'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-10'
          onClick={toggleMenu}
        >
          <div
            style={{ background: '#243831' }}
            className='fixed top-0 right-0 h-full w-3/4 max-w-xs text-white p-6 z-20'
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
          >
            <button
              onClick={toggleMenu}
              className='text-white mb-4 focus:outline-none'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14 6l6 6m0 0l-6 6m6-6H3'
                />
              </svg>
            </button>
            <nav className='space-y-4 text-white'>
              <a
                onClick={() => {
                  navigateToPage(Routers.Home);
                }}
                // href='#'
                className='flex items-center space-x-2 '
              >
                <span>
                  <RiHome6Line className='text-white' size={25} />
                </span>
                <span>Home</span>
              </a>
              <a
                onClick={() => {
                  navigateToPage(Routers.OurBlog);
                }}
                // href='#'
                className='flex items-center space-x-2 '
              >
                <span>
                  <FaEdit className='text-white' size={25} />
                </span>
                <span>Our Blog</span>
              </a>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
