import { Flex } from '@chakra-ui/react';
import { CommonText, DividerImage } from '@/shared/components';

const TEMP_IMAGE = 'https://placehold.co/800?text=Bucket+Back&font=roboto';

const VoteInProgress = () => {
  return (
    <Flex flexDir="column" gap="1rem">
      <CommonText type="normalInfo">진행중인 투표</CommonText>
      <Flex overflowX="auto" gap="0.7rem">
        {Array.from({ length: 10 }, (_, index) => {
          return (
            <Flex
              key={index}
              flexDir="column"
              gap="0.5rem"
              alignItems="center"
              marginBottom="1.5rem"
            >
              <DividerImage type="live" images={[TEMP_IMAGE, TEMP_IMAGE]} />
              <CommonText type="smallInfo">00명 참여중!</CommonText>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default VoteInProgress;
