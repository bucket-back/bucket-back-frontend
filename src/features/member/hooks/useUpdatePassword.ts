import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { memberApi } from '../service';

const useUpadatePassword = (nickname: string) => {
  const navigate = useNavigate();
  const openToast = useCustomToast();

  return useMutation({
    mutationFn: memberApi.putMemberPassword,
    onSuccess: () => {
      openToast({ message: '비밀번호가 변경되었습니다.', type: 'success' });
      navigate(`/member/${nickname}`);
    },
    onError: () => {
      openToast({ message: '비밀번호 변경에 실패했습니다.', type: 'error' });
    },
  });
};

export default useUpadatePassword;
