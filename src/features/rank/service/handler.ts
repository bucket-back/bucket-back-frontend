import { ItemResponse } from './type';
import httpClient from '@/core/service/httpClient';

const BASE_URL = 'items';

const rankApi = {
  getRankItem: async () => {
    const url = `${BASE_URL}/ranking`;

    return await httpClient.get<ItemResponse>(url);
  },
};

export default rankApi;
