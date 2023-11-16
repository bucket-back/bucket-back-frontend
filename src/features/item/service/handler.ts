import {
  postItemRequest,
  postItemResponse,
  getTakeItemReqest,
  getTakeItemResponse,
  getDetailItemResponse,
  getSearchReviewListResponse,
  getSearchItemRequest,
  getSearchItemResponse,
  getSearchReviewListRequest,
  getSearchKeywordResponse,
  postReviewItemRequest,
  putEditReviewItemRequest,
  deleteReviewItemRequest,
} from './types';
import { axiosClient } from '@/core/service/axios';

const BASE_URL = 'items';

export const itemApi = {
  postItem: async ({ params }: postItemRequest) => {
    const url = `${BASE_URL}/enroll`;

    const response = await axiosClient.post<postItemResponse>(url, { ...params });

    return response.data;
  },

  getTakeItem: async (params: getTakeItemReqest) => {
    const url = `${BASE_URL}/myitems`;
    const response = await axiosClient.post<getTakeItemResponse>(url, params);

    return response.data;
  },

  getDetailItem: async (itemId: number) => {
    const url = `${BASE_URL}/${itemId}`;
    const response = await axiosClient.get<getDetailItemResponse>(url);

    return response.data;
  },

  getSearchReviewList: async ({ itemId, cursorId, size }: getSearchReviewListRequest) => {
    const params = cursorId ? { cursorId, size } : { size };
    const url = `${BASE_URL}/${itemId}/reviews`;

    const response = await axiosClient.get<getSearchReviewListResponse>(url, {
      params,
    });

    return response.data;
  },

  deleteItem: async (itemId: number) => {
    const url = `${BASE_URL}/${itemId}`;

    return await axiosClient.delete<null>(url);
  },

  getSearchItem: async ({ keyword, cursorId, size }: getSearchItemRequest) => {
    const queryString = keyword ? `keyword=${keyword}` : '';
    const params = cursorId ? { cursorId, size } : { size };

    const url = `${BASE_URL}/search?${queryString}`;
    const response = await axiosClient.get<getSearchItemResponse>(url, { params });

    return response.data;
  },

  getSearchKeyword: async (keyword: string) => {
    const queryString = keyword ? `keyword=${keyword}` : '';
    const url = `${BASE_URL}/item-names?${queryString}`;
    const response = await axiosClient.get<getSearchKeywordResponse>(url);

    return response.data;
  },

  postReviewItem: async ({ itemId, params }: postReviewItemRequest) => {
    const url = `${BASE_URL}/${itemId}/reviews`;

    return await axiosClient.post<null>(url, params);
  },

  putEditReviewItem: async ({ itemId, reviewId, params }: putEditReviewItemRequest) => {
    const url = `${BASE_URL}/${itemId}/reviews/${reviewId}`;

    return await axiosClient.put<null>(url, params);
  },

  deleteReviewItem: async ({ itemId, reviewId }: deleteReviewItemRequest) => {
    const url = `${BASE_URL}/${itemId}/reviews/${reviewId}`;

    return await axiosClient.delete<null>(url);
  },
};
