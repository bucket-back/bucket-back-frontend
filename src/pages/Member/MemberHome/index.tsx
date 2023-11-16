import { useParams } from 'react-router-dom';
import {
  CommonAvatar,
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonIconButton,
  CommonMenu,
  CommonText,
  DividerImage,
  Footer,
  Header,
} from '@/shared/components';
import {
  Container,
  MemberInfoWrapper,
  MemberIntroWrapper,
  MemberInfoPanel,
  MemberInfoBox,
  ContentsWrapper,
  ContentsPanel,
  SubTitleBox,
  ImagePanel,
} from './style';

const MemberHome = () => {
  const { memberId } = useParams();

  return (
    <>
      <Header type="logo" />
      <Container>
        <MemberInfoWrapper>
          <MemberInfoPanel>
            <CommonAvatar size="5rem" />
            <MemberInfoBox>
              <CommonText type="strongInfo">LV. 10</CommonText>
              <CommonText type="smallTitle">{memberId}</CommonText>
              <CommonButton type="profile">프로필 수정</CommonButton>
            </MemberInfoBox>
          </MemberInfoPanel>
          <CommonMenu type="logout" iconSize="0.3rem" onDelete={() => {}} />
        </MemberInfoWrapper>
        <MemberIntroWrapper>
          <CommonText type="normalInfo" noOfLines={3}>
            안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요
          </CommonText>
        </MemberIntroWrapper>
        <CommonDivider size="lg" />
        <ContentsWrapper>
          <ContentsPanel>
            <div>
              <SubTitleBox>
                <CommonIcon type="inventory" />
                <CommonText type="smallTitle">인벤토리</CommonText>
              </SubTitleBox>
              <CommonText type="smallInfo">
                취미별 아이템을 조합하여 나만의 인벤토리을 만들 수 있어요
              </CommonText>
            </div>
            <CommonIconButton type="detail" fontSize="0.8rem" onClick={() => {}} />
          </ContentsPanel>
          <ImagePanel>
            <DividerImage type="base" images={['1', '2', '3']} />
            <DividerImage type="base" images={['1', '2', '3']} />
            <DividerImage type="base" images={['1', '2', '3']} />
          </ImagePanel>
        </ContentsWrapper>
        <CommonDivider size="sm" />
        <ContentsWrapper>
          <ContentsPanel>
            <div>
              <SubTitleBox>
                <CommonIcon type="bucket" />
                <CommonText type="smallTitle">버킷</CommonText>
              </SubTitleBox>
              <CommonText type="smallInfo">
                취미별 아이템을 조합하여 나만의 버킷을 만들 수 있어요
              </CommonText>
            </div>
            <CommonIconButton type="detail" fontSize="0.8rem" onClick={() => {}} />
          </ContentsPanel>
          <ImagePanel>
            <DividerImage type="base" images={['1', '2', '3']} />
            <DividerImage type="base" images={['1', '2', '3']} />
            <DividerImage type="base" images={['1', '2', '3']} />
          </ImagePanel>
        </ContentsWrapper>
        <CommonDivider size="sm" />
        <ContentsWrapper>
          <ContentsPanel>
            <div>
              <SubTitleBox>
                <CommonIcon type="feed" />
                <CommonText type="smallTitle">피드</CommonText>
              </SubTitleBox>
              <CommonText type="smallInfo">
                내가 올린 피드와 좋아요한 피드를 확인할 수 있어요
              </CommonText>
            </div>
            <CommonIconButton type="detail" fontSize="0.8rem" onClick={() => {}} />
          </ContentsPanel>
        </ContentsWrapper>
        <CommonDivider size="sm" />
      </Container>
      <Footer />
    </>
  );
};

export default MemberHome;
