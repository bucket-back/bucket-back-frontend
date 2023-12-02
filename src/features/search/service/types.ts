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
  itemTotalCount: number;
}

export interface GetSearchKeywordResponse {
  itemNameGetResults: ItemNameGetResult[];
}

export interface GetSearchVoteResponse {
  totalVoteCount: number;
  nextCursorId: string;
  totalCount: number;
  votes: VotesInfo[];
}
