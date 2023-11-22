import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { voteApi } from '../service';

const useCreateVote = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: voteApi.postVotes,
    onSuccess: (data) => {
      navigate(`/vote/${data.voteId}`);
    },
  });
};

export default useCreateVote;
