import { Item, ItemNameGetResult, VotesInfo } from '@/shared/types';

export interface GetSearchItemRequest {
  keyword: string;
  cursorId?: string;
  size: number;
}

export interface GetSearchItemResponse {
  nextCursorId: string;
  items: Item[];
  totalCount: number;
}

export interface GetSearchKeywordResponse {
  itemNameGetResults: ItemNameGetResult[];
}

export interface GetSearchVoteResponse {
  nextCursorId: string;
  totalCount: number;
  votes: VotesInfo[];
}
