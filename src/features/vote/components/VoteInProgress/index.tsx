import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CommonText, DividerImage } from '@/shared/components';
import { voteQueryOption } from '../../service';
import { Container, TitleWrapper, ContentsWrapper, ContentsBox, NoVotesInProgress } from './style';

const VoteInProgress = () => {
  const [searchParams] = useSearchParams();
  const getHobby = searchParams.get('hobby');
  const navigate = useNavigate();
  const { data: votesInProgressData } = useInfiniteQuery({
    ...voteQueryOption.list({
      hobby: getHobby || '',
      status: 'inprogress',
    }),
    select: (data) => data?.pages.flatMap(({ votes }) => votes),
  });

  return (
    <Container>
      {votesInProgressData?.length !== 0 ? (
        <>
          <TitleWrapper>
            <CommonText type="normalInfo">진행중인 투표</CommonText>
          </TitleWrapper>
          <ContentsWrapper>
            {votesInProgressData?.map(({ cursorId, item1Info, item2Info, voteInfo }) => {
              return (
                <ContentsBox
                  key={cursorId}
                  onClick={() => {
                    navigate(`${voteInfo.id}`);
                  }}
                >
                  <DividerImage type="live" images={[item1Info.image, item2Info.image]} />
                  <CommonText type="smallInfo">{voteInfo.participants}명 참여중!</CommonText>
                </ContentsBox>
              );
            })}
          </ContentsWrapper>
        </>
      ) : (
        <NoVotesInProgress> 진행중인 투표가 없습니다.</NoVotesInProgress>
      )}
    </Container>
  );
};

export default VoteInProgress;
