import { useMutation } from '@tanstack/react-query';
import { useCustomToast } from '@/shared/hooks';
import { memberApi } from '../service';

const useUpdateImage = () => {
  const openToast = useCustomToast();

  return useMutation({
    mutationFn: memberApi.putMemberImage,
    onSuccess: () => {
      openToast({ message: '프로필 이미지가 변경되었습니다.', type: 'success' });
    },
  });
};

export default useUpdateImage;
