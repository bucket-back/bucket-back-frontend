import styled from '@emotion/styled';
import { CommonTabs } from '@/shared/components';
import VoteInProgress from '@/features/vote/components/VoteInProgress';
import Votes from '@/features/vote/components/Votes';

const VoteHome = () => {
  return (
    <Container>
      <CommonTabs
        tabsType="soft-rounded"
        isFitted={false}
        tabsData={[
          {
            label: '자전거',
            content: (
              <>
                <VoteInProgress />
                <Votes />
              </>
            ),
          },
          {
            label: '수영',
            content: '',
          },
          {
            label: '농구',
            content: '',
          },
        ]}
      />
    </Container>
  );
};

export default VoteHome;

const Container = styled.div`
  background-color: #f7fafc;
`;
