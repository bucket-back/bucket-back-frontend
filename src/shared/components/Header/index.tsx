import { Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CommonIconButton from '../IconButton';

interface HeaderProps {
  type: 'logo' | 'back';
}

const Header = ({ type }: HeaderProps) => {
  const navigate = useNavigate();

  const headerType = {
    logo: (
      <Text fontSize="2xl" as="b" color="blue.900">
        버킷백
      </Text>
    ),
    back: <CommonIconButton type="back" onClick={() => navigate(-1)} />,
  };

  return (
    <Box height="5rem" display="flex" alignItems="center" pl="1.75rem" pos="fixed" width="full">
      {headerType[type]}
    </Box>
  );
};

export default Header;
