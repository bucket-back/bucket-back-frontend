import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useCustomToast } from '@/shared/hooks';
import { bucketApi } from '../service';
import { ErrorData } from '@/shared/types/error';

const useCreateBucket = () => {
  const openToast = useCustomToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: bucketApi.postBucket,
    onSuccess: () => {
      openToast({ message: '버킷을 생성했습니다.', type: 'success' });
      navigate(-1);
    },
    onError: ({ data }: AxiosResponse<ErrorData>) => {
      openToast({ message: data.message, type: 'error' });
    },
  });
};

export default useCreateBucket;
