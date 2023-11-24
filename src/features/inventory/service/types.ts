import { inventoryInfo, inventoryItemInfo, reviewedItem } from '@/shared/types/inventory';

export interface PutEditInventoryRequest {
  inventoryId: number;
  itemIds: number[];
}

export interface PostCreateInventoryRequest {
  hobbyValue: string;
  itemIds: number[];
}

export interface PostCreateInventoryResponse {
  inventoryId: number;
}

export interface GetInventoryResponse {
  totalCount: number;
  inventoryInfos: inventoryInfo[];
}

export interface GetInventoryDetailRequest {
  nickname: string;
  inventoryId: number;
}

export interface GetInventoryDetailResponse {
  memberId: number;
  hobby: string;
  itemCount: number;
  inventoryItemInfos: inventoryItemInfo[];
}

export interface GetInventoryItemsRequest {
  inventoryId?: number;
  hobbyName?: string;
  cursorId?: string;
  size?: number;
}

export interface GetInventoryItemsResponse {
  nextCursorId: string;
  totalCount: number;
  reviewedItems: reviewedItem[];
}
