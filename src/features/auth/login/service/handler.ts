import { axiosClient } from '@/core/service/axios';

const LOGIN_URL = 'members/login';

interface Login {
  email: string;
  password: string;
}

export const postLogin = ({ email, password }: Login) => {
  return axiosClient.post(LOGIN_URL, {
    email,
    password,
  });
};
