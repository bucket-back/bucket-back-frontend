import { PostLoginRequest, PostLoginResponse } from './types';
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
};

export default memberApi;
