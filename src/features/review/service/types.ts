import { Review } from '@/shared/types';

export interface GetSearchReviewListRequest {
  itemId: number;
  cursorId?: string;
  size: number;
}

export interface GetSearchReviewListResponse {
  itemReviewTotalCount: number;
  nextCursorId?: string;
  totalCount: number;
  reviews: Review[];
}

export interface GetReviewItemRequest {
  itemId: number;
  reviewId: number;
}

export interface GetReviewItemResponse {
  reviewId: string;
  content: string;
  rating: number;
}

export interface PostReviewItemRequest {
  itemId: number;
  content: string;
  rating: number;
}

export interface PostReviewItemResponse {
  itemId: number;
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
