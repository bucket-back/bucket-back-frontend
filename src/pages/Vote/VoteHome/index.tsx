import { useSearchParams } from 'react-router-dom';
import { CommonTabs } from '@/shared/components';
import { Container } from './style';
import { useHobby } from '@/features/hobby/hooks';
import { VoteInProgress, Votes } from '@/features/vote/components';

const VoteHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hobbies = useHobby();

  const currentTabIndex = hobbies.data?.hobbies
    .map(({ name }) => name)
    .indexOf(searchParams.get('hobby') || hobbies.data.hobbies[0].name);

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
          hobbies.data?.hobbies.map(({ name, value }) => ({
            value: name,
            label: value,
            content: (
              <>
                <VoteInProgress />
                <Votes />
              </>
            ),
          })) || []
        }
      />
    </Container>
  );
};

export default VoteHome;
