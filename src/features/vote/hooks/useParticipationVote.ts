import { useMutation } from '@tanstack/react-query';
import voteApi from '../service/handler';

const useDeleteVote = () => {
  return useMutation({
    mutationFn: voteApi.postVoteParticipation,
    onSuccess: () => {},
  });
};

export default useDeleteVote;
