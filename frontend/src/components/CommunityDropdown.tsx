import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const CommunityDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Community');
  const items = [
    'Choose a community',
    'History',
    'Food',
    'Pets',
    'Health',
    'Fashion',
    'Exercise',
    'Others',
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item : string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className='relative inline-block text-left'>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className='flex items-center px-4 py-2  text-gray-800 rounded-lg'
      >
        {selectedItem}
        <FaChevronDown className='ml-2 text-sm' />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className='absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-10'>
          {items.map((item) => (
            <button
              key={item}
              onClick={() => handleSelect(item)}
              className={`${
                selectedItem === item
                  ? 'bg-green-100 text-green-600'
                  : 'text-gray-800'
              } flex justify-between w-full px-4 py-2 text-left hover:bg-green-50`}
            >
              {item}
              {selectedItem === item && <span>✔️</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityDropdown;
