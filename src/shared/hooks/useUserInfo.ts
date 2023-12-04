import { Storage } from '../utils';

interface UserInfo {
  memberId: number;
  nickname: string;
}

const useUserInfo = (): UserInfo => {
  return Storage.getLocalStoraged('userInfo');
};

export default useUserInfo;
