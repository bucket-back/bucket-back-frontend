import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { commentApi, commentQueryQption } from '../service';
import { feedQueryOption } from '@/features/feed/service';
import { memberQueryOption } from '@/features/member/service';

const useAddComment = (feedId: number, nickname: string) => {
  const queryClient = useQueryClient();
  const openToast = useCustomToast();

  return useMutation({
    mutationFn: commentApi.postComment,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: commentQueryQption.all }),
        queryClient.invalidateQueries({ queryKey: feedQueryOption.detail(feedId).queryKey }),
        queryClient.invalidateQueries({ queryKey: memberQueryOption.detail(nickname).queryKey }),
      ]);

      openToast({ message: '댓글이 추가되었습니다.', type: 'success' });
    },
  });
};

export default useAddComment;
