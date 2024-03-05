import {
  GetFeedDetailResponse,
  GetFeedsRequest,
  GetFeedsResponse,
  PostFeedRequest,
  PostFeedResponse,
  PutFeedRequest,
} from './types';

import httpClient from '@/core/service/httpClient';

const BASE_URL = 'feeds';

const feedApi = {
  getFeeds: async ({
    hobbyName,
    nickname,
    onlyNicknameLikeFeeds,
    sortCondition,
    cursorId,
    size,
  }: GetFeedsRequest) => {
    const nicknameQueryString = nickname ? `&nickname=${nickname}` : '';
    const onlyNicknameLikeFeedsQueryString = onlyNicknameLikeFeeds
      ? `&onlyNicknameLikeFeeds=${onlyNicknameLikeFeeds}`
      : '';
    const sortConditionQueryString = sortCondition ? `&sortCondition=${sortCondition}` : '';

    const url = `${BASE_URL}?hobbyName=${hobbyName}${nicknameQueryString}${onlyNicknameLikeFeedsQueryString}${sortConditionQueryString}`;
    const params = cursorId ? { cursorId, size } : { size };

    return await httpClient.get<GetFeedsResponse>(url, { params });
  },

  getFeedDetail: async (feedId: number) => {
    const url = `${BASE_URL}/${feedId}`;

    return await httpClient.get<GetFeedDetailResponse>(url);
  },

  postFeed: async ({ bucketId, content }: PostFeedRequest) => {
    const body = { bucketId, content };

    return await httpClient.post<PostFeedResponse, typeof body>(BASE_URL, body);
  },

  postFeedLike: async (feedId: number) => {
    const url = `${BASE_URL}/${feedId}/like`;

    return await httpClient.post<null>(url);
  },

  putFeed: async ({ feedId, content }: PutFeedRequest) => {
    const url = `${BASE_URL}/${feedId}`;
    const body = { content };

    return await httpClient.put<null, typeof body>(url, body);
  },

  deleteFeed: async (feedId: number) => {
    const url = `${BASE_URL}/${feedId}`;

    return await httpClient.delete<null>(url);
  },

  deleteFeedLike: async (feedId: number) => {
    const url = `${BASE_URL}/${feedId}/unlike`;

    return await httpClient.delete<null>(url);
  },
};

export default feedApi;
