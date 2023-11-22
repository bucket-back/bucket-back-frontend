import { Bucket, BucketMemberItem, ItemInfo } from '@/shared/types';

export interface GetBucketsRequest {
  nickname: string;
  hobby: string;
  cursorId?: string;
  size?: number;
}

export interface GetBucketsResponse {
  nextCursorId: string;
  buckets: Bucket[];
}

export interface GetBucketDetailRequest {
  nickname: string;
  bucketId: number;
}

export interface GetBucketDetailResponse {
  hobby: string;
  name: string;
  budget: number;
  memberId: number;
  bucketId: number;
  itemInfos: ItemInfo[];
}

export interface GetBucketMyItemsRequest {
  bucketId: number;
  cursorId?: string;
  size: number;
}

export interface GetBucketMyItemsResponse {
  nextCursorId: string;
  summaryCount: number;
  bucketMemberItems: BucketMemberItem[];
}

export interface PostBucketRequest {
  hobby: string;
  name: string;
  budget: number;
  itemIds: number[];
}

export interface PostBucketResponse {
  bucketId: number;
}

export interface PutBucketRequest extends PostBucketRequest {
  bucketId: number;
}
