import {
  PostCheckEmailResponse,
  PostLoginRequest,
  PostLoginResponse,
  PostSignupRequest,
} from './types';
import { axiosClient } from '@/core/service/axios';
const BASE_URL = 'members';

const memberApi = {
  postLogin: async ({ email, password }: PostLoginRequest) => {
    const url = `${BASE_URL}/login`;
    const res = await axiosClient.post<PostLoginResponse>(url, {
      email,
      password,
    });

    return res.data;
  },

  postCheckEmail: async (email: string) => {
    const url = `${BASE_URL}/check/email`;

    const res = await axiosClient.post<PostCheckEmailResponse>(url, {
      email,
    });

    return res.data;
  },

  postCheckNickname: (nickname: string) => {
    const url = `${BASE_URL}/check/nickname`;

    return axiosClient.post(url, {
      nickname,
    });
  },

  postSignup: ({
    email,
    password,
    nickname,
  }: Omit<PostSignupRequest, 'passwordConfirm' | 'emailAuthNumber'>) => {
    const url = `${BASE_URL}/signup`;

    return axiosClient.post(url, {
      email,
      password,
      nickname,
    });
  },
};

export default memberApi;
