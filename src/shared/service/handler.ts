import { Hobbies } from '../types/hobby';
import { axiosClient } from '@/core/service/axios';

export const getHobbies = async () => {
  const res = await axiosClient.get<Hobbies>('hobbies');

  return res.data;
};
