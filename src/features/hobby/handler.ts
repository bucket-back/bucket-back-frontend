import { axiosClient } from '@/core/service/axios';
import { Hobbies } from '@/shared/types/hobby';

export const getHobbies = async () => {
  const res = await axiosClient.get<Hobbies>('hobbies');

  return res.data;
};
