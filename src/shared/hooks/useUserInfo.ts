import { useEffect, useState } from 'react';
import { Storage } from '../utils';

interface UserInfo {
  memberId: number;
  nickname: string;
}

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storageData = Storage.getLocalStoraged('userInfo');

    if (storageData) {
      setUserInfo(storageData);
    }
  }, []);

  return userInfo;
};

export default useUserInfo;
