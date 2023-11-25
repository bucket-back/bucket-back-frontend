import {
  CommonDivider,
  CommonMenu,
  CommonTabs,
  CommonText,
  DividerImage,
  Header,
} from '@/shared/components';
import { Container, ContentsBox, ContentsWrapper, TitlePanel, TitleWrapper } from './style';

const BucketHome = () => {
  return (
    <>
      <Header type="back" />
      <Container>
        <TitleWrapper>
          <TitlePanel>
            <CommonText type="normalTitle">버킷</CommonText>
            <CommonText type="subStrongInfo">총 0개의 버킷</CommonText>
          </TitlePanel>
          <CommonMenu type="create" iconSize="0.35rem" onDelete={() => {}} />
        </TitleWrapper>
        <CommonDivider size="sm" />
        <CommonTabs
          tabsType="soft-rounded"
          isFitted={false}
          tabsData={[
            {
              value: 'cycle',
              label: '자전거',
              content: (
                <ContentsWrapper>
                  <ContentsBox>
                    <DividerImage type="base" images={['1', '2', '3']} />
                    <CommonText type="smallInfo">버킷명</CommonText>
                    <CommonText type="smallInfo">10000원</CommonText>
                  </ContentsBox>
                  <ContentsBox>
                    <DividerImage type="base" images={['1', '2', '3']} />
                    <CommonText type="smallInfo">버킷명</CommonText>
                    <CommonText type="smallInfo">10000원</CommonText>
                  </ContentsBox>
                  <ContentsBox>
                    <DividerImage type="base" images={['1', '2', '3']} />
                    <CommonText type="smallInfo">버킷명</CommonText>
                    <CommonText type="smallInfo">10000원</CommonText>
                  </ContentsBox>
                  <ContentsBox>
                    <DividerImage type="base" images={['1', '2', '3']} />
                    <CommonText type="smallInfo">버킷명</CommonText>
                    <CommonText type="smallInfo">10000원</CommonText>
                  </ContentsBox>
                </ContentsWrapper>
              ),
            },
          ]}
        />
      </Container>
    </>
  );
};

export default BucketHome;
