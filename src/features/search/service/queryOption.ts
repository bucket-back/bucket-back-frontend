import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { GetSearchItemRequest, searchApi } from '.';

const searchQueryOption = {
  all: ['search'] as const,
  itemList: ({ keyword, cursorId, size = 10 }: GetSearchItemRequest) =>
    queryOptions({
      queryKey: [...searchQueryOption.all, keyword] as const,
      queryFn: () => searchApi.getSearchItem({ keyword, cursorId, size }),
    }),
  keywordList: (keyword: string) =>
    queryOptions({
      queryKey: [...searchQueryOption.all, keyword, 'list'] as const,
      queryFn: () => searchApi.getSearchKeyword(keyword),
    }),
  voteList: ({ keyword, cursorId, size }: GetSearchItemRequest) =>
    queryOptions({
      queryKey: [...searchQueryOption.all, keyword, 'vote'] as const,
      queryFn: () => searchApi.getVoteKeyword({ keyword, cursorId, size }),
    }),
  infiniteKeywordItemList: ({ keyword, size = 10 }: GetSearchItemRequest) =>
    infiniteQueryOptions({
      queryKey: [...searchQueryOption.all, keyword] as const,
      queryFn: ({ pageParam: cursorId }) => searchApi.getSearchItem({ keyword, cursorId, size }),
      initialPageParam: '',
      getNextPageParam: ({ nextCursorId }) => {
        return nextCursorId;
      },
    }),
  infiniteVoteList: ({ keyword, size }: GetSearchItemRequest) =>
    infiniteQueryOptions({
      queryKey: [...searchQueryOption.all, keyword, 'vote'] as const,
      queryFn: ({ pageParam: cursorId }) => searchApi.getVoteKeyword({ keyword, cursorId, size }),
      initialPageParam: '',
      getNextPageParam: ({ nextCursorId }) => {
        return nextCursorId;
      },
    }),
};

export default searchQueryOption;
