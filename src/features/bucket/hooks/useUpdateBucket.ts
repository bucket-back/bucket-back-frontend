import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { bucketApi } from '../service';

const useUpdateBucket = () => {
  const openToast = useCustomToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: bucketApi.putBucket,
    onSuccess: () => {
      openToast({ message: '버킷이 수정되었습니다.', type: 'success' });
      navigate(-1);
    },
  });
};

export default useUpdateBucket;
