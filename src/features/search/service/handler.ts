import {
  GetSearchItemRequest,
  GetSearchItemResponse,
  GetSearchKeywordResponse,
  GetSearchVoteResponse,
} from './types';

import httpClient from '@/core/service/httpClient';

const BASE_URL = 'items';

const searchApi = {
  getSearchItem: async ({ keyword, cursorId, size }: GetSearchItemRequest) => {
    const queryString = keyword ? `keyword=${keyword}` : '';
    const params = cursorId ? { cursorId, size } : { size };

    const url = `${BASE_URL}/search?${queryString}`;

    return await httpClient.get<GetSearchItemResponse>(url, { params });
  },

  getSearchKeyword: async (keyword: string) => {
    const queryString = keyword ? `keyword=${keyword}` : '';
    const url = `${BASE_URL}/item-names?${queryString}`;

    return await httpClient.get<GetSearchKeywordResponse>(url);
  },

  getVoteKeyword: async ({ keyword, cursorId, size }: GetSearchItemRequest) => {
    const queryString = keyword ? `keyword=${keyword}` : '';
    const params = cursorId ? { cursorId, size } : { size };
    const url = `votes/search?${queryString}`;

    return await httpClient.get<GetSearchVoteResponse>(url, { params });
  },
};

export default searchApi;
