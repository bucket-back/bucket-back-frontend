import styled from '@emotion/styled';
import {
  CommonButton,
  CommonIcon,
  CommonMenu,
  CommonText,
  DateText,
  Profile,
} from '@/shared/components';

const FeedComment = () => {
  return (
    <Container>
      <ProfileWrapper>
        <Profile nickName="테스트" levelNumber={10} isAdopted />
        <CommonMenu type="update" iconSize="0.25rem" onDelete={() => {}} onUpdate={() => {}} />
      </ProfileWrapper>
      <ContentsWrapper>
        <CommonText type="smallInfo">테스트</CommonText>
      </ContentsWrapper>
      <ContentsWrapper>
        <DateText createdDate="2021-10-15T20:48:19.816Z" />
        <InteractPanel>
          <CommonIcon type="heart" size="0.75rem" />
          <CommonText type="smallInfo">0</CommonText>
          <CommonButton type="xsText">좋아요</CommonButton>
          <CommonButton type="xsText">인벤토리</CommonButton>
          <CommonButton type="xsText">채택하기</CommonButton>
        </InteractPanel>
      </ContentsWrapper>
    </Container>
  );
};

export default FeedComment;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.75rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const ContentsWrapper = styled.div`
  display: flex;
  padding: 0.25rem 0.5rem;
`;

const InteractPanel = styled.div`
  display: flex;
  gap: 0.2rem;
  padding-left: 0.2rem;
`;
