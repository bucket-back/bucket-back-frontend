import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useCustomToast } from '@/shared/hooks';
import { Storage } from '@/shared/utils';
import { inventoryApi } from '../service';

const useCreateInventory = () => {
  const navigate = useNavigate();
  const openToast = useCustomToast();
  const { nickname } = Storage.getLocalStoraged('userInfo');

  return useMutation({
    mutationFn: inventoryApi.postCreateInventory,
    onSuccess: (data) => {
      const { inventoryId } = data;
      navigate(`/member/${nickname}/inventory/${inventoryId}`);
    },
    onError: (error: AxiosResponse) => {
      openToast({ type: 'error', message: error.data.message });
    },
  });
};

export default useCreateInventory;
