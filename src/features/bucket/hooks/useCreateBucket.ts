import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useCustomToast, useUserInfo } from '@/shared/hooks';
import { bucketApi } from '../service';
import { ErrorData } from '@/shared/types/error';

const useCreateBucket = () => {
  const openToast = useCustomToast();
  const navigate = useNavigate();
  const userInfo = useUserInfo();

  return useMutation({
    mutationFn: bucketApi.postBucket,
    onSuccess: ({ bucketId }) => {
      openToast({ message: '버킷을 생성했습니다.', type: 'success' });
      navigate(`/member/${userInfo?.nickname}/bucket/${bucketId}`);
    },
    onError: ({ data }: AxiosResponse<ErrorData>) => {
      openToast({ message: data.message, type: 'error' });
    },
  });
};

export default useCreateBucket;
