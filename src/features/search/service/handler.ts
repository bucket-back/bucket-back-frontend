import { GetSearchItemRequest, GetSearchItemResponse, GetSearchKeywordResponse } from './types';
import { axiosClient } from '@/core/service/axios';

const BASE_URL = 'items';

const searchApi = {
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
};

export default searchApi;
