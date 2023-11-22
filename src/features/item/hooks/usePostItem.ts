import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useCustomToast } from '@/shared/hooks';
import { PostItemRequest, itemApi } from '../service';

const usePostItem = () => {
  const navigator = useNavigate();
  const openToast = useCustomToast();

  return useMutation({
    mutationFn: (newItem: PostItemRequest) => itemApi.postItem({ ...newItem }),
    onSuccess: (data) => {
      openToast({ message: '아이템 등록이 완료되었습니다', type: 'success' });
      navigator(`/item/${data.itemId}`);
    },
    onError: (error: AxiosResponse) => {
      openToast({ message: `${error.data.message}`, type: 'error' });
    },
  });
};

export default usePostItem;
