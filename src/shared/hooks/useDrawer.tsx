import { useDisclosure } from '@chakra-ui/react';

const useDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return {
    isOpen,
    onOpen,
    onClose,
  };
};

export default useDrawer;
