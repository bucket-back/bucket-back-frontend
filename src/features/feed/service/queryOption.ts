import { queryOptions } from '@tanstack/react-query';
import { GetFeedsRequest, feedApi } from '.';

const feedQueryOption = {
  all: ['feed'] as const,
  list: ({ hobbyName, nickname, sortCondition = 'RECENT', cursorId, size = 10 }: GetFeedsRequest) =>
    queryOptions({
      queryKey: [...feedQueryOption.all, hobbyName, sortCondition] as const,
      queryFn: () => feedApi.getFeeds({ hobbyName, nickname, sortCondition, cursorId, size }),
    }),

  detail: (feedId: number) =>
    queryOptions({
      queryKey: [...feedQueryOption.all, feedId] as const,
      queryFn: () => feedApi.getFeedDetail(feedId),
    }),
};

export default feedQueryOption;
