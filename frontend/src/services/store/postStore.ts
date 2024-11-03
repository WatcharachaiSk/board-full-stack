import { fetchPosts, fetchPostById, Post, fetchPostsByUser, CreatePostBody, createPost, UpdateBody, updatePost, deletePostById } from '@services/api/postService';
import { create } from 'zustand';

interface PostState {
  posts: Post[];
  post: Post | null;
  fetchPosts: () => Promise<void>;
  fetchPostsByUser: () => Promise<void>;
  fetchPostById: (id: number) => Promise<void>;
  createPost: (createBody: CreatePostBody) => Promise<void>;
  updatePost: (updateBody: UpdateBody) => Promise<void>;
  deletePostById: (id: number) => Promise<void>;
}

const usePostStore = create<PostState>((set) => ({
  posts: [],
  post: null,
  fetchPosts: async () => {
    const posts = await fetchPosts();
    set({ posts });
  },
  createPost: async (createBody: CreatePostBody) => {
    await createPost(createBody);
    await usePostStore.getState().fetchPosts();
  },
  updatePost: async (updateBody: UpdateBody) => {
    await updatePost(updateBody);
    await usePostStore.getState().fetchPosts();
  },
  deletePostById: async (id: number) => {
    await deletePostById(id);
    await usePostStore.getState().fetchPosts();
  },
  fetchPostsByUser: async () => {
    const posts = await fetchPostsByUser();
    set({ posts });
  },
  fetchPostById: async (id: number) => {
    const post = await fetchPostById(id);
    set({ post });
  },
}));

export default usePostStore;
