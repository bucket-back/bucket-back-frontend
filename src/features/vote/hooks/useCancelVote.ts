import { useMutation, useQueryClient } from '@tanstack/react-query';
import { voteApi, voteQueryOption } from '../service';

const useCancelVote = (voteId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voteApi.deleteVoteCancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: voteQueryOption.detail(voteId).queryKey });
    },
  });
};

export default useCancelVote;
