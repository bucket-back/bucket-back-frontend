import { queryOptions } from '@tanstack/react-query';
import { GetCommentsRequest, commentApi } from '.';

const commentQueryQption = {
  all: ['comment'] as const,
  list: ({ feedId, cursorId, size }: GetCommentsRequest) =>
    queryOptions({
      queryKey: [...commentQueryQption.all, feedId],
      queryFn: () => commentApi.getComments({ feedId, cursorId, size }),
    }),
};

export default commentQueryQption;
