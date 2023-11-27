import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { bucketApi, bucketQueryOption } from '../service';

const useDeleteBucket = () => {
  const openToast = useCustomToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bucketApi.deleteBucket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bucketQueryOption.all });
      openToast({ message: '버킷이 삭제되었습니다.', type: 'success' });
    },
  });
};

export default useDeleteBucket;
