import { CommonButton, CommonMenu, CommonText, DateText, Profile } from '@/shared/components';
import { MemberInfo } from '@/shared/types';
import { Container, ProfileWrapper, ContentsWrapper, InteractPanel } from './style';

interface FeedCommentProps {
  content: string;
  createdAt: string;
  isAdopted: boolean;
  memberInfo: MemberInfo;
}

const FeedComment = ({ content, createdAt, isAdopted, memberInfo }: FeedCommentProps) => {
  return (
    <Container>
      <ProfileWrapper>
        <Profile
          src={memberInfo.profileImage}
          nickname={memberInfo.nickName}
          levelNumber={memberInfo.level}
          isAdopted={isAdopted}
        />
        <CommonMenu type="update" iconSize="0.25rem" onDelete={() => {}} onUpdate={() => {}} />
      </ProfileWrapper>
      <ContentsWrapper>
        <CommonText type="smallInfo">{content}</CommonText>
      </ContentsWrapper>
      <ContentsWrapper>
        <DateText createdDate={createdAt} />
        <InteractPanel>
          <CommonButton type="xsText">인벤토리</CommonButton>
          <CommonButton type="xsText">채택하기</CommonButton>
        </InteractPanel>
      </ContentsWrapper>
    </Container>
  );
};

export default FeedComment;
