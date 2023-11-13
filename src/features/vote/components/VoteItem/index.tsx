import { Box, Flex } from '@chakra-ui/react';
import { CommonCard, CommonImage, CommonText } from '@/shared/components';

const VoteItem = () => {
  return (
    <CommonCard count={0} date="2023-11-12T12:16:49.407Z" onClick={() => {}}>
      <Flex flexDir="column" gap="1rem">
        <CommonText type="smallInfo">이거 엄마한테 선물드릴려고하는데 어떰?</CommonText>
        <Flex alignItems="center" gap="0.5rem">
          <Box>
            <CommonImage size="base" />
            <CommonText type="smallInfo">29,800</CommonText>
            <CommonText type="smallInfo">아이템 이름입니다.</CommonText>
          </Box>
          <CommonText type="smallInfo">VS</CommonText>
          <Box>
            <CommonImage size="base" />
            <CommonText type="smallInfo">29,800</CommonText>
            <CommonText type="smallInfo">아이템 이름입니다.</CommonText>
          </Box>
        </Flex>
      </Flex>
    </CommonCard>
  );
};

export default VoteItem;
