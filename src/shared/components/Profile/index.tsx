import { useNavigate } from 'react-router-dom';
import { Box, Flex, HStack } from '@chakra-ui/react';
import { CommonAvatar, CommonText, CommonBadge } from '@/shared/components';

interface ProfileProps {
  src?: string;
  nickname: string;
  levelNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  isAdopted?: boolean;
}

const Profile = ({ nickname, src, levelNumber, isAdopted }: ProfileProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/member/${nickname}`);
  };

  return (
    <Flex alignItems="center">
      <CommonAvatar isOwner={false} size="3rem" onClick={handleClick} src={src} />
      <Box ml="0.8rem" onClick={handleClick} cursor="pointer">
        <CommonText type="normalInfo" weight={700} color="blue.900" noOfLines={1}>
          {nickname}
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
