import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CommonButton, CommonCard, CommonIcon, CommonImage, CommonText } from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import { SearchListItemProp } from '../searchItemList';
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

const SearchVoteList = ({ keyword }: SearchListItemProp) => {
  const { data, isPending, isError, hasNextPage, fetchNextPage } = useInfiniteQuery({
    ...searchQueryOption.infiniteVoteList({ keyword: encodeURIComponent(keyword), size: 3 }),
    select: (data) => {
      return {
        totalCount: data.pages.flatMap(({ totalCount }) => totalCount),
        votes: data.pages.flatMap(({ votes }) => votes),
      };
    },
  });

  const navigate = useNavigate();

  const ref = useIntersectionObserver({ onObserve: fetchNextPage });

  if (isPending) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error...</>;
  }

  if (data.totalCount[0] === 0) {
    return <NoResult>검색결과가 없습니다...</NoResult>;
  }

  const totalCount = data.totalCount.reduce((prev, next) => prev + next, 0);

  return (
    <>
      <Box>
        <TextBox>
          <CommonText type="subStrongInfo">총 {totalCount}개의 투표</CommonText>
        </TextBox>
        <>
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
          {hasNextPage && <div ref={ref} />}
        </>
        <div>
          <CommonText type="smallInfo">투표 검색결과 페이지가 없습니다!</CommonText>
          <Wrapper onClick={() => navigate('/vote/create')}>
            <CommonButton type="text">투표 작성하러 가기</CommonButton>
            <CommonIcon type="chevronRight" />
          </Wrapper>
        </div>
      </Box>
    </>
  );
};

export default SearchVoteList;
