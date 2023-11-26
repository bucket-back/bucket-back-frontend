import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memberApi, memberQueryOption } from '../service';

const useUpdateImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: memberApi.putMemberImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberQueryOption.all });
    },
  });
};

export default useUpdateImage;
