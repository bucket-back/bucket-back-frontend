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
  infinityList: ({ hobbyName, size }: GetMyItemsRequest) =>
    infiniteQueryOptions({
      queryKey: [...itemQueryOption.all, hobbyName] as const,
      queryFn: ({ pageParam: cursorId }) => itemApi.getMyItems({ hobbyName, cursorId, size }),
      initialPageParam: '',
      getNextPageParam: (data) => {
        return data.nextCursorId;
      },
    }),
};

export default itemQueryOption;
