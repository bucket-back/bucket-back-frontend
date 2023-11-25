import { useMutation } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { bucketApi } from '../service';

const useDeleteBucket = () => {
  const openToast = useCustomToast();

  return useMutation({
    mutationFn: bucketApi.deleteBucket,
    onSuccess: () => {
      openToast({ message: '버킷이 삭제되었습니다.', type: 'success' });
    },
  });
};

export default useDeleteBucket;
