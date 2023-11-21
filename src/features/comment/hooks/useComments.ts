import { useQuery } from '@tanstack/react-query';
import { GetCommentsRequest, commentQueryQption } from '../service';

const useComments = ({ feedId, cursorId, size }: GetCommentsRequest) => {
  return useQuery(commentQueryQption.list({ feedId, cursorId, size }));
};

export default useComments;
