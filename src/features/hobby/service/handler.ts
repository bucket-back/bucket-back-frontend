import { GetHobbiesResponse } from './types';
import httpClient from '@/core/service/httpClient';

const BASE_URL = 'hobbies';

const hobbyApi = {
  getHobbies: async () => {
    return await httpClient.get<GetHobbiesResponse>(BASE_URL);
  },
};

export default hobbyApi;
