import { queryOptions } from '@tanstack/react-query';
import { GetVotesRequest, voteApi } from '.';

const voteQueryOption = {
  all: ['vote'] as const,
  list: ({ hobby, sort = 'recent', status, cursorId, size }: GetVotesRequest) =>
    queryOptions({
      queryKey: [...voteQueryOption.all, hobby, status, sort] as const,
      queryFn: () => voteApi.getVotes({ hobby, sort, status, cursorId, size }),
    }),
  detail: (voteId: number) =>
    queryOptions({
      queryKey: [...voteQueryOption.all, voteId] as const,
      queryFn: () => voteApi.getVoteDetail(voteId),
    }),
};

export default voteQueryOption;
