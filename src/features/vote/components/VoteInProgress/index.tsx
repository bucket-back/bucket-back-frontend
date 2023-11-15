import { CommonText, DividerImage } from '@/shared/components';
import { Container, TitleWrapper, ContentsWrapper, ContentsBox } from './style';

const TEMP_IMAGE = 'https://placehold.co/800?text=Bucket+Back&font=roboto';

const VoteInProgress = () => {
  return (
    <Container>
      <TitleWrapper>
        <CommonText type="normalInfo">진행중인 투표</CommonText>
      </TitleWrapper>
      <ContentsWrapper>
        {Array.from({ length: 10 }, (_, index) => {
          return (
            <ContentsBox key={index}>
              <DividerImage type="live" images={[TEMP_IMAGE, TEMP_IMAGE]} />
              <CommonText type="smallInfo">00명 참여중!</CommonText>
            </ContentsBox>
          );
        })}
      </ContentsWrapper>
    </Container>
  );
};

export default VoteInProgress;
