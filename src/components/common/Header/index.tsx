import { Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';

interface HeaderProps {
  type: 'logo' | 'back';
}

const Header = ({ type }: HeaderProps) => {
  const navigate = useNavigate();

  const HeaderType = {
    logo: (
      <Text fontSize="2xl" as="b" color="blue.900">
        버킷백
      </Text>
    ),
    back: <FaChevronLeft size="1.25rem" onClick={() => navigate(-1)} />,
  };

  return (
    <Box height="5rem" display="flex" alignItems="center" pl="1.75rem" pos="fixed" width="full">
      {HeaderType[type]}
    </Box>
  );
};

export default Header;
