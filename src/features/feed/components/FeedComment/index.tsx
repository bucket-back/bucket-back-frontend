import {
  CommonButton,
  CommonIcon,
  CommonMenu,
  CommonText,
  DateText,
  Profile,
} from '@/shared/components';
import { Container, ProfileWrapper, ContentsWrapper, InteractPanel } from './style';

const FeedComment = () => {
  return (
    <Container>
      <ProfileWrapper>
        <Profile id={1} nickName="테스트" levelNumber={10} isAdopted />
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
