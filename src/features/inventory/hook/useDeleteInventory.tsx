import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Storage } from '@/shared/utils';
import { inventoryApi, inventoryQueryOption } from '../service';

const useDeleteInventory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { nickname } = Storage.getLocalStoraged('userInfo');

  return useMutation({
    mutationFn: inventoryApi.deleteInventory,
    onSuccess: () => {
      navigate(`/member/${nickname}/inventory`);
      queryClient.invalidateQueries({ queryKey: inventoryQueryOption.list(nickname).queryKey });
    },
  });
};

export default useDeleteInventory;
