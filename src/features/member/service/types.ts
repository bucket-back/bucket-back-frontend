export interface PostLoginRequest {
  email: string;
  password: string;
}

export interface PostLoginResponse {
  jwtToken: string;
  memberId: number;
  nickname: string;
}
