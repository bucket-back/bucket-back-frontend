import {
  GetCheckJWTResponse,
  GetMemberResponse,
  PostCheckEmailResponse,
  PostLoginRequest,
  PostLoginResponse,
  PostSignupRequest,
  PutMemberRequest,
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

  getMember: async (nickname: string) => {
    const url = `${BASE_URL}/${nickname}`;

    const response = await axiosClient.get<GetMemberResponse>(url);

    return response.data;
  },

  putMember: async ({ nickname, introduction }: PutMemberRequest) => {
    const url = `${BASE_URL}/profile`;

    return await axiosClient.put<null>(url, { nickname, introduction });
  },

  putMemberPassword: async (password: string) => {
    const url = `${BASE_URL}/password`;

    return await axiosClient.put<null>(url, { password });
  },

  deleteMember: async () => {
    const url = `${BASE_URL}/delete`;

    return await axiosClient.delete<null>(url);
  },

  getCheckJWT: async () => {
    const url = `${BASE_URL}/check/jwt`;

    const response = await axiosClient.get<GetCheckJWTResponse>(url);

    return response.data;
  },
};

export default memberApi;
