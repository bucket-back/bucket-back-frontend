import { Box, Button, Flex } from '@chakra-ui/react';
import { CommonImage, CommonText } from '@/shared/components';

interface VoteOptionItemProps {
  onClick?: () => void;
}

const VoteOptionItem = ({ onClick }: VoteOptionItemProps) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <Box>
      <Flex flexDir="column" pos="relative">
        <CommonImage size="lg" src="" />
        <Button
          pos="absolute"
          bottom="-2rem"
          right="40%"
          color="white"
          bgColor="blue.300"
          borderRadius="50%"
          w="4.0625rem"
          h="4.0625rem"
          onClick={handleClick}
        >
          10
        </Button>
      </Flex>

      <Flex flexDir="column">
        <CommonText type="smallTitle">29,800</CommonText>
        <CommonText type="smallInfo">아이템 이름입니다.</CommonText>
      </Flex>
    </Box>
  );
};

export default VoteOptionItem;
