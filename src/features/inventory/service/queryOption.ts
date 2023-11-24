import { queryOptions } from '@tanstack/react-query';
import { GetInventoryItemsRequest, inventoryApi } from '.';

const inventoryQueryOption = {
  all: ['inventory'] as const,
  myItems: ({ inventoryId, hobbyName, cursorId, size = 10 }: GetInventoryItemsRequest) =>
    queryOptions({
      queryKey: [...inventoryQueryOption.all, inventoryId, hobbyName] as const,
      queryFn: () => inventoryApi.getInventoryItems({ inventoryId, hobbyName, cursorId, size }),
    }),
};

export default inventoryQueryOption;
