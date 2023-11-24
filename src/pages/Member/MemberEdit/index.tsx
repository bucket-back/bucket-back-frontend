import { useQuery } from '@tanstack/react-query';
import { CommonText, Header } from '@/shared/components';
import { useUserInfo } from '@/shared/hooks';
import { Container } from './style';
import { MemberEditForm } from '@/features/member/components';
import { memberQueryOption } from '@/features/member/service';

const MemberEdit = () => {
  const userInfo = useUserInfo()!;
  const member = useQuery({
    ...memberQueryOption.detail(userInfo?.nickname),
    select: (data) => data.memberProfile,
  });

  if (member.isError) {
    return;
  }

  if (member.isPending) {
    return;
  }

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle">프로필 수정</CommonText>
        <MemberEditForm nickname={member.data.nickname} introduction={member.data.introduction} />
      </Container>
    </>
  );
};

export default MemberEdit;
