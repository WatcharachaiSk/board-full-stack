'use client';
import React, { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useParams, useRouter } from 'next/navigation';
import CommentModal from '@components/modal/CommentModal';

const PostDetails = () => {
  const router = useRouter();
  const { id } = useParams();

  const navigateToBack = () => {
    router.back();
  };

  const post = {
    author: 'Zach',
    time: '5mo. ago',
    category: 'History',
    title: 'The Big Short War',
    content: `
      Tall, athletic, handsome with cerulean eyes, he was the kind of hyper-ambitious kid other kids loved to hate and just the type to make a big wager with no margin for error. But on the night before the S.A.T., his father took pity on him and canceled the bet. "I would've lost it," Ackman concedes. He got a 780 on the verbal and a 750 on the math. "One wrong on the verbal, three wrong on the math," he muses. "I'm still convinced some of the questions were wrong."
    `,
    commentsCount: 32,
  };

  const comments = [
    {
      id: 1,
      author: 'Wittawat98',
      time: '12h ago',
      text: 'Lorem ipsum dolor sit amet consectetur...',
    },
    {
      id: 2,
      author: 'Hawaii51',
      time: '1mo. ago',
      text: 'Lorem ipsum dolor sit amet consectetur...',
    },
    {
      id: 3,
      author: 'Helo_re',
      time: '3mo. ago',
      text: 'Lorem ipsum dolor sit amet consectetur...',
    },
    {
      id: 4,
      author: 'Azc123',
      time: '4mo. ago',
      text: 'Lorem ipsum dolor sit amet consectetur...',
    },
  ];

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddComment = () => {
    if (window.innerWidth <= 768) {
      setIsModalOpen(true);
    } else {
      setShowCommentForm(true);
    }
  };

  const handleCancel = () => {
    setShowCommentForm(false);
    setComment('');
  };

  const handlePostComment = () => {
    // Logic สำหรับโพสต์ความคิดเห็น
    console.log('Posting comment:', comment);
    setShowCommentForm(false);
    setComment('');
  };

  return (
    <div className='w-full bg-white flex justify-center'>
      <div className='w-full max-w-5xl bg-white p-6'>
        {/* Back Button */}
        <button
          onClick={() => {
            navigateToBack();
          }}
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
            <p className='text-lg font-semibold'>{post.author}</p>
            <span className='mt-1 mx-2 text-gray-500 text-sm'>{post.time}</span>
          </div>
        </div>

        {/* Post Content */}
        <div>
          <span className='inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full mb-2'>
            {post.category}
          </span>
          <h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
          <p className='text-gray-700 mb-6'>{post.content}</p>
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
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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
          {comments.map((comment) => (
            <div key={comment.id} className='flex items-start space-x-4'>
              <img
                src='https://via.placeholder.com/40'
                alt='user'
                className='w-15 h-15 rounded-full'
              />
              <div>
                <p className='font-semibold'>
                  {comment.author}{' '}
                  <span className='text-gray-500 text-sm'>{comment.time}</span>
                </p>
                <p className='mt-4 text-gray-700'>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Modal for Mobile */}
      <CommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PostDetails;
