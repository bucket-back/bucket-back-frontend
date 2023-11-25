import { CommonIconButton, CommonImage, CommonText, Header } from '@/shared/components';
import { Container, ContentsBox, ContentsWrapper, TitlePanel, TitleWrapper } from './style';

const BucketDetail = () => {
  return (
    <>
      <Header type="back" />
      <Container>
        <TitleWrapper>
          <TitlePanel>
            <CommonText type="normalTitle">버킷 이름</CommonText>
            <CommonText type="normalTitle">아이템 전체보기</CommonText>
            <CommonText type="subStrongInfo">총 0개의 아이템</CommonText>
          </TitlePanel>
          <CommonIconButton type="update" onClick={() => {}} />
        </TitleWrapper>
        <ContentsWrapper>
          <ContentsBox>
            <CommonImage size="sm" src="1" />
            <CommonText type="smallInfo">아이템명</CommonText>
            <CommonText type="smallInfo">10000원</CommonText>
          </ContentsBox>
          <ContentsBox>
            <CommonImage size="sm" src="1" />
            <CommonText type="smallInfo">아이템명</CommonText>
            <CommonText type="smallInfo">10000원</CommonText>
          </ContentsBox>
          <ContentsBox>
            <CommonImage size="sm" src="1" />
            <CommonText type="smallInfo">아이템명</CommonText>
            <CommonText type="smallInfo">10000원</CommonText>
          </ContentsBox>
        </ContentsWrapper>
      </Container>
    </>
  );
};

export default BucketDetail;
