import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { itemApi, itemQueryOption } from '../service';

const useTakeItem = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemIds: string[]) => itemApi.postTakeItem({ itemIds: [...itemIds] }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemQueryOption.all });
      navigate(`/item`);
    },
    onError: (reponse) => {
      console.error(reponse);
    },
  });
};

export default useTakeItem;
