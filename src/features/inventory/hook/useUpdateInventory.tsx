import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GetInventoryDetailRequest, inventoryApi, inventoryQueryOption } from '../service';

const useUpdateInventory = ({ nickname, inventoryId }: GetInventoryDetailRequest) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inventoryApi.putEditInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: inventoryQueryOption.detail({ nickname, inventoryId }).queryKey,
      });
    },
  });
};

export default useUpdateInventory;
