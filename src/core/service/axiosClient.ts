import axios, { CreateAxiosDefaults, AxiosError, isAxiosError, AxiosRequestConfig } from 'axios';
import { ERRORCODE, TOKEN_KEY, USER_INFO_KEY } from '@/shared/constants';
import { Storage } from '@/shared/utils';
import type { ResponseData } from './types';
import { memberApi } from '@/features/member/service';

export default class axiosClient {
  public http;
  static get: () => void;
  static post: () => void;
  static put: () => void;
  static delete: () => void;
  static setRequestInterceptors: () => void;
  static setResponseInterceptors: () => void;

  constructor(axiosClient: CreateAxiosDefaults | undefined) {
    this.http = axios.create({
      ...axiosClient,
    });
    this.setRequestInterceptors();
    this.setResponseInterceptors();
  }

  public async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.http.get<T>(url, config);

    return response.data;
  }

  public async post<T, P = null>(url: string, body?: P, config?: AxiosRequestConfig) {
    const response = await this.http.post<T>(url, body, config);

    return response.data ? response.data : null;
  }

  public async put<T, P>(url: string, body: P, config?: AxiosRequestConfig) {
    const response = await this.http.put<T>(url, body, config);

    return response.data ? response.data : null;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.http.delete<T>(url, config);

    return response.data ? response.data : null;
  }

  private setRequestInterceptors() {
    this.http.interceptors.request.use(
      (config) => {
        const token = Storage.getLocalStoraged(TOKEN_KEY);

        if (token?.trim().length) {
          config.headers.set('Authorization', `Bearer ${token}`);
        }

        return config;
      },
      (error: AxiosError) => Promise.reject(error.response)
    );
  }

  private setResponseInterceptors() {
    this.http.interceptors.response.use(
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

              return this.http(config!);
            } catch (error) {
              Storage.removeLocalStoraged(TOKEN_KEY);
              Storage.removeLocalStoraged(USER_INFO_KEY);
            }
            break;
          }
          case ERRORCODE.COMMON_012:
          case ERRORCODE.COMMON_013: {
            Storage.removeLocalStoraged(TOKEN_KEY);
            Storage.removeLocalStoraged(USER_INFO_KEY);
            break;
          }
        }

        return Promise.reject(error.response);
      }
    );
  }
}
