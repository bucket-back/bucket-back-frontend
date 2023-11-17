import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CommonButton, CommonIcon, CommonInput, CommonText } from '@/shared/components';
import { useCustomToast } from '@/shared/hooks';
import { Container, Form, IconWrapper, InputAndButtonBox, InputWrapper } from './style';
import { useCheckEmail, useCheckNickname, useSignup } from '@/features/member/hooks';
import { PostSignupRequest } from '@/features/member/service';
import useValidateForm from '@/shared/hooks/useValidateForm';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostSignupRequest>({ mode: 'onBlur' });
  const [showPassword, setShowPassword] = useState(false);
  const openToast = useCustomToast();
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { mutate: signupMutate } = useSignup();
  const {
    mutate: checkNicknameMutate,
    isSuccess: checkNicknameSuccess,
    isPending: checkNicknamePending,
  } = useCheckNickname();
  const {
    mutate: checkEmailMutate,
    isSuccess: checkEmailSuccess,
    data: checkEmailData,
    isPending: checkEmailPending,
  } = useCheckEmail();
  const registerOptions = useValidateForm();
  const [nickname, email, emailAuthString] = watch(['nickname', 'email', 'emailAuthString']);
  const [sameEmailAuthString, setSameEmailAuthString] = useState(false);

  const onSubmit: SubmitHandler<PostSignupRequest> = (data) => {
    if (sameEmailAuthString && checkNicknameSuccess) {
      signupMutate(data);
    } else {
      openToast({ message: '인증 절차를 다시한번 더 확인해주세요.', type: 'error' });
    }
  };

  const handleCheckNickname = () => {
    if (errors.nickname) {
      return;
    }
    checkNicknameMutate(nickname);
  };

  const handleCheckEmail = () => {
    if (errors.email) {
      return;
    } else {
      checkEmailMutate(email);
    }
  };

  const handleEmailAuthNumber = () => {
    if (emailAuthString == checkEmailData?.code) {
      setSameEmailAuthString(true);
      openToast({ message: '인증되었습니다.', type: 'success' });
    } else {
      openToast({ message: '안증번호가 일치하지않습니다.', type: 'error' });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <CommonText type="strongInfo">이메일</CommonText>
          <InputAndButtonBox>
            <CommonInput
              width="14.5rem"
              type="text"
              placeholder="이메일을 입력해주세요."
              error={errors.email}
              {...register('email', ...registerOptions.email)}
            />

            <CommonButton type="mdMiddle" onClick={handleCheckEmail} isDisabled={checkEmailPending}>
              인증
            </CommonButton>
          </InputAndButtonBox>
          {checkEmailSuccess && (
            <InputAndButtonBox>
              <CommonInput
                width="14.5rem"
                type="text"
                placeholder="인증번호를 입력해주세요."
                error={errors.emailAuthString}
                disabled={sameEmailAuthString}
                {...register('emailAuthString', { required: '인증번호 입력은 필수입니다.' })}
              />
              <CommonButton type="mdMiddle" onClick={handleEmailAuthNumber}>
                확인
              </CommonButton>
            </InputAndButtonBox>
          )}
        </InputWrapper>

        <div>
          <CommonInput
            width="18.4375rem"
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요."
            error={errors.password}
            rightIcon={
              <IconWrapper onClick={() => setShowPassword(() => !showPassword)}>
                <CommonIcon type={showPassword ? 'eye' : 'eyeSlash'} size="1.25rem" />
              </IconWrapper>
            }
            {...register('password', ...registerOptions.password)}
          />
          <CommonInput
            width="18.4375rem"
            type={showPasswordConfirm ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요."
            error={errors.passwordConfirm}
            rightIcon={
              <IconWrapper onClick={() => setShowPasswordConfirm(() => !showPasswordConfirm)}>
                <CommonIcon type={showPasswordConfirm ? 'eye' : 'eyeSlash'} size="1.25rem" />
              </IconWrapper>
            }
            {...register('passwordConfirm', {
              required: '비밀번호 확인은 필수입니다.',
              validate: (value, { password }) =>
                value === password || '비밀번호가 동일하지 않습니다.',
            })}
          />
        </div>
        <InputWrapper>
          <CommonText type="strongInfo">닉네임</CommonText>
          <InputAndButtonBox>
            <CommonInput
              type="text"
              width="14.5rem"
              placeholder="닉네임을 입력해주세요."
              error={errors.nickname}
              {...register('nickname', ...registerOptions.nickname)}
            />
            <CommonButton
              type="mdMiddle"
              onClick={handleCheckNickname}
              isDisabled={checkNicknamePending}
            >
              종복확인
            </CommonButton>
          </InputAndButtonBox>
        </InputWrapper>
        <CommonButton type="mdFull" isSubmit={true}>
          회원가입
        </CommonButton>
      </Form>
    </Container>
  );
};

export default SignUp;
