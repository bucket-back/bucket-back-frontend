import { Review } from '@/shared/types';

export interface GetSearchReviewListRequest {
  itemId: number;
  cursorId: string;
  size: number;
}

export interface GetSearchReviewListResponse {
  totalCount: number;
  nextCursorId: null | string;
  reviews: Review[];
}

export interface PostReviewItemRequest {
  itemId: number;
  content: string;
  rating: number;
}

export interface PutEditReviewItemRequest {
  itemId: number;
  reviewId: string;
  content: string;
  rating: number;
}

export interface DeleteReviewItemRequest {
  itemId: number;
  reviewId: string;
}
