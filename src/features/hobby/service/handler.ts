import { GetHobbiesResponse } from './types';
import { axiosClient } from '@/core/service/axios';

const BASE_URL = 'hobbies';

const hobbyApi = {
  getHobbies: async () => {
    const response = await axiosClient.get<GetHobbiesResponse>(BASE_URL);

    return response.data;
  },
};

export default hobbyApi;
