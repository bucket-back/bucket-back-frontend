import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { TOKEN_KEY, USER_INFO_KEY, ROOT_PATH } from '@/shared/constants';
import { useCustomToast } from '@/shared/hooks';
import { Storage } from '@/shared/utils';
import { memberApi } from '../service';

const useLeave = () => {
  const openToast = useCustomToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: memberApi.deleteMember,
    onSuccess: () => {
      Storage.removeLocalStoraged(USER_INFO_KEY);
      Storage.removeLocalStoraged(TOKEN_KEY);
      openToast({ message: '탈퇴 완료됐습니다.', type: 'success' });
      navigate(ROOT_PATH);
    },
  });
};

export default useLeave;
