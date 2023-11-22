import { ItemInfo, Item, ItemNameGetResult, MyItemSummary } from '@/shared/types';

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
}

export interface GetSearchItemRequest {
  keyword: string;
  cursorId: string;
  size: number;
}

export interface GetSearchItemResponse {
  nextCursorId: string;
  items: Item[];
}

export interface GetSearchKeywordResponse {
  itemNameGetResults: ItemNameGetResult[];
}

export interface GetMyItemsRequest {
  hobbyName?: string;
  cursorId?: string;
  size?: number;
}

export interface GetMyItemsResponse {
  cursorId: string;
  summaries: MyItemSummary[];
  totalCount: number;
}
