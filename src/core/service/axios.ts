import axios, { AxiosError, isAxiosError } from 'axios';
import { TOKEN_KEY, USER_INFO_KEY } from '@/shared/constants';
import { useCustomToast } from '@/shared/hooks';
import { Storage } from '@/shared/utils';
import { memberApi } from '@/features/member/service';
import { OpenToastProps } from '@/shared/hooks/useCustomToast';

const BASE_ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL;

const redirectionLocation = (
  removeStorage: string[],
  href: string,
  openToast: ({ message, type }: OpenToastProps) => void
) => {
  if (removeStorage.length >= 1) {
    removeStorage.forEach((removeKey) => Storage.removeLocalStoraged(removeKey));
  }
  window.location.href = href;
  openToast({ message: '다시 로그인 해주세요!', type: 'error' });
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
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error.response)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!isAxiosError(error)) {
      return Promise.reject(error);
    }

    console.log('refresh 시작');

    const { code, config } = error;
    const openToast = useCustomToast();

    switch (code) {
      case 'COMMON_011': {
        try {
          const accessToken = await memberApi.postRefresh();

          Storage.removeLocalStoraged(TOKEN_KEY);

          accessToken && Storage.setLocalStoraged(TOKEN_KEY, accessToken);

          return axios(config!);
        } catch (error) {
          console.log('refresh 요청을 했지만 실패');
          redirectionLocation([TOKEN_KEY, USER_INFO_KEY], 'login', openToast);
        }
        break;
      }
      case 'COMMON_012':
      case 'COMMON_013': {
        console.log('refresh 토큰이 만료 / 토큰이 유효하지 않는 경우 실패');
        redirectionLocation([TOKEN_KEY, USER_INFO_KEY], 'login', openToast);
        break;
      }
    }

    return Promise.reject(error.response);
  }
);
