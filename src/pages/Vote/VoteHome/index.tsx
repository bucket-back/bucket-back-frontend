import { useSearchParams } from 'react-router-dom';
import { CommonTabs } from '@/shared/components';
import { Container } from './style';
import VoteInProgress from '@/features/vote/components/VoteInProgress';
import Votes from '@/features/vote/components/Votes';

const hobby = ['cycle', 'swim', 'basketball'];

const VoteHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Container>
      <CommonTabs
        currentTabIndex={hobby.indexOf(searchParams.get('hobby') || hobby[0])}
        tabsType="soft-rounded"
        isFitted={false}
        onClick={(value) => {
          setSearchParams({ hobby: value });
        }}
        tabsData={[
          {
            value: 'cycle',
            label: '자전거',
            content: (
              <>
                <VoteInProgress />
                <Votes />
              </>
            ),
          },
          {
            value: 'swim',
            label: '수영',
            content: (
              <>
                <VoteInProgress />
                <Votes />
              </>
            ),
          },
          {
            value: 'basketball',
            label: '농구',
            content: (
              <>
                <VoteInProgress />
                <Votes />
              </>
            ),
          },
        ]}
      />
    </Container>
  );
};

export default VoteHome;
