import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { commentApi, commentQueryQption } from '../service';

const useAddComment = () => {
  const queryClient = useQueryClient();
  const openToast = useCustomToast();

  return useMutation({
    mutationFn: commentApi.postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentQueryQption.all });
      openToast({ message: '댓글이 추가되었습니다.', type: 'success' });
    },
  });
};

export default useAddComment;
