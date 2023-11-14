import styled from '@emotion/styled';
import { CommonTabs } from '@/shared/components';
import VoteItem from '../VoteItem';

const Votes = () => {
  return (
    <Container>
      <CommonTabs
        tabsData={[
          {
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
            label: '올린 투표',
            content: '',
          },
          {
            label: '참여한 투표',
            content: '',
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
  height: calc(100vh - 20rem);
  padding: 1rem 0;
`;
