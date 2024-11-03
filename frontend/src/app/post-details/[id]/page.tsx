'use client';

import React, { useEffect, useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams, useRouter } from 'next/navigation';
import CommentModal from '@components/modal/CommentModal';
import usePostStore from '@services/store/postStore';
import useCommentStore from '@services/store/commentStore';
import useAuthStore from '@services/store/authStore';
import DeleteConfirmationModal from '@components/modal/DeleteConfirmationModal';

const PostDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const { post, fetchPostById } = usePostStore();
  const { createComment, deleteComment, updateComment, comment } =
    useCommentStore();
  const { isAuthenticated } = useAuthStore();
  const [username, setUsername] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const [isEditingComment, setIsEditingComment] = useState<number | null>(null);
  const [editCommentContent, setEditCommentContent] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsername(localStorage.getItem('username') || '');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (id) {
      fetchPostById(Number(id));
    }
  }, [id, fetchPostById]);

  // ดึงข้อมูลโพสต์ใหม่เมื่อมีการสร้างความคิดเห็นใหม่
  useEffect(() => {
    if (id && comment) {
      fetchPostById(Number(id));
    }
  }, [id, comment, fetchPostById]);

  const navigateToBack = () => {
    router.back();
  };

  const handleAddComment = () => {
    if (window.innerWidth <= 768) {
      setIsModalOpen(true);
    } else {
      setShowCommentForm(true);
    }
  };

  const handleCancel = () => {
    setShowCommentForm(false);
    setCommentContent('');
  };

  const handlePostComment = async () => {
    if (commentContent.trim() === '') {
      alert('Please enter your comment');
      return;
    }

    try {
      await createComment({
        content: commentContent,
        postId: Number(id),
      });
      setShowCommentForm(false);
      setCommentContent('');
    } catch (error) {
      alert('Error posting comment');
    }
  };

  const handleDeleteComment = async () => {
    if (commentToDelete !== null) {
      try {
        await deleteComment(commentToDelete);
        setIsDeleteConfirmationOpen(false);
        setCommentToDelete(null);
        if (id) {
          fetchPostById(Number(id));
        }
      } catch (error) {
        alert('Error deleting comment');
      }
    }
  };

  const confirmDeleteComment = (commentId: number) => {
    setCommentToDelete(commentId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleEditComment = (commentId: number, content: string) => {
    setIsEditingComment(commentId);
    setEditCommentContent(content);
  };

  const handleUpdateComment = async () => {
    if (editCommentContent.trim() === '') {
      alert('Please enter your comment');
      return;
    }

    try {
      await updateComment({
        commentId: isEditingComment!,
        content: editCommentContent,
      });
      setIsEditingComment(null);
      setEditCommentContent('');
      if (id) {
        fetchPostById(Number(id));
      }
    } catch (error) {
      alert('Error updating comment');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full bg-white flex justify-center'>
      <div className='w-full max-w-5xl bg-white p-6'>
        {/* Back Button */}
        <button
          onClick={navigateToBack}
          style={{ background: '#D8E9E4' }}
          className='hover:bg-gray-300 text-gray-700 p-2 rounded-full'
        >
          <MdArrowBack className='h-6 w-6' />
        </button>

        {/* Post Header */}
        <div className='flex items-center mb-4 mt-8'>
          <img
            src='https://via.placeholder.com/40'
            alt='author'
            className='w-15 h-15 rounded-full'
          />
          <div className='flex flex-row ml-4'>
            <p className='text-lg font-semibold'>{post.user.username}</p>
            <span className='mt-1 mx-2 text-gray-500 text-sm'>
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Post Content */}
        <div>
          <span className='inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full mb-2'>
            {post.community.title}
          </span>
          <h1
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              wordBreak: 'break-word',
            }}
            className='text-2xl font-bold mb-4'
          >
            {post.title}
          </h1>
          <p
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              wordBreak: 'break-word',
            }}
            className='text-gray-700 mb-6'
          >
            {post.content}
          </p>
          <p className='text-gray-500 mb-4'>💬 {post.commentsCount} Comments</p>

          {/* Add Comment Button */}
          {!showCommentForm && (
            <button
              onClick={handleAddComment}
              className='px-8 py-2 border border-[#49A569] text-[#49A569] rounded-lg hover:bg-gray-100'
            >
              Add Comments
            </button>
          )}

          {/* Comment Form */}
          {showCommentForm && (
            <div className='mt-4'>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="What's on your mind..."
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4'
                rows={4}
              ></textarea>
              <div className='flex space-x-4 justify-end'>
                <button
                  onClick={handleCancel}
                  className='px-8 py-2 text-[#49A569] border border-[#49A569] rounded-lg hover:bg-gray-100'
                >
                  Cancel
                </button>
                <button
                  onClick={handlePostComment}
                  className='px-8 py-2 bg-[#49A569] text-white rounded-lg'
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className='mt-6 space-y-4'>
          {post.comments.map((comment) => (
            <div key={comment.id} className='flex items-start space-x-4'>
              <img
                src='https://via.placeholder.com/40'
                alt='user'
                className='w-15 h-15 rounded-full'
              />
              <div className='flex-grow'>
                {isEditingComment === comment.id ? (
                  <div className='mt-4'>
                    <textarea
                      value={editCommentContent}
                      onChange={(e) => setEditCommentContent(e.target.value)}
                      placeholder='Edit your comment...'
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4'
                      rows={4}
                    ></textarea>
                    <div className='flex space-x-4 justify-end'>
                      <button
                        onClick={() => setIsEditingComment(null)}
                        className='px-8 py-2 text-[#49A569] border border-[#49A569] rounded-lg hover:bg-gray-100'
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdateComment}
                        className='px-8 py-2 bg-[#49A569] text-white rounded-lg'
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className='font-semibold'>
                      {comment.user.username}{' '}
                      <span className='text-gray-500 text-sm'>
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </p>
                    <p
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        wordBreak: 'break-word',
                      }}
                      className='mt-4 text-gray-700'
                    >
                      {comment.content}
                    </p>
                  </>
                )}
              </div>
              {isAuthenticated && username === comment.user.username && (
                <div className='flex space-x-2'>
                  <button
                    onClick={() =>
                      handleEditComment(comment.id, comment.content)
                    }
                    className='text-blue-500 hover:text-blue-700'
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => confirmDeleteComment(comment.id)}
                    className='text-red-500 hover:text-red-700'
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Comment Modal for Mobile */}
      <CommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onCancel={() => setIsDeleteConfirmationOpen(false)}
        onConfirm={handleDeleteComment}
      />
    </div>
  );
};

export default PostDetails;
