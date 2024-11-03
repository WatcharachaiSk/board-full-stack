import { FC, useState } from 'react';
import useCommentStore from '@services/store/commentStore';
import { useParams } from 'next/navigation';

type CommentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CommentModal: FC<CommentModalProps> = ({ isOpen, onClose }) => {
  const { createComment } = useCommentStore();
  const { id } = useParams();
  const [commentContent, setCommentContent] = useState('');

  if (!isOpen) return null;

  const handlePostComment = async () => {
    if (commentContent.trim() === '') {
      return; // ไม่ให้โพสต์ความคิดเห็นที่ว่างเปล่า
    }

    try {
      await createComment({
        content: commentContent,
        postId: Number(id),
      });
      setCommentContent(''); // ล้างข้อความหลังโพสต์สำเร็จ
      onClose(); // ปิด Modal
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg w-11/12 max-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Add Comments</h2>
          <button onClick={onClose} className='text-gray-600 text-2xl'>
            &times;
          </button>
        </div>
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="What's on your mind..."
          className='w-full p-3 h-32 rounded-md border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500'
        ></textarea>
        <div className='flex flex-col'>
          <button
            onClick={onClose}
            className='mb-3 px-4 py-2 text-[#49A569] border border-[#49A569] rounded-md'
          >
            Cancel
          </button>
          <button
            onClick={handlePostComment}
            className='px-4 py-2 bg-[#49A569] text-white border border-[#49A569] rounded-md'
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
