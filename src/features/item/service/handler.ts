import {
  PostItemRequest,
  PostItemResponse,
  PostTakeItemRequest,
  PostTakeItemResponse,
  GetDetailItemResponse,
  GetMyItemsRequest,
  GetMyItemsResponse,
  DeleteItemRequest,
} from './types';

import httpClient from '@/core/service/httpClient';

const BASE_URL = 'items';

const itemApi = {
  postItem: async ({ hobbyValue, itemUrl }: PostItemRequest) => {
    const url = `${BASE_URL}/enroll`;
    const body = { hobbyValue, itemUrl };

    return await httpClient.post<PostItemResponse, PostItemRequest>(url, { ...body });
  },

  getDetailItem: async (itemId: number) => {
    const url = `${BASE_URL}/${itemId}`;

    return await httpClient.get<GetDetailItemResponse>(url);
  },

  postTakeItem: async ({ itemIds }: PostTakeItemRequest) => {
    const url = `${BASE_URL}/myitems`;
    const body = { itemIds };

    return await httpClient.post<PostTakeItemResponse, PostTakeItemRequest>(url, { ...body });
  },

  deleteMyItem: async ({ itemIds }: DeleteItemRequest) => {
    const url = `${BASE_URL}/myitems`;
    const params = { itemIds };

    return await httpClient.delete<null>(url, { params });
  },

  getMyItems: async ({ hobbyName, cursorId, size = 24 }: GetMyItemsRequest) => {
    const queryString = hobbyName ? `hobbyName=${hobbyName}` : '';
    const url = `${BASE_URL}/myitems?${queryString}`;
    const params = cursorId ? { cursorId, size } : { size };

    return await httpClient.get<GetMyItemsResponse>(url, { params });
  },
};

export default itemApi;
