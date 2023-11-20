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
import { axiosClient } from '@/core/service/axios';

const BASE_URL = 'buckets';

const bucketApi = {
  getBuckets: async ({ nickname, hobby, cursorId, size }: GetBucketsRequest) => {
    const url = `${nickname}/${BASE_URL}?hobby=${hobby}`;
    const params = cursorId ? { cursorId, size } : { size };

    const response = await axiosClient.get<GetBucketsResponse>(url, { params });

    return response.data;
  },

  getBucketDetail: async ({ nickname, bucketId }: GetBucketDetailRequest) => {
    const url = `${nickname}/${BASE_URL}/${bucketId}`;

    const response = await axiosClient.get<GetBucketDetailResponse>(url);

    return response.data;
  },

  getBucketMyItems: async ({ bucketId, cursorId, size }: GetBucketMyItemsRequest) => {
    const url = `${BASE_URL}/${bucketId}/myitems`;
    const params = cursorId ? { cursorId, size } : { size };

    const response = await axiosClient.get<GetBucketMyItemsResponse>(url, { params });

    return response.data;
  },

  postBucket: async ({ hobby, name, budget, itemIds }: PostBucketRequest) => {
    const response = await axiosClient.post<PostBucketResponse>(BASE_URL, {
      hobby,
      name,
      budget,
      itemIds,
    });

    return response.data;
  },

  putBucket: async ({ bucketId, hobby, name, budget, itemIds }: PutBucketRequest) => {
    const url = `${BASE_URL}/${bucketId}`;

    return await axiosClient.put<null>(url, {
      hobby,
      name,
      budget,
      itemIds,
    });
  },

  deleteBucket: async (bucketId: number) => {
    const url = `${BASE_URL}/${bucketId}`;

    return await axiosClient.delete<null>(url);
  },
};

export default bucketApi;
