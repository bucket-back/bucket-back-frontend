import {
  PutEditInventoryRequest,
  getInventoryDetailRequest,
  getInventoryItemsRequest,
  getInventoryItemsResponse,
  getInventoryResponse,
  postCreateInventoryRequest,
  postCreateInventoryResponse,
} from './types';
import { axiosClient } from '@/core/service/axios';
const BASE_URL = 'inventories';

const inventoryApi = {
  putEditInventory: async ({ inventoryId, itemIds }: PutEditInventoryRequest) => {
    const url = `${BASE_URL}/${inventoryId}`;

    return await axiosClient.delete<null>(url, { params: itemIds });
  },
  deleteInventory: async (inventoryId: number) => {
    const url = `${BASE_URL}/${inventoryId}`;

    return await axiosClient.delete<null>(url);
  },
  postCreateInventory: async ({ hobbyValue, itemIds }: postCreateInventoryRequest) => {
    const params = { hobbyValue, itemIds };
    const response = await axiosClient.post<postCreateInventoryResponse>(BASE_URL, { params });

    return response.data;
  },
  getInventory: async (nickname: string) => {
    const url = `${nickname}/${BASE_URL}`;
    const response = await axiosClient.get<getInventoryResponse>(url);

    return response.data;
  },
  getInventoryDetail: async ({ nickname, inventoryId }: getInventoryDetailRequest) => {
    const url = `${nickname}/${BASE_URL}/${inventoryId}`;
    const response = await axiosClient.get(url);

    return response.data;
  },
  getInventoryItems: async ({
    inventoryId,
    hobbyName,
    cursorId,
    size = 10,
  }: getInventoryItemsRequest) => {
    const inventoryIdQueryString = inventoryId ? `&hobbyName=${hobbyName}` : '';
    const hobbyQueryString = inventoryId ? `?inventoryId=${inventoryId}` : '';
    const params = cursorId ? { cursorId, size } : { size };
    const url = `${BASE_URL}/myitems${inventoryIdQueryString}${hobbyQueryString}`;

    const response = await axiosClient.get<getInventoryItemsResponse>(url, { params });

    return response.data;
  },
};

export default inventoryApi;
