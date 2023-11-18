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

    const response = await axiosClient.post<PostLoginResponse>(url, {
      email,
      password,
    });

    return response.data;
  },

  postCheckEmail: async (email: string) => {
    const url = `${BASE_URL}/check/email`;

    const response = await axiosClient.post<PostCheckEmailResponse>(url, {
      email,
    });

    return response.data;
  },

  postCheckNickname: async (nickname: string) => {
    const url = `${BASE_URL}/check/nickname`;

    return await axiosClient.post<null>(url, {
      nickname,
    });
  },

  postSignup: async ({
    email,
    password,
    nickname,
  }: Omit<PostSignupRequest, 'passwordConfirm' | 'emailAuthNumber'>) => {
    const url = `${BASE_URL}/signup`;

    return await axiosClient.post<null>(url, {
      email,
      password,
      nickname,
    });
  },
};

export default memberApi;
