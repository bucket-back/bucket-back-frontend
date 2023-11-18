import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { memberApi } from '../service';

const useSignup = () => {
  const openToast = useCustomToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: memberApi.postSignup,
    onSuccess: () => {
      openToast({ message: '회원가입에 성공하셨습니다.', type: 'success' });
      navigate('/login');
    },
    onError: () => {
      openToast({ message: '회원가입에 실패하셨습니다.', type: 'error' });
    },
  });
};

export default useSignup;
