import { MemberInfo } from './member';

export interface Review {
  cursorId: string;
  memberInfo: MemberInfo;
  reviewId: number;
  rate: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isReviewed: boolean;
}
