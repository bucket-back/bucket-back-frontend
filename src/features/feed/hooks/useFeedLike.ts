import { useMutation, useQueryClient } from '@tanstack/react-query';
import { feedApi, feedQueryOption } from '../service';

const useFeedLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: feedApi.postFeedLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedQueryOption.all });
    },
  });
};

export default useFeedLike;
