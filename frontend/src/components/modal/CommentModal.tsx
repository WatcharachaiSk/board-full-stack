import { FC } from 'react';

type CommentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CommentModal: FC<CommentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg w-11/12 max-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Add Comments</h2>
          <button onClick={onClose} className='text-gray-600 text-2xl'>
            &times;
          </button>
        </div>
        <textarea
          placeholder="What's on your mind..."
          className='w-full p-3 h-32 rounded-md border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500'
        ></textarea>
        <div className='flex flex-col'>
          <button
            onClick={onClose}
            className='mb-3 px-4 py-2 text-[#49A569] border border-[#49A569] rounded-md'
          >
            Cancel
          </button>
          <button className='px-4 py-2 bg-[#49A569] text-white border border-[#49A569] rounded-md'>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
