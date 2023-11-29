import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { GetMyItemsRequest, itemApi } from '.';

const itemQueryOption = {
  all: ['item'] as const,
  detail: (itemId: number) =>
    queryOptions({
      queryKey: [...itemQueryOption.all, itemId] as const,
      queryFn: () => itemApi.getDetailItem(itemId),
    }),
  myItems: ({ hobbyName, cursorId, size }: GetMyItemsRequest) =>
    queryOptions({
      queryKey: [...itemQueryOption.all, hobbyName] as const,
      queryFn: () => itemApi.getMyItems({ hobbyName, cursorId, size }),
    }),
  infinityList: ({ size }: GetMyItemsRequest) =>
    infiniteQueryOptions({
      queryKey: [...itemQueryOption.all] as const,
      queryFn: ({ pageParam: cursorId }) => itemApi.getMyItems({ cursorId, size }),
      initialPageParam: '',
      getNextPageParam: ({ nextCursorId }) => {
        return nextCursorId;
      },
    }),
};

export default itemQueryOption;
