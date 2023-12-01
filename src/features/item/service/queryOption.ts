import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { GetMyItemsRequest, itemApi } from '.';

const itemQueryOption = {
  all: ['item'] as const,
  detail: (itemId: number) =>
    queryOptions({
      queryKey: [...itemQueryOption.all, itemId] as const,
      queryFn: () => itemApi.getDetailItem(itemId),
    }),
  myItems: ({ hobbyName, cursorId, size }: GetMyItemsRequest) => {
    const currentHobbyName = hobbyName || 'all';

    return queryOptions({
      queryKey: [...itemQueryOption.all, currentHobbyName] as const,
      queryFn: () => itemApi.getMyItems({ hobbyName, cursorId, size }),
    });
  },

  infinityList: ({ hobbyName, size }: GetMyItemsRequest) => {
    const currentHobbyName = hobbyName || 'all';

    return infiniteQueryOptions({
      queryKey: [...itemQueryOption.all, currentHobbyName, 'infinite'] as const,
      queryFn: ({ pageParam: cursorId }) => itemApi.getMyItems({ hobbyName, cursorId, size }),
      initialPageParam: '',
      getNextPageParam: ({ nextCursorId }) => {
        return nextCursorId;
      },
    });
  },
};

export default itemQueryOption;
