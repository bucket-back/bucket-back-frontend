import styled from '@emotion/styled';
import { CommonText, DividerImage } from '@/shared/components';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleWrapper = styled.div`
  padding-top: 1rem;
  padding-left: 1.25rem;
`;

const ContentsWrapper = styled.div`
  display: flex;
  gap: 0.7rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-bottom: 1rem;
  overflow-x: scroll;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;
