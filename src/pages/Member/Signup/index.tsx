import { useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { CommonButton, Header } from '@/shared/components';
import { useCustomToast } from '@/shared/hooks';
import { Container, Form, InputWrapper } from './style';
import MemberEmailForm from '@/features/member/components/MemberEmailForm';
import MemberNicknameForm from '@/features/member/components/MemberNicknameForm';
import MemberPassword from '@/features/member/components/MemberPassword';
import { useSignup } from '@/features/member/hooks';
import { PostSignupRequest } from '@/features/member/service';

export interface submitValue {
  email: string;
  nickname: string;
}

const SignUp = () => {
  const methods = useForm<PostSignupRequest>({ mode: 'onBlur' });
  const openToast = useCustomToast();
  const { mutate: signupMutate } = useSignup();
  const [nickname, email, emailAuthString] = methods.watch([
    'nickname',
    'email',
    'emailAuthString',
  ]);
  const [submitValue, setSubmitValue] = useState<submitValue>({ email: '', nickname: '' });

  const onSubmit: SubmitHandler<PostSignupRequest> = (data) => {
    if (email === submitValue.email && nickname === submitValue.nickname) {
      signupMutate(data);
    } else {
      openToast({ message: '인증 절차를 다시한번 더 확인해주세요.', type: 'error' });
    }
  };

  return (
    <FormProvider {...methods}>
      <Header type="back" />
      <Container>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputWrapper>
            <MemberEmailForm
              setSubmitValue={setSubmitValue}
              emailAuthString={emailAuthString}
              email={email}
            />
          </InputWrapper>
          <InputWrapper>
            <MemberPassword />
          </InputWrapper>
          <InputWrapper>
            <MemberNicknameForm
              setSubmitValue={setSubmitValue}
              nickname={nickname}
              submitValue={submitValue}
            />
          </InputWrapper>
          <CommonButton type="mdFull" isSubmit={true}>
            회원가입
          </CommonButton>
        </Form>
      </Container>
    </FormProvider>
  );
};

export default SignUp;
