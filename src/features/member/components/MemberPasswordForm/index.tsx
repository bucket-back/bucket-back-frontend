import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CommonButton, CommonIcon, CommonInput } from '@/shared/components';
import { useValidateForm } from '@/shared/hooks';
import { useUpadatePassword } from '../../hooks';
import { FormWrapper, InputPanel } from './style';

interface Password {
  password: string;
  passwordConfirm: string;
}

interface MemberPasswordFormProps {
  nickname: string;
}

const MemberPasswordForm = ({ nickname }: MemberPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const updatePassword = useUpadatePassword(nickname);
  const registerOptions = useValidateForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Password>({ mode: 'onBlur' });
  const onSubmit: SubmitHandler<Password> = (data) => {
    updatePassword.mutate(data.password);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <InputPanel>
        <CommonInput
          width="100%"
          placeholder="비밀번호를 입력해주세요"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          rightIcon={
            <CommonIcon
              type={showPassword ? 'eye' : 'eyeSlash'}
              size="1.25rem"
              onClick={() => setShowPassword(!showPassword)}
            />
          }
          error={errors.password}
          {...register('password', ...registerOptions.password)}
        />
        <CommonInput
          width="100%"
          placeholder="비밀번호를 확인해주세요"
          type={showPasswordConfirm ? 'text' : 'password'}
          rightIcon={
            <CommonIcon
              type={showPasswordConfirm ? 'eye' : 'eyeSlash'}
              size="1.25rem"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            />
          }
          error={errors.passwordConfirm}
          {...register('passwordConfirm', {
            required: '비밀번호 확인은 필수입니다.',
            validate: (passwordConfirm, { password }) => {
              return passwordConfirm === password || '비밀번호가 동일하지 않습니다.';
            },
          })}
        />
      </InputPanel>
      <CommonButton type="mdMiddle" isSubmit={true}>
        변경하기
      </CommonButton>
    </FormWrapper>
  );
};

export default MemberPasswordForm;
