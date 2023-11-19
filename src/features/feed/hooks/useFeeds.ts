import { useQuery } from '@tanstack/react-query';
import { GetFeedsRequest, feedQueryOption } from '../service';

const useFeeds = ({ hobbyName, nickname, sortCondition, cursorId, size }: GetFeedsRequest) => {
  return useQuery(feedQueryOption.list({ hobbyName, nickname, sortCondition, cursorId, size }));
};

export default useFeeds;
