import { useQuery } from '@tanstack/react-query';
import { feedQueryOption } from '../service';

const useFeedDetail = (feedId: number) => {
  return useQuery(feedQueryOption.detail(feedId));
};

export default useFeedDetail;
