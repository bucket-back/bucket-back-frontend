import { useMutation, useQueryClient } from '@tanstack/react-query';
import { voteQueryOption } from '../service';
import voteApi from '../service/handler';

const useDeleteVote = (voteId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voteApi.postVoteParticipation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voteQueryOption.detail(voteId).queryKey });
    },
  });
};

export default useDeleteVote;
