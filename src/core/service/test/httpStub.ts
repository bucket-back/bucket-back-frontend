import { AxiosRequestConfig } from 'axios';
import axiosClient from '../axiosClient';

class TestClient {
  public test: axiosClient;

  constructor(client: AxiosRequestConfig) {
    this.test = new axiosClient(client);
  }
}

export default new TestClient({
  baseURL: 'test',
  timeout: 15000,
  withCredentials: true,
});
