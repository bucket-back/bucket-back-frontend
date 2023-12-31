import { MemberInfo } from './member';

export interface FeedItems {
  id: number;
  image: string;
  url: string;
}

export interface FeedsData {
  cursorId: string;
  memberInfo: MemberInfo;
  feedId: number;
  content: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  feedItems: FeedItemInfo[];
  isLike: boolean;
}

export interface FeedInfo {
  id: number;
  hobby: string;
  content: string;
  bucketName: string;
  bucketBudget: number;
  createdAt: string;
  hasAdoptedComment: boolean;
  likeCount: number;
  isLiked: boolean;
  totalPrice: number;
}

export interface FeedItemInfo {
  id: number;
  name: string;
  price: number;
  image: string;
}
