// services/api/commentService.ts
import { sweet_mixin } from '@components/sweetalert2/sweet';
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
    sweet_mixin('top-end', 'success', 'create comment success', '', 1500);
    return response.data
  } catch (error) {
    sweet_mixin('top-end', 'error', 'create comment error', '', 1500);
    throw error
  }
};

export const updateComment = async (updateCommentBody: UpdateCommentBody): Promise<CommentResponse> => {
  const url = `${getApiUrl(ApiPaths.Comment)}/${updateCommentBody.commentId}`;
  try {
    const paload = { content: updateCommentBody.content }
    const response = await api.patch<CommentResponse>(url, paload);
    sweet_mixin('top-end', 'success', 'update comment success', '', 1500);
    return response.data
  } catch (error) {
    sweet_mixin('top-end', 'error', 'update comment error', '', 1500);
    throw error
  }
};

export const deleteComment = async (id: number): Promise<CommentResponse> => {
  const url = `${getApiUrl(ApiPaths.Comment)}/${id}`;
  sweet_mixin('top-end', 'success', 'delete comment success', '', 1500);
  try {
    const response = await api.delete<CommentResponse>(url);
    return response.data
  } catch (error) {
    sweet_mixin('top-end', 'error', 'delete comment error', '', 1500);
    throw error
  }
};


