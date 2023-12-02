import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { itemQueryOption } from '@/features/item/service';
import { memberQueryOption } from '@/features/member/service';
import { reviewApi } from '@/features/review/service';
import { PostReviewItemRequest, EditReviewItemResponse } from '@/features/review/service/types';

const usePostReview = (nickname: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  return useMutation({
    mutationFn: ({ itemId, content, rating }: PostReviewItemRequest) =>
      reviewApi.postReviewItem({ itemId, content, rating }),
    onSuccess: ({ itemId }: EditReviewItemResponse) => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [...itemQueryOption.all],
        }),
        queryClient.invalidateQueries({
          queryKey: [...itemQueryOption.detail(itemId).queryKey],
        }),
        queryClient.invalidateQueries({
          queryKey: [...memberQueryOption.detail(nickname).queryKey],
        }),
      ]);
      toast({ message: '리뷰가 등록되었습니다', type: 'success' });
      navigate(`/item/${itemId}`, { replace: true });
    },
  });
};

export default usePostReview;
