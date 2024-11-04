'use client';

// import AuthStatus from '@components/AuthStatus';
import Post from '@components/Post';
// import Sidebar from '@components/Sidebar';
import { useRouter } from 'next/navigation';
import SearchCreate from '@components/SearchCreate';
import { Routers } from '../../routers/routers';
import usePostStore from '@services/store/postStore';
import { useEffect } from 'react';

function OurBlog() {
  const router = useRouter();
  const { posts, fetchPostsByUser } = usePostStore();

  const navigateToPage = (page: string, isId?: number) => {
    router.push(`${page}/${isId}`);
  };
  useEffect(() => {
    fetchPostsByUser();
  }, [fetchPostsByUser]);
  return (
    <div className='flex w-full h-full flex-col'>
      {/* Main Content */}
      <div className=' w-full lg:pr-72 mt-5'>
        <SearchCreate />
        <div className='px-3 md:px-0'>
          {/* Post List */}
          {posts.map((post, index) => (
            <Post
              currentPage={Routers.OurBlog}
              key={index}
              index={index}
              id={post.id}
              user={post.user.username}
              community={post.community.title}
              communityId={post.community.id}
              title={post.title}
              content={post.content}
              commentsCount={post.commentsCount}
              navigateToPage={navigateToPage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurBlog;
