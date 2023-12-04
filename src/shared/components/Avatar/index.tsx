import { ReactNode } from 'react';
import { Box, Avatar, AvatarProps, Circle } from '@chakra-ui/react';
import { CommonIcon } from '@/shared/components';

interface CommonAvatarProps {
  isOwner: boolean;
  size: string;
  src: AvatarProps['src'];
  onClick: () => void;
  children?: ReactNode;
}

const CommonAvatar = ({
  isOwner = false,
  size,
  src = 'https://bit.ly/broken-link',
  onClick,
  children,
}: Partial<CommonAvatarProps>) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <>
      {isOwner ? (
        <Box position="relative" width="8em">
          <Avatar border="1px solid #e2e8f0" src={src} width="8rem" height="8rem" />
          <Circle
            size="8"
            bg="gray.100"
            position="absolute"
            top="6.165rem"
            right="0.45rem"
            onClick={handleClick}
          >
            <label style={{ height: '1rem', cursor: 'pointer' }}>
              <CommonIcon type="pen" />
              {children}
            </label>
          </Circle>
        </Box>
      ) : (
        <Box>
          <Avatar
            border="1px solid #e2e8f0"
            src={src}
            width={size}
            height={size}
            onClick={handleClick}
            cursor="pointer"
          />
        </Box>
      )}
    </>
  );
};

export default CommonAvatar;
