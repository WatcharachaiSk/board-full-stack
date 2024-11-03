// services/api/commentService.ts
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

interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CommentResponse {
  content: string;
  user: User;
  post: Post;
  createdAt: string;
  updatedAt: string;
  id: number;
  deletedAt: string | null;
}

export interface CreateCommentBody {
  content: string,
  postId: number
}
export interface UpdateCommentBody {
  content: string,
  commentId: number
}

export const createComment = async (commentBody: CreateCommentBody): Promise<CommentResponse> => {
  const url = getApiUrl(ApiPaths.Comment);
  try {
    const response = await api.post<CommentResponse>(url, commentBody);
    return response.data
  } catch (error) {
    throw error
  }
};

export const updateComment = async (updateCommentBody: UpdateCommentBody): Promise<CommentResponse> => {
  const url = `${getApiUrl(ApiPaths.Comment)}/${updateCommentBody.commentId}`;
  try {
    const paload = { content: updateCommentBody.content }
    const response = await api.patch<CommentResponse>(url, paload);
    return response.data
  } catch (error) {
    throw error
  }
};

export const deleteComment = async (id: number): Promise<CommentResponse> => {
  const url = `${getApiUrl(ApiPaths.Comment)}/${id}`;
  try {
    const response = await api.delete<CommentResponse>(url);
    return response.data
  } catch (error) {
    throw error
  }
};


