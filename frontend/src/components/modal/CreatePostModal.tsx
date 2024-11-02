import CommunityDropdown from '@components/CommunityDropdown';
import { FC } from 'react';

type CommentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreatePostModal: FC<CommentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg w-11/12 max-w-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Create Post</h2>
          <button onClick={onClose} className='text-gray-600 text-2xl'>
            &times;
          </button>
        </div>
        <div className='flex flex-col space-y-4'>
          <div className='flex'>
            <div className='flex flex-1 justify-center md:flex-none bordertext-[#49A569] border border-[#49A569] rounded-md '>
              <CommunityDropdown />
            </div>
          </div>
          <input
            type='text'
            placeholder='Title'
            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
          <textarea
            placeholder="What's on your mind..."
            className='w-full p-3 h-32 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
          ></textarea>
        </div>
        <div className='flex mt-3 justify-end'>
          <button
            onClick={onClose}
            className='px-6 py-2 mx-2 text-[#49A569] border border-[#49A569] rounded-lg hover:bg-gray-100'
          >
            Cancel
          </button>
          <button className='px-8 py-2 bg-[#49A569] text-white rounded-lg'>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
