import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CommonIcon, CommonInput } from '@/shared/components';
import { useValidateForm } from '@/shared/hooks';
import { PostSignupRequest } from '../../service';
import { IconWrapper } from '@/pages/Member/Login/style';

const MemberPassword = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostSignupRequest>();
  const registerOptions = useValidateForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <>
      <CommonInput
        width="100%"
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
        width="100%"
        type={showPasswordConfirm ? 'text' : 'password'}
        placeholder="비밀번호를 확인해주세요."
        error={errors.passwordConfirm}
        rightIcon={
          <IconWrapper onClick={() => setShowPasswordConfirm(() => !showPasswordConfirm)}>
            <CommonIcon type={showPasswordConfirm ? 'eye' : 'eyeSlash'} size="1.25rem" />
          </IconWrapper>
        }
        {...register('passwordConfirm', {
          required: '비밀번호 확인은 필수입니다.',
          validate: (value: string, { password }: { password: string }) =>
            value === password || '비밀번호가 동일하지 않습니다.',
        })}
      />
    </>
  );
};

export default MemberPassword;
