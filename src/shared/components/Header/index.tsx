import { useNavigate } from 'react-router-dom';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { CommonIconButton } from '@/shared/components';
import logo from '@/assets/images/logo.png';

interface HeaderProps {
  type: 'logo' | 'back';
  path?: string;
  height?: string;
}

const Header = ({ type, path, height = '4rem' }: HeaderProps) => {
  const navigate = useNavigate();

  const headerType = {
    logo: (
      <>
        <Image src={logo} width="3rem" />
        <Text fontSize="xl" as="b" color="blue.900">
          버킷백
        </Text>
      </>
    ),
    back: (
      <CommonIconButton
        type="back"
        fontSize="1rem"
        onClick={() => (path ? navigate(path) : navigate(-1))}
      />
    ),
  };

  return (
    <Box height={height} pl="1.25rem" width="full" flexShrink={0} as="header">
      <Flex h="full" alignItems="center">
        {headerType[type]}
      </Flex>
    </Box>
  );
};

export default Header;
