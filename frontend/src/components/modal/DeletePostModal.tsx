// components/DeletePostModal.tsx

import React from 'react';

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg w-11/12 max-w-sm'>
        <h2 className='text-xl font-semibold mb-4 text-center'>
          Please confirm if you wish to delete the post
        </h2>
        <p className='text-gray-600 mb-6 text-center'>
          Are you sure you want to delete the post? Once deleted, it cannot be
          recovered.
        </p>
        <div className='flex flex-col-reverse md:flex-row justify-center'>
          <button
            onClick={onClose}
            className='flex flex-1 items-center py-2 justify-center bg-transparent text-gray-600 border border-gray-600 rounded-md'
          >
            Cancel
          </button>
          <div className='mx-1 mt-2'></div>
          <button
            onClick={onDelete}
            className='flex flex-1 items-center py-2 justify-center bg-red-600 text-white rounded-md'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
