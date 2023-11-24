import {
  CommonButton,
  CommonText,
  CommonTextarea,
  DividerImage,
  Header,
} from '@/shared/components';
import {
  ButtonWrapper,
  Container,
  ContentsPanel,
  ContentsWrapper,
  Form,
  SelectedBucketBox,
} from './style';
import { HobbyRadio } from '@/features/hobby/components';

const FeedUpdate = () => {
  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle">피드 수정하기</CommonText>
        <Form>
          <ContentsWrapper>
            <ContentsPanel>
              <CommonText type="normalInfo">취미를 선택해주세요.</CommonText>
              <HobbyRadio defaultValue="야구" isReadOnly />
            </ContentsPanel>
            <ContentsPanel>
              <CommonText type="normalInfo">버킷을 선택해주세요.</CommonText>
              <SelectedBucketBox>
                <DividerImage images={['1', '2', '3']} type="base" />
              </SelectedBucketBox>
            </ContentsPanel>
            <ContentsPanel>
              <CommonText type="normalInfo">피드 내용을 입력해주세요.</CommonText>
              <CommonTextarea size="sm" placeholder="내용을 입력해주세요." />
            </ContentsPanel>
          </ContentsWrapper>
          <ButtonWrapper>
            <CommonButton type="mdFull" isSubmit>
              수정 완료
            </CommonButton>
          </ButtonWrapper>
        </Form>
      </Container>
    </>
  );
};

export default FeedUpdate;
