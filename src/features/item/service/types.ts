import { ItemInfo, MyItemSummary } from '@/shared/types';

export interface PostItemRequest {
  hobbyValue: string;
  itemUrl: string;
}
export interface PostItemResponse {
  itemId: number;
}

export interface PostTakeItemRequest {
  itemIds: string[];
}

export interface PostTakeItemResponse {
  itemIds: string[];
}

export interface GetDetailItemResponse {
  itemInfo: ItemInfo;
  itemUrl: string;
  itemAvgRate: number;
  isMemberItem: boolean;
  isReviewed: boolean;
}

export interface GetMyItemsRequest {
  hobbyName?: string;
  cursorId?: string;
  size?: number;
}

export interface GetMyItemsResponse {
  nextCursorId: string;
  summaries: MyItemSummary[];
  totalCount: number;
  totalMemberItemCount: number;
}

export interface DeleteItemRequest {
  itemIds: string;
}
