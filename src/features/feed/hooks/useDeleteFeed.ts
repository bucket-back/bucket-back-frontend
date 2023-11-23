import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ROOT_PATH } from '@/shared/constants';
import { useCustomToast } from '@/shared/hooks';
import { feedApi } from '../service';

const useDeleteFeed = () => {
  const openToast = useCustomToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: feedApi.deleteFeed,
    onSuccess: () => {
      openToast({ message: '피드가 성공적으로 삭제되었습니다.', type: 'success' });
      navigate(ROOT_PATH);
    },
  });
};

export default useDeleteFeed;
