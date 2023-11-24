import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryApi, inventoryQueryOption } from '../service';

const useUpdateInventory = ({
  nickname,
  inventoryId,
  hobbyName,
}: {
  nickname: string;
  inventoryId: number;
  hobbyName: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inventoryApi.putEditInventory,
    onSuccess: () => {
      // TODO: 나중에 promise.all로 감싸기?
      queryClient.invalidateQueries({
        queryKey: inventoryQueryOption.detail({ nickname, inventoryId }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: inventoryQueryOption.myItems({ inventoryId, hobbyName }).queryKey,
      });
    },
  });
};

export default useUpdateInventory;
