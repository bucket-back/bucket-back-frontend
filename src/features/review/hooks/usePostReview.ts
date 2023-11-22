import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { itemQueryOption } from '@/features/item/service';
import { reviewApi } from '@/features/review/service';
import { PostReviewItemRequest, PostReviewItemResponse } from '@/features/review/service/types';

const usePostReview = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  return useMutation({
    mutationFn: ({ itemId, content, rating }: PostReviewItemRequest) =>
      reviewApi.postReviewItem({ itemId, content, rating }),
    onSuccess: ({ itemId }: PostReviewItemResponse) => {
      queryClient.invalidateQueries({
        queryKey: [...itemQueryOption.detail(itemId).queryKey],
      });
      toast({ message: '리뷰가 등록되었습니다', type: 'success' });
      navigate(`/item/${itemId}`);
    },
  });
};

export default usePostReview;
