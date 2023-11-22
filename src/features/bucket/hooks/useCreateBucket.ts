import { useMutation } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { bucketApi } from '../service';

const useCreateBucket = () => {
  const openToast = useCustomToast();

  return useMutation({
    mutationFn: bucketApi.postBucket,
    onSuccess: () => {
      openToast({ message: '버킷을 생성했습니다.', type: 'success' });
    },
  });
};

export default useCreateBucket;
