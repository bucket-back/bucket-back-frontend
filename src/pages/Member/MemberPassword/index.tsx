import { CommonText, Header } from '@/shared/components';
import { useUserInfo } from '@/shared/hooks';
import { Container } from './style';
import { MemberPasswordForm } from '@/features/member/components';

const MemberPassword = () => {
  const userInfo = useUserInfo()!;

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle">비밀번호 변경</CommonText>
        <MemberPasswordForm nickname={userInfo?.nickname} />
      </Container>
    </>
  );
};

export default MemberPassword;
