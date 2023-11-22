import { Comment } from '@/shared/types/comment';

export interface GetCommentsRequest {
  feedId: number;
  cursorId?: string;
  size: number;
}

export interface GetCommentsResponse {
  nextCursorId: string;
  totalCount: number;
  comments: Comment[];
}

export interface PostCommentRequest {
  feedId: number;
  content: string;
}

export interface PostCommentAdoptionRequest {
  feedId: number;
  commentId: number;
}

export interface PutCommentRequest {
  feedId: number;
  commentId: number;
  content: string;
}

export interface DeleteCommentRequest {
  feedId: number;
  commentId: number;
}
