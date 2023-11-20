import { useState } from 'react';
import { CommonButton, CommonIcon, CommonInput, CommonText, Header } from '@/shared/components';
import { Container, FormWrapper, InputPanel } from './style';

const MemberPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle">비밀번호 변경</CommonText>
        <FormWrapper>
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
            />
          </InputPanel>
          <CommonButton type="mdMiddle" isSubmit={true}>
            변경하기
          </CommonButton>
        </FormWrapper>
      </Container>
    </>
  );
};

export default MemberPassword;
