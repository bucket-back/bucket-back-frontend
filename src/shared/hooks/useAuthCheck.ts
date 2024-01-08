import { useEffect, useState } from 'react';
import { Storage } from '@/shared/utils';
import { TOKEN_KEY } from '../constants';

const useAuthCheck = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = Storage.getLocalStoraged(TOKEN_KEY);

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return isLogin;
};

export default useAuthCheck;
