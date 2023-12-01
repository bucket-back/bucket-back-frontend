import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { commentApi, commentQueryQption } from '../service';
import { feedQueryOption } from '@/features/feed/service';

const useAddComment = (feedId: number) => {
  const queryClient = useQueryClient();
  const openToast = useCustomToast();

  return useMutation({
    mutationFn: commentApi.postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentQueryQption.all });
      queryClient.invalidateQueries({ queryKey: feedQueryOption.detail(feedId).queryKey });
      openToast({ message: '댓글이 추가되었습니다.', type: 'success' });
    },
  });
};

export default useAddComment;
