import React, { useState } from 'react';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import CommunityDropdown from './CommunityDropdown';
import CreatePostModal from './modal/CreatePostModal';

const SearchCreate: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className='w-full md:flex items-center mb-6'>
      <div className='md:hidden w-full flex items-center justify-between mb-4 p-4 bg-[#BBC2C0]'>
        {isSearchVisible ? (
          <div className='flex grow items-center rounded-lg px-3 py-2 w-full border border-white '>
            <FaArrowLeft
              className='text-gray-500 mr-2'
              onClick={toggleSearch}
            />
            <input
              style={{ background: '#BBC2C0' }}
              type='text'
              placeholder='Search'
              className='text-gray-700 placeholder-gray-500 focus:outline-none w-full'
            />
          </div>
        ) : (
          <div className='grow'>
            <FaSearch className='text-gray-500 mr-2' onClick={toggleSearch} />
          </div>
        )}
        {!isSearchVisible && (
          <>
            <div className='flex-none'>
              <CommunityDropdown />
            </div>
            <button
              style={{ background: '#49A569' }}
              className='flex-none text-white hover:text-white py-2 px-4 text-sm hover:border-transparent rounded whitespace-nowrap'
              onClick={openModal}
            >
              Create +
            </button>
          </>
        )}
      </div>
      <div className='hidden md:flex w-full items-center'>
        <div
          style={{ background: '#BBC2C0' }}
          className='md:flex items-center rounded-lg px-3 py-2 w-full border border-white'
        >
          <FaSearch className='text-gray-500 mr-2' />
          <input
            style={{ background: '#BBC2C0' }}
            type='text'
            placeholder='Search'
            className='text-gray-700 placeholder-gray-500 focus:outline-none w-full'
          />
        </div>
        <CommunityDropdown />
        <button
          style={{ background: '#49A569' }}
          className='text-white hover:text-white py-2 px-4 text-sm hover:border-transparent rounded whitespace-nowrap'
          onClick={openModal}
        >
          Create +
        </button>
      </div>
      <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default SearchCreate;
