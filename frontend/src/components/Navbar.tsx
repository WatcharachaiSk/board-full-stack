'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiHome6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { Routers } from '../routers/routers';
import useAuthStore from '@services/store/authStore';
import LoginRequiredModal from './modal/LoginRequiredModal';

function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const { isAuthenticated, logout } = useAuthStore();
  const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsername(localStorage.getItem('username') || 'User');
    }
  }, [isAuthenticated]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const navigateToPage = (page: string) => {
    if (!isAuthenticated && page == Routers.OurBlog) {
      setIsLoginRequiredModalOpen(true);
      return null;
    }
    router.push(page);
  };
  const closeLoginRequiredModal = () => {
    setIsLoginRequiredModalOpen(false);
  };

  return (
    <nav style={{ background: '#243831' }} className='text-white p-2 w-full'>
      <div className='flex justify-between items-center'>
        {/* Logo Section */}
        <div className='text-lg font-serif italic indent-8'>a Board</div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center space-x-4'>
          {isAuthenticated ? (
            <>
              <span className='text-white mr-4'>{username}</span>
              <div className='relative'>
                <img
                  src='https://via.placeholder.com/40'
                  alt='profile'
                  className='w-10 h-10 rounded-full cursor-pointer'
                  onClick={toggleProfileMenu}
                />
                {isProfileMenuOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10'>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                        navigateToPage(Routers.Login);
                      }}
                      className='block w-full text-left px-4 py-2 hover:bg-gray-100'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                navigateToPage(Routers.Login);
              }}
              style={{ background: '#49A569' }}
              className='px-8 py-2 hover:bg-green-700 rounded-lg'
            >
              Sign In
            </button>
          )}
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
                className='flex items-center space-x-2 '
              >
                <span>
                  <FaEdit className='text-white' size={25} />
                </span>
                <span>Our Blog</span>
              </a>
              <LoginRequiredModal
                isOpen={isLoginRequiredModalOpen}
                onClose={closeLoginRequiredModal}
                title='edit'
              />
            </nav>
            {!isAuthenticated && (
              <div className='mt-6'>
                <button
                  onClick={() => {
                    navigateToPage(Routers.Login);
                  }}
                  style={{ background: '#49A569' }}
                  className='w-full py-2 text-white rounded-lg hover:bg-green-700'
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
