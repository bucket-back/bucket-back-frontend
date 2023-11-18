import {
  GetSearchReviewListRequest,
  GetSearchReviewListResponse,
  PostReviewItemRequest,
  PutEditReviewItemRequest,
  DeleteReviewItemRequest,
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

  postReviewItem: async ({ itemId, content, rating }: PostReviewItemRequest) => {
    const url = `${BASE_URL}/${itemId}/reviews`;

    return await axiosClient.post<null>(url, { content, rating });
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
