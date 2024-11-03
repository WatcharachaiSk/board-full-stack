'use client';

import { useEffect } from 'react';
import Post from '@components/Post';
import { useRouter } from 'next/navigation';
import SearchCreate from '@components/SearchCreate';
import { Routers } from '../routers/routers';
import usePostStore from '@services/store/postStore';

export default function Home() {
  const router = useRouter();
  const navigateToPage = (page: string, isId?: number) => {
    router.push(`${page}/${isId}`);
  };
  const { posts, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className='flex w-full h-full flex-col'>
      {/* Main Content */}
      <div className=' w-full lg:pr-72 mt-5'>
        <SearchCreate />
        {/* Post List */}
        {posts.map((post, index) => (
          <Post
            currentPage={Routers.Home}
            key={index}
            index={index}
            id={post.id}
            user={post.user.username}
            community={post.community.title}
            title={post.title}
            content={post.content}
            commentsCount={post.commentsCount}
            navigateToPage={navigateToPage}
          />
        ))}
      </div>
    </div>
  );
}
