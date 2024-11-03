import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { FC } from 'react';
import usePostStore from '@services/store/postStore';

interface Community {
  id: number;
  title: string;
}

type EditPostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  communities?: Community[];
  community: string;
  communityId: number;
  title: string;
  content: string;
};

const EditPostModal: FC<EditPostModalProps> = ({
  isOpen,
  onClose,
  postId,
  communities = [],
  community,
  communityId,
  title,
  content,
}) => {
  const { updatePost } = usePostStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formState, setFormState] = useState({
    selectedCommunity: community,
    communityId: communityId || (null as number | null),
    title: title,
    content: content,
  });

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      selectedCommunity: community,
    }));
  }, [community]);

  if (!isOpen) return null;

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleCommunitySelect = (communityTitle: string, id: number) => {
    setFormState((prevState) => ({
      ...prevState,
      selectedCommunity: communityTitle,
      communityId: id,
    }));
    setIsDropdownOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formState.communityId) {
      alert('Please select a community.');
      return;
    }

    if (formState.title.trim() === '' || formState.content.trim() === '') {
      alert('Please enter both title and content.');
      return;
    }

    try {
      await updatePost({
        id: postId,
        title: formState.title,
        content: formState.content,
        communityId: formState.communityId,
      });
      // Reset form state after posting
      console.log('formState is ', formState);

      setFormState({
        selectedCommunity: 'Choose a community',
        communityId: null,
        title: '',
        content: '',
      });
      onClose();
    } catch (error) {
      alert('Error updating post:');
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg w-11/12 max-w-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Edit Post {postId}</h2>
          <button onClick={onClose} className='text-gray-600 text-2xl'>
            &times;
          </button>
        </div>
        <div className='flex flex-col space-y-4'>
          {/* Community Dropdown */}
          <div className='flex relative inline-block text-left'>
            <button
              onClick={toggleDropdown}
              className='flex items-center px-4 py-2 text-gray-800 rounded-lg border border-[#49A569]'
            >
              {formState.selectedCommunity}
              <FaChevronDown className='ml-2 text-sm' />
            </button>

            {isDropdownOpen && (
              <div className='absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-10'>
                <button
                  key='Choose a community'
                  onClick={() => handleCommunitySelect('Choose a community', 0)}
                  className={`flex justify-between w-full px-4 py-2 text-left hover:bg-green-50 ${
                    formState.selectedCommunity === 'Choose a community'
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
                        formState.selectedCommunity === community.title
                          ? 'bg-green-100 text-green-600'
                          : 'text-gray-800'
                      }`}
                    >
                      {community.title}
                      {formState.selectedCommunity === community.title && (
                        <span>✔️</span>
                      )}
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Title Input */}
          <input
            type='text'
            name='title'
            value={formState.title}
            onChange={handleInputChange}
            placeholder='Title'
            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />

          {/* Content Textarea */}
          <textarea
            name='content'
            value={formState.content}
            onChange={handleInputChange}
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
          <button
            onClick={handleSubmit}
            className='px-8 py-2 bg-[#49A569] text-white rounded-lg'
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
