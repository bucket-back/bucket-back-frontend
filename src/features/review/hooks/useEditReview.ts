import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useCustomToast } from '@/shared/hooks';
import { EditReviewItemResponse, PutEditReviewItemRequest, reviewApi } from '../service';
import { itemQueryOption } from '@/features/item/service';
const useEditReview = () => {
  const queryClient = useQueryClient();
  const toast = useCustomToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ itemId, reviewId, content, rating }: PutEditReviewItemRequest) =>
      reviewApi.putEditReviewItem({ itemId, reviewId, content, rating }),
    onSuccess: ({ itemId }: EditReviewItemResponse) => {
      queryClient.invalidateQueries({ queryKey: [...itemQueryOption.detail(itemId).queryKey] });
      toast({ message: '리뷰가 수정되었습니다!', type: 'success' });
      navigate(`/item/${itemId}`);
    },
    onError: (error: AxiosResponse) => {
      if (error.data.code === 'REVIEW_003') {
        navigate('/');
        toast({ message: error.data.message, type: 'error' });
      }
    },
  });
};

export default useEditReview;
