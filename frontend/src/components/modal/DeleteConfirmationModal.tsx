import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg w-11/12 max-w-sm'>
        <h2 className='text-xl font-semibold mb-4 text-center'>
          Please confirm if you wish to delete the comment
        </h2>
        <p className='text-gray-600 mb-6 text-center'>
          Are you sure you want to delete the comment? Once deleted, it cannot be recovered.
        </p>
        <div className='flex flex-col-reverse md:flex-row justify-center'>
          <button
            onClick={onCancel}
            className='flex flex-1 items-center py-2 justify-center bg-transparent text-gray-600 border border-gray-600 rounded-md'
          >
            Cancel
          </button>
          <div className='mx-1 mt-2'></div>
          <button
            onClick={onConfirm}
            className='flex flex-1 items-center py-2 justify-center bg-red-600 text-white rounded-md'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
