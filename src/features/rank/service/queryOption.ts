import { queryOptions } from '@tanstack/react-query';
import rankApi from './handler';

const rankQueryOption = {
  all: ['ranking'] as const,
  itemList: () =>
    queryOptions({
      queryKey: [...rankQueryOption.all, 'items'] as const,
      queryFn: () => rankApi.getRankItem(),
    }),
};

export default rankQueryOption;
