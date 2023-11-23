import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { itemApi, itemQueryOption } from '../service';

const useTakeItem = () => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemIds: string[]) => itemApi.postTakeItem({ itemIds: [...itemIds] }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemQueryOption.all });
      toast({ message: '아이템 담기에 성공했습니다!', type: 'success' });
    },
    onError: (reponse) => {
      console.error(reponse);
    },
  });
};

export default useTakeItem;
