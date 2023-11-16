import {
  PostItem,
  ItemInfo,
  Review,
  Item,
  ItemNameGetResult,
  ReviewInfo,
} from '@/shared/types/item';

export interface postItemRequest {
  params: PostItem;
}

export interface getTakeItemReqest {
  itemIds: string[];
}

export interface getTakeItemResponse {
  itemIds: string[];
}

export interface getDetailItemResponse {
  itemInfo: ItemInfo;
  itemUrl: string;
  itemAvgRate: number;
  isMemberItem: boolean;
}

export interface getSearchReviewListRequest {
  itemId: number;
  cursorId: string;
  size: number;
}

export interface getSearchReviewListResponse {
  reviewCount: number;
  nextCursorId: string;
  reviews: Review[];
}

export interface getSearchItemRequest {
  keyword: string;
  cursorId: string;
  size: number;
}

export interface getSearchItemResponse {
  nextCursorId: string;
  items: Item[];
}

export interface getSearchReviewListRequest {
  itemId: number;
  cursorId: string;
  size: number;
}

export interface getSearchKeywordResponse {
  itemNameGetResults: ItemNameGetResult[];
}

export interface postReviewItemRequest {
  itemId: number;
  params: ReviewInfo;
}

export interface putEditReviewItemRequest {
  itemId: number;
  reviewId: string;
  params: ReviewInfo;
}

export interface deleteReviewItemRequest {
  itemId: number;
  reviewId: string;
}

export interface postItemResponse {
  itemId: number;
}
