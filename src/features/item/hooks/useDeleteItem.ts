import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { DeleteItemRequest, GetMyItemsRequest, itemApi, itemQueryOption } from '../service';

const useDeleteItem = ({ cursorId, size, hobbyName }: GetMyItemsRequest) => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemIds }: DeleteItemRequest) => itemApi.deleteMyItem({ itemIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...itemQueryOption.myItems({ cursorId, size, hobbyName }).queryKey],
      });
      toast({ message: '아이템 삭제에 성공했습니다!', type: 'success' });
    },
  });
};

export default useDeleteItem;
