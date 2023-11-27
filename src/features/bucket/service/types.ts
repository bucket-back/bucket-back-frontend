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
  totalPrice: number;
  memberId: number;
  bucketId: number;
  itemInfos: ItemInfo[];
}

export interface GetBucketMyItemsRequest {
  bucketId?: number;
  hobbyName?: string;
  cursorId?: string;
  size?: number;
}

export interface GetBucketMyItemsResponse {
  nextCursorId: string;
  totalCount: number;
  memberItems: BucketMemberItem[];
}

export interface PostBucketRequest {
  hobbyValue: string;
  name: string;
  budget?: number;
  itemIds: number[];
}

export interface PostBucketResponse {
  bucketId: number;
}

export interface PutBucketRequest extends PostBucketRequest {
  bucketId: number;
}
