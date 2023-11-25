import { useMutation } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { bucketApi } from '../service';

const useUpdateBucket = () => {
  const openToast = useCustomToast();

  return useMutation({
    mutationFn: bucketApi.putBucket,
    onSuccess: () => {
      openToast({ message: '버킷이 수정되었습니다.', type: 'success' });
    },
  });
};

export default useUpdateBucket;
