import { Box } from '@chakra-ui/react';
import { CommonTabs } from '@/shared/components';
import VoteInProgress from '@/features/vote/components/VoteInProgress';
import Votes from '@/features/vote/components/Votes';

const VoteHome = () => {
  return (
    <Box>
      <CommonTabs
        tabsType="soft-rounded"
        isFitted={false}
        tabsData={[
          {
            label: '자전거',
            content: (
              <Box gap="5rem">
                <VoteInProgress />
                <Votes />
              </Box>
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
    </Box>
  );
};

export default VoteHome;
