import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi, commentQueryQption } from '../service';
import { feedQueryOption } from '@/features/feed/service';

const useAdoptComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentApi.postCommentAdoption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentQueryQption.all });
      queryClient.invalidateQueries({ queryKey: feedQueryOption.all });
    },
  });
};

export default useAdoptComment;
