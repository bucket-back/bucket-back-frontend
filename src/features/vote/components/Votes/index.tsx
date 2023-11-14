import { useSearchParams } from 'react-router-dom';
import { CommonTabs } from '@/shared/components';
import VoteItem from '../VoteItem';
import { Container, ContentsWrapper } from './style';

const voteState = ['ended', 'uploaded', 'participated'];

const Votes = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Container>
      <CommonTabs
        currentTabIndex={voteState.indexOf(searchParams.get('state') || voteState[0])}
        onClick={(value) => {
          searchParams.set('state', value);
          setSearchParams(searchParams);
        }}
        tabsData={[
          {
            value: 'ended',
            label: '종료된 투표',
            content: (
              <ContentsWrapper>
                <VoteItem />
                <VoteItem />
                <VoteItem />
                <VoteItem />
              </ContentsWrapper>
            ),
          },
          {
            value: 'uploaded',
            label: '올린 투표',
            content: (
              <ContentsWrapper>
                <VoteItem />
                <VoteItem />
                <VoteItem />
                <VoteItem />
              </ContentsWrapper>
            ),
          },
          {
            value: 'participated',
            label: '참여한 투표',
            content: (
              <ContentsWrapper>
                <VoteItem />
                <VoteItem />
                <VoteItem />
                <VoteItem />
              </ContentsWrapper>
            ),
          },
        ]}
      />
    </Container>
  );
};

export default Votes;
