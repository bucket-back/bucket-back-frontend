import { useNavigate } from 'react-router-dom';
import { useAuthCheck } from '.';

const useMovePageWithLogin = () => {
  const navigate = useNavigate();
  const isLogin = useAuthCheck();

  const movePage = (path: string) => {
    if (isLogin) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  return movePage;
};

export default useMovePageWithLogin;
