import { Box, Avatar, AvatarProps, Circle } from '@chakra-ui/react';
import { FaPen } from 'react-icons/fa';

interface CommonAvatar {
  isOwner: boolean;
  size: string;
  src: AvatarProps['src'];
}

const CommonAvatar = ({
  isOwner = false,
  size,
  src = 'https://bit.ly/broken-link',
}: CommonAvatar) => {
  return (
    <>
      {isOwner ? (
        <Box position="relative" width="8em">
          <Avatar src={src} size="8rem" />
          <Circle size="8" bg="gray.100" position="absolute" top="6.165rem" right="0.45rem">
            <FaPen />
          </Circle>
        </Box>
      ) : (
        <Box>
          <Avatar src={src} width={size} height={size} />
        </Box>
      )}
    </>
  );
};

export default CommonAvatar;
