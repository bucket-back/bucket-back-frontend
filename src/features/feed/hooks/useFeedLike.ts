import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { feedApi, feedQueryOption } from '../service';

const useFeedLike = () => {
  const queryClient = useQueryClient();
  const openToast = useCustomToast();

  return useMutation({
    mutationFn: feedApi.postFeedLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedQueryOption.all });
    },
    onError: () => {
      openToast({ message: '로그인후 이용가능합니다.', type: 'info' });
    },
  });
};

export default useFeedLike;
