import { queryOptions } from '@tanstack/react-query';
import { GetFeedsRequest, feedApi } from '.';

const feedQueryOption = {
  all: ['feed'] as const,
  list: ({
    hobbyName,
    nickname,
    myPageOwnerLikeFeeds,
    sortCondition = 'RECENT',
    cursorId,
    size = 10,
  }: GetFeedsRequest) =>
    queryOptions({
      queryKey: [...feedQueryOption.all, hobbyName, sortCondition, myPageOwnerLikeFeeds] as const,
      queryFn: () =>
        feedApi.getFeeds({
          hobbyName,
          nickname,
          myPageOwnerLikeFeeds,
          sortCondition,
          cursorId,
          size,
        }),
    }),

  detail: (feedId: number) =>
    queryOptions({
      queryKey: [...feedQueryOption.all, feedId] as const,
      queryFn: () => feedApi.getFeedDetail(feedId),
    }),
};

export default feedQueryOption;
