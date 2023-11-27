import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonButton, CommonCard, CommonIcon, CommonImage, CommonText } from '@/shared/components';
import { formatNumber } from '@/shared/utils';
import {
  Wrapper,
  ContentsContainer,
  ContentsWrapper,
  VoteImageWrapper,
  VsBox,
  Box,
  TextBox,
  NoResult,
} from './style';
import { searchQueryOption } from '@/features/search/service';
const SearchVoteList = () => {
  const { data, isPending, isError } = useQuery({
    ...searchQueryOption.voteList({ keyword: '농구', size: 10 }),
  });

  const navigate = useNavigate();

  if (isPending) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error...</>;
  }

  return data.totalCount >= 1 ? (
    <>
      <Box>
        <TextBox>
          <CommonText type="subStrongInfo">총 {data.totalCount}개의 투표</CommonText>
        </TextBox>
        {data.votes.map(({ item1Info, item2Info, voteInfo }) => (
          <CommonCard
            count={3}
            date={voteInfo.startTime}
            onClick={() => {
              navigate(`/vote/${voteInfo.id}`);
            }}
            key={voteInfo.id}
          >
            <ContentsContainer>
              <CommonText type="smallInfo">{voteInfo.content}</CommonText>
              <ContentsWrapper>
                <VoteImageWrapper>
                  <CommonImage size="base" src={item1Info.image} />
                  <CommonText type="smallInfo">{formatNumber(item1Info.price)}</CommonText>
                  <CommonText type="smallInfo">{item1Info.name}</CommonText>
                </VoteImageWrapper>
                <VsBox>
                  <CommonText type="smallInfo" noOfLines={0}>
                    VS
                  </CommonText>
                </VsBox>
                <VoteImageWrapper>
                  <CommonImage size="base" src={item2Info.image} />
                  <CommonText type="smallInfo">{formatNumber(item2Info.price)}</CommonText>
                  <CommonText type="smallInfo">{item2Info.name}</CommonText>
                </VoteImageWrapper>
              </ContentsWrapper>
            </ContentsContainer>
          </CommonCard>
        ))}
        <div>
          <CommonText type="smallInfo">투표 검색결과 페이지가 없습니다!</CommonText>
          <Wrapper onClick={() => navigate('/vote/:voteId')}>
            <CommonButton type="text">투표 작성하러 가기</CommonButton>
            <CommonIcon type="chevronRight" />
          </Wrapper>
        </div>
      </Box>
    </>
  ) : (
    <NoResult>검색결과가 없습니다...</NoResult>
  );
};

export default SearchVoteList;
