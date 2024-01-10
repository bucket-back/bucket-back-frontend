import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { TOKEN_KEY } from '@/shared/constants';
import { useCustomToast } from '@/shared/hooks';
import { Storage } from '@/shared/utils';
import memberApi from '../service/handler';

const useLogin = () => {
  const openToast = useCustomToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: memberApi.postLogin,
    onSuccess: (data) => {
      const { accessToken, memberId, nickname } = data;
      Storage.setLocalStoraged('userInfo', {
        memberId,
        nickname,
      });
      Storage.setLocalStoraged(TOKEN_KEY, accessToken);
      openToast({ message: '로그인에 성공하셨습니다.', type: 'success' });
      navigate('/');
    },
    onError: () => {
      openToast({ message: '로그인에 실패하셨습니다.', type: 'error' });
    },
  });
};

export default useLogin;
