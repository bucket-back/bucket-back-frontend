import { ItemResponse } from './type';
import { axiosClient } from '@/core/service/axios';

const BASE_URL = 'items';

const rankApi = {
  getRankItem: async () => {
    const url = `${BASE_URL}/ranking`;

    const response = await axiosClient.get<ItemResponse>(url);

    return response.data;
  },
};

export default rankApi;
