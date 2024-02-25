import { CreateAxiosDefaults } from 'axios';
import axiosClient from './axiosClient';

class HttpClient extends axiosClient {
  constructor(client: CreateAxiosDefaults) {
    super(client);
  }
}

export default new HttpClient({
  baseURL: import.meta.env.VITE_ENDPOINT_URL,
  timeout: 15000,
  withCredentials: true,
});
