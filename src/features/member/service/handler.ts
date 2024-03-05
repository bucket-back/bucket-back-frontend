import {
  GetCheckJWTResponse,
  GetMemberResponse,
  PostCheckEmailResponse,
  PostLoginRequest,
  PostLoginResponse,
  PostSignupRequest,
  PutMemberImageRequest,
  PutMemberRequest,
} from './types';

import httpClient from '@/core/service/httpClient';

const BASE_URL = 'members';

const memberApi = {
  getMember: async (nickname: string) => {
    const url = `${BASE_URL}/${nickname}`;

    return await httpClient.get<GetMemberResponse>(url);
  },

  getCheckJWT: async () => {
    const url = `${BASE_URL}/check/jwt`;

    return await httpClient.get<GetCheckJWTResponse>(url);
  },

  postLogin: async ({ email, password }: PostLoginRequest) => {
    const url = `${BASE_URL}/login`;
    const body = { email, password };

    return await httpClient.post<PostLoginResponse, typeof body>(url, body);
  },

  postRefresh: async () => {
    const url = `${BASE_URL}/refresh`;

    return await httpClient.post<Pick<PostLoginResponse, 'accessToken'>>(url);
  },

  postCheckEmail: async (email: string) => {
    const url = `${BASE_URL}/check/email`;
    const body = { email };

    return await httpClient.post<PostCheckEmailResponse, typeof body>(url, body);
  },

  postCheckNickname: async (nickname: string) => {
    const url = `${BASE_URL}/check/nickname`;
    const body = { nickname };

    return await httpClient.post<null, typeof body>(url, body);
  },

  postSignup: async ({
    email,
    password,
    nickname,
  }: Omit<PostSignupRequest, 'passwordConfirm' | 'emailAuthNumber'>) => {
    const url = `${BASE_URL}/signup`;
    const body = { email, password, nickname };

    return await httpClient.post<null, typeof body>(url, body);
  },

  putMember: async ({ nickname, introduction }: PutMemberRequest) => {
    const url = `${BASE_URL}/profile`;
    const body = { nickname, introduction };

    return await httpClient.put<null, typeof body>(url, body);
  },

  putMemberPassword: async (password: string) => {
    const url = `${BASE_URL}/password`;
    const body = { password };

    return await httpClient.put<null, typeof body>(url, body);
  },

  putMemberImage: async ({ image }: PutMemberImageRequest) => {
    const url = `${BASE_URL}/profile/image`;
    const body = { image: image[0] };
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    return await httpClient.put<null, typeof body>(url, body, config);
  },

  deleteMember: async () => {
    const url = `${BASE_URL}/delete`;

    return await httpClient.delete<null>(url);
  },
};

export default memberApi;
