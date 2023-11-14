import styled from '@emotion/styled';
import { CommonCard, CommonImage, CommonText } from '@/shared/components';

const VoteItem = () => {
  return (
    <CommonCard count={0} date="2023-11-12T12:16:49.407Z" onClick={() => {}}>
      <ContentsContainer>
        <CommonText type="smallInfo">이거 엄마한테 선물드릴려고하는데 어떰?</CommonText>
        <ContentsWrapper>
          <ContentsBox>
            <CommonImage size="base" />
            <CommonText type="smallInfo">29,800</CommonText>
            <CommonText type="smallInfo">아이템 이름입니다.</CommonText>
          </ContentsBox>
          <VsBox>
            <CommonText type="smallInfo" noOfLines={0}>
              VS
            </CommonText>
          </VsBox>
          <ContentsBox>
            <CommonImage size="base" />
            <CommonText type="smallInfo">29,800</CommonText>
            <CommonText type="smallInfo">아이템 이름입니다.</CommonText>
          </ContentsBox>
        </ContentsWrapper>
      </ContentsContainer>
    </CommonCard>
  );
};

export default VoteItem;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContentsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContentsBox = styled.div``;

const VsBox = styled.div`
  flex-shrink: 0;
`;
