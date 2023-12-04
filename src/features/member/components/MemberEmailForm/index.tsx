import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CommonButton, CommonInput, CommonText } from '@/shared/components';
import { useCustomToast, useValidateForm } from '@/shared/hooks';
import { useCheckEmail } from '../../hooks';
import { PostSignupRequest } from '../../service';
import { InputAndButtonBox } from './style';
import { submitValue } from '@/pages/Member/Signup';

interface MemberEmailFormProps {
  setSubmitValue: React.Dispatch<React.SetStateAction<submitValue>>;
  emailAuthString: string;
  email: string;
}

const MemberEmailForm = ({ setSubmitValue, emailAuthString, email }: MemberEmailFormProps) => {
  const {
    register,
    resetField,
    formState: { errors },
  } = useFormContext<PostSignupRequest>();
  const {
    mutate: checkEmailMutate,
    isSuccess: checkEmailSuccess,
    data: checkEmailData,
    isPending: checkEmailPending,
  } = useCheckEmail();
  const openToast = useCustomToast();
  const registerOptions = useValidateForm();

  const handleCheckEmail = () => {
    if (errors.email || !email) {
      return;
    }
    resetField('emailAuthString');
    checkEmailMutate(email);
  };

  const handleEmailAuthNumber = () => {
    if (emailAuthString == checkEmailData?.code) {
      setSubmitValue((prev) => ({ ...prev, email: email }));
      openToast({ message: '인증되었습니다.', type: 'success' });
    } else {
      openToast({ message: '안증번호가 일치하지않습니다.', type: 'error' });
    }
  };

  return (
    <>
      <CommonText type="strongInfo">이메일</CommonText>
      <InputAndButtonBox>
        <CommonInput
          width="100%"
          type="text"
          placeholder="이메일을 입력해주세요."
          error={errors.email}
          {...register('email', ...registerOptions.email)}
        />

        <CommonButton
          type="mdBase"
          width="fit-content"
          onClick={handleCheckEmail}
          isDisabled={checkEmailPending}
        >
          인증
        </CommonButton>
      </InputAndButtonBox>
      {checkEmailSuccess && (
        <InputAndButtonBox>
          <CommonInput
            width="100%"
            type="text"
            placeholder="인증번호를 입력해주세요."
            error={errors.emailAuthString}
            {...register('emailAuthString', { required: '인증번호 입력은 필수입니다.' })}
          />
          <CommonButton type="mdBase" width="fit-content" onClick={handleEmailAuthNumber}>
            확인
          </CommonButton>
        </InputAndButtonBox>
      )}
    </>
  );
};

export default MemberEmailForm;
