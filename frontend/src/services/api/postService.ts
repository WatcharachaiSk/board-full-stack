// services/api/postService.ts
import { ApiPaths } from '../../constants/apiPaths';
import { getApiUrl } from '../../utils/apiHelpers';
import api from './api';

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  username: string;
}

interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  content: string;
  user: User;
}

interface Community {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
}

export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  title: string;
  content: string;
  user: User;
  comments: Comment[];
  community: Community;
  commentsCount: number;
}
export interface CreatePostBody {
  title: string;
  content: string;
  communityId: number;
}

export interface UpdateBody extends CreatePostBody {
  id: number;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const url = getApiUrl(ApiPaths.Post);
  try {
    const response = await api.get<Post[]>(url);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const createPost = async (createBody: CreatePostBody): Promise<Post> => {
  const url = getApiUrl(ApiPaths.Post);
  try {
    const response = await api.post<Post>(url, createBody);
    return response.data
  } catch (error) {
    throw error
  }
};

export const updatePost = async (updateBody: UpdateBody): Promise<Post> => {
  const url = `${getApiUrl(ApiPaths.Post)}/${updateBody.id}`;
  try {
    const payload = {
      title: updateBody.title,
      content: updateBody.content,
      communityId: updateBody.communityId
    }
    const response = await api.patch<Post>(url, payload);
    return response.data
  } catch (error) {
    throw error
  }
};

export const fetchPostsByUser = async (): Promise<Post[]> => {
  const url = getApiUrl(ApiPaths.PostByUser);
  try {
    const response = await api.get<Post[]>(url);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const fetchPostById = async (id: number): Promise<Post> => {
  const url = `${getApiUrl(ApiPaths.Post)}/${id}`;
  try {
    const response = await api.get<Post>(url);
    return response.data;
  } catch (error) {
    throw error
  }
};

export const deletePostById = async (id: number) => {
  const url = `${getApiUrl(ApiPaths.Post)}/${id}`;
  try {
    const response = await api.delete<Post>(url);
    return response
  } catch (error) {
    throw error
  }
};

