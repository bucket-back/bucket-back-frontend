import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonTabs } from '@/shared/components';
import { Container } from './style';
import { useHobby } from '@/features/hobby/hooks';
import { VoteInProgress, Votes } from '@/features/vote/components';
import { GetVotesRequest, voteQueryOption } from '@/features/vote/service';

const VoteHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getHobby = searchParams.get('hobby');
  const getStatus = searchParams.get('status');
  const getSort = searchParams.get('sort');
  const { data: hobbyData, isSuccess: hobbySuccess } = useHobby();
  const { data: votesData } = useQuery({
    ...voteQueryOption.list({
      hobby: getHobby || '',
      status: (getStatus as GetVotesRequest['status']) || 'completed',
      sort: (getSort as GetVotesRequest['sort']) || 'recent',
    }),
    initialData: { nextCursorId: '', votes: [] },
  });

  const { data: votesInProgressData } = useQuery({
    ...voteQueryOption.list({
      hobby: getHobby || '',
      status: 'inprogress',
    }),
    initialData: { nextCursorId: '', votes: [] },
  });

  useEffect(() => {
    if (!searchParams.get('hobby') && hobbySuccess) {
      setSearchParams({ hobby: hobbyData.hobbies[0].name });
    }
  }, [hobbyData?.hobbies, hobbySuccess, searchParams, setSearchParams]);

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
                <VoteInProgress votes={votesInProgressData.votes} />
                <Votes votes={votesData.votes} />
              </>
            ),
          })) || []
        }
      />
    </Container>
  );
};

export default VoteHome;
