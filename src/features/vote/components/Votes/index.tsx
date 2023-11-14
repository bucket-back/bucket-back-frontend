import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { CommonTabs } from '@/shared/components';
import VoteItem from '../VoteItem';

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
                <div>1</div>
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
                <div>2</div>
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
                <div>3</div>
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

const Container = styled.div`
  background-color: white;
  padding-top: 2rem;
  border-radius: 2rem 2rem 0 0;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  overflow-y: scroll;
  height: calc(100vh - 30.5rem);
  padding: 1rem 0;
`;
