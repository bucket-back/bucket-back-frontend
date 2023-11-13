import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider as BaseQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const QueryClientProvider = (props: PropsWithChildren<unknown>) => {
  const { children } = props;

  // retry가 기본 3번이기 때문에 줄이기 위해서 0으로 설정!
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });

  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </BaseQueryClientProvider>
  );
};

export default QueryClientProvider;
