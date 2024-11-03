import { create } from 'zustand';
import { CreateCommentBody, CommentResponse, createComment, deleteComment, UpdateCommentBody, updateComment } from '@services/api/commentService';

interface CommentState {
  comment: CommentResponse | null
  createComment: (commentBody: CreateCommentBody) => Promise<void>;
  deleteComment: (id: number) => Promise<void>;
  updateComment: (updateCommentBody: UpdateCommentBody) => Promise<void>;

}

const useAuthStore = create<CommentState>((set) => ({
  comment: null,
  createComment: async (commentBody: CreateCommentBody) => {
    const comment = await createComment(commentBody);
    set({ comment });
  },
  updateComment: async (updateCommentBody: UpdateCommentBody) => {
    await updateComment(updateCommentBody);
  },
  deleteComment: async (id: number) => {
    await deleteComment(id);
  },
}));

export default useAuthStore;
