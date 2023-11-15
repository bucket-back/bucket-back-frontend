import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { Storage } from '@/shared/utils';
import { axiosClient } from '@/core/service/axios';

const LOGIN_URL = 'members/login';

interface Login {
  email: string;
  password: string;
}

const login = ({ email, password }: Login) => {
  return axiosClient.post(LOGIN_URL, {
    email,
    password,
  });
};

export const useLogin = () => {
  const openToast = useCustomToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      const { jwtToken, memberId, nickname } = res.data;
      console.log(memberId, nickname); // 유저정보 로컬스토리지에 저장할건지?
      Storage.setLocalStoraged('token', jwtToken);
      openToast({ message: '로그인에 성공하셨습니다.', type: 'success' });
      navigate('/');
    },
    onError: () => {
      openToast({ message: '로그인에 실패하셨습니다.', type: 'error' });
    },
  });
};
