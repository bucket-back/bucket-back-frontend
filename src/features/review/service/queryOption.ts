import { queryOptions } from '@tanstack/react-query';
import { GetSearchReviewListRequest, GetReviewItemRequest, reviewApi } from '.';

const reviewQueryOption = {
  all: ['review'] as const,
  lists: ({ itemId, cursorId, size }: GetSearchReviewListRequest) =>
    queryOptions({
      queryKey: [...reviewQueryOption.all, itemId] as const,
      queryFn: () => reviewApi.getSearchReviewList({ itemId, cursorId, size }),
    }),
  detail: ({ itemId, reviewId }: GetReviewItemRequest) => {
    queryOptions({
      queryKey: [...reviewQueryOption.all, reviewId] as const,
      queryFn: () => reviewApi.getReviewItem({ itemId, reviewId }),
    });
  },
};

export default reviewQueryOption;
