import { useMutation } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { memberApi } from '../service';

const useCheckNickname = () => {
  const openToast = useCustomToast();

  return useMutation({
    mutationFn: memberApi.postCheckNickname,
    onSuccess: () => {
      openToast({ message: '사용할 수 있는 닉네임입니다.', type: 'success' });
    },
    onError: () => {
      openToast({ message: '중복된 닉네임입니다.', type: 'error' });
    },
  });
};

export default useCheckNickname;
