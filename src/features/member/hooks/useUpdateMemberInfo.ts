import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useCustomToast, useUserInfo } from '@/shared/hooks';
import { Storage } from '@/shared/utils';
import { memberApi } from '../service';

const useUpateMemberInfo = (nickname: string) => {
  const navigate = useNavigate();
  const openToast = useCustomToast();
  const userInfo = useUserInfo();

  return useMutation({
    mutationFn: memberApi.putMember,
    onSuccess: () => {
      openToast({ message: '프로필 수정에 성공하셨습니다.', type: 'success' });
      navigate(`/member/${nickname}`);

      Storage.setLocalStoraged('userInfo', {
        ...userInfo,
        nickname,
      });
    },
    onError: () => {
      openToast({ message: '프로필 수정에 실패하셨습니다.', type: 'error' });
    },
  });
};

export default useUpateMemberInfo;
