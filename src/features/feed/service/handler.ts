import {
  GetFeedDetailResponse,
  GetFeedsRequest,
  GetFeedsResponse,
  PostFeedRequest,
  PostFeedResponse,
  PutFeedRequest,
} from './types';
import { axiosClient } from '@/core/service/axios';

const BASE_URL = 'feeds';

const feedApi = {
  getFeeds: async ({ hobbyName, nickname, sortCondition, cursorId, size }: GetFeedsRequest) => {
    const res = await axiosClient.get<GetFeedsResponse>(
      `${BASE_URL}?hobbyName=${hobbyName}${nickname ? `&nickname=${nickname}` : ''}${
        sortCondition ? `&sortCondition=${sortCondition}` : ''
      }`,
      { params: cursorId ? { cursorId, size } : { size } }
    );

    return res.data;
  },
  getFeedDetail: async (feedId: number) => {
    const res = await axiosClient.get<GetFeedDetailResponse>(`${BASE_URL}/${feedId}`);

    return res.data;
  },
  postFeed: async ({ bucketId, content }: PostFeedRequest) => {
    const res = await axiosClient.post<PostFeedResponse>(BASE_URL, { bucketId, content });

    return res.data;
  },
  postFeedLike: async (feedId: number) => {
    await axiosClient.post(`${BASE_URL}/${feedId}/like`);
  },
  putFeed: async ({ feedId, content }: PutFeedRequest) => {
    await axiosClient.post(`${BASE_URL}/${feedId}`, { content });
  },
  deleteFeed: async (feedId: number) => {
    await axiosClient.delete(`${BASE_URL}/${feedId}`);
  },
  deleteFeedLike: async (feedId: number) => {
    await axiosClient.delete(`${BASE_URL}/${feedId}/unlike`);
  },
};

export default feedApi;
