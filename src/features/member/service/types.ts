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
