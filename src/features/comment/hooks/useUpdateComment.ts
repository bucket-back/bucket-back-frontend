import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi, commentQueryQption } from '../service';

const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentApi.putComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentQueryQption.all });
    },
  });
};

export default useUpdateComment;
