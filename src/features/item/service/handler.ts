import {
  PostItemRequest,
  PostItemResponse,
  PostTakeItemRequest,
  PostTakeItemResponse,
  GetDetailItemResponse,
  GetSearchItemRequest,
  GetSearchItemResponse,
  GetSearchKeywordResponse,
  GetMyItemsRequest,
  GetMyItemsResponse,
} from './types';

import { axiosClient } from '@/core/service/axios';

const BASE_URL = 'items';

const itemApi = {
  postItem: async ({ hobbyValue, itemUrl }: PostItemRequest) => {
    const url = `${BASE_URL}/enroll`;

    const response = await axiosClient.post<PostItemResponse>(url, { hobbyValue, itemUrl });

    return response.data;
  },

  getDetailItem: async (itemId: number) => {
    const url = `${BASE_URL}/${itemId}`;
    const response = await axiosClient.get<GetDetailItemResponse>(url);

    return response.data;
  },

  getSearchItem: async ({ keyword, cursorId, size }: GetSearchItemRequest) => {
    const queryString = keyword ? `keyword=${keyword}` : '';
    const params = cursorId ? { cursorId, size } : { size };

    const url = `${BASE_URL}/search?${queryString}`;
    const response = await axiosClient.get<GetSearchItemResponse>(url, { params });

    return response.data;
  },

  getSearchKeyword: async (keyword: string) => {
    const queryString = keyword ? `keyword=${keyword}` : '';
    const url = `${BASE_URL}/item-names?${queryString}`;
    const response = await axiosClient.get<GetSearchKeywordResponse>(url);

    return response.data;
  },

  postTakeItem: async ({ itemIds }: PostTakeItemRequest) => {
    const url = `${BASE_URL}/myitems`;
    const response = await axiosClient.post<PostTakeItemResponse>(url, { itemIds });

    return response.data;
  },

  deleteMyItem: async (itemId: number) => {
    const url = `${BASE_URL}/myitems/${itemId}`;

    return await axiosClient.delete<null>(url);
  },

  getMyItems: async ({ hobbyName, cursorId, size = 10 }: GetMyItemsRequest) => {
    const queryString = hobbyName ? `hobbyName=${hobbyName}` : '';
    const url = `${BASE_URL}/myitems?${queryString}`;
    const params = cursorId ? { cursorId, size } : { size };

    const response = await axiosClient.get<GetMyItemsResponse>(url, { params });

    return response.data;
  },
};

export default itemApi;
