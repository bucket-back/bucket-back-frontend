import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { feedApi } from '../service';

const useCreateFeed = () => {
  const openToast = useCustomToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: feedApi.postFeed,
    onSuccess: ({ feedId }) => {
      openToast({ message: '피드가 생성되었습니다.', type: 'success' });
      navigate(`/feed/${feedId}`);
    },
  });
};

export default useCreateFeed;
