import { queryOptions } from '@tanstack/react-query';
import { GetVotesRequest, voteApi } from '.';

const voteQueryOption = {
  all: ['vote'] as const,
  list: ({ hobby, sort, status, cursorId, size }: GetVotesRequest) =>
    queryOptions({
      queryKey: [...voteQueryOption.all, hobby, status] as const,
      queryFn: () => voteApi.getVotes({ hobby, sort, status, cursorId, size }),
    }),
};

export default voteQueryOption;
