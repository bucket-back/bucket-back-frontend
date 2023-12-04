import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { GetSearchReviewListRequest, GetReviewItemRequest, reviewApi } from '.';

const reviewQueryOption = {
  all: ['review'] as const,
  detail: ({ itemId, reviewId }: GetReviewItemRequest) =>
    queryOptions({
      queryKey: [...reviewQueryOption.all, reviewId] as const,
      queryFn: () => reviewApi.getReviewItem({ itemId, reviewId }),
    }),
  infiniteList: ({ itemId, size }: GetSearchReviewListRequest) =>
    infiniteQueryOptions({
      queryKey: [...reviewQueryOption.all, itemId] as const,
      queryFn: ({ pageParam: cursorId }) =>
        reviewApi.getSearchReviewList({ itemId, cursorId, size }),
      initialPageParam: '',
      getNextPageParam: ({ nextCursorId }) => {
        return nextCursorId;
      },
    }),
};

export default reviewQueryOption;
