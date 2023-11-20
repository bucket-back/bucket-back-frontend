import { queryOptions } from '@tanstack/react-query';
import { GetSearchItemRequest, itemApi } from '.';

const itemQueryOption = {
  all: ['item'] as const,
  list: ({ keyword, cursorId, size }: GetSearchItemRequest) =>
    queryOptions({
      queryKey: [...itemQueryOption.all, keyword],
      queryFn: () => itemApi.getSearchItem({ keyword, cursorId, size }),
    }),
};

export default itemQueryOption;
