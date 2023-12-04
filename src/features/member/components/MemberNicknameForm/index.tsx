import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { CommonButton, CommonInput, CommonText } from '@/shared/components';
import { useValidateForm } from '@/shared/hooks';
import { useCheckNickname } from '../../hooks';
import { InputAndButtonBox } from './style';
import { PostSignupRequest } from '@/features/member/service';
import { submitValue } from '@/pages/Member/Signup';

interface MemberNicknameFormProps {
  setSubmitValue: React.Dispatch<React.SetStateAction<submitValue>>;
  nickname: string;
  submitValue: submitValue;
}

const MemberNicknameForm = ({ setSubmitValue, nickname, submitValue }: MemberNicknameFormProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostSignupRequest>();
  const registerOptions = useValidateForm();
  const {
    mutate: checkNicknameMutate,
    isSuccess: checkNicknameSuccess,
    isPending: checkNicknamePending,
  } = useCheckNickname();

  const handleCheckNickname = () => {
    if (errors.nickname || !nickname || nickname === submitValue.nickname) {
      return;
    }
    checkNicknameMutate(nickname);
  };

  useEffect(() => {
    if (checkNicknameSuccess) {
      setSubmitValue((prev) => ({ ...prev, nickname: nickname }));
    }
  }, [checkNicknameSuccess]);

  return (
    <>
      <CommonText type="strongInfo">닉네임</CommonText>
      <InputAndButtonBox>
        <CommonInput
          type="text"
          width="100%"
          placeholder="닉네임을 입력해주세요."
          error={errors.nickname}
          {...register('nickname', ...registerOptions.nickname)}
        />
        <CommonButton
          type="mdBase"
          width="fit-content"
          onClick={handleCheckNickname}
          isDisabled={checkNicknamePending}
        >
          중복확인
        </CommonButton>
      </InputAndButtonBox>
    </>
  );
};
export default MemberNicknameForm;
