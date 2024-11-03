import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface Community {
  id: number;
  title: string;
}

interface CommunityDropdownProps {
  communities?: Community[];
}

const CommunityDropdown: React.FC<CommunityDropdownProps> = ({
  communities = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Choose a community');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className='relative inline-block text-left'>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className='flex items-center px-4 py-2 text-gray-800 rounded-lg'
      >
        {selectedItem}
        <FaChevronDown className='ml-2 text-sm' />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className='absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-10'>
          <button
            key='Choose a community'
            onClick={() => handleSelect('Choose a community')}
            className={`flex justify-between w-full px-4 py-2 text-left hover:bg-green-50 ${
              selectedItem === 'Choose a community'
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
                onClick={() => handleSelect(community.title)}
                className={`flex justify-between w-full px-4 py-2 text-left hover:bg-green-50 ${
                  selectedItem === community.title
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-800'
                }`}
              >
                {community.title}
                {selectedItem === community.title && <span>✔️</span>}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default CommunityDropdown;
