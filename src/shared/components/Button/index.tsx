import { Box, Button } from '@chakra-ui/react';
import { CommonIcon } from '@/shared/components';

interface CommonButtonProps {
  type: 'mdFull' | 'mdMiddle' | 'mdBase' | 'mdSmall' | 'sm' | 'xs' | 'text' | 'smText' | 'custom';
  isClick?: boolean;
  isDisabled?: boolean;
  children?: string;
  onClick?: () => void;
  isSubmit?: boolean;
}

const CommonButton = ({
  type,
  isDisabled = false,
  isClick,
  children,
  onClick,
  isSubmit = false,
}: CommonButtonProps) => {
  const handleClick = () => {
    onClick && onClick();
  };

  const button = {
    mdFull: (
      <Button
        size="md"
        bg="blue.300"
        colorScheme="blue"
        maxW="100%"
        px="1rem"
        onClick={handleClick}
        isDisabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    mdMiddle: (
      <Button
        size="md"
        bg="blue.300"
        colorScheme="blue"
        maxW="18.125rem"
        px="1rem"
        onClick={handleClick}
        isDisabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    mdBase: (
      <Button
        size="md"
        bg="blue.300"
        colorScheme="blue"
        maxW="15rem"
        px="1rem"
        onClick={handleClick}
        isDisabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    mdSmall: (
      <Button
        size="md"
        bg="blue.700"
        colorScheme="blue"
        maxW="7.25rem"
        px="1rem"
        onClick={handleClick}
        isDisabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
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
        onClick={handleClick}
        isDisabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
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
        onClick={handleClick}
        isDisabled={isDisabled}
        _hover={{
          bg: 'none',
        }}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    text: (
      <Button
        colorScheme="blue.900"
        onClick={handleClick}
        variant="link"
        isDisabled={isDisabled}
        _hover={{
          textDecor: 'none',
        }}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    smText: (
      <Button
        colorScheme="gray"
        onClick={handleClick}
        variant="link"
        isDisabled={isDisabled}
        _hover={{
          textDecor: 'none',
        }}
        type={isSubmit ? 'submit' : 'button'}
      >
        {children}
      </Button>
    ),
    custom: (
      <Box
        as="button"
        width="6.125rem"
        height="5.625rem"
        borderRadius="0.625rem"
        bg="linear-gradient(90deg, #E2E8F0 0%, #EDF2F7 100%)"
        onClick={handleClick}
        disabled={isDisabled}
        type={isSubmit ? 'submit' : 'button'}
      >
        <CommonIcon type="plus" />
      </Box>
    ),
  };

  return <>{button[type]}</>;
};

export default CommonButton;
