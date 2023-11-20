import { useQuery } from '@tanstack/react-query';
import { GetVotesRequest, voteQueryOption } from '../service';

const useVotes = ({ hobby, sort, status, cursorId, size }: GetVotesRequest) => {
  return useQuery(voteQueryOption.list({ hobby, sort, status, cursorId, size }));
};

export default useVotes;
