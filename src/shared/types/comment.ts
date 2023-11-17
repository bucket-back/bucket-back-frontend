interface MemberInfo {
  memberId: number;
  nickName: string;
  profileImage: string;
  level: number;
}

export interface Comment {
  cursorId: string;
  memberInfo: MemberInfo;
  commentId: number;
  content: string;
  isAdopted: boolean;
  createdAt: string;
}
