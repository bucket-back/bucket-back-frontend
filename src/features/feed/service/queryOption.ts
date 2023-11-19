import { queryOptions } from '@tanstack/react-query';
import { GetFeedsRequest, feedApi } from '.';

const QUERY_KEY = 'feed';

const feedQueryOption = {
  list: ({ hobbyName, nickname, sortCondition, cursorId, size }: GetFeedsRequest) =>
    queryOptions({
      queryKey: [QUERY_KEY, hobbyName],
      queryFn: () => feedApi.getFeeds({ hobbyName, nickname, sortCondition, cursorId, size }),
    }),

  detail: (feedId: number) =>
    queryOptions({
      queryKey: [QUERY_KEY, feedId],
      queryFn: () => feedApi.getFeedDetail(feedId),
    }),
};

export default feedQueryOption;
