import { queryOptions } from '@tanstack/react-query';
import { hobbyApi } from '.';

const QUERY_KEY = 'hobby';

const hobbyQueryOption = {
  all: () =>
    queryOptions({
      queryKey: [QUERY_KEY],
      queryFn: () => hobbyApi.getHobbies(),
    }),
};

export default hobbyQueryOption;
