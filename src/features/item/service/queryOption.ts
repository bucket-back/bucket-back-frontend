import { queryOptions } from '@tanstack/react-query';
import { GetSearchItemRequest, itemApi } from '.';

const itemQueryOption = {
  all: ['item'] as const,
  list: ({ keyword, cursorId, size }: GetSearchItemRequest) =>
    queryOptions({
      queryKey: [...itemQueryOption.all, keyword] as const,
      queryFn: () => itemApi.getSearchItem({ keyword, cursorId, size }),
    }),
  detail: (itemId: number) =>
    queryOptions({
      queryKey: [...itemQueryOption.all, itemId] as const,
      queryFn: () => itemApi.getDetailItem(itemId),
    }),
};

export default itemQueryOption;
