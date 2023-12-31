import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { feedApi } from '../service';

const useUpdateFeed = (feedId: string) => {
  const openToast = useCustomToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: feedApi.putFeed,
    onSuccess: () => {
      openToast({ message: '피드가 수정되었습니다.', type: 'success' });
      navigate(`/feed/${feedId}`, { replace: true });
    },
    onError: () => {
      openToast({ message: '피드 수정에 실패했습니다.', type: 'error' });
    },
  });
};

export default useUpdateFeed;
