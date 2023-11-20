import { useSearchParams } from 'react-router-dom';
import { CommonTabs } from '@/shared/components';
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

const Votes = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTabIndex = VOTE_STATE.map(({ VALUE }) => VALUE).indexOf(
    searchParams.get('state') || VOTE_STATE[0].VALUE
  );

  return (
    <Container>
      <CommonTabs
        currentTabIndex={currentTabIndex}
        onClick={(value) => {
          setSearchParams({ hobby: searchParams.get('hobby') || '', state: value });
        }}
        tabsData={VOTE_STATE.map(({ VALUE, LABEL }) => {
          return {
            value: VALUE,
            label: LABEL,
            content: (
              <ContentsWrapper>
                <VoteItem />
              </ContentsWrapper>
            ),
          };
        })}
      />
    </Container>
  );
};

export default Votes;
