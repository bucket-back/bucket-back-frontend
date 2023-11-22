import { queryOptions } from '@tanstack/react-query';
import { GetSearchReviewListRequest, reviewApi } from '.';

const reviewQueryOption = {
  all: ['review'] as const,
  lists: ({ itemId, cursorId, size }: GetSearchReviewListRequest) =>
    queryOptions({
      queryKey: [...reviewQueryOption.all, itemId] as const,
      queryFn: () => reviewApi.getSearchReviewList({ itemId, cursorId, size }),
    }),
};

export default reviewQueryOption;
