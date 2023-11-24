import { queryOptions } from '@tanstack/react-query';
import { GetInventoryDetailRequest, GetInventoryItemsRequest, inventoryApi } from '.';

const inventoryQueryOption = {
  all: ['inventory'] as const,
  myItems: ({ inventoryId, hobbyName, cursorId, size = 10 }: GetInventoryItemsRequest) =>
    queryOptions({
      queryKey: [...inventoryQueryOption.all, inventoryId, hobbyName] as const,
      queryFn: () => inventoryApi.getInventoryItems({ inventoryId, hobbyName, cursorId, size }),
    }),
  list: (nickname: string) =>
    queryOptions({
      queryKey: [...inventoryQueryOption.all, nickname] as const,
      queryFn: () => inventoryApi.getInventory(nickname),
    }),
  detail: ({ nickname, inventoryId }: GetInventoryDetailRequest) =>
    queryOptions({
      queryKey: [...inventoryQueryOption.all, nickname, inventoryId] as const,
      queryFn: () => inventoryApi.getInventoryDetail({ nickname, inventoryId }),
    }),
};

export default inventoryQueryOption;
