import { Box, Avatar, AvatarProps, Circle } from '@chakra-ui/react';
import CommonIcon from '../Icon';

interface CommonAvatarProps {
  isOwner: boolean;
  size: string;
  src: AvatarProps['src'];
  onClick: () => void;
}

const CommonAvatar = ({
  isOwner = false,
  size,
  src = 'https://bit.ly/broken-link',
  onClick,
}: CommonAvatarProps) => {
  return (
    <>
      {isOwner ? (
        <Box position="relative" width="8em">
          <Avatar src={src} size="8rem" />
          <Circle
            size="8"
            bg="gray.100"
            position="absolute"
            top="6.165rem"
            right="0.45rem"
            onClick={() => onClick()}
          >
            <CommonIcon type="pen" />
          </Circle>
        </Box>
      ) : (
        <Box>
          <Avatar src={src} width={size} height={size} onClick={() => onClick()} />
        </Box>
      )}
    </>
  );
};

export default CommonAvatar;
