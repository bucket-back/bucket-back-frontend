import { FeedInfo, FeedItemInfo, FeedsData, MemberInfo } from '@/shared/types';

export interface GetFeedsResponse {
  nextCursorId: string;
  feeds: FeedsData[];
}

export interface GetFeedsRequest {
  hobbyName: string;
  nickname?: string;
  sortCondition?: string;
  cursorId?: string;
  size?: number;
}

export interface GetFeedDetailResponse {
  memberInfo: MemberInfo;
  feedInfo: FeedInfo;
  feedItems: FeedItemInfo[];
}

export interface PostFeedResponse {
  feedId: number;
}

export interface PostFeedRequest {
  bucketId: number;
  content: string;
}

export interface PutFeedRequest {
  feedId: number;
  content: string;
}
