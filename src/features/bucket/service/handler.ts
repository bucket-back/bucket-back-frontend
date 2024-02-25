import {
  GetBucketDetailRequest,
  GetBucketDetailResponse,
  GetBucketMyItemsRequest,
  GetBucketMyItemsResponse,
  GetBucketsRequest,
  GetBucketsResponse,
  PostBucketRequest,
  PostBucketResponse,
  PutBucketRequest,
} from '.';

import httpClient from '@/core/service/httpClient';

const BASE_URL = 'buckets';

const bucketApi = {
  getBuckets: async ({ nickname, hobby, cursorId, size }: GetBucketsRequest) => {
    const url = `${nickname}/${BASE_URL}?hobby=${hobby}`;
    const params = cursorId ? { cursorId, size } : { size };

    return await httpClient.get<GetBucketsResponse>(url, { params });
  },

  getBucketDetail: async ({ nickname, bucketId }: GetBucketDetailRequest) => {
    const url = `${nickname}/${BASE_URL}/${bucketId}`;

    return await httpClient.get<GetBucketDetailResponse>(url);
  },

  getBucketMyItems: async ({ bucketId, hobbyName, cursorId, size }: GetBucketMyItemsRequest) => {
    const bucketIdQueryString = bucketId ? `&bucketId=${bucketId}` : '';
    const hobbyNameQueryString = hobbyName ? `&hobbyName=${hobbyName}` : '';

    const url = `${BASE_URL}/myitems?${bucketIdQueryString}${hobbyNameQueryString}`;
    const params = cursorId ? { cursorId, size } : { size };

    return await httpClient.get<GetBucketMyItemsResponse>(url, { params });
  },

  postBucket: async ({ hobbyValue, name, budget, itemIds }: PostBucketRequest) => {
    const body = { hobbyValue, name, budget, itemIds };

    return await httpClient.post<PostBucketResponse, typeof body>(BASE_URL, {
      ...body,
    });
  },

  putBucket: async ({ bucketId, hobbyValue, name, budget, itemIds }: PutBucketRequest) => {
    const url = `${BASE_URL}/${bucketId}`;
    const body = { hobbyValue, name, budget, itemIds };

    return await httpClient.put<null, typeof body>(url, { ...body });
  },

  deleteBucket: async (bucketId: number) => {
    const url = `${BASE_URL}/${bucketId}`;

    return await httpClient.delete<null>(url);
  },
};

export default bucketApi;
