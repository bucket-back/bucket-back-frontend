import { Comment } from '@/shared/types/comment';

export interface GetCommentsRequest {
  feedId: number;
  cursorId?: string;
  size: number;
}

interface CommentSummary {
  nextCursorId: string;
  summaryCount: number;
  summaries: Comment[];
}

export interface GetCommentsResponse {
  commentCursorSummary: CommentSummary;
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
