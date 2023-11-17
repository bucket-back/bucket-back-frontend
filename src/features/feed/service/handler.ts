import {
  GetFeedDetailResponse,
  GetFeedsRequest,
  GetFeedsResponse,
  PostFeedRequest,
  PostFeedResponse,
} from './types';
import { axiosClient } from '@/core/service/axios';

const BASE_URL = 'feeds';

export const feedApi = {
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
};
