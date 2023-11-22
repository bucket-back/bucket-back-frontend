import { queryOptions } from '@tanstack/react-query';
import { GetBucketDetailRequest, GetBucketMyItemsRequest, GetBucketsRequest, bucketApi } from '.';

const QUERY_KEY = 'bucket';

const bucketQueryOption = {
  list: ({ nickname, hobby, cursorId, size = 10 }: GetBucketsRequest) =>
    queryOptions({
      queryKey: [QUERY_KEY, nickname, hobby],
      queryFn: () => bucketApi.getBuckets({ nickname, hobby, cursorId, size }),
    }),

  detail: ({ nickname, bucketId }: GetBucketDetailRequest) =>
    queryOptions({
      queryKey: [QUERY_KEY, nickname, bucketId],
      queryFn: () => bucketApi.getBucketDetail({ nickname, bucketId }),
    }),

  myItemList: ({ bucketId, cursorId, size }: GetBucketMyItemsRequest) =>
    queryOptions({
      queryKey: [QUERY_KEY, bucketId],
      queryFn: () => bucketApi.getBucketMyItems({ bucketId, cursorId, size }),
    }),
};

export default bucketQueryOption;
