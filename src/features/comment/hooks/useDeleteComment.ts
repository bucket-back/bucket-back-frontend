import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi, commentQueryQption } from '../service';

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentApi.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentQueryQption.all });
    },
  });
};

export default useDeleteComment;
