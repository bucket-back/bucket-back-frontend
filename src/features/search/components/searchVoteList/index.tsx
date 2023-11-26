import { useNavigate } from 'react-router-dom';
import { CommonButton, CommonCard, CommonIcon, CommonImage, CommonText } from '@/shared/components';
import {
  Wrapper,
  ContentsContainer,
  ContentsWrapper,
  VoteImageWrapper,
  VsBox,
  Box,
  TextBox,
} from './style';
const SearchVoteList = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <TextBox>
          <CommonText type="subStrongInfo">총 0개의 투표</CommonText>
        </TextBox>
        <CommonCard
          count={3}
          date={String(new Date())}
          onClick={() => {
            navigate(`/vote/1`);
          }}
        >
          <ContentsContainer>
            <CommonText type="smallInfo">투표내용</CommonText>
            <ContentsWrapper>
              <VoteImageWrapper>
                <CommonImage size="base" />
                <CommonText type="smallInfo">{23000}</CommonText>
                <CommonText type="smallInfo">아이템 이름</CommonText>
              </VoteImageWrapper>
              <VsBox>
                <CommonText type="smallInfo" noOfLines={0}>
                  VS
                </CommonText>
              </VsBox>
              <VoteImageWrapper>
                <CommonImage size="base" />
                <CommonText type="smallInfo">{23000}</CommonText>
                <CommonText type="smallInfo">아이템 이름</CommonText>
              </VoteImageWrapper>
            </ContentsWrapper>
          </ContentsContainer>
        </CommonCard>
        <CommonCard
          count={3}
          date={String(new Date())}
          onClick={() => {
            navigate(`/vote/1`);
          }}
        >
          <ContentsContainer>
            <CommonText type="smallInfo">투표내용</CommonText>
            <ContentsWrapper>
              <VoteImageWrapper>
                <CommonImage size="base" />
                <CommonText type="smallInfo">{23000}</CommonText>
                <CommonText type="smallInfo">아이템 이름</CommonText>
              </VoteImageWrapper>
              <VsBox>
                <CommonText type="smallInfo" noOfLines={0}>
                  VS
                </CommonText>
              </VsBox>
              <VoteImageWrapper>
                <CommonImage size="base" />
                <CommonText type="smallInfo">{23000}</CommonText>
                <CommonText type="smallInfo">아이템 이름</CommonText>
              </VoteImageWrapper>
            </ContentsWrapper>
          </ContentsContainer>
        </CommonCard>
        <CommonCard
          count={3}
          date={String(new Date())}
          onClick={() => {
            navigate(`/vote/1`);
          }}
        >
          <ContentsContainer>
            <CommonText type="smallInfo">투표내용</CommonText>
            <ContentsWrapper>
              <VoteImageWrapper>
                <CommonImage size="base" />
                <CommonText type="smallInfo">{23000}</CommonText>
                <CommonText type="smallInfo">아이템 이름</CommonText>
              </VoteImageWrapper>
              <VsBox>
                <CommonText type="smallInfo" noOfLines={0}>
                  VS
                </CommonText>
              </VsBox>
              <VoteImageWrapper>
                <CommonImage size="base" />
                <CommonText type="smallInfo">{23000}</CommonText>
                <CommonText type="smallInfo">아이템 이름</CommonText>
              </VoteImageWrapper>
            </ContentsWrapper>
          </ContentsContainer>
        </CommonCard>
        <CommonCard
          count={3}
          date={String(new Date())}
          onClick={() => {
            navigate(`/vote/1`);
          }}
        >
          <ContentsContainer>
            <CommonText type="smallInfo">투표내용</CommonText>
            <ContentsWrapper>
              <VoteImageWrapper>
                <CommonImage size="base" />
                <CommonText type="smallInfo">{23000}</CommonText>
                <CommonText type="smallInfo">아이템 이름</CommonText>
              </VoteImageWrapper>
              <VsBox>
                <CommonText type="smallInfo" noOfLines={0}>
                  VS
                </CommonText>
              </VsBox>
              <VoteImageWrapper>
                <CommonImage size="base" />
                <CommonText type="smallInfo">{23000}</CommonText>
                <CommonText type="smallInfo">아이템 이름</CommonText>
              </VoteImageWrapper>
            </ContentsWrapper>
          </ContentsContainer>
        </CommonCard>
        <CommonCard
          count={3}
          date={String(new Date())}
          onClick={() => {
            navigate(`/vote/1`);
          }}
        >
          <ContentsContainer>
            <CommonText type="smallInfo">투표내용</CommonText>
            <ContentsWrapper>
              <VoteImageWrapper>
                <CommonImage size="base" />
                <CommonText type="smallInfo">{23000}</CommonText>
                <CommonText type="smallInfo">아이템 이름</CommonText>
              </VoteImageWrapper>
              <VsBox>
                <CommonText type="smallInfo" noOfLines={0}>
                  VS
                </CommonText>
              </VsBox>
              <VoteImageWrapper>
                <CommonImage size="base" />
                <CommonText type="smallInfo">{23000}</CommonText>
                <CommonText type="smallInfo">아이템 이름</CommonText>
              </VoteImageWrapper>
            </ContentsWrapper>
          </ContentsContainer>
        </CommonCard>
        <CommonCard
          count={3}
          date={String(new Date())}
          onClick={() => {
            navigate(`/vote/1`);
          }}
        >
          <ContentsContainer>
            <CommonText type="smallInfo">투표내용</CommonText>
            <ContentsWrapper>
              <VoteImageWrapper>
                <CommonImage size="base" />
                <CommonText type="smallInfo">{23000}</CommonText>
                <CommonText type="smallInfo">아이템 이름</CommonText>
              </VoteImageWrapper>
              <VsBox>
                <CommonText type="smallInfo" noOfLines={0}>
                  VS
                </CommonText>
              </VsBox>
              <VoteImageWrapper>
                <CommonImage size="base" />
                <CommonText type="smallInfo">{23000}</CommonText>
                <CommonText type="smallInfo">아이템 이름</CommonText>
              </VoteImageWrapper>
            </ContentsWrapper>
          </ContentsContainer>
        </CommonCard>
        <div>
          <CommonText type="smallInfo">투표 검색결과 페이지가 없습니다!</CommonText>
          <Wrapper onClick={() => navigate('/vote/:voteId')}>
            <CommonButton type="text">투표 작성하러 가기</CommonButton>
            <CommonIcon type="chevronRight" />
          </Wrapper>
        </div>
      </Box>
    </>
  );
};

export default SearchVoteList;
