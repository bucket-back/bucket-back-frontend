import { Box, Button } from '@chakra-ui/react';
import { CommonIcon } from '@/shared/components';

interface CommonButtonProps {
  type: 'mdFull' | 'mdMiddle' | 'mdBase' | 'mdSmall' | 'sm' | 'xs' | 'text' | 'smText' | 'custom';
  isClick?: boolean;
  isDisabled: boolean;
  children: string;
  onClick: () => void;
}

const CommonButton = ({ type, isDisabled, isClick, children, onClick }: CommonButtonProps) => {
  const button = {
    mdFull: (
      <Button
        size="md"
        bg="blue.300"
        colorScheme="blue"
        variant="solid"
        width="100%"
        px="1rem"
        onClick={onClick}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
    ),
    mdMiddle: (
      <Button
        size="md"
        bg="blue.300"
        colorScheme="blue"
        variant="solid"
        width="18.125rem"
        px="1rem"
        onClick={onClick}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
    ),
    mdBase: (
      <Button
        size="md"
        bg="blue.300"
        colorScheme="blue"
        variant="solid"
        width="15rem"
        px="1rem"
        onClick={onClick}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
    ),
    mdSmall: (
      <Button
        size="md"
        bg="blue.700"
        colorScheme="blue"
        variant="solid"
        width="7.25rem"
        px="1rem"
        onClick={onClick}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
    ),
    sm: (
      <Button
        size="sm"
        colorScheme="blue"
        variant="outline"
        borderColor="blue.300"
        bg={isClick ? 'blue.300' : undefined}
        color={isClick ? 'white' : 'blue.300'}
        leftIcon={<CommonIcon type="heart" />}
        onClick={onClick}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
    ),
    xs: (
      <Button
        size="xs"
        colorScheme="gray"
        variant="outline"
        borderColor="white"
        leftIcon={<CommonIcon type="chevronRight" />}
        onClick={onClick}
        isDisabled={isDisabled}
      >
        {children}
      </Button>
    ),
    text: (
      <Button colorScheme="blue" onClick={onClick} variant="link" isDisabled={isDisabled}>
        {children}
      </Button>
    ),
    smText: (
      <Button colorScheme="gray" onClick={onClick} variant="link" isDisabled={isDisabled}>
        {children}
      </Button>
    ),
    custom: (
      <Box
        as="button"
        width="6.125rem"
        height="5.625rem"
        borderRadius="0.625rem"
        bg=" linear-gradient(90deg, #E2E8F0 0%, #EDF2F7 100%)"
        onClick={onClick}
        disabled={isDisabled}
      >
        <CommonIcon type="plus" />
      </Box>
    ),
  };

  return <>{button[type]}</>;
};

export default CommonButton;
