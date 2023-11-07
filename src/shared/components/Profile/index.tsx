import { Box, Flex, HStack } from '@chakra-ui/react';
import CommonAvatar from '../Avatar';
import CommonText from '../Text';
import CommonBadge from '../Badge';

interface ProfileProps {
  src?: string;
  nickName: string;
  levelNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  isAdopted: boolean;
}

const Profile = ({ nickName, src, levelNumber, isAdopted }: ProfileProps) => {
  const handleClick = () => {
    // 추후 프로필로 이동
  };

  return (
    <Flex alignItems="center">
      <CommonAvatar isOwner={false} size="3rem" onClick={handleClick} src={src} />
      <Box ml="0.8rem">
        <CommonText type="smallTitle" color="blue.900" noOfLines={1}>
          {nickName}
        </CommonText>
        <HStack spacing="0.25rem">
          <CommonBadge levelNumber={levelNumber} type="level" />
          {isAdopted && <CommonBadge levelNumber={levelNumber} type="adopt" />}
        </HStack>
      </Box>
    </Flex>
  );
};

export default Profile;
