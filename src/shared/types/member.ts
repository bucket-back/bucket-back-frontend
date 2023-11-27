export interface MemberInfo {
  memberId: number;
  nickName: string;
  profileImage: string;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export interface MemberProfile {
  memberId: number;
  nickname: string;
  profileImage: string;
  level: number;
  introduction: string;
}

export interface BucketProfile {
  id: number;
  hobby: string;
  images: string[];
}

export interface InventoryProfile {
  id: number;
  hobby: string;
  images: string[];
}
