import {
  GetInventoryDetailRequest,
  GetInventoryDetailResponse,
  GetInventoryItemsRequest,
  GetInventoryItemsResponse,
  GetInventoryResponse,
  PostCreateInventoryRequest,
  PostCreateInventoryResponse,
  PutEditInventoryRequest,
} from './types';

import httpClient from '@/core/service/httpClient';

const BASE_URL = 'inventories';

const inventoryApi = {
  putEditInventory: async ({ inventoryId, itemIds }: PutEditInventoryRequest) => {
    const url = `${BASE_URL}/${inventoryId}`;
    const body = { itemIds };

    return await httpClient.put<null, typeof body>(url, { ...body });
  },
  deleteInventory: async (inventoryId: number) => {
    const url = `${BASE_URL}/${inventoryId}`;

    return await httpClient.delete<null>(url);
  },
  postCreateInventory: async ({ hobbyValue, itemIds }: PostCreateInventoryRequest) => {
    const body = { hobbyValue, itemIds };

    return await httpClient.post<PostCreateInventoryResponse, typeof body>(BASE_URL, body);
  },
  getInventory: async (nickname: string) => {
    const url = `${nickname}/${BASE_URL}`;

    return await httpClient.get<GetInventoryResponse>(url);
  },
  getInventoryDetail: async ({ nickname, inventoryId }: GetInventoryDetailRequest) => {
    const url = `${nickname}/${BASE_URL}/${inventoryId}`;

    return await httpClient.get<GetInventoryDetailResponse>(url);
  },
  getInventoryItems: async ({
    inventoryId,
    hobbyName,
    cursorId,
    size = 10,
  }: GetInventoryItemsRequest) => {
    const hobbyQueryString = hobbyName ? `&hobbyName=${hobbyName}` : '';
    const inventoryIdQueryString = inventoryId ? `inventoryId=${inventoryId}` : '';
    const params = cursorId ? { cursorId, size } : { size };
    const url = `${BASE_URL}/myitems?${inventoryIdQueryString}${hobbyQueryString}`;

    return await httpClient.get<GetInventoryItemsResponse>(url, { params });
  },
};

export default inventoryApi;
