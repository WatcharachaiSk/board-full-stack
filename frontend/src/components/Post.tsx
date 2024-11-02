// components/Post.tsx

import React, { useState } from 'react';
import { Routers } from '../routers/routers';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import DeletePostModal from './modal/DeletePostModal';
import EditPostModal from './modal/EditPostModal';

interface PostProps {
  id: number;
  index: number;
  author: string;
  category: string;
  title: string;
  excerpt: string;
  commentsCount: number;
  profileImage: string;
  navigateToPage: (page: string, isId?: number) => void;
  currentPage: string;
}

const Post: React.FC<PostProps> = ({
  id,
  index,
  author,
  category,
  title,
  excerpt,
  commentsCount,
  profileImage,
  navigateToPage,
  currentPage,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div
      className={`z-0 p-6 bg-white border-b border-gray-200 ${
        index == 0 && 'rounded-t-2xl'
      }`}
      onClick={() => {
        if (!isDeleteModalOpen && !isEditModalOpen) {
          navigateToPage(Routers.PostDetails, id);
        }
      }}
    >
      <DeletePostModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
      />
      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        postId={id}
      />
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-center space-x-4'>
          <img
            src={profileImage}
            alt={author}
            className='w-10 h-10 rounded-full'
          />
          <div>
            <p className='text-sm font-semibold text-gray-800'>{author}</p>
          </div>
        </div>
        {currentPage === Routers.OurBlog && (
          <div className='flex space-x-2'>
            <button
              className='text-gray-600 hover:text-gray-800'
              onClick={openEditModal}
            >
              <FaEdit />
            </button>
            <button
              className='text-gray-600 hover:text-gray-800'
              onClick={openDeleteModal}
            >
              <FaTrashAlt />
            </button>
          </div>
        )}
      </div>
      <span className='inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full'>
        {category}
      </span>
      <h2 className='text-lg font-bold text-gray-800 mb-2'>{title}</h2>
      <p className='text-gray-600 mb-4'>{excerpt}</p>
      <div className='flex items-center space-x-2 text-gray-500 text-sm'>
        <span>💬</span>
        <span>{commentsCount} Comments</span>
      </div>
    </div>
  );
};

export default Post;
