import { queryOptions } from '@tanstack/react-query';
import { memberApi } from '.';

const memberQueryOption = {
  all: ['member'] as const,
  detail: (nickname: string) =>
    queryOptions({
      queryKey: [...memberQueryOption.all, nickname] as const,
      queryFn: () => memberApi.getMember(nickname),
    }),
  token: () =>
    queryOptions({
      queryKey: [...memberQueryOption.all, 'toke'] as const,
      queryFn: () => memberApi.getCheckJWT(),
    }),
};

export default memberQueryOption;
