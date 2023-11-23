import {
  GetSearchReviewListRequest,
  GetSearchReviewListResponse,
  PostReviewItemRequest,
  PutEditReviewItemRequest,
  DeleteReviewItemRequest,
  PostReviewItemResponse,
  GetReviewItemResponse,
  GetReviewItemRequest,
} from './types';

import { axiosClient } from '@/core/service/axios';

const BASE_URL = 'items';

const reviewApi = {
  getSearchReviewList: async ({ itemId, cursorId, size }: GetSearchReviewListRequest) => {
    const params = cursorId ? { cursorId, size } : { size };
    const url = `${BASE_URL}/${itemId}/reviews`;

    const response = await axiosClient.get<GetSearchReviewListResponse>(url, {
      params,
    });

    return response.data;
  },

  getReviewItem: async ({ itemId, reviewId }: GetReviewItemRequest) => {
    const url = `${BASE_URL}/${itemId}/reviews/${reviewId}`;

    const response = await axiosClient.get<GetReviewItemResponse>(url);

    return response.data;
  },

  postReviewItem: async ({ itemId, content, rating }: PostReviewItemRequest) => {
    const url = `${BASE_URL}/${itemId}/reviews`;

    const response = await axiosClient.post<PostReviewItemResponse>(url, { content, rating });

    return response.data;
  },

  putEditReviewItem: async ({ itemId, reviewId, content, rating }: PutEditReviewItemRequest) => {
    const url = `${BASE_URL}/${itemId}/reviews/${reviewId}`;

    return await axiosClient.put<null>(url, { content, rating });
  },

  deleteReviewItem: async ({ itemId, reviewId }: DeleteReviewItemRequest) => {
    const url = `${BASE_URL}/${itemId}/reviews/${reviewId}`;

    return await axiosClient.delete<null>(url);
  },
};

export default reviewApi;
