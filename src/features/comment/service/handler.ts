import {
  DeleteCommentRequest,
  GetCommentsRequest,
  GetCommentsResponse,
  PostCommentAdoptionRequest,
  PostCommentRequest,
  PutCommentRequest,
} from './types';
import { axiosClient } from '@/core/service/axios';

const createBaseUrl = (feedId: number) => `feeds/${feedId}/comments`;

const commentApi = {
  getComments: async ({ feedId, cursorId, size }: GetCommentsRequest) => {
    const params = cursorId ? { cursorId, size } : { size };

    const response = await axiosClient.get<GetCommentsResponse>(createBaseUrl(feedId), {
      params,
    });

    return response.data;
  },
  postComment: async ({ feedId, content }: PostCommentRequest) => {
    return await axiosClient.post<null>(createBaseUrl(feedId), { content });
  },
  postCommentAdoption: async ({ feedId, commentId }: PostCommentAdoptionRequest) => {
    const url = `${createBaseUrl(feedId)}/${commentId}/adoption`;

    return await axiosClient.post<null>(url);
  },
  putComment: async ({ feedId, commentId, content }: PutCommentRequest) => {
    const url = `${createBaseUrl(feedId)}/${commentId}`;

    return await axiosClient.put<null>(url, { content });
  },
  deleteComment: async ({ feedId, commentId }: DeleteCommentRequest) => {
    const url = `${createBaseUrl(feedId)}/${commentId}`;

    return await axiosClient.delete<null>(url);
  },
};

export default commentApi;
