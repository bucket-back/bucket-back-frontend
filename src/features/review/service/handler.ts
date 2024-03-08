import {
  GetSearchReviewListRequest,
  GetSearchReviewListResponse,
  PostReviewItemRequest,
  PutEditReviewItemRequest,
  DeleteReviewItemRequest,
  EditReviewItemResponse,
  GetReviewItemResponse,
  GetReviewItemRequest,
} from './types';

import httpClient from '@/core/service/httpClient';

const BASE_URL = 'items';

const reviewApi = {
  getSearchReviewList: async ({ itemId, cursorId, size }: GetSearchReviewListRequest) => {
    const params = cursorId ? { cursorId, size } : { size };
    const url = `${BASE_URL}/${itemId}/reviews`;

    return await httpClient.get<GetSearchReviewListResponse>(url, {
      params,
    });
  },

  getReviewItem: async ({ itemId, reviewId }: GetReviewItemRequest) => {
    const url = `${BASE_URL}/${itemId}/reviews/${reviewId}`;

    return await httpClient.get<GetReviewItemResponse>(url);
  },

  postReviewItem: async ({ itemId, content, rating }: PostReviewItemRequest) => {
    const url = `${BASE_URL}/${itemId}/reviews`;
    const body = { content, rating };

    return await httpClient.post<EditReviewItemResponse, typeof body>(url, { ...body });
  },

  putEditReviewItem: async ({ itemId, reviewId, content, rating }: PutEditReviewItemRequest) => {
    const url = `${BASE_URL}/${itemId}/reviews/${reviewId}`;
    const body = { content, rating };

    return await httpClient.put<EditReviewItemResponse, typeof body>(url, { ...body });
  },

  deleteReviewItem: async ({ itemId, reviewId }: DeleteReviewItemRequest) => {
    const url = `${BASE_URL}/${itemId}/reviews/${reviewId}`;

    return await httpClient.delete<null>(url);
  },
};

export default reviewApi;
