import { inventoryInfo, inventoryItemInfo, reviewedItem } from '@/shared/types/inventory';

export interface PutEditInventoryRequest {
  inventoryId: number;
  itemIds: number[];
}

export interface postCreateInventoryRequest {
  hobbyValue: string;
  itemIds: number[];
}

export interface postCreateInventoryResponse {
  inventoryId: number;
}

export interface getInventoryResponse {
  totalCount: number;
  inventoryInfos: inventoryInfo[];
}

export interface getInventoryDetailRequest {
  nickname: string;
  inventoryId: number;
}

export interface getInventoryDetailResponse {
  memberId: number;
  hobby: string;
  itemCount: number;
  inventoryItemInfos: inventoryItemInfo[];
}

export interface getInventoryItemsRequest {
  inventoryId: number;
  hobbyName: string;
  cursorId?: string;
  size?: number;
}

export interface getInventoryItemsResponse {
  nextCursorId: string;
  totalCount: number;
  reviewedItems: reviewedItem[];
}
