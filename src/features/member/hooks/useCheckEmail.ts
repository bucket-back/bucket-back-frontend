import { useMutation } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { memberApi } from '../service';

const useCheckEmail = () => {
  const openToast = useCustomToast();

  return useMutation({
    mutationFn: memberApi.postCheckEmail,
    onSuccess: () => {
      openToast({ message: '인증번호가 발송되었습니다.', type: 'success' });
    },
    onError: () => {
      openToast({ message: '중복된 이메일입니다.', type: 'error' });
    },
  });
};

export default useCheckEmail;
