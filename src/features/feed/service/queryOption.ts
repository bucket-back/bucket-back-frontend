import { queryOptions } from '@tanstack/react-query';
import { GetFeedsRequest, feedApi } from '.';

const feedQueryOption = {
  all: ['feed'] as const,
  list: ({ hobbyName, nickname, sortCondition, cursorId, size }: GetFeedsRequest) =>
    queryOptions({
      queryKey: [...feedQueryOption.all, hobbyName] as const,
      queryFn: () => feedApi.getFeeds({ hobbyName, nickname, sortCondition, cursorId, size }),
    }),

  detail: (feedId: number) =>
    queryOptions({
      queryKey: [...feedQueryOption.all, feedId] as const,
      queryFn: () => feedApi.getFeedDetail(feedId),
    }),
};

export default feedQueryOption;
