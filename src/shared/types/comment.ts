import { MemberInfo } from './member';

export interface Comment {
  cursorId: string;
  memberInfo: MemberInfo;
  commentId: number;
  content: string;
  isAdopted: boolean;
  createdAt: string;
}
