import { queryOptions } from '@tanstack/react-query';
import { GetSearchItemRequest, searchApi } from '.';

const searchQueryOption = {
  all: ['search'] as const,
  itemList: ({ keyword, cursorId, size }: GetSearchItemRequest) =>
    queryOptions({
      queryKey: [...searchQueryOption.all, keyword] as const,
      queryFn: () => searchApi.getSearchItem({ keyword, cursorId, size }),
    }),
  keywordList: (keyword: string) =>
    queryOptions({
      queryKey: [...searchQueryOption.all, keyword, 'list'] as const,
      queryFn: () => searchApi.getSearchKeyword(keyword),
    }),
  // 투표추가
};

export default searchQueryOption;
