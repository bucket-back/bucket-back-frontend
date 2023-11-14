import axios, { AxiosError, isAxiosError } from 'axios';
import { Storage } from '@/shared/utils';

const BASE_ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL;

export const axiosClient = axios.create({
  baseURL: BASE_ENDPOINT_URL,
  timeout: 15000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const aT = Storage.getLocalStoraged('aT');
    if (aT) {
      config.headers.Authorization = `Bearer ${aT}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error.response)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!isAxiosError(error)) {
      return Promise.reject(error);
    }

    // TODO:code가 주어진다면 error 코드에 따라서 다르게 처리
    // 1. 만료가 되었다면
    // 1-1)토큰을 찾고 -> 있다면 -> 다시 요청 보내느 훅을 만들어서 보내고 -> 토큰을 다시 저장
    // 1-2)있는데 오류가 나온다면 -> 토큰 삭제 후 로그인 다시 실행?
    // 2. 다른 에러라면
    // 2-1) redirection하는 코드 작성

    return Promise.reject(error.response);
  }
);
