import axios, { AxiosError, isAxiosError } from 'axios';
import { ERRORCODE, TOKEN_KEY, USER_INFO_KEY } from '@/shared/constants';
import { Storage } from '@/shared/utils';
import { ResponseData } from './types';
import { memberApi } from '@/features/member/service';

const BASE_ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL;

const redirectionLocation = (removeStorage: string[], href: string) => {
  if (removeStorage.length >= 1) {
    removeStorage.forEach((removeKey) => Storage.removeLocalStoraged(removeKey));
  }
  window.location.href = href;
};

export const axiosClient = axios.create({
  baseURL: BASE_ENDPOINT_URL,
  timeout: 15000,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = Storage.getLocalStoraged(TOKEN_KEY);

    if (token?.trim().length) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error.response)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ResponseData>) => {
    if (!isAxiosError(error)) {
      return Promise.reject(error);
    }

    const { code } = error.response!.data;

    const { config } = error;

    switch (code) {
      case ERRORCODE.COMMON_008: {
        try {
          const data = await memberApi.postRefresh();

          if (data.accessToken) {
            config?.headers.set('Authorization', `Bearer ${data.accessToken}`);
            Storage.setLocalStoraged(TOKEN_KEY, data.accessToken);
          }

          return axios(config!);
        } catch (error) {
          redirectionLocation([TOKEN_KEY, USER_INFO_KEY], 'login');
        }
        break;
      }
      case ERRORCODE.COMMON_012:
      case ERRORCODE.COMMON_013: {
        redirectionLocation([TOKEN_KEY, USER_INFO_KEY], 'login');
        break;
      }
    }

    return Promise.reject(error.response);
  }
);
