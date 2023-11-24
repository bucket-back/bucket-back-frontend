import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { inventoryApi } from '../service';

const useCreateInventory = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: inventoryApi.postCreateInventory,
    onSuccess: (data) => {
      const { inventoryId } = data;
      navigate(`/inventory/${inventoryId}`);
    },
  });
};

export default useCreateInventory;
