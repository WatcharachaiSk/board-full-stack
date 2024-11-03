// components/Post.tsx

import React, { useState } from 'react';
import { Routers } from '../routers/routers';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import DeletePostModal from './modal/DeletePostModal';
import EditPostModal from './modal/EditPostModal';
import useCommunityStore from '@services/store/communityStore';
import usePostStore from '@services/store/postStore';

interface PostProps {
  id: number;
  index: number;
  user: string;
  communityId: number;
  community: string;
  title: string;
  content: string;
  commentsCount: number;
  navigateToPage: (page: string, isId?: number) => void;
  currentPage: string;
}

const Post: React.FC<PostProps> = ({
  id,
  index,
  user,
  community,
  communityId,
  title,
  content,
  commentsCount,
  navigateToPage,
  currentPage,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { communities } = useCommunityStore();
  const { searchTerm } = usePostStore();

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

  const highlightText = (text: string) => {
    if (!searchTerm || searchTerm.length < 2) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: '#C5A365' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
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
      {isDeleteModalOpen && (
        <DeletePostModal
          postId={id}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      )}
      {isEditModalOpen && (
        <EditPostModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          postId={id}
          communities={communities}
          community={community}
          communityId={communityId}
          title={title}
          content={content}
        />
      )}
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-center space-x-4'>
          <img
            src={'https://via.placeholder.com/40'}
            alt={user}
            className='w-10 h-10 rounded-full'
          />
          <div>
            <p className='text-sm font-semibold text-gray-800'>{user}</p>
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
        {community}
      </span>
      <h2
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          wordBreak: 'break-word',
        }}
        className='text-lg font-bold text-gray-800 mb-2'
      >
        {highlightText(title)}
      </h2>
      <p
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          wordBreak: 'break-word',
        }}
        className='text-gray-600 mb-4'
      >
        {content}
      </p>
      <div className='flex items-center space-x-2 text-gray-500 text-sm'>
        <span>💬</span>
        <span>{commentsCount} Comments</span>
      </div>
    </div>
  );
};

export default Post;
