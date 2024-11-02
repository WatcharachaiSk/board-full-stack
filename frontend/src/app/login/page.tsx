'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Routers } from '../../routers/routers';

export default function LoginPage() {
  const router = useRouter();

  const navigateToPage = (page: string) => {
    router.push(page);
  };
  return (
    <div className='flex md:flex-row lg:flex-row flex-col-reverse h-screen bg-[#20382F]'>
      {/* Left Side - Sign In Form */}
      <div className='md:h-full w-full h-4/6 md:w-3/5 flex items-center justify-center p-4'>
        <div className='text-white w-full max-w-md'>
          <h1 className='text-3xl font-semibold mb-8 md:text-left'>Sign in</h1>
          <input
            type='text'
            placeholder='Username'
            className='mb-4 p-3 w-full rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500'
          />
          <button
            onClick={() => {
              navigateToPage(Routers.Home);
            }}
            className='p-3 w-full bg-[#49A569] hover:bg-green-700 text-white rounded-md'
          >
            Sign In
          </button>
        </div>
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

// Tailwind CSS configuration
// You need to add the necessary Tailwind CSS classes to your global CSS or Tailwind CSS setup
// Make sure to have tailwind.config.js file properly set up to use tailwind classes in your project
