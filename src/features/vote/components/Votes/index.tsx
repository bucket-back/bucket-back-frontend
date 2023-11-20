import { useSearchParams } from 'react-router-dom';
import { CommonTabs } from '@/shared/components';
import { VotesInfo } from '@/shared/types';
import VoteItem from '../VoteItem';
import { Container, ContentsWrapper } from './style';

const VOTE_STATE = [
  {
    VALUE: 'completed',
    LABEL: '종료된 투표',
  },
  {
    VALUE: 'posted',
    LABEL: '올린 투표',
  },
  {
    VALUE: 'participated',
    LABEL: '참여한 투표',
  },
];

interface VotesProps {
  votes: VotesInfo[];
}

const Votes = ({ votes }: VotesProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTabIndex = VOTE_STATE.map(({ VALUE }) => VALUE).indexOf(
    searchParams.get('status') || VOTE_STATE[0].VALUE
  );

  return (
    <Container>
      <CommonTabs
        currentTabIndex={currentTabIndex}
        onClick={(value) => {
          setSearchParams({ hobby: searchParams.get('hobby') || '', status: value });
        }}
        tabsData={VOTE_STATE.map(({ VALUE, LABEL }) => {
          return {
            value: VALUE,
            label: LABEL,
            content: (
              <ContentsWrapper>
                {votes.map(({ cursorId, item1Info, item2Info, voteInfo }) => {
                  return (
                    <VoteItem
                      key={cursorId}
                      item1Info={item1Info}
                      item2Info={item2Info}
                      voteInfo={voteInfo}
                    />
                  );
                })}
              </ContentsWrapper>
            ),
          };
        })}
      />
    </Container>
  );
};

export default Votes;
