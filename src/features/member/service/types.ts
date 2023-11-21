import { BucketProfile, InventoryProfile, MemberProfile } from '@/shared/types/member';

export interface PostLoginRequest {
  email: string;
  password: string;
}

export interface PostLoginResponse {
  jwtToken: string;
  memberId: number;
  nickname: string;
}

export interface PostSignupRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  emailAuthString: string;
}

export interface PostCheckEmailResponse {
  code: string;
}

export interface GetMemberResponse {
  memberProfile: MemberProfile;
  bucketProfiles: BucketProfile[];
  inventoryProfiles: InventoryProfile[];
}

export interface PutMemberRequest {
  nickname: string;
  introduction: string;
}

export interface GetCheckJWTResponse {
  memberId: number;
  nickname: string;
}
