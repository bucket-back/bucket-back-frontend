import {
  DeleteCommentRequest,
  GetCommentsRequest,
  GetCommentsResponse,
  PostCommentAdoptionRequest,
  PostCommentRequest,
  PutCommentRequest,
} from './types';

import httpClient from '@/core/service/httpClient';

const createBaseUrl = (feedId: number) => `feeds/${feedId}/comments`;

const commentApi = {
  getComments: async ({ feedId, cursorId, size }: GetCommentsRequest) => {
    const params = cursorId ? { cursorId, size } : { size };

    return await httpClient.get<GetCommentsResponse>(createBaseUrl(feedId), {
      params,
    });
  },

  postComment: async ({ feedId, content }: PostCommentRequest) => {
    const body = { content };

    return await httpClient.post<null, typeof body>(createBaseUrl(feedId), body);
  },

  postCommentAdoption: async ({ feedId, commentId }: PostCommentAdoptionRequest) => {
    const url = `${createBaseUrl(feedId)}/${commentId}/adoption`;

    return await httpClient.post<null>(url);
  },

  putComment: async ({ feedId, commentId, content }: PutCommentRequest) => {
    const url = `${createBaseUrl(feedId)}/${commentId}`;
    const body = { content };

    return await httpClient.put<null, typeof body>(url, body);
  },

  deleteComment: async ({ feedId, commentId }: DeleteCommentRequest) => {
    const url = `${createBaseUrl(feedId)}/${commentId}`;

    return await httpClient.delete<null>(url);
  },
};

export default commentApi;
