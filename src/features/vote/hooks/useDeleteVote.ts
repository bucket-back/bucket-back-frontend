import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import voteApi from '../service/handler';

const useDeleteVote = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: voteApi.deleteVote,
    onSuccess: () => {
      navigate('/vote');
    },
  });
};

export default useDeleteVote;
