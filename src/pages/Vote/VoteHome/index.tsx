import { useSearchParams } from 'react-router-dom';
import { CommonTabs } from '@/shared/components';
import { Container } from './style';
import { useHobby } from '@/features/hobby/hooks';
import { VoteInProgress, Votes } from '@/features/vote/components';
import { useVotes } from '@/features/vote/hooks';
import { GetVotesRequest } from '@/features/vote/service/types';

const VoteHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getHobby = searchParams.get('hobby');
  const getStatus = searchParams.get('status');
  const { data: hobbyData } = useHobby();
  const { data: votesData } = useVotes({
    hobby: getHobby || '',
    status: (getStatus as GetVotesRequest['status']) || 'completed',
  });
  const { data: votesInProgressData } = useVotes({
    hobby: getHobby || '',
    status: 'inprogress',
  });

  const currentTabIndex = hobbyData?.hobbies
    .map(({ name }) => name)
    .indexOf(getHobby || hobbyData.hobbies[0].name);

  return (
    <Container>
      <CommonTabs
        currentTabIndex={currentTabIndex}
        tabsType="soft-rounded"
        isFitted={false}
        onClick={(value) => {
          setSearchParams({ hobby: value });
        }}
        tabsData={
          hobbyData?.hobbies.map(({ name, value }) => ({
            value: name,
            label: value,
            content: (
              <>
                <VoteInProgress votes={votesInProgressData?.votes || []} />
                <Votes votes={votesData?.votes || []} />
              </>
            ),
          })) || []
        }
      />
    </Container>
  );
};

export default VoteHome;
