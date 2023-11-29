import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { GetFeedsRequest, feedApi } from '.';

const feedQueryOption = {
  all: ['feed'] as const,
  list: ({
    hobbyName,
    nickname,
    onlyNicknameLikeFeeds,
    sortCondition = 'RECENT',
    size = 5,
  }: GetFeedsRequest) =>
    infiniteQueryOptions({
      queryKey: [...feedQueryOption.all, hobbyName, sortCondition, onlyNicknameLikeFeeds] as const,
      queryFn: ({ pageParam: cursorId }) =>
        feedApi.getFeeds({
          hobbyName,
          nickname,
          onlyNicknameLikeFeeds,
          sortCondition,
          cursorId,
          size,
        }),
      initialPageParam: '',
      getNextPageParam: ({ nextCursorId }) => {
        return nextCursorId;
      },
    }),

  detail: (feedId: number) =>
    queryOptions({
      queryKey: [...feedQueryOption.all, feedId] as const,
      queryFn: () => feedApi.getFeedDetail(feedId),
    }),
};

export default feedQueryOption;
