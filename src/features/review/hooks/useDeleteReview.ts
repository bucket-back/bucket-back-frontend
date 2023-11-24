import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteReviewItemRequest, reviewApi } from '../service';
import { itemQueryOption } from '@/features/item/service';

const useDeleteReview = (itemId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, reviewId }: DeleteReviewItemRequest) =>
      reviewApi.deleteReviewItem({ itemId, reviewId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...itemQueryOption.detail(Number(itemId)).queryKey],
      });
    },
  });
};

export default useDeleteReview;
