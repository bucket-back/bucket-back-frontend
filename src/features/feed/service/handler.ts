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
    const nicknameQueryString = nickname ? `&nickname=${nickname}` : '';
    const sortConditionQueryString = sortCondition ? `&sortCondition=${sortCondition}` : '';

    const url = `${BASE_URL}?hobbyName=${hobbyName}${nicknameQueryString}${sortConditionQueryString}`;
    const params = cursorId ? { cursorId, size } : { size };

    const response = await axiosClient.get<GetFeedsResponse>(url, { params });

    return response.data;
  },

  getFeedDetail: async (feedId: number) => {
    const url = `${BASE_URL}/${feedId}`;

    const response = await axiosClient.get<GetFeedDetailResponse>(url);

    return response.data;
  },

  postFeed: async ({ bucketId, content }: PostFeedRequest) => {
    const response = await axiosClient.post<PostFeedResponse>(BASE_URL, { bucketId, content });

    return response.data;
  },

  postFeedLike: async (feedId: number) => {
    const url = `${BASE_URL}/${feedId}/like`;

    return await axiosClient.post<null>(url);
  },

  putFeed: async ({ feedId, content }: PutFeedRequest) => {
    const url = `${BASE_URL}/${feedId}`;

    return await axiosClient.put<null>(url, { content });
  },

  deleteFeed: async (feedId: number) => {
    const url = `${BASE_URL}/${feedId}`;

    return await axiosClient.delete<null>(url);
  },

  deleteFeedLike: async (feedId: number) => {
    const url = `${BASE_URL}/${feedId}/unlike`;

    return await axiosClient.delete<null>(url);
  },
};

export default feedApi;
