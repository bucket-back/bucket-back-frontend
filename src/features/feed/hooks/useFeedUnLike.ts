import { useMutation, useQueryClient } from '@tanstack/react-query';
import { feedApi, feedQueryOption } from '../service';

const useFeedUnLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: feedApi.deleteFeedLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedQueryOption.all });
    },
  });
};

export default useFeedUnLike;
