import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteReviewItemRequest, reviewApi } from '../service';
import { reviewQueryOption } from '@/features/review/service';

const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, reviewId }: DeleteReviewItemRequest) =>
      reviewApi.deleteReviewItem({ itemId, reviewId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...reviewQueryOption.all] });
    },
  });
};

export default useDeleteReview;
