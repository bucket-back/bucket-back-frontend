import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { GetCommentsRequest, commentApi } from '.';

const commentQueryQption = {
  all: ['comment'] as const,
  list: ({ feedId, cursorId, size }: GetCommentsRequest) =>
    queryOptions({
      queryKey: [...commentQueryQption.all, feedId],
      queryFn: () => commentApi.getComments({ feedId, cursorId, size }),
    }),
  infiniteList: ({ feedId, size = 5 }: GetCommentsRequest) =>
    infiniteQueryOptions({
      queryKey: [...commentQueryQption.all, feedId, 'infinite'],
      queryFn: ({ pageParam: cursorId }) => commentApi.getComments({ feedId, cursorId, size }),
      initialPageParam: '',
      getNextPageParam: ({ nextCursorId }) => nextCursorId,
    }),
};

export default commentQueryQption;
