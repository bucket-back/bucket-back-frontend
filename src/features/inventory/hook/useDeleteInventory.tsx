import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Storage } from '@/shared/utils';
import { inventoryApi } from '../service';

const useDeleteInventory = () => {
  const navigate = useNavigate();
  const { nickname } = Storage.getLocalStoraged('userInfo');

  return useMutation({
    mutationFn: inventoryApi.deleteInventory,
    onSuccess: () => {
      navigate(`/member/${nickname}/inventory`);
    },
  });
};

export default useDeleteInventory;
