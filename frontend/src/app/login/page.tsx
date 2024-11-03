'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Routers } from '../../routers/routers';
import { useState } from 'react';
import useAuthStore from '@services/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const login = useAuthStore((state) => state.login);

  const navigateToPage = (page: string) => {
    router.push(page);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSignIn = async () => {
    if (username.trim() !== '') {
      try {
        await login(username);
        navigateToPage(Routers.Home);
      } catch (error) {
        alert('Failed to login. Please try again.');
      }
    } else {
      alert('Please enter your username');
    }
  };

  return (
    <div className='flex md:flex-row lg:flex-row flex-col-reverse h-screen bg-[#20382F]'>
      {/* Left Side - Sign In Form */}
      <div className='md:h-full w-full h-4/6 md:w-3/5 flex items-center justify-center p-4'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
          className='text-white w-full max-w-md'
        >
          <h1 className='text-3xl font-semibold mb-8 md:text-left'>Sign in</h1>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={handleUsernameChange}
            className='mb-4 p-3 w-full rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500'
          />
          <button
            type='submit'
            className='p-3 w-full bg-[#49A569] hover:bg-green-700 text-white rounded-md'
          >
            Sign In
          </button>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className='md:h-full w-full h-3/6 md:w-2/5 bg-[#2B5F44] flex items-center justify-center p-4 md:rounded-tl-3xl md:rounded-bl-3xl rounded-br-3xl rounded-bl-3xl'>
        <div className='text-center'>
          <Image
            src='/aBoard.png'
            alt='Board illustration'
            width={250}
            height={250}
            className='mx-auto mb-6'
          />
          <p className='text-white text-xl font-serif italic font-light'>
            a Board
          </p>
        </div>
      </div>
    </div>
  );
}
