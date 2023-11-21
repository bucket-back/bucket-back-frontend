import { useNavigate } from 'react-router-dom';
import { TOKEN_KEY, USER_INFO_KEY } from '@/shared/constants';
import { useCustomToast } from '@/shared/hooks';
import { Storage } from '@/shared/utils';

const useLogout = () => {
  const openToast = useCustomToast();
  const navigate = useNavigate();

  return () => {
    Storage.removeLocalStoraged(USER_INFO_KEY);
    Storage.removeLocalStoraged(TOKEN_KEY);
    openToast({ message: '로그아웃 되었습니다.', type: 'success' });
    navigate('/');
  };
};

export default useLogout;
