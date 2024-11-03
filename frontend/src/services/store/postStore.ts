// services/store/postStore.ts
import { fetchPosts, fetchPostById, Post, fetchPostsByUser, CreatePostBody, createPost, UpdateBody, updatePost, deletePostById } from '@services/api/postService';
import { create } from 'zustand';
import { Routers } from '../../routers/routers';

interface PostState {
  posts: Post[];
  post: Post | null;
  searchTerm: string | null;
  fetchPosts: () => Promise<void>;
  fetchPostsByUser: () => Promise<void>;
  fetchPostById: (id: number) => Promise<void>;
  createPost: (createBody: CreatePostBody, isPage: string) => Promise<void>;
  updatePost: (updateBody: UpdateBody) => Promise<void>;
  deletePostById: (id: number) => Promise<void>;
  searchPosts: (query: string) => void;
  searchPostscommunity: (communityId: number) => void;
}

const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  post: null,
  searchTerm: null,
  fetchPosts: async () => {
    const posts = await fetchPosts();
    set({ posts });
  },
  createPost: async (createBody: CreatePostBody, isPage: string) => {
  
    await createPost(createBody);
    if (isPage == Routers.OurBlog) {
      await get().fetchPostsByUser();
    } else {
      await get().fetchPosts();
    }
  },
  updatePost: async (updateBody: UpdateBody) => {
    await updatePost(updateBody);
    await get().fetchPostsByUser();
  },
  deletePostById: async (id: number) => {
    await deletePostById(id);
    await get().fetchPostsByUser();
  },
  fetchPostsByUser: async () => {
    const posts = await fetchPostsByUser();
    set({ posts });
  },
  fetchPostById: async (id: number) => {
    const post = await fetchPostById(id);
    set({ post });
  },
  searchPosts: (query: string) => {
    set({ searchTerm: query });
  },
  searchPostscommunity: async (communityId: number) => {
    await get().fetchPosts();
    if (communityId > 0) {
      const allPosts = get().posts;
      const filteredPosts = allPosts.filter((post) => post.community.id === Number(communityId));
      set({ posts: filteredPosts });
    } else {
      await get().fetchPosts();
    }
  }
}));

export default usePostStore;
