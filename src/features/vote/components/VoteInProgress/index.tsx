import { useNavigate } from 'react-router-dom';
import { CommonText, DividerImage } from '@/shared/components';
import { VotesInfo } from '@/shared/types';
import { Container, TitleWrapper, ContentsWrapper, ContentsBox, NoVotesInProgress } from './style';

interface VoteInProgressProps {
  votes: VotesInfo[];
}
const VoteInProgress = ({ votes }: VoteInProgressProps) => {
  const navigate = useNavigate();

  return (
    <Container>
      {votes.length ? (
        <>
          <TitleWrapper>
            <CommonText type="normalInfo">진행중인 투표</CommonText>
          </TitleWrapper>
          <ContentsWrapper>
            {votes.map(({ cursorId, item1Info, item2Info, voteInfo }) => {
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
