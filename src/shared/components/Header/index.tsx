import { useNavigate } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';
import { CommonIconButton } from '@/shared/components';

interface HeaderProps {
  type: 'logo' | 'back';
  path?: string;
}

const Header = ({ type, path }: HeaderProps) => {
  const navigate = useNavigate();

  const headerType = {
    logo: (
      <Text fontSize="2xl" as="b" color="blue.900">
        버킷백
      </Text>
    ),
    back: <CommonIconButton type="back" onClick={() => (path ? navigate(path) : navigate(-1))} />,
  };

  return (
    <Box height="5rem" pl="1.75rem" width="full" flexShrink={0} as="header">
      <Flex h="full" alignItems="center">
        {headerType[type]}
      </Flex>
    </Box>
  );
};

export default Header;
