import { useQuery } from '@tanstack/react-query';
import { hobbyQueryOption } from '../service';

const useHobby = () => {
  return useQuery(hobbyQueryOption.all());
};

export default useHobby;
