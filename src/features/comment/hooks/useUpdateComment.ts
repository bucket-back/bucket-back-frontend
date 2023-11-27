import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { commentApi, commentQueryQption } from '../service';

const useUpdateComment = (feedId: number) => {
  const queryClient = useQueryClient();
  const openToast = useCustomToast();

  return useMutation({
    mutationFn: commentApi.putComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...commentQueryQption.all, feedId] });
      openToast({ message: '댓글이 수정되었습니다.', type: 'success' });
    },
  });
};

export default useUpdateComment;
