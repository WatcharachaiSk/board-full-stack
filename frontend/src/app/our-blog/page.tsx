'use client';

// import AuthStatus from '@components/AuthStatus';
import Post from '@components/Post';
// import Sidebar from '@components/Sidebar';
import { useRouter } from 'next/navigation';
import SearchCreate from '@components/SearchCreate';
import { Routers } from '../../routers/routers';

function OurBlog() {
  const router = useRouter();

  const navigateToPage = (page: string, isId?: number) => {
    router.push(`${page}/${isId}`);
  };
  const posts = [
    {
      id: 1,
      author: 'User',
      category: 'History',
      title: 'The Beginning of the End of the World',
      excerpt:
        'The afterlife sitcom The Good Place comes to its culmination, the show’s two protagonists, Eleanor and Chidi...',
      commentsCount: 32,
      profileImage: 'https://via.placeholder.com/40',
    },
  ];
  return (
    <div className='flex w-full h-full flex-col'>
      {/* Main Content */}
      <div className=' w-full lg:pr-72 mt-5'>
        <SearchCreate />

        {/* Post List */}
        {posts.map((post, index) => (
          <Post
            currentPage={Routers.OurBlog}
            key={index}
            index={index}
            id={post.id}
            author={post.author}
            category={post.category}
            title={post.title}
            excerpt={post.excerpt}
            commentsCount={post.commentsCount}
            profileImage={post.profileImage}
            navigateToPage={navigateToPage}
          />
        ))}
      </div>
    </div>
  );
}

export default OurBlog;
