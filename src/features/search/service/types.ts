import { Item, ItemNameGetResult } from '@/shared/types';

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
