'use client';

// import AuthStatus from '@components/AuthStatus';
import Post from '@components/Post';
// import Sidebar from '@components/Sidebar';
import { useRouter } from 'next/navigation';
import SearchCreate from '@components/SearchCreate';
import { Routers } from '../routers/routers';

export default function Home() {
  const router = useRouter();

  const navigateToPage = (page: string, isId?: number) => {
    router.push(`${page}/${isId}`);
  };
  const posts = [
    {
      id: 1,
      author: 'Wittawat',
      category: 'History',
      title: 'The Beginning of the End of the World',
      excerpt:
        'The afterlife sitcom The Good Place comes to its culmination, the show’s two protagonists, Eleanor and Chidi...',
      commentsCount: 32,
      profileImage: 'https://via.placeholder.com/40',
    },
    {
      id: 2,
      author: 'Zach',
      category: 'History',
      title: 'The Big Short War',
      excerpt:
        'Tall, athletic, handsome with cerulean eyes, he was the kind of hyper-ambitious kid other kids loved to hate...',
      commentsCount: 4,
      profileImage: 'https://via.placeholder.com/40',
    },
    {
      id: 3,
      author: 'Nicholas',
      category: 'Exercise',
      title: 'The Mental Health Benefits of Exercise',
      excerpt:
        'You already know that exercise is good for your body. But did you know it can also boost your mood, improve your sleep...',
      commentsCount: 32,
      profileImage: 'https://via.placeholder.com/40',
    },
    {
      id: 4,
      author: 'Carl',
      category: 'History',
      title: 'What Makes a Man Betray His Country?',
      excerpt:
        'The life of Adolf Tolkachev, Soviet dissident and CIA spy. Excerpted from The Billion Dollar Spy: A True Story of Cold War...',
      commentsCount: 4,
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
            currentPage={Routers.Home}
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
