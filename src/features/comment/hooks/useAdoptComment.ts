import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { commentApi, commentQueryQption } from '../service';
import { feedQueryOption } from '@/features/feed/service';

const useAdoptComment = () => {
  const queryClient = useQueryClient();
  const openToast = useCustomToast();

  return useMutation({
    mutationFn: commentApi.postCommentAdoption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentQueryQption.all });
      queryClient.invalidateQueries({ queryKey: feedQueryOption.all });
      openToast({ message: '댓글을 채택했습니다.', type: 'success' });
    },
  });
};

export default useAdoptComment;
