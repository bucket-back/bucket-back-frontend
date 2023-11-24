import { useEffect, useState } from 'react';
import { Storage } from '@/shared/utils';

const useAuthCheck = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = Storage.getLocalStoraged('token');

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return isLogin;
};

export default useAuthCheck;
