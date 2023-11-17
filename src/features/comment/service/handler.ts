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
    const res = await axiosClient.get<GetCommentsResponse>(createBaseUrl(feedId), {
      params: cursorId ? { cursorId, size } : { size },
    });

    return res.data;
  },
  postComment: async ({ feedId, content }: PostCommentRequest) => {
    return await axiosClient.post<null>(createBaseUrl(feedId), { content });
  },
  postCommentAdoption: async ({ feedId, commentId }: PostCommentAdoptionRequest) => {
    return await axiosClient.post<null>(`${createBaseUrl(feedId)}/${commentId}/adoption`);
  },
  putComment: async ({ feedId, commentId, content }: PutCommentRequest) => {
    return await axiosClient.put<null>(`${createBaseUrl(feedId)}/${commentId}`, { content });
  },
  deleteComment: async ({ feedId, commentId }: DeleteCommentRequest) => {
    return await axiosClient.delete<null>(`${createBaseUrl(feedId)}/${commentId}`);
  },
};

export default commentApi;
