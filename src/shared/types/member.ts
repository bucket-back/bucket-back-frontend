export interface MemberInfo {
  memberId: number;
  nickName: string;
  profileImage: string;
  level: number;
}

export interface MemberProfile {
  memberId: number;
  nickname: string;
  levelPoint: number;
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
