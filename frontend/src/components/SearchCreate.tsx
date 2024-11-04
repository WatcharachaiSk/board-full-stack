import React, { useState, useEffect } from 'react';
import { FaSearch, FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import CreatePostModal from './modal/CreatePostModal';
import useCommunityStore from '@services/store/communityStore';
import usePostStore from '@services/store/postStore';
import LoginRequiredModal from './modal/LoginRequiredModal';
import useAuthStore from '@services/store/authStore';
import { AiOutlineCheck } from 'react-icons/ai';

const SearchCreate: React.FC = () => {
  const { searchPosts, searchPostscommunity } = usePostStore();
  const { searchTerm } = usePostStore();
  const [username, setUsername] = useState('');
  const { isAuthenticated } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { communities, fetchCommunities } = useCommunityStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] =
    useState('Choose a community');
  const [searchInput, setSearchInput] = useState(searchTerm || '');
  const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] =
    useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsername(localStorage.getItem('username') || '');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  const openModal = () => {
    if (!isAuthenticated) {
      setIsLoginRequiredModalOpen(true);
      return null;
    }
    setIsModalOpen(true);
  };

  const closeLoginRequiredModal = () => {
    setIsLoginRequiredModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCommunitySelect = (communityTitle: string, id: number) => {
    setSelectedCommunity(communityTitle);
    searchPostscommunity(id);
    setIsDropdownOpen(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    searchPosts(value);
  };
  return (
    <div className='w-full md:flex items-center mb-6'>
      <div className='md:hidden w-full flex items-center justify-between mb-4 p-4 bg-[#BBC2C0]'>
        {isSearchVisible ? (
          <div className='flex grow items-center rounded-lg px-3 py-2 w-full border border-white'>
            <FaArrowLeft
              className='text-gray-500 mr-2'
              onClick={toggleSearch}
            />
            <input
              style={{ background: '#BBC2C0' }}
              type='text'
              placeholder='Search'
              value={searchInput} // Bind search term to input value
              onChange={handleSearchInputChange} // Handle search input change
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
            <div className='flex-none relative inline-block text-left'>
              <button
                onClick={toggleDropdown}
                className='flex items-center px-4 py-2 text-gray-800 rounded-lg'
              >
                {selectedCommunity}
                <FaChevronDown className='ml-2 text-sm' />
              </button>

              {isDropdownOpen && (
                <div className='absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-10'>
                  <button
                    key='Choose a community'
                    onClick={() =>
                      handleCommunitySelect('Choose a community', 0)
                    }
                    className={`flex justify-between w-full px-4 py-2 text-left hover:bg-green-50 ${
                      selectedCommunity === 'Choose a community'
                        ? 'bg-green-100 text-green-600'
                        : 'text-gray-800'
                    }`}
                  >
                    Choose a community
                  </button>
                  {Array.isArray(communities) &&
                    communities.map((community) => (
                      <button
                        key={community.id}
                        onClick={() =>
                          handleCommunitySelect(community.title, community.id)
                        }
                        className={`flex justify-between w-full px-4 py-2 text-left hover:bg-green-50 ${
                          selectedCommunity === community.title
                            ? 'bg-green-100 text-green-600'
                            : 'text-gray-800'
                        }`}
                      >
                        {community.title}
                        {selectedCommunity === community.title && (
                          <span>
                            <AiOutlineCheck color={'#4A4A4A'} />
                          </span>
                        )}
                      </button>
                    ))}
                </div>
              )}
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
            value={searchInput}
            onChange={handleSearchInputChange}
            className='text-gray-700 placeholder-gray-500 focus:outline-none w-full'
          />
        </div>
        <div className='flex-none relative inline-block text-left ml-4'>
          <button
            onClick={toggleDropdown}
            className='flex items-center px-4 py-2 text-gray-800 rounded-lg'
          >
            {selectedCommunity}
            <FaChevronDown className='ml-2 text-sm' />
          </button>

          {isDropdownOpen && (
            <div className='absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-10'>
              <button
                key='Choose a community'
                onClick={() => handleCommunitySelect('Choose a community', 0)}
                className={`flex justify-between w-full px-4 py-2 text-left hover:bg-green-50 ${
                  selectedCommunity === 'Choose a community'
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-800'
                }`}
              >
                Choose a community
              </button>
              {Array.isArray(communities) &&
                communities.map((community) => (
                  <button
                    key={community.id}
                    onClick={() =>
                      handleCommunitySelect(community.title, community.id)
                    }
                    className={`flex justify-between w-full px-4 py-2 text-left hover:bg-green-50 ${
                      selectedCommunity === community.title
                        ? 'bg-green-100 text-green-600'
                        : 'text-gray-800'
                    }`}
                  >
                    {community.title}
                    {selectedCommunity === community.title && (
                      <span>
                        <AiOutlineCheck color={'#4A4A4A'} />
                      </span>
                    )}
                  </button>
                ))}
            </div>
          )}
        </div>
        <button
          style={{ background: '#49A569' }}
          className='text-white hover:text-white py-2 px-4 text-sm hover:border-transparent rounded whitespace-nowrap ml-4'
          onClick={openModal}
        >
          Create +
        </button>
      </div>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={closeModal}
        communities={communities}
      />

      <LoginRequiredModal
        isOpen={isLoginRequiredModalOpen}
        onClose={closeLoginRequiredModal}
        title='create'
      />
    </div>
  );
};

export default SearchCreate;
