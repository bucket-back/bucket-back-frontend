import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { Storage } from '@/shared/utils';
import memberApi from '../service/handler';

const useLogin = () => {
  const openToast = useCustomToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: memberApi.postLogin,
    onSuccess: (data) => {
      const { jwtToken, memberId, nickname } = data;
      Storage.setLocalStoraged('userInfo', {
        memberId,
        nickname,
      });
      Storage.setLocalStoraged('token', jwtToken);
      openToast({ message: '로그인에 성공하셨습니다.', type: 'success' });
      navigate('/');
    },
    onError: () => {
      openToast({ message: '로그인에 실패하셨습니다.', type: 'error' });
    },
  });
};

export default useLogin;
