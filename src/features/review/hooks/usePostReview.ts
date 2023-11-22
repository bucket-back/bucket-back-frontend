// import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
// import { itemQueryOption } from '@/features/item/service';
import { reviewApi } from '@/features/review/service';
import { PostReviewItemRequest } from '@/features/review/service/types';

const usePostReview = () => {
  // const navigate = useNavigate();
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, content, rating }: PostReviewItemRequest) =>
      // console.log(itemId, content, rating);
      reviewApi.postReviewItem({ itemId, content, rating }),
    // onSuccess: (itemId: number) => {
    //   queryClient.invalidateQueries({ queryKey: [...itemQueryOption.detail(itemId).queryKey] });
    //   navigate(`/item/${itemId}`);
    // },
  });
};

export default usePostReview;
