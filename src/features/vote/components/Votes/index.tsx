import { Flex } from '@chakra-ui/react';
import { CommonTabs } from '@/shared/components';
import VoteItem from '../VoteItem';

const Votes = () => {
  return (
    <>
      <CommonTabs
        tabsData={[
          {
            label: '종료된 투표',
            content: (
              <Flex flexDir="column" alignItems="center" gap="2rem" overflowY="scroll">
                <VoteItem />
                <VoteItem />
                <VoteItem />
                <VoteItem />
              </Flex>
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
    </>
  );
};

export default Votes;
