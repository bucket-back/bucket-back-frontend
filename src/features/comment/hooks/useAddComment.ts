import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi, commentQueryQption } from '../service';

const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentApi.postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentQueryQption.all });
    },
  });
};

export default useAddComment;
