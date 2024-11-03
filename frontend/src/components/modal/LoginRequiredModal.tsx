import React from 'react';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg w-11/12 max-w-sm'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Please Login</h2>
        <p className='text-gray-600 mb-6 text-center'>
          You need to Sign In to {title} a post.
        </p>
        <div className='flex justify-center'>
          <button
            onClick={onClose}
            className='px-6 py-2 text-[#49A569] border border-[#49A569] rounded-lg hover:bg-gray-100'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
