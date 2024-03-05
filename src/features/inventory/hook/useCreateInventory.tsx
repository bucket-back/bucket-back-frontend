import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useCustomToast } from '@/shared/hooks';
import { Storage } from '@/shared/utils';
import { inventoryApi, inventoryQueryOption } from '../service';

const useCreateInventory = () => {
  const navigate = useNavigate();
  const openToast = useCustomToast();
  const queryClient = useQueryClient();
  const { nickname } = Storage.getLocalStoraged('userInfo');

  return useMutation({
    mutationFn: inventoryApi.postCreateInventory,
    onSuccess: (data) => {
      const { inventoryId } = data;
      navigate(`/member/${nickname}/inventory/${inventoryId}`, { replace: true });
      queryClient.invalidateQueries({ queryKey: inventoryQueryOption.list(nickname).queryKey });
    },
    onError: (error: AxiosResponse) => {
      openToast({ type: 'error', message: error.data.message });
    },
  });
};

export default useCreateInventory;
