import { useMutation } from '@tanstack/react-query';
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
  return useMutation({
    mutationFn: login,
  });
};
