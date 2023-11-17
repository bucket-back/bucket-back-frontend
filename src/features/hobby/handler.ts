import { GetHobbiesResponse } from './types';
import { axiosClient } from '@/core/service/axios';

const hobbyApi = {
  getHobbies: async () => {
    const res = await axiosClient.get<GetHobbiesResponse>('hobbies');

    return res.data;
  },
};

export default hobbyApi;
