import { useSearchParams } from 'react-router-dom';
import { CommonSelect, CommonTabs } from '@/shared/components';
import { useAuthCheck } from '@/shared/hooks';
import { VotesInfo } from '@/shared/types';
import VoteItem from '../VoteItem';
import { Container, ContentsWrapper, SelectWrapper } from './style';

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
  const isLogin = useAuthCheck();
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
                <SelectWrapper>
                  <CommonSelect
                    onChange={(e) => {
                      const sort = e.target.value;
                      setSearchParams({
                        hobby: searchParams.get('hobby') || '',
                        status: searchParams.get('status') || '',
                        sort: sort,
                      });
                    }}
                  />
                </SelectWrapper>
                {VALUE !== 'completed' && !isLogin ? (
                  <div>로그인이 필요한 서비스입니다.</div>
                ) : (
                  votes.map(({ cursorId, item1Info, item2Info, voteInfo }) => {
                    return (
                      <VoteItem
                        key={cursorId}
                        item1Info={item1Info}
                        item2Info={item2Info}
                        voteInfo={voteInfo}
                      />
                    );
                  })
                )}
              </ContentsWrapper>
            ),
          };
        })}
      />
    </Container>
  );
};

export default Votes;
