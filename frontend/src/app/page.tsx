'use client';

import { useEffect, useState } from 'react';
import Post from '@components/Post';
import { useRouter } from 'next/navigation';
import SearchCreate from '@components/SearchCreate';
import { Routers } from '../routers/routers';
import usePostStore from '@services/store/postStore';

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const navigateToPage = (page: string, isId?: number) => {
    router.push(`${page}/${isId}`);
  };
  const { posts, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log('Search Term:', e.target.value);
  };

  return (
    <div className='flex w-full h-full flex-col'>
      {/* Main Content */}
      <div className=' w-full lg:pr-72 mt-5'>
        <SearchCreate />
        {/* Post List */}
        <div className='px-3 md:px-0'>
          {posts.map((post, index) => (
            <Post
              currentPage={Routers.Home}
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
